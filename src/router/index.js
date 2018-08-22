import Vue from 'vue'
import Router from 'vue-router'
import Header from '../views/HeaderTop'
import Footer from '../views/Footer'

import InviteLink from '../views/AgentLink/InviteLink'

import MyPromotion from '../views/myPromotion/MyPromotion.vue'
import MoreRecord from '../views/moreRecord/MoreRecord.vue'
import AccountManagement from '../views/accountManagement/AccountManagement.vue'
import Login from '../views/Login/Login'

import AccountVerify from '../views/Login/AccountVerify.vue'
import SafetyVerification from '../views/Login/SafetyVerification'
import ResetPassword from '../views/Login/ResetPassword'

import Announcement from '../views/Announcement.vue'

import comingSoon from '../views/comingSoon/comingSoon.vue'


Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path:'/',
      redirect:'/Login'
    },
    {
      path: '/header',
      name: 'Header',
      component: Header
    },
    {
      path: '/footer',
      name: 'Footer',
      component: Footer
    },

    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/AccountVerify',
      name: 'AccountVerify',
      component: AccountVerify
    },
    {
      path: '/SafetyVerification',
      name: 'SafetyVerification',
      component: SafetyVerification
    },
    {
      path: '/ResetPassword',
      name: 'ResetPassword',
      component: ResetPassword
    },

    {

      path: '/InviteLink',
      name: 'InviteLink',
      component: InviteLink,
      meta: {
        title: '',
        requireAuth: true,
      },
    },
    {
      path: '/myPromotion',
      name: 'MyPromotion',
      component: MyPromotion,
      // component: comingSoon,
      meta: {
        title: '',
        requireAuth: true,
      },
    },
    {
      path: '/moreRecord',
      name: 'MoreRecord',
      component: MoreRecord,
      meta: {
        title: '',
        requireAuth: true,
      },
    },
    {
      path: '/accountManagement',
      name: 'AccountManagement',
      component: AccountManagement,
      meta: {
        title: '',
        requireAuth: true,
      },
    },
    {
      path: '/announcement',
      name: 'Announcement',
      component: Announcement
    }
  ]
})
