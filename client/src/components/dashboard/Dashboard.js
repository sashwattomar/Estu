import React, {Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
// import {GET_PROFILE, PROFILE_ERROR} from '../../actions/types';
import {getCurrentUsersProfile} from '../../actions/profile';
import {Link} from 'react-router-dom';
import DashboardActions from './DashboardActions';
import Spinner from '../layout/Spinner';
import Experience from './Experience';
const Dashboard = ({
  profile: {profile, loading},
  getCurrentUsersProfile,
  auth: {user},
}) => {
  useEffect(
    () => {
      getCurrentUsersProfile();
    },
    // eslint-disable-next-line
    [getCurrentUsersProfile]
  );

  // return loading && profile == null ? <Spinner /> : <Fragment> test</Fragment>;
  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Dashboard</h1>
      <p className='lead'>
        <i className='fas fa-user ' /> Welcome {user && user.name}
      </p>
      {profile !== null ? (
        <Fragment>
          <DashboardActions />
          <Experience experience={profile.experience} />
        </Fragment>
      ) : (
        <Fragment>
          <p>
            You have not set up a profile, please add some information and get
            your Resume build.
          </p>
          <Link to='/create-profile' className='btn btn-primary my-1'>
            Create Profile
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};
// this is fro actions and state
Dashboard.propTypes = {
  getCurrentUsersProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};
//This is for state
const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});
export default connect(mapStateToProps, {getCurrentUsersProfile})(Dashboard);
