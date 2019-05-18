import Api from '@/services/Api'

export default {
  create (newVideoUrl, playlistId) {
    return Api().post('video', {
      videoUrl: newVideoUrl,
      playlistId: playlistId
    },
    {
      'headers': { 'Authorization': window.$cookies.get('token') }
    })
  },
  delete (videoId) {
    return Api().delete('video/' + videoId, {
      'headers': { 'Authorization': window.$cookies.get('token') }
    })
  }
}
