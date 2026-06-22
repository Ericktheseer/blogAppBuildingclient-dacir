// Importing Bootstrap After 
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'

// Import the default Notyf styles.
import 'notyf/notyf.min.css';
import './assets/main.css'

import App from './App.vue'

// Pages
import PostsView from './pages/PostsView.vue'
import PostDetailsView from './pages/PostDetailsView.vue'
import AddPostView from './pages/AddPostView.vue'
import EditPostView from './pages/EditPostView.vue'
import LoginView from './pages/LoginView.vue'
import RegisterView from './pages/RegisterView.vue'

// Routes
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/posts'
    },
    {
      path: '/posts',
      component: PostsView
    },
    {
      path: '/posts/:id',
      component: PostDetailsView
    },
    {
      path: '/add-post',
      component: AddPostView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/edit-post/:id',
      component: EditPostView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      component: LoginView
    },
    {
      path: '/register',
      component: RegisterView
    }
  ]
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')

  if (to.meta.requiresAuth && !token) {
    next('/login')
  } else if ((to.path === '/login' || to.path === '/register') && token) {
    next('/posts')
  } else {
    next()
  }
})

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')