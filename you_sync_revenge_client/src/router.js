// Modules
import Vue from 'vue'
import Router from 'vue-router'
// View
import Register from './views/Auth/Register.vue'
import Login from './views/Auth/Login.vue'
import Download from './views/Video/Download.vue'
import Playlist from './views/Playlist/Playlist.vue'
import PlaylistList from './views/Playlist/Playlist_List.vue'
import PlaylistCreation from './views/Playlist/Playlist_creation.vue'
import User from './views/User/User.vue'
import Credit from './views/Infos/Credit.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/download'
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/download',
      name: 'download',
      component: Download
    },
    {
      path: '/playlist/:idPlaylist',
      name: 'playlistview',
      component: PlaylistList
    },
    {
      path: '/playlist',
      name: 'playlist',
      component: Playlist
    },
    {
      path: '/playlist/creation',
      name: 'playlistcreation',
      component: PlaylistCreation
    },
    {
      path: '/user',
      name: 'user',
      component: User
    },
    {
      path: '/credit',
      name: 'credit',
      component: Credit
    }
  ]
})
