import React from 'react';
import {Link, Navigate} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
const Landing = ({isAuthenticated}) => {
  if (isAuthenticated) {
    return <Navigate to='/dashboard' />;
  }
  return (
    <div>
      <section className='landing'>
        <div className='dark-overlay'>
          <div className='landing-inner'>
            <h1 className='x-large'>{` </>ESTU `}</h1>
            <p className='lead'>
              Create a student profile/portfolio, build your resume, sumbmit
              assignmemnts, practise Tests and help from other students to earn
              rewards .
            </p>
            <div className='buttons'>
              <Link to='/register' className='btn btn-primary'>
                Sign Up
              </Link>
              <Link to='/login' className='btn btn-light'>
                Login{' '}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps)(Landing);
