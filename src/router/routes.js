const liste = () => import('components/restaurantsList.vue')
const map = () => import('components/restaurantsMap.vue')
const restaurants = () => import('components/restaurants.vue')

export default [
  {
    path: '/',
    component: () => import('layouts/default'),
    children: [
      { path: '', component: () => import('pages/index') },
      { path: 'login', component: () => import('components/login.vue') },
      { path: 'signup', component: () => import('components/signup.vue') },
      { path: 'restaurants/list', components: { default: restaurants, subs: liste } },
      { path: 'restaurants/map', components: { default: restaurants, subs: map } },
      { path: 'restaurants/detail/:id', component: () => import('components/restaurantDetails.vue') }
    ]
  },

  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]
