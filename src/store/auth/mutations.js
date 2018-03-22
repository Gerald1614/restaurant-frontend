import User from '../../models/User'

export const LOGIN = (state) => {
  state.user = User.from(localStorage.token)
}
export const LOGOUT = (state) => {
  state.user = null
}
