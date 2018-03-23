
export const login = (state, user) => {
  state.user = user
}
export const logout = (state) => {
  state.user.name = ''
  state.user.token = ''
  delete localStorage.token
  delete localStorage.name
}
