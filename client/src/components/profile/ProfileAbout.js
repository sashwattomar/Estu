import React from 'react';
import PropTypes from 'prop-types';

const ProfileAbout = ({
  profile: {
    bio,
    skills,
    targetExam,
    user: {name},
  },
}) => (
  <div class='profile-about bg-light p-2'>
    <h2 class='text-primary'>{bio}</h2>
    <p></p>
    <div class='line'></div>
    <h2 class='text-primary'>Skill Set</h2>
    <div class='skills'>
      {skills.map((skill, index) => (
        <div key={index} className='p-1'>
          <i className='fas fa-check'></i>
          {skill}{' '}
        </div>
      ))}
    </div>

    <div class='skills'>
      {targetExam.map((targetExam, index) => (
        <div key={index} className='p-1'>
          <i className='fas fa-check'></i>
          {targetExam}{' '}
        </div>
      ))}
    </div>
  </div>
);

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired,
};
export default ProfileAbout;
