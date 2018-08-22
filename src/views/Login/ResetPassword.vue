<template>
  <div class="ResetPassword">
    <Content>
      <div class="login">
        <div class="login-wrap">
          <div class="login-content">
            <p class="title">重置登录密码</p>
            <Form ref="resetPassword" :model="resetPassword" :rules="ruleValidate">
              <FormItem prop="password">
                <label ref="newpsw">新密码</label>
                <Input type="password" placeholder="新密码" v-model="resetPassword.password"></Input>

              </FormItem>
              <FormItem prop="repassword">
                <label ref="confirm">确认新密码</label>
                <Input type="password" placeholder="确认新密码" v-model="resetPassword.repassword"></Input>
              </FormItem>
              <FormItem class="loginbuttonline">
                <Button type="primary" @click="show">提交</Button>
              </FormItem>
            </Form>
          </div>
          <div class="loginright">
            <img src="../../../static/img/loginright.png" alt="">
          </div>


          <!--<div class="reset">-->
            <!--<span>重置登录密码后24小时内禁止提示</span>-->
          <!--</div>-->
        </div>
      </div>
    </Content>
  </div>
</template>

<script>
  import api from '../../api'
  let outPassword;
  const validatePassWord = (rule, value, callback) => {
    if (value === '') {
      callback(new Error('Please enter your password'));
    } else if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{5,15}$/.test(value)) {
      callback(new Error('请输入5-15位字母数字密码'));
    } else {
      callback();
    }
  };
  const validateRePassWord = (rule, value, callback) => {
    console.log(outPassword, 'outPassword')
    console.log(value)
    if (value === '') {
      callback(new Error('请输入5-15位字母数字密码'));
    } else if (value !== outPassword) {
      callback(new Error('两次密码不一样'));
    } else {
      callback();
    }
  };
    export default {
        name: "ResetPassword",
      data(){
          return{
            forgetValidateInfo:{},
            resetPassword:{
              password:'',
              repassword:'',
            },
            ruleValidate:{
              password: [
                {validator: validatePassWord, trigger: 'blur',message: '请输入5-15位字母数字密码'}
              ],
              repassword: [
                {validator: validateRePassWord, trigger: 'blur'}
              ]
            }
          }
      },
      computed: {
        getPassword() {
          return this.resetPassword.password
        }
      },
      watch: {
        getPassword(curVal, oldVal) {
          if(curVal != oldVal){
            outPassword = curVal;
          }
        },
        'resetPassword.password'(val) {
          if(val != ''){
            this.$refs['newpsw'].style.visibility = 'visible'
          }else{
            this.$refs['newpsw'].style.visibility = 'hidden'
          }
        },
        'resetPassword.repassword'(val) {
          if(val != ''){
            this.$refs['confirm'].style.visibility = 'visible'
          }else{
            this.$refs['confirm'].style.visibility = 'hidden'
          }
        }
      },
      methods: {
        show() {
          this.$refs['resetPassword'].validate((valid) => {
            if (valid) {
              let params = {
                password:this.resetPassword.password,
                password_confirmation:this.resetPassword.repassword,
                id: this.forgetValidateInfo.id,
                email:this.$route.query.email,
              }
              // this.$Message.success('Success!');
              api.forgetResetPassword(params).then(res=>{
                if(res.status_code == 200){
                  this.$Message.success('Success!');
                  this.$router.replace({path: '/login'});
                }
              })

            } else {
              // this.$Message.error('Fail!');
            }
          })
        }
      },
      mounted(){
        let forgetValidateInfo = JSON.parse(localStorage.getItem('forgetValidate'));
        this.forgetValidateInfo = forgetValidateInfo;
        // const email = this.$route.query.email;
        console.log(this.$route.query.email,'qwq');
      }

    }
</script>

<style scoped lang="scss">

</style>
