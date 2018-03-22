import JwtDecode from 'jwt-decode'

export default class User {
  static from (token) {
    try {
      let obj = JwtDecode(token)
      return new User(obj)
    } catch (_) {
      return null
    }
  }

  constructor ({ _id, username }) {
    this.id = _id // eslint-disable-line camelcase
    this.username = username
  }
}
