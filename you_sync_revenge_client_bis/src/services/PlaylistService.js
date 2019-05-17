import Api from '@/services/Api'

export default {
  getUserPlaylist () {
    return Api().get('playlist', {
      'headers': { 'Authorization': window.$cookies.get('token') }
    })
  }
}
