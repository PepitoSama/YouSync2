import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
import store from '../store/store'

Vue.use(Router)

function guard (to, from, next) {
  const auth = store.getters.isLogged

  if (!auth) {
    next({
      path: '/login'
    })
  } else {
    next()
  }
}

const router = new Router({
  mode: 'history',
  routes: routes.map(route => ({
    name: route.name,
    path: route.path,
    redirect: route.redirect,
    component: route.component,
    beforeEnter: (to, from, next) => {
      document.title = route.title
      if (!route.isPublic) {
        return guard(to, from, next)
      }
      next()
    }
  }))
})

export default router
