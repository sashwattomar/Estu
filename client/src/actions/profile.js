import axios from 'axios';
import {setAlert} from './alert';
import {
  GET_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  GET_PROFILES,
  CLEAR_PROFILE,
} from './types';

//GET CURRENT-USERS PROFILE
export const getCurrentUsersProfile = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/profile/me');
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {msg: err, status: err.status},
    });
  }
};

//GET ALL POFILES
export const getProfiles = () => async (dispatch) => {
  dispatch({type: CLEAR_PROFILE});
  try {
    const res = await axios.get('/api/profile');
    dispatch({
      type: GET_PROFILES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {msg: err.msg, status: '500'},
      // ;
      // payload: {msg: err.response.statusText, status: err.response.status},
    });
  }
};

//GET POFILE by user id
export const getProfilesById = (user_id) => async (dispatch) => {
  dispatch({type: CLEAR_PROFILE});
  try {
    const res = await axios.get(`/api/profile/user/${user_id}`);
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {msg: 'the same', status: 550},
      // payload: {msg: err.response.statusText, status: err.response.status},
    });
  }
};

//CREATE_PROFILE AND UPDATE_PROFILE
export const createProfile =
  (formData, navigate, edit = false) =>
  async (dispatch) => {
    try {
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };
      const res = await axios.post('/api/profile', formData, config);
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });

      dispatch(
        setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success')
      );

      if (!edit) {
        //normal redirect function does not work inside action hence history is  used
        navigate('/dashboard');
      }
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      }
      dispatch({
        type: PROFILE_ERROR,
        payload: {msg: err.response.statusText, status: err.response.status},
      });
    }
  };

//ADD PERSNOL
export const addPersnol = (formData, navigate) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };

    const res = await axios.put(
      'http://localhost:4000/persnol',
      formData,
      config
    );
    //PUT REQ OVER POST => PREVENTS REPETATION
    dispatch({
      type: UPDATE_PROFILE, // updating profile with persnol details
      payload: res.data,
    });
    // to display alert
    // dispatch(setAlert("Persnol Information successfully added", "success"));
    // if created redirect to profile if updated stay here
    //normal redirect function does not waork inside action hence history is to be used
    navigate('/previewResume');
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {msg: err, status: err.response.status},
    });
  }
};

//ADD EXPERIENCE
export const addExperience = (formData, navigate) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };

    const res = await axios.put('api/profile/experience', formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert('Experience Added', 'success'));

    navigate('/dashboard');
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status},
    });
  }
};

//ADD Projects
export const addProjects = (formData, navigate) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };

    const res = await axios.put('api/profile/projects', formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert('Project Added', 'success'));

    navigate('/dashboard');
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status},
    });
  }
};

// Delete experience
export const deleteExperience = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/experience/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert('Experience Removed', 'success'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {msg: err, status: err.response},
    });
  }
};

// Delete project
export const deleteProject = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/profile/projects/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert('Project Removed', 'success'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status},
    });
  }
};
