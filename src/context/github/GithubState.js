import React, { useReducer } from 'react';
import axios from 'axios';
import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from '../../config';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import {
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
  GET_USER,
  GET_REPOS
} from '../types';

const GithubState = props => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  // Search Users
  const searchUsers = async text => {
    setLoading();

    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${GITHUB_CLIENT_ID}
      &client_secret=${GITHUB_CLIENT_SECRET}`
    );

    dispatch({
      type: SEARCH_USERS,
      payload: res.data.items
    });
  };

  // Get User
  const getUser = async login => {
    setLoading();

    try {
      const res = await axios.get(
        `https://api.github.com/users/${login}?client_id=${GITHUB_CLIENT_ID}
      &client_secret=${GITHUB_CLIENT_SECRET}`
      );

      dispatch({
        type: GET_USER,
        payload: res.data
      });
    } catch (error) {
      dispatch({
        type: GET_USER,
        payload: null
      });
    }
  };

  // Get Repos
  const getUserRepos = async login => {
    setLoading();

    try {
      const res = await axios.get(
        `https://api.github.com/users/${login}/repos?per_page=5&sort=created:asc&client_id=${GITHUB_CLIENT_ID}
      &client_secret=${GITHUB_CLIENT_SECRET}`
      );

      dispatch({
        type: GET_REPOS,
        payload: res.data
      });
    } catch (error) {
      dispatch({
        type: GET_REPOS,
        payload: null
      });
    }
  };

  // Clear Users
  const clearUsers = () => dispatch({ type: CLEAR_USERS });

  // Set Loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;
