import Api from '@/services/Api'

export default {
  get () {
    Api().get('logout', {
      'headers': { 'Authorization': this.$cookie.get('token') }
    }).then(res=>{
        return res
      }).catch(err=>{
        console.log(err);
      })
  }
}
