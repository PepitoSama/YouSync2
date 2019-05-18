import Api from '@/services/Api'

export default {
  register (credentials) {
    return Api().post('register', credentials)
  },
  login (credentials) {
    return Api().post('login', credentials)
  },
  logout () {
    return Api().delete('logout', {
      'headers': { 'Authorization': window.$cookies.get('token') }
    })
  }
}
