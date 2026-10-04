// ─── Vue Router ──────────────────────────────────────────────────────────────
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/useAuthStore'

import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import ProfileView from '@/views/ProfileView.vue'
import JobsView from '@/views/JobsView.vue'
import JobDetailView from '@/views/JobDetailView.vue'
import CompanyJobsView from '@/views/CompanyJobsView.vue'
import CompanyApplicantsView from '@/views/CompanyApplicantsView.vue'
import CandidateDirectoryView from '@/views/CandidateDirectoryView.vue'
import CompanyJobCreateView from '@/views/CompanyJobCreateView.vue'

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior(_to, _from, saved) {
    return saved ?? { top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/registro',
      name: 'register',
      component: RegisterView,
    },
    {
      path: '/panel',
      name: 'profile',
      component: ProfileView,
      meta: { requiresAuth: true },
    },
    {
      path: '/panel/editar',
      name: 'profile-edit',
      component: ProfileView,
      meta: { requiresAuth: true },
    },
    { path: '/empresa/ofertas', name: 'company-jobs', component: CompanyJobsView, meta: { requiresAuth: true, requiresCompany: true } },
    { path: '/empresa/ofertas/nueva', name: 'company-job-create', component: CompanyJobCreateView, meta: { requiresAuth: true, requiresCompany: true } },
    { path: '/empresa/postulantes', name: 'company-applicants', component: CompanyApplicantsView, meta: { requiresAuth: true, requiresCompany: true } },
    { path: '/empresa/perfiles', name: 'candidate-directory', component: CandidateDirectoryView, meta: { requiresAuth: true, requiresCompany: true } },
    { path: '/empresa/perfiles/:id', name: 'candidate-profile', component: ProfileView, props: route => ({ readOnly: true, profileUserId: Number(route.params.id) }), meta: { requiresAuth: true, requiresCompany: true } },
    {
      path: '/empleos',
      name: 'jobs',
      component: JobsView,
      meta: { requiresAuth: true },
    },
    {
      path: '/empleos/:id',
      name: 'job-detail',
      component: JobDetailView,
      meta: { requiresAuth: true },
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
})

// ── Navigation Guard ──────────────────────────────────────────────────────
router.beforeEach((to) => {
  const auth = useAuthStore()
  
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return { name: 'login' }
  }
  
  if ((to.name === 'login' || to.name === 'register') && auth.isAuthenticated) {
    return { name: 'profile' }
  }

  if (to.meta.requiresCompany && auth.user?.role !== 'company') return { name: 'profile' }
  if ((to.name === 'jobs' || to.name === 'job-detail') && auth.user?.role === 'company') {
    return { name: 'profile' }
  }
})

export default router
