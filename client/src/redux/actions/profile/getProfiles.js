import axios from 'axios';
import { defaultHeaders } from '../../../utils/defaultHeaders';
import { API_BASE_URL } from '../../../constants/constants';
import {
  updateProfile,
  updateProfiles,
  updateRepos,
  profileError,
  clearProfile,
} from '../../reducers/profileSlice';

export function getProfiles() {
  return async function getProfiles(dispatch, getState) {
    dispatch(clearProfile());
    try {
      const response = await axios.get(`${API_BASE_URL}/profile/all`);
      dispatch(updateProfiles(response.data));
    } catch (err) {
      dispatch(
        profileError({
          msg: err.response.statusText,
          status: err.response.status,
        })
      );
    }
  };
}

export function getProfileById(userId) {
  return async function getProfileById(dispatch, getState) {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/profile/user/${userId}`,
        defaultHeaders
      );
      dispatch(updateProfile(response.data));
    } catch (err) {
      dispatch(
        profileError({
          msg: err.response.statusText,
          status: err.response.status,
        })
      );
    }
  };
}

export function getGithubRepos(githubUsername) {
  return async function getGithubRepos(dispatch, getState) {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/profile/github/${githubUsername}`
      );
      dispatch(updateRepos(response.data));
    } catch (err) {
      dispatch(
        profileError({
          msg: err.response.statusText,
          status: err.response.status,
        })
      );
    }
  };
}
