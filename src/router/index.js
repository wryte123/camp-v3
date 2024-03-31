import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { CurrentUser } from '@/scripts/session.js';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      scrollbar: true,
      requiresAuth: false,
    }
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
    ,
    meta: {
      scrollbar: false,
      requiresAuth: false,
    }
  },

  {
    path: '/chat',
    name: 'chat',
    component: () => import(/* webpackChunkName: "chat" */ '../views/ChatView.vue')
    ,
    meta: {
      scrollbar: false,
      requiresAuth: true,
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/LoginView.vue')
    ,
    meta: {
      scrollbar: false,
      requiresAuth: false,
    }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "register" */ '../views/RegisterView.vue')
    ,
    meta: {
      scrollbar: false,
      requiresAuth: false,
    }
  },
  {
    path: '/projects',
    name: 'projects',
    component: () => import('../views/ProjectsView.vue'),
    meta: {
      scrollbar: true,
      requiresAuth: true,
    }
  },
  {
    path: '/project/:project_id',
    name: 'project',
    component: () => import('../views/ProjectView.vue'),
    meta: {
      scrollbar: true,
      requiresAuth: true,
    }
  },
  {
    path: '/tasks',
    name: 'tasks',
    component: () => import('../views/TasksView.vue'),
    meta: {
      scrollbar: true,
      requiresAuth: true,
    }
  },
  {
    path: '/options',
    name: 'options',
    component: () => import('../views/OptionsView.vue'),
    meta: {
      scrollbar: true,
      requiresAuth: true,
    }
  },
  {
    path: '/workplace/:project_id/:branch_name',
    name: 'workplace',
    component: () => import('../views/WorkplaceView.vue'),
    meta: {
      scrollbar: false,
      requiresAuth: true,
    }
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!CurrentUser.logined) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else {
    next();
  }
  const scrollbar = to.meta.scrollbar;
  if (scrollbar) {
    document.body.style.overflow = '';
  } else {
    document.body.style.overflow = 'hidden';
  }
  next();
});

export default router
