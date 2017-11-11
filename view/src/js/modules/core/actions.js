import * as t from './actionTypes'

export const createUserSession = (user, jwt) => ({
  type: t.CREATE_USER_SESSION,
  payload: { user, jwt }
})