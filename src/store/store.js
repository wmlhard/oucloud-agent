import Vue from 'vue'
import Vuex from 'vuex'
import api from './../api.js'
import axios from 'axios'
import router from 'routes'
// import language from '../language'

Vue.use(Vuex);

const LOGIN_EMAIL = LOGIN_EMAIL;
const LOGIN_SUCCESS = LOGIN_SUCCESS;
const TOKEN = TOKEN; // token
const EMAIL_KEY = EMAIL_KEY;
const LOGOUT = LOGOUT
// 应用初始状态
const state = {
  language:'简体中文',
  router:'',
  loginInfo: {        //登录信息
    isLogin: false,
    mailInfo: {},
    phoneInfo: {},
    googleInfo:{},
    name: '',
  },
  registerInfo: {      //注册信息
    email_key: '',
  },

  forgetInfo:{        //忘记密码信息
    validateEmail:{}
  },

  token: '',          //返回的token
  // languagePackage:language,    //语言包
  tokenImg:''
};

// 应用初始状态
const getters = {
  name() {                //测试
    return 1 + 1
  }
};

// 定义所需的 actions
const actions = {
  login({commit}, params) {              //登录
    return api.login(params)
  },
  registerEmail({commit}, params) {      //邮箱验证
    api.registerEmail(params).then(res => {
      console.log(res)
      commit('EMAIL_KEY', res.data)
    }).catch(err => {
      console.log(err)
    });
  }
};

// 定义所需的 mutations
const mutations = {
  ['LOGIN_SUCCESS'](state, data) {      //登录成功
    state.loginInfo.isLogin = true;
    state.loginInfo.name = data.name;
    localStorage.setItem('username', data.name);
    localStorage.setItem('isLogin', true);
  },
  ['TOKEN'](state, data) {          //存token
    state.token = data;
    localStorage.setItem('token', data);
    let token = localStorage.getItem('token');
    axios.defaults.headers['Authorization'] = 'Bearer' + token;
  },
  ['EMAIL_KEY'](state, data) {   //二次验证邮箱信息
    state.registerInfo.email_key = data.email_key
  },
  ['LOGOUT'](state, data) {     //退出
    state.loginInfo.isLogin = data.isLogin;
    localStorage.removeItem('token');
    // console.log(localStorage.getItem('token'),'token')
    localStorage.setItem('isLogin', false);
    localStorage.removeItem('username');
  },
  ['router'](state, data) {
    state.router = data;
  },
  loginInformation(state, data){        //登录信息
    state.loginInfo.name = data;
    state.loginInfo.isLogin = true
  },
  emailInfo(state, data) {      //登录信息-邮箱
    state.loginInfo.mailInfo = data;
  },
  phoneInfo(state,data){              //登录信息-手机
    state.loginInfo.phoneInfo = data;
  },
  googleInfo(state,data){             //登录信息-谷歌
    state.loginInfo.googleInfo = data;
  },
  // changeLang(state,data){             //语言
  //   state.language = data;
  // }

  validateEmailInfo(state,data){             //邮箱验证信息
    state.forgetInfo.validateEmail = data;
  },
  imgToken(state,data){
    state.tokenImg = data
  }

};


// 创建 store 实例
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
})
