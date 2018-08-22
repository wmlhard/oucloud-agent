<template>
  <div class="AccountVerify">
    <Content>
      <div class="login">
        <div class="login-wrap">
          <div class="login-content">
            <p class="title">重置登陆密码</p>
            <Form ref="accountVerify" :model="accountVerify" :rules="ruleValidate">
              <FormItem prop="account" class="resetaccountline">
                <label ref="account">账户名</label>
                <Input type="text" placeholder="账户名" v-model="accountVerify.account"></Input>
                <div class="reset">
                  <span>重置登录密码后24小时内禁止提币</span>
                </div>
              </FormItem>
              <FormItem prop="code">
                <label ref="code">验证码</label>
                <div class="codeNum">
                  <Input class="code" type="text" placeholder="验证码" v-model="accountVerify.code" :class="{'codeError_tip':codeError_tip}"></Input>
                  <img :src="accountVerify.login_img" alt="" class="login_img" @click="code_show"/>
                  <div class="ivu-form-item-error-tip" v-if="codeError_tip">请输入正确的验证码</div>
                </div>
              </FormItem>

              <FormItem class="loginbuttonline">
                <Button type="primary" @click="show" :loading="loading">提交</Button>
              </FormItem>
            </Form>
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
  import api from '../../api'
  import axios from 'axios'
  import config from './../../../static/config'
  import resOnline from './../../../static/configOnline'
    export default {
        name: "AccountVerify",
      data(){
          return{
            token:'',
            loading:false,
            codeError_tip:false,
            accountVerify:{
              account:'',
              code:'',
              login_img:''
            },
            ruleValidate:{
              account: [
                {required: true, message: '请输入邮箱号', trigger: 'blur'},
                {type: 'email', message: '请输入正确的邮箱账号', trigger: 'blur'}
              ],
              code:[
                {required: true, message: '请输入验证码', trigger: 'blur'},
              ]
            }
          }
      },
      watch: {
        'accountVerify.account'(val){
          if(val != ''){
            this.$refs['account'].style.visibility = 'visible'
          }else{
            this.$refs['account'].style.visibility = 'hidden'
          }
        },
        'accountVerify.code'(val){
          if(val != ''){
            this.$refs['code'].style.visibility = 'visible'
          }else{
            this.$refs['code'].style.visibility = 'hidden'
          }
        }
      },
      methods:{
        show() {
          this.loading = true;
          this.$refs['accountVerify'].validate((valid) => {
            if (valid) {
              let params = {
                code: this.accountVerify.code,
                token: this.token,
              }
              api.loginImgVerify(params).then(res => {
                if (res.status_code == 5003) {
                  this.loading = false;
                  this.codeError_tip = false;
                  this.codeError_tip = true;
                  this.code_show();
                }else if(res.status_code == 200){
                  this.loading = false;
                  this.codeError_tip = false;
                  let data = {
                    email:this.accountVerify.account,
                    captcha_code:this.accountVerify.code,
                    captcha_key:this.token
                  }
                  api.validateEmail(data).then(res => {
                    if(res.status_code == 200){
                      this.loading = false;
                      this.$Message.success('成功');
                      this.$store.commit('validateEmailInfo',res.data);
                      let accountInfo = {
                        "email":res.data.email,
                        "phone_number":res.data.phone_number,
                        "phone_idd":res.data.phone_idd,
                        "google":res.data.google,
                        "id":res.data.id,
                      };
                      accountInfo = JSON.stringify(accountInfo);
                      localStorage.setItem('forgetValidate',accountInfo);
                      this.$router.replace({
                        path:'/safetyVerification'
                      })
                    }else{
                      this.loading = false;
                      // this.$Message.error('邮箱验证失败');
                    }
                  }).catch(err => {
                    this.loading = false;
                    this.codeError_tip = true;
                  })

                }
              })
            } else {
              this.loading = false;
            }
          })
        },


        code_show() {     //获取图片验证码token
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
              this.accountVerify.login_img = 'data:image/png;base64,'+res.data.data.image;
            })
          })
        },

      },
        mounted(){
          this.code_show();
        }
    }
</script>

<style scoped lang="scss">

</style>
