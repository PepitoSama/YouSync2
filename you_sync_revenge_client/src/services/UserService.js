import Api from '@/services/Api'

export default {
  get () {
    return Api().get('user', {
      'headers': { 'Authorization': window.$cookies.get('token') }
    })
  },
  update (updateStruct) {
    return Api().put(
      'user',
      updateStruct, {
        'headers': {
          'Authorization': window.$cookies.get('token')
        }
      }
    )
  }
}
