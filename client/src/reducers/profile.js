import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
} from '../actions/types';
const initialState = {
  profile: null, // will hold current  users profile data and data of other users profile this user visits
  profiles: [], // will hold list of all profiles
  loading: true, // to check request status
  error: {}, // to hold any error in loading the profile
};
//Get Profile , Update Profile
export default function pro(state = initialState, action) {
  const {type, payload} = action;
  switch (type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        loading: false,
        profile: null,
      };

    default:
      return state;
  }
}
