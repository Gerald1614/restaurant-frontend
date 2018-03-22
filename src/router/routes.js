const liste = () => import('components/restaurantsList.vue')
const map = () => import('components/restaurantsMap.vue')
const restaurants = () => import('components/restaurants.vue')

import store from '../store'

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters['auth/isAuthenticated']) {
    next()
    return
  }
  next('/restaurants/list')
}

const ifAuthenticated = (to, from, next) => {
  if (store.getters['auth/isAuthenticated']) {
    next()
    return
  }
  next('/login')
}

export default [
  {
    path: '/',
    component: () => import('layouts/default'),
    children: [
      { path: '', component: () => import('pages/index') },
      { path: 'login', component: () => import('components/login.vue'), beforeEnter: ifNotAuthenticated },
      { path: 'signup', component: () => import('components/signup.vue') },
      { path: 'logout', component: () => import('components/logout.vue') },
      { path: 'restaurants/list', components: { default: restaurants, subs: liste } },
      { path: 'restaurants/map', components: { default: restaurants, subs: map } },
      { path: 'restaurants/detail/:id', component: () => import('components/restaurantDetails.vue') },
      { path: 'restaurants/addreview/:id', component: () => import('components/addReview.vue'), beforeEnter: ifAuthenticated }
    ]
  },

  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]
