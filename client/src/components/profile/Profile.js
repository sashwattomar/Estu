import React, {Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Link, useParams} from 'react-router-dom';
import {connect} from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileProject from './ProfileProject.js';

// import ProfileEducation from './ProfileEducation';
// import ProfileGithub from './ProfileGithub';
import {getProfilesById} from '../../actions/profile';

const Profile = ({getProfilesById, profile: {profile}, auth}) => {
  const {id} = useParams();
  useEffect(() => {
    getProfilesById(id);
  }, [getProfilesById, id]);

  return (
    <section className='container'>
      {profile === null ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to='/profiles' className='btn btn-light'>
            Back To Profiles
          </Link>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <Link to='/edit-profile' className='btn btn-dark'>
                Edit Profile
              </Link>
            )}
          <div className='profile-grid my-1'>
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
            <div className='profile-exp bg-white p-2'>
              <h2 className='text-primary'>Experience</h2>
              {profile.experience.length > 0 ? (
                <Fragment>
                  {profile.experience.map((experience) => (
                    <ProfileExperience
                      key={experience._id}
                      experience={experience}
                    />
                  ))}
                </Fragment>
              ) : (
                <h4>No experience credentials</h4>
              )}
            </div>

            <div className='profile-edu bg-white p-2'>
              <h2 className='text-primary'>Projects</h2>
              {profile.projects.length > 0 ? (
                <Fragment>
                  {profile.projects.map((project) => (
                    <ProfileProject key={project._id} project={project} />
                  ))}
                </Fragment>
              ) : (
                <h4>No education credentials</h4>
              )}
            </div>
          </div>
        </Fragment>
      )}
    </section>
  );
};

Profile.propTypes = {
  getProfilesById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, {getProfilesById})(Profile);
// import React, {Fragment, useEffect} from 'react';
// import PropTypes from 'prop-types';
// import {connect} from 'react-redux';
// import {getProfilesById} from '../../actions/profile';
// import ProfileTop from './ProfileTop';
// import ProfileAbout from './ProfileAbout';
// import ProfileExperience from './ProfileExperience';
// import ProfileProject from './ProfileProject.js';
// import {Link, useParams} from 'react-router-dom';
// import Spinner from '../layout/Spinner';

// const Profile = ({getProfilesById, profile: {profile, loading}, auth}) => {
//   const {id} = useParams();
//   useEffect(() => {
//     getProfilesById(id);
//   }, [getProfilesById, id]);
//   return (
//     <Fragment>
//       <section className='container'>
//         {profile === null || loading ? (
//           <div>
//             <Spinner />
//           </div>
//         ) : (
//           <Fragment>
//             <Link to='/profiles' className='btn btn-light'>
//               Back to Profiles{' '}
//             </Link>
//             {/* //functionality to edit profile if the profile we are previewing is ours */}
//             {auth.isAuthenticated &&
//               auth.loading === false &&
//               auth.user._id === profile.user._id && (
//                 <Link to='/edit-profile' className='btn btn-dark'>
//                   Edit Profile
//                 </Link>
//               )}

//             <div className='profile-grid my-1'>
//               <ProfileTop profile={profile} />
//               <ProfileAbout profile={profile} />

//               <div className='profile-exp bg-white p-2'>
//                 <h2 className='text-primary'>Experience</h2>
//                 {profile.experience.length > 0 ? (
//                   <Fragment>
//                     {profile.experience.map((experience) => (
//                       <ProfileExperience
//                         key={experience._id}
//                         experience={experience}
//                       />
//                     ))}
//                   </Fragment>
//                 ) : (
//                   <h4>No experience credentials</h4>
//                 )}
//               </div>

//               <div className='profile-exp bg-white p-2'>
//                 <h2 className='text-primary'>Projects</h2>
//                 {profile.projects.length > 0 ? (
//                   <Fragment>
//                     {profile.projects.map((project) => (
//                       <ProfileProject key={project._id} project={project} />
//                     ))}
//                   </Fragment>
//                 ) : (
//                   <h4>No projects </h4>
//                 )}
//               </div>
//             </div>
//           </Fragment>
//         )}
//       </section>
//     </Fragment>
//   );
// };
// Profile.propTypes = {
//   getProfilesById: PropTypes.func.isRequired,
//   profile: PropTypes.object.isRequired,
//   auth: PropTypes.object.isRequired,
// };
// const mapStateToProps = (state) => ({
//   auth: state.auth,
//   profile: state.profile,
// });
// export default connect(mapStateToProps, {getProfilesById})(Profile);
