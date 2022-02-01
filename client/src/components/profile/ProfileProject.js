import React from 'react';
import PropTypes from 'prop-types';

const ProfileProject = ({project: {projectTitle, projectDescription}}) => (
  <div>
    <p>
      <strong>Position: </strong> {projectTitle}
    </p>

    <p>
      <strong>Description: </strong> {projectDescription}
    </p>
  </div>
);

ProfileProject.propTypes = {
  project: PropTypes.object.isRequired,
};

export default ProfileProject;
