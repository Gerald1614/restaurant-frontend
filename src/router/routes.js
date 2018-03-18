
export default [
  {
    path: '/',
    component: () => import('layouts/default'),
    children: [
      { path: '', component: () => import('pages/index') },
      { path: 'login', component: () => import('components/login.vue') },
      { path: 'signup', component: () => import('components/signup.vue') },
      { path: 'restaurants', component: () => import('components/restaurants.vue') }
    ]
  },

  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]
