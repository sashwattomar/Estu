const express = require('express');
const router = express.Router();
//SINCE THE ROUTE IS PRIVATE
const auth = require('../../middleware/auth');
const Profile = require('../../model/Profile');
// const User = require('../../model/User');
const {check, validationResult} = require('express-validator');

//@route  Get api/profile/me
//@ desc  GET CURRENT USER PROFILE
//@acess  PRIVATE
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({user: req.user.id}).populate(
      'user',
      ['name', 'avatar', 'email']
    );
    if (!profile) {
      return res.status(400).json({msg: 'no profile '});
    }
    res.json(profile); //sending json version of profile
  } catch (err) {
    console.error(err.message);
    return res.send('error in catch of profile route');
  }
});
//@route  post api/profile
//@ desc  create and update profile
//@acess  PRIVATE
router.post(
  '/',
  auth,
  check('collegeName', 'collegeName is required').notEmpty(),
  check('stream', 'stream is required').notEmpty(),
  check('tenthschool', 'tenthschool is required').notEmpty(),
  check('twelfthschool', 'twelfthschool is required').notEmpty(),
  check('twelvethpercentage', 'twelvethpercentage is required').notEmpty(),
  check('temthpercentage', 'temthpercentage is required').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }
    const {
      collegeName,
      stream,
      ifit,
      skills,
      targetExam,
      bio,
      age,
      tenthschool,
      twelfthschool,
      twelvethpercentage,
      temthpercentage,
      collegepercentage,
      achivements,
      linkedin,
      githubUsername,
      facebook,
      telegram,
      instagram,
    } = req.body;

    const profileFields = {};
    profileFields.user = req.user.id;
    if (collegeName) profileFields.collegeName = collegeName;
    if (stream) profileFields.stream = stream;
    if (ifit) profileFields.ifit = ifit;
    if (bio) profileFields.bio = bio;
    // iterating through array and trimming the data to remove extra spaces and splitting apart on ',' basis
    if (targetExam)
      profileFields.targetExam = targetExam
        .split(',')
        .map((exam) => exam.trim());
    if (skills)
      profileFields.skills = skills.split(',').map((skill) => skill.trim());

    profileFields.social = {};
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = instagram;
    if (telegram) profileFields.social.telegram = telegram;
    if (facebook) profileFields.social.facebook = facebook;
    if (githubUsername) profileFields.social.githubUsername = githubUsername;

    profileFields.persnol = {};
    if (age) profileFields.persnol.age = age;
    if (tenthschool) profileFields.persnol.tenthschool = tenthschool;
    if (twelfthschool) profileFields.persnol.twelfthschool = twelfthschool;
    if (twelvethpercentage)
      profileFields.persnol.twelvethpercentage = twelvethpercentage;
    if (temthpercentage)
      profileFields.persnol.temthpercentage = temthpercentage;
    if (achivements) profileFields.persnol.achivements = achivements;
    if (collegepercentage)
      profileFields.persnol.collegepercentage = collegepercentage;
    try {
      // IF USER-DETAILS EXISTS IN USER-DETAIL MODEL then we are updating
      let profile = await Profile.findOne({user: req.user.id});
      if (profile) {
        //UPDATE
        // not this useful syntax
        profile = await Profile.findOneAndUpdate(
          {user: req.user.id},
          {$set: profileFields},
          {new: true}
        ); // referencing from this collection to user collections
        return res.json(profile);
      }
      // IF ProfileS DOES NOT EXIST ALLREDY IN Profile MODEL THEN CREATING A NEW DOCUMENT
      profile = new Profile(profileFields);
      await profile.save();
      //returns profile
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);
//@route  Get api/profile
//@ desc  get all profiles
//@acess  PUBLIC
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    res.json(profiles);
  } catch (err) {
    console.err(err.message);
    res.status(500).send('Server Error');
  }
});
//@route  Get api/profile/user/:user_id
//@ desc  get profile by userId
//@acess  PUBLIC
router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate('user', ['name', 'avatar']);

    if (!profile) return res.status(400).json({msg: 'Profile not found'});
    console.log(profile);
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({msg: 'Profile not found'});
    }
    res.status(500).send('Server Error');
  }
});
//@route  Update api/profile/experience
//@ desc  add/update Internship experience
//@acess  Private
router.put('/experience', auth, async (req, res) => {
  const {title, company, location, from, to, current, description} = req.body;
  // Object created yet not saved to DB
  const newExp = {
    title,
    company,
    location,
    from,
    to,
    current,
    description,
  };
  try {
    // fetching profile which we need to update
    const profile = await Profile.findOne({user: req.user.id});

    // unshift is used to update
    profile.experience.unshift(newExp);

    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});
//@route  Update api/profile/projects
//@ desc  add/update projects
//@acess  Private
router.put('/projects', auth, async (req, res) => {
  const {projectTitle, projectDescription} = req.body;
  // Object created yet not saved to DB
  const newProject = {
    projectTitle,
    projectDescription,
  };
  try {
    // fetching profile which we need to update
    const profile = await Profile.findOne({user: req.user.id});
    // unshift is used to update
    profile.projects.unshift(newProject);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
//@route  Delete api/profile/experience/:exp_id
//@ desc  delete experience
//@acess  Private
router.delete('/experience/:exp_id', auth, async (req, res) => {
  try {
    // searching for profile that contains that experience
    const profile = await Profile.findOne({user: req.user.id});
    //Get remove index
    const removeIndex = profile.experience
      .map((item) => item.id)
      // getting each items id and matching it with id supplied to params using index of function
      .indexOf(req.params.exp_id);
    // after matching we are removing that particular experience from the db
    //  using splice and 1 represent count of items to be removed
    profile.experience.splice(removeIndex, 1);
    await profile.save();
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('SERVER ERROR');
  }
});
//@route  Delete api/profile/projects/:proj_id
//@ desc  delete project
//@acess  Private
router.delete('/projects/:proj_id', auth, async (req, res) => {
  try {
    // searching for profile that contains that experience
    const profile = await Profile.findOne({user: req.user.id});
    //Get remove index
    const removeIndex = profile.projects
      .map((item) => item.id)
      // getting each items id and matching it with project id supplied to params using index of function
      .indexOf(req.params.proj_id);
    // after matching we are removing that particular experience from the db
    //  using splice and 1 represent count of items to be removed
    profile.projects.splice(removeIndex, 1);
    await profile.save();
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('SERVER ERROR');
  }
});

module.exports = router;
