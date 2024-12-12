// // import Vue from 'vue'
// // import Router from 'vue-router'
// import HomePage from '@/pages/Home.vue' // Assuming you have a Home page
// import LoginPage from '@/pages/Login.vue' // Assuming you have a Login page
// import SignupPage from '@/pages/Signup.vue' // Assuming you have a Signup page
// import ProfilePage from '@/pages/Profile.vue' // New Profile page
// import DashboardPage from '@/pages/Dashboard.vue' // New Admin Dashboard page

// // Vue.use(Router)

// const router = {
//   mode: 'history', // Use history mode to avoid hash URLs
//   routes: [
//     {
//       path: '/',
//       name: 'Home',
//       component: HomePage
//     },
//     {
//       path: '/login',
//       name: 'Login',
//       component: LoginPage
//     },
//     {
//       path: '/signup',
//       name: 'Signup',
//       component: SignupPage
//     },
//     {
//       path: '/profile',
//       name: 'Profile',
//       component: ProfilePage,
//       meta: { requiresAuth: true } // Requires user to be authenticated
//     },
//     {
//       path: '/dashboard',
//       name: 'Dashboard',
//       component: DashboardPage,
//       meta: { requiresAuth: true, requiresAdmin: true } // Requires user to be admin
//     }
//   ]
// }

// // Route Guard to protect routes that require authentication
// router.beforeEach((to, from, next) => {
//   const isLoggedIn = !!localStorage.getItem('auth_token') // Check if user is logged in
//   const userRole = localStorage.getItem('user_role') // Assuming you store the user role in localStorage

//   if (to.matched.some((record) => record.meta.requiresAuth)) {
//     // If route requires authentication and user is not logged in, redirect to login
//     if (!isLoggedIn) {
//       return next('/login')
//     }
//   }

//   if (to.matched.some((record) => record.meta.requiresAdmin)) {
//     // If route requires admin and user is not an admin, redirect to home
//     if (userRole !== 'admin') {
//       return next('/')
//     }
//   }

//   next() // Continue if all checks pass
// })

// export default router



//! ---- old code ----

import { createRouter, createWebHistory } from 'vue-router'

// Import the components (pages)
import HomePage from '@/pages/Home.vue'
import HotelPage from '@/pages/HotelPage.vue'
import DashboardPage from '@/pages/Dashboard.vue'
import LoginPage from '@/pages/Login.vue'
import SignupPage from '@/pages/Signup.vue'
import ProfilePage from '@/pages/Profile.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/hotel/:id',
    name: 'Hotel',
    component: HotelPage,
    props: true
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardPage
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage
  },
  {
    path: '/signup',
    name: 'Signup',
    component: SignupPage
  },
  {
    path: '/profile',
    name: 'Profile',
    component: ProfilePage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
