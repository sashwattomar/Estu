import React, {Fragment, useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createProfile, getCurrentUsersProfile} from '../../actions/profile';
import {useNavigate, Link} from 'react-router-dom';

const EditProfile = ({
  profile: {profile, loading},
  createProfile,
  getCurrentUsersProfile,
}) => {
  const [formData, setFormData] = useState({
    collegeName: ' ',
    stream: ' ',
    // graduationYear: " ",
    skills: ' ',
    targetExam: ' ',
    linkedin: ' ',
    githubUsername: ' ',
    telegram: ' ',
    facebook: ' ',
    instagram: ' ',
    ifit: false,
    bio: ' ',
    // img: " ",
  });

  const navigate = useNavigate();

  useEffect(() => {
    getCurrentUsersProfile();

    setFormData({
      collegeName: loading || !profile.collegeName ? ' ' : profile.collegeName,
      stream: loading || !profile.stream ? ' ' : profile.stream,
      bio: loading || !profile.bio ? ' ' : profile.bio,

      ifit: loading || !profile.social ? ' ' : profile.ifit,
      skills: loading || !profile.skills ? ' ' : profile.skills.join(','),
      targetExam:
        loading || !profile.targetExam ? ' ' : profile.targetExam.join(','),
      linkedin: loading || !profile.social ? ' ' : profile.social.linkedin,
      githubUsername:
        loading || !profile.social ? ' ' : profile.social.githubUsername,
      telegram: loading || !profile.social ? ' ' : profile.social.telegram,
      facebook: loading || !profile.social ? ' ' : profile.social.facebook,
      instagram: loading || !profile.social ? ' ' : profile.social.instagram,
      // img: loading || !profile.social ?" " profile.social.
    });
  }, [loading]);

  //managing state of toggling social button line 84
  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  const {
    collegeName,
    stream,
    skills,
    targetExam,
    linkedin,
    instagram,
    facebook,
    githubUsername,
    telegram,
    ifit,
    bio,
    // img,
  } = formData;

  const onChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, navigate, true);
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Create Your Profile</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Let's get some information to make your
        profile stand out
      </p>
      <form
        className='form'
        onSubmit={(e) => {
          onSubmit(e);
        }}
      >
        <div className='form-group'>
          <select name='stream' value={stream} onChange={(e) => onChange(e)}>
            <option value='0'>* Select Engineering Branch</option>
            <option value='Electronics And Communication'>
              Electronics and Communication
            </option>
            <option value='Computer Science'>Computer Science</option>
            <option value='Mechanical'>Mechanical</option>
            <option value='Food Technology'>Food Technology</option>
            <option value='Civil Engineering'>Civil Engineering</option>
            <option value='Other'>Other</option>
          </select>
          <small className='form-text'>
            Give us an Idea abaout your engineering branch
          </small>
        </div>

        <div className='form-group'>
          <input
            type='text'
            placeholder='College Name'
            name='collegeName'
            value={collegeName}
            onChange={(e) => onChange(e)}
          />
          <small className='form-text'>Enter your College Name</small>
        </div>

        <div className='form-group'>
          <input
            type='text'
            placeholder='Target Exam'
            name='targetExam'
            value={targetExam}
            onChange={(e) => onChange(e)}
          />
          <small className='form-text'>
            {/* Enter exam you are preapring for.Please use comma separated values */}
            (eg. GATE,Railways,etc.){' '}
          </small>
        </div>

        <div className='form-group'>
          <input
            type='text'
            placeholder='* Skills'
            name='skills'
            value={skills}
            onChange={(e) => onChange(e)}
          />
          <small className='form-text'>
            Enter your skills. Please use comma separated values (eg.
            HTML,CSS,JavaScript,PHP)
          </small>
        </div>

        <div className='form-group'>
          <input
            type='text'
            placeholder='Github Username'
            name='githubUsername'
            value={githubUsername}
            onChange={(e) => onChange(e)}
          />
          <small className='form-text'>
            If you want your latest repos and a Github link, include your
            username
          </small>
        </div>

        <div className='form-group'>
          <input
            type='checkbox'
            placeholder='Would you like to  prepare for IT companies '
            name='ifit'
            value={ifit}
            checked={ifit}
            onChange={(e) => {
              setFormData({...formData, ifit: !ifit});
            }}
          />
          <small className='form-text'>
            Would you like to prepare for IT companies?
          </small>
        </div>

        <div className='form-group'>
          <textarea
            placeholder='A short bio of yourself'
            name='bio'
            value='bio'
            onChange={(e) => onChange(e)}
          ></textarea>
          <small className='form-text'>Tell us a little about yourself</small>
        </div>

        <div className='my-2'>
          <button
            onClick={() => toggleSocialInputs(!displaySocialInputs)}
            type='button'
            className='btn btn-light'
          >
            Add Social Network Links
          </button>
        </div>

        {displaySocialInputs && (
          <Fragment>
            <div className='form-group social-input'>
              <i className='fab fa-telegram-plane fa-2x'></i>
              <input
                type='number'
                placeholder='Telegram Number'
                name='telegram'
                value={telegram}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-facebook fa-2x'></i>
              <input
                type='text'
                placeholder='Facebook URL'
                name='facebook'
                value={facebook}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-linkedin fa-2x'></i>
              <input
                type='text'
                placeholder='Linkedin URL'
                name='linkedin'
                value={linkedin}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-instagram fa-2x'></i>
              <input
                type='text'
                placeholder='Instagram URL'
                name='instagram'
                value={instagram}
                onChange={(e) => onChange(e)}
              />
            </div>
          </Fragment>
        )}

        <input type='submit' className='btn btn-primary my-1' />
        <Link className='btn btn-light my-1' to='/dashboard'>
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentUsersProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToPtops = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToPtops, {
  createProfile,
  getCurrentUsersProfile,
})(EditProfile);
