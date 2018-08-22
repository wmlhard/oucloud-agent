<template>
  <div class="Login_div">
    <Content>
      <div class="login">
        <div class="login-wrap">
          <div class="login-content">
            <p class="title">登录</p>
            <Form ref="loginForm" :model="loginForm" :rules="ruleValidate">
              <FormItem prop="mail">
                <label ref="account">帐户名</label>
                <Input placeholder="帐户名" v-model="loginForm.mail"></Input>
              </FormItem>
                <FormItem prop="password" class="loginpaswline">
                  <label ref="password">密码</label>
                  <Input type="password" placeholder="密码" v-model="loginForm.password"></Input>
                  <router-link tag="span" class="set_account" to="/AccountVerify">忘记密码</router-link >
                </FormItem>
              <FormItem prop="code" class="loginverifyline">
                <label ref="verify">验证码</label>
                <Input class="code" @keyup.enter.native="show()" v-model="loginForm.code" placeholder="验证码" :class="{'codeError_tip':codeError_tip}"></Input>
                <div class="ivu-form-item-error-tip" v-if="codeError_tip">请输入正确的验证码</div>
                <img :src="loginForm.login_img" alt="" class="login_img" @click="code_show"/>
              </FormItem>

              <FormItem class="loginbuttonline">
                <Button type="primary" @click="show" :loading="loading">立即登录</Button>
              </FormItem>
              <input type="hidden" v-model="loginInfo.status_code"/>
            </Form>

            <model v-if="showTab" @hide="hide">
              <div slot="modelSlotHeader" v-if="step==1">
                <p class="verify_way">输入验证码</p>
                <p class="verify_tip">请输入{{loginInfo.mailInfo.email}}收到的验证码</p>
              </div>
              <div slot="modelSlotHeader" v-if="step==2">
                <p class="verify_way">输入验证码</p>
                <p class="verify_tip">请输入{{loginInfo.phoneInfo.phone}}收到的验证码</p>
              </div>
              <div slot="modelSlotHeader" v-if="step==3">
                <p class="verify_way">验证谷歌</p>
              </div>

              <div slot="modelSlotContent" v-if="step==1">
                <p class="code">邮箱验证码</p>
                <p class="code_send"><input type="text" v-model="email_code">
                  <Button type="primary" class="getCode" @click="getEmailCode" v-if="count == 60" :loading="loadingEmail">获取验证码</Button>
                  <Button type="primary" disabled v-else class="regetCode">重新发送{{count}}</Button>
                </p>
              </div>

              <div slot="modelSlotContent" v-if="step==2">
                <p class="code">手机验证码</p>
                <p class="code_send"><input type="text" v-model="phone_code">
                  <Button type="primary" class="getCode" @click="getPhoneCode" v-if="count1 == 60" :loading="loadingPhone">获取验证码</Button>
                  <Button type="primary" disabled v-else class="regetCode">重新发送{{count1}}</Button>
                </p>
              </div>

              <div slot="modelSlotContent" v-if="step==3">
                <p class="code">google验证码</p>
                <p class="code_send">
                  <input type="text" v-model="google_code" placeholder="请输入谷歌验证码">
                  <!--{{google_code}}-->
                </p>
              </div>

              <div slot="modelSlotFooter">
                <button class="btn_sure" @click="btn_sure">确定</button>
                    <a class="cancel" href="javascript:;" @click="hide">取消</a>
              </div>
            </model>

          </div>
          <div class="loginright">
            <img src="../../../static/img/loginright.png" alt="">
          </div>
        </div>
      </div>
    </Content>
  </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex'
  import Model from './../model/Model.vue'
  import api from '../../api'
  import axios from 'axios'
  import config from './../../../static/config'
  import resOnline from './../../../static/configOnline'
  const validatePassWord = (rule, value, callback) => {
    if (value === '') {
      callback(new Error('请输入密码'));
    } else if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{5,15}$/.test(value)) {
      callback(new Error('请输入5-15位字母数字密码'));
    } else {
      callback();
    }
  };

    export default {
        name: "login",
      data(){
          return{
            token:'',
            email_key: '',
            phone_key: '',
            loading: false,
            loadingEmail: false,
            loadingPhone:false,
            timer: null,
            timer1: null,
            email_code: '',
            phone_code: '',
            google_code:'',
            count : 60,
            count1 : 60,
            step: 0,
            showTab:false,
            codeError_tip:false,
            loginForm:{
              mail: '',
              password: '',
              captcha_key: '',
              code:'',
              login_img:''
            },

            ruleValidate: {
              mail: [
                {required: true, message: '请输入邮箱账号', trigger: 'blur'},
                {type: 'email', message: '请输入正确的邮箱账号', trigger: 'blur'}
              ],
              password: [
                {validator: validatePassWord, trigger: 'blur'}
              ],
              code: [
                {required: true, type: 'string', message: '请输入验证码', trigger: 'blur'}
              ]
            }
          }

      },
      watch:{
        'loginForm.mail'(val){
          if(val != ''){
            this.$refs['account'].style.visibility = 'visible'
          }else{
            this.$refs['account'].style.visibility = 'hidden'
          }
        },
        'loginForm.password'(val){
          if(val != ''){
            this.$refs['password'].style.visibility = 'visible'
          }else{
            this.$refs['password'].style.visibility = 'hidden'
          }
        },
        'loginForm.code'(val){
          if(val != ''){
            this.$refs['verify'].style.visibility = 'visible'
          }else{
            this.$refs['verify'].style.visibility = 'hidden'
          }
        }
      },
      components: {
        Model
      },
      computed: {
        ...mapState(['loginInfo']),
      },
      methods:{

        show() {            //立即登录
          this.loading = true;
          this.$refs['loginForm'].validate((valid) => {
            if (valid) {

              let p = {
                email: this.loginForm.mail,
                password: this.loginForm.password,
                captcha_key: this.token,
                captcha_code: this.loginForm.code,
                // code: 'agent'
              };
              api.login_show(p).then(res=>{
                if (res.status_code == 200){
                  this.loading = false;
                  this.$store.commit('LOGIN_SUCCESS', res.data);
                  this.$store.commit('TOKEN', res.data.token);
                  this.$router.push({path: localStorage.getItem('link')});
                  this.$Message.success('登录成功');
                }else if (res.status_code == 6001) { //二次验证
                      this.loading = false;
                      this.showTab = true;
                  if (res.data.validate_status === 'second_email_status') {
                          this.step = 1;
                          this.$store.commit('emailInfo', res.data);
                        } else if (res.data.validate_status === 'second_phone_status') {
                          this.step = 2;
                          this.$store.commit('phoneInfo', res.data);
                          console.log(res.data,'asa')
                        } else if (res.data.validate_status === 'second_google_auth_status') {
                          this.step = 3;
                          this.$store.commit('googleInfo', res.data);
                        }
                      } else{
                        this.loading = false;
                        this.code_show();

                      }
              }).catch(err => {
                this.loading = false;
                this.code_show();

              })

            } else {
              this.loading = false;
              this.code_show();

            }

          })
        },
        hide() {      //关闭弹框
          this.showTab = false;
          if (this.timer){
            clearInterval(this.timer);
            this.count = 60;
          };
          if (this.timer1){
            clearInterval(this.timer1);
            this.count1 = 60;
          };
          this.email_code = '';
          this.phone_code = '';
          this.google_code = '';
        },
        getEmailCode() {         //获取邮箱验证码
          this.loadingEmail = true;
          api.emailCode({identification: this.loginInfo.mailInfo.identification}).then(res => {
            console.log(res,'getemailsms');
            if (res.status_code == 200) {
              this.email_key = res.data.email_key;
              // this.loadingEmail = false;
              this.timer = setInterval(() => {
                if (this.count > 0){
                  this.count--;
                  if (this.count == 59){
                    this.loadingEmail = false;
                  }
                } else {
                  this.loadingEmail = false;
                  clearInterval(this.timer);
                  this.count = 60;
                }
              },1000);
            } else {
              this.loadingEmail = false;
              this.$Message.error('操作频繁啦');
            }
          }).catch(error => {
            this.loadingEmail = false;
          })
        },
        getPhoneCode() {   //获取手机验证码
          this.loadingPhone = true;
          api.phoneCode({identification: this.loginInfo.phoneInfo.identification}).then(res => {
            console.log(res);
            if (res.status_code == 200) {
              this.phone_key = res.data.verification_key;
              // this.loadingPhone = false;
              this.timer1 = setInterval(() => {
                if (this.count1 > 0){
                  this.count1--;
                  if (this.count1 == 59){
                    this.loadingPhone = false;
                  }
                } else {
                  // this.loadingPhone = false;
                  clearInterval(this.timer1);
                  this.count1 = 60;
                }
              },1000);
            } else {
              this.loadingPhone = false;
              this.$Message.error('操作频繁啦');
            }
          }).catch(error => {
            this.loadingPhone = false;
          })
        },
        btn_sure() {            //模态框确定
          if (this.step == 1) { //邮箱校验

            if(this.email_key == ''){
              this.loadingEmail = false;
              this.$Message.error('请发送验证码');
              return false;
            }

              let params = {
                email_code: this.email_code,
                identification: this.loginInfo.mailInfo.identification,
                email_key: this.email_key
              }
              if(this.email_code) {
                api.emailCodeVerify(params).then(res => {
                  if (res.status_code == 200) {
                    this.loadingEmail = false;
                    this.loadingPhone = false;
                    this.count = 60;
                    this.count1 = 60;
                    clearInterval(this.timer);
                    clearInterval(this.timer1);
                    if (res.data.validate_status == ('second_phone_status')) {
                      // 需要二次校验 手机校验 存
                      this.step = 2;
                      this.$store.commit('phoneInfo', res.data);
                    } else if (res.data.validate_status == 'second_google_auth_status') {
                      this.step = 3;
                      this.$store.commit('googleInfo', res.data);
                    }
                    else {
                      this.showTab = false;
                      this.$store.commit('LOGIN_SUCCESS', res.data);
                      this.$store.commit('TOKEN', res.data.token);
                      this.$router.push({path: localStorage.getItem('link')});
                      this.$Message.success('Success!');
                      // 存登录信息
                    }

                  }
                }).catch(error => {

                })
              }
              else{
                this.$Message.error('请输入邮箱验证码');

              }

          } else if (this.step == 2) {

            if(this.phone_key == ''){
              this.loadingEmail = false;
              this.$Message.error('请发送验证码');
              return false;
            }
              let params = {
                verification_code: this.phone_code,
                identification: this.loginInfo.phoneInfo.identification,
                verification_key: this.phone_key
              }
              if(this.phone_key) {
                api.phoneCodeVerify(params).then(res => {
                  if (res.status_code == 200) {

                    if (res.data.hasOwnProperty('validate_status')) {
                      // 需要二次校验 手机校验 存
                      this.step = 3;
                      this.$store.commit('googleInfo', res.data);
                      // this.google_code = res.data.google
                    } else {
                      this.showTab = false;

                      this.$store.commit('LOGIN_SUCCESS', res.data);
                      this.$store.commit('TOKEN', res.data.token);
                      this.$router.push({path: localStorage.getItem('link')});
                      this.$Message.success('Success!');
                      // 存登录信息
                    }
                  }

                }).catch(error=>{

                })
              }
              else{
                this.$Message.error('请输入手机验证码！');
              }



          } else if (this.step == 3) {

              if (this.google_code){
              let params = {
                identification: this.loginInfo.googleInfo.identification,
                verify: this.google_code
              }
              api.googleCodeVerify(params).then(res => {
                if (res.status_code == 200) {
                  this.showTab = false;
                  this.$store.commit('LOGIN_SUCCESS', res.data);
                  this.$store.commit('TOKEN', res.data.token);
                  this.$router.push({path: localStorage.getItem('link')});
                  this.$Message.success('Success!');
                  // 存登录信息
                } else {

                }
              }).catch(error=>{

              })
              }
              else{
                this.$Message.error('请输入谷歌验证码!');
              }

          }
        },


        code_show(){          //获取图片验证码token
          api.loginImg().then(res => {

            this.token = res.data.token;
            let instance = axios.create();
            instance.defaults.timeout = 10000;
            const domain = window.location.origin;
            if (domain.indexOf('bitboole') > -1) {
              instance.defaults.baseURL = resOnline.url;
            }else {
              instance.defaults.baseURL = config.tokenUrl;
            }
            instance.get('/captcha/captcha/token/'+this.token+'?output=base64').then(res=>{
              // console.log(res.data.data);
              this.loginForm.login_img = 'data:image/png;base64,'+res.data.data.image;
            })
          })
        }
      },
      created() {
        localStorage.setItem('link', '/myPromotion');
      },
      mounted(){
        this.code_show();
      }
    }
</script>

<style scoped lang="scss">

</style>
