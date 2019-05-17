// Modules
import Vue from 'vue'
import Router from 'vue-router'
// View
import Home from './views/Home.vue'
import Register from './views/Auth/Register.vue'
import Login from './views/Auth/Login.vue'
import Download from './views/Video/Download.vue'
import Playlist from './views/Playlist/Playlist.vue'
import PlaylistCreate from './views/Playlist/Playlist_create.vue'
import User from './views/User/User.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
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
      path: '/playlist',
      name: 'playlist',
      component: Playlist
    },
    {
      path: '/playlist/create',
      name: 'playlistcreate',
      component: PlaylistCreate
    },
    {
      path: '/user',
      name: 'user',
      component: User
    }
  ]
})
