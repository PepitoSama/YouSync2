const routes = [
  {
    path: '/',
    name: 'root',
    redirect: '/playlist',
    title: 'Redirecting',
    isPublic: true
  },
  {
    path: '/register',
    name: 'register',
    component: () => import("@/views/Auth/Register"),
    title: 'Register',
    isPublic: true
  },
  {
    path: '/login',
    name: 'login',
    component: () => import("@/views/Auth/Login"),
    title: 'Login',
    isPublic: true
  },
  {
    path: '/download',
    name: 'download',
    component: () => import("@/views/Video/Download"),
    title: 'Download',
    isPublic: true
  },
  {
    path: '/playlist/:idPlaylist',
    name: 'playlistview',
    component: () => import("@/views/Playlist/Playlist_List"),
    title: 'Your playlist',
    isPublic: false
  },
  {
    path: '/playlist',
    name: 'playlist',
    component: () => import("@/views/Playlist/Playlist"),
    title: 'Playlists',
    isPublic: false
  },
  {
    path: '/user',
    name: 'user',
    component: () => import("@/views/User/User"),
    title: 'User',
    isPublic: false
  },
  {
    path: '/credit',
    name: 'credit',
    component: () => import("@/views/Infos/Credit"),
    title: 'Credit',
    isPublic: true
  },
  {
    path: '*',
    name: 'notfound',
    component: () => import("@/views/Error/Not_Found"),
    title: '404 Not found',
    isPublic: true
  }
]

export default routes
