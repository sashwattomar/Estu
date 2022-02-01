import React, {Fragment, useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createProfile} from '../../actions/profile';
import {useNavigate, Link} from 'react-router-dom';
const initialState = {
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
};
const CreateProfile = ({createProfile}) => {
  const [formData, setFormData] = useState(initialState);
  //managing state of toggling social button line 84
  const [displaySocialInputs, toggleSocialInputs] = useState(false);
  // using Navigate
  const navigate = useNavigate();
  //destructure
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
  } = formData;
  const onChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, navigate);
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
            name='tenthschool'
            value={tenthschool}
            onChange={(e) => onChange(e)}
          />
          <small className='form-text'>Enter your high school name</small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            name='twelfthschool'
            value={twelfthschool}
            onChange={(e) => onChange(e)}
          />
          <small className='form-text'>
            Enter your secondary high school name
          </small>
        </div>{' '}
        <div className='form-group'>
          <input
            type='text'
            name='achivements'
            value={achivements}
            onChange={(e) => onChange(e)}
          />
          <small className='form-text'>Enter your College Achivements</small>
        </div>{' '}
        <div className='form-group'>
          <input
            type='text'
            placeholder='Target Exam'
            name='targetExam'
            value={targetExam}
            onChange={(e) => onChange(e)}
          />
          <small className='form-text'>
            Enter exam you are preapring for.Please use comma separated values
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
          <textarea
            placeholder='A short bio of yourself'
            name='bio'
            value={bio}
            onChange={(e) => onChange(e)}
          ></textarea>
          <small className='form-text'>Tell us a little about yourself</small>
        </div>
        <div className='form-group'>
          <input
            type='Number'
            name='twelvethpercentage'
            value={twelvethpercentage}
            onChange={(e) => onChange(e)}
          />
          <small className='form-text'>
            Enter your Twelfth Percentage/CGPA
          </small>
        </div>{' '}
        <div className='form-group'>
          <input
            type='Number'
            name='temthpercentage'
            value={temthpercentage}
            onChange={(e) => onChange(e)}
          />
          <small className='form-text'>Enter your College Percentage</small>
        </div>{' '}
        <div className='form-group'>
          <input
            type='Number'
            name='collegepercentage'
            value={collegepercentage}
            onChange={(e) => onChange(e)}
          />
          <small className='form-text'>Enter your College Percentage</small>
        </div>{' '}
        <div className='form-group'>
          <input
            type='number'
            name='age'
            value={age}
            onChange={(e) => onChange(e)}
          />
          <small className='form-text'>Enter your GraduationYear</small>
        </div>
        {/* .................................................................................................................................................................................................................................................................. */}
        <div className='form-group'>
          <input
            type='text'
            placeholder='Github Username'
            name='githubUsername'
            value={githubUsername}
            onChange={(e) => onChange(e)}
          />
          <small className='form-text'>Enter your Github UserName</small>
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

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
};

export default connect(null, {createProfile})(CreateProfile);
