// import React, {Fragment, useEffect} from "react";
import React from 'react';

import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
// import {connect} from "react-redux";
const ProfileItem = ({
  profile: {
    user: {_id, name, avatar},
    collegeName,
    stream,
    targetExam,
  },
}) => {
  return (
    <div className='profile  bg-light'>
      <img src={avatar} alt='' className='round-img' />
      <div>
        <h2>{name}</h2>
        <p>
          {stream}
          {collegeName && <span> at {collegeName}</span>}
        </p>
        <p className='my-1'>{stream && <span> </span>}</p>
        <Link to={`/profile/${_id}`} className='btn btn-primary'>
          View Profile{' '}
        </Link>
      </div>
      <ul>
        {targetExam.slice(0, 4).map((targetExam, index) => (
          <li key={index} className='text-primary'>
            {' '}
            <i className='fas fa-check'></i>
            {targetExam}
          </li>
        ))}
      </ul>
    </div>
  );
};
ProfileItem.propTypes = {
  //   getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};
// const mapStateToProps = (state) => ({
//   profile: state.profile,
// });
export default ProfileItem;
// export default ProfileItem;
