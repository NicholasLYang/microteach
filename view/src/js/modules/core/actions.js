import * as t from './actionTypes'

export const createUserSession = (user, token) => ({
  type: t.CREATE_USER_SESSION,
  payload: { user, token }
})

export const refreshWindowDimensions = () => ({
  type: t.REFRESH_WINDOW_DIMENSIONS,
  payload: {}
})

export const signOut = () => dispatch => {
  dispatch({
    type: t.SIGN_OUT,
    payload: {}
  })
  localStorage.clear();
};