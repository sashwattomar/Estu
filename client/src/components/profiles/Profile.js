import React, {Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import ProfileItem from './ProfileItem';
import {getProfiles} from '../../actions/profile';
import Spinner from '../layout/Spinner';
const Profiles = ({getProfiles, profile: {profiles, loading}}) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);
  return (
    <Fragment>
      {loading ? (
        <Fragment>
          {' '}
          <Spinner />{' '}
        </Fragment>
      ) : (
        <Fragment>
          <h1 className='large text-primary'>Aspirants</h1>
          <p className='lead'>
            <i className='fab fa-connectdevelop'></i>Browse and connect with
            more like you
          </p>
          <div className='profiles'>
            {profiles.length > 0 ? (
              profiles.map((profile) => (
                <ProfileItem key={profile._id} profile={profile} />
              ))
            ) : (
              <h4>No profile found...</h4>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};
Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  profile: state.profile,
});
export default connect(mapStateToProps, {getProfiles})(Profiles);
