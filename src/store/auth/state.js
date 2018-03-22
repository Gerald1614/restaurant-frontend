import User from '../../models/User'

export default {
  user: User.from(localStorage.token)
}
