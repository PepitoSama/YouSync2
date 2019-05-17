import Api from '@/services/Api'

export default {
  get () {
    return Api().get('playlist', {
      'headers': { 'Authorization': window.$cookies.get('token') }
    })
  },
  create (newPlaylistName) {
    return Api().post('playlist', {
      playlistName: newPlaylistName
    },
    {
      'headers': { 'Authorization': window.$cookies.get('token') }
    })
  }
}
