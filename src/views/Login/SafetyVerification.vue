<template>
  <div class="SafetyVerification">
    <Content>
      <div class="login">
        <div class="login-wrap">
          <div class="login-content">
            <p class="title">安全验证</p>
            <Form ref="verification" :model="verification" :rules="ruleValidate">
              <FormItem class="nationalSelect">
                <label>选择验证方式</label>
                <Select v-model="verification.way" @on-change="changeWay('verification')">
                  <Option value="email" v-if="forgetValidateInfo.email">邮箱验证</Option>
                  <Option value="phone" v-if="forgetValidateInfo.phone_number">手机验证</Option>
                  <Option value="google" v-if="forgetValidateInfo.google">谷歌验证</Option>
                </Select>
              </FormItem>

              <div v-if="step == 1">
                <FormItem>
                  <label>邮箱</label>
                  <Input v-model="forgetValidateInfo.email" disabled="disabled"></Input>
                </FormItem>

                <FormItem prop="email_code">
                  <label class="SafetyVerification_label" ref="SafetyVerification_email">邮箱验证码</label>
                  <div class="codeNum">
                    <Input placeholder="邮箱验证码" v-model="verification.email_code" class="code code_num"></Input>
                    <Button type="info" class="mailCode" @click="send_code_email('email')" v-if="count == 60" :loading="loadingCode">发送验证码</Button>
                    <Button type="primary" disabled v-else class="regetCode">重新发送{{count}}</Button>
                  </div>
                </FormItem>

                <FormItem>
                  <Button type="primary" @click="showEmail()" :loading="loadingEmail">下一步</Button>
                </FormItem>
              </div>

              <div v-if="step == 2">
                <FormItem>
                  <label>手机</label>
                  <Input v-model="forgetValidateInfo.phone_number" disabled="disabled"></Input>
                </FormItem>

                <FormItem prop="code_phone">
                  <label class="SafetyVerification_label" ref="SafetyVerification_phone">手机验证码</label>
                  <div class="codeNum">
                    <Input placeholder="手机验证码" v-model="verification.code_phone" class="code code_num"></Input>
                    <Button type="info" class="mailCode" @click="send_code_email('phone')" v-if="pCount == 60" :loading="loadingCodePhone">发送验证码</Button>
                    <Button type="primary" disabled v-else class="regetCode">重新发送{{pCount}}</Button>
                  </div>
                </FormItem>

                <FormItem>
                  <Button type="primary" @click="showPhone()" :loading="loadingPhone">下一步</Button>
                </FormItem>
              </div>

              <div v-if="step == 3">
                <div>
                  <FormItem prop="google_code">
                    <label class="SafetyVerification_label" ref="SafetyVerification_google">谷歌验证码</label>
                    <Input type="text" v-model="verification.google_code" placeholder="谷歌验证码"></Input>
                  </FormItem>
                </div>
                <!--<div>-->
                  <FormItem class="loginbuttonline">
                    <Button type="primary" @click="showGoogle()" :loading="loadingGoogle">下一步</Button>
                  </FormItem>
                <!--</div>-->
              </div>

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
    export default {
        name: "SafetyVerification",
      data(){
          return{
            loadingCode:false,
            loadingEmail:false,
            loadingPhone:false,
            loadingGoogle:false,
            loadingCodePhone:false,
            count:60,
            pCount:60,
            email_key:'',
            phone_key:'',
            step:0,
            verification:{
              way:'',
              email_code:'',
              code_phone:'',
              google_code:''
            },
            forgetValidateInfo:{},
            ruleValidate:{
              email_code:[
                {required: true, message: '请输入邮箱验证码', trigger: 'blur'}
              ],
              code_phone:[
                {required: true, message: '请输入手机验证码', trigger: 'blur'}
              ],
              google_code:[
                {required: true, message: '请输入谷歌验证码', trigger: 'blur'}
              ],
            }
          }
      },
      watch:{
        'verification.email_code'(val){
          if(val != ''){
            this.$refs['SafetyVerification_email'].style.visibility = 'visible'
          }else if(val == ''){
            this.$refs['SafetyVerification_email'].style.visibility = 'hidden'
          }
        },
        'verification.phone_code'(val){
          if(val != ''){
            this.$refs['SafetyVerification_phone'].style.visibility = 'visible'
          }else if(val == ''){
            this.$refs['SafetyVerification_phone'].style.visibility = 'hidden'
          }
        },
        'verification.google_code'(val){
          if(val != ''){
            this.$refs['SafetyVerification_google'].style.visibility = 'visible'
          }else if(val == ''){
            this.$refs['SafetyVerification_google'].style.visibility = 'hidden'
          }
        }
      },
      methods:{
        showEmail() {                             //下一步邮箱
          this.loadingEmail = true;
          this.$refs['verification'].validate((valid) => {
            if (valid) {
              if(this.email_key == ''){
                this.loadingEmail = false;
                this.$Message.error('请发送验证码');
                return false;
              }
              let params = {
                id : this.forgetValidateInfo.id,
                email_key: this.email_key,
                email_code: this.verification.email_code
              };
              api.forgetValidateEmail(params).then(res => {           //验证码验证
                console.log(res,'vv');
                if (res.status_code == 200) {
                  this.loadingEmail = false;
                  this.$Message.success('成功');
                  this.$router.replace({
                    path: '/resetPassword',query:{'email':res.data.email}})

                }
                // else if(res.status_code == 5003) {
                  // this.loadingEmail = false;
                  // this.$Message.error('验证码错误！');
                // }
                else {
                  this.loadingEmail = false;
                  this.$Message.error(this.$t(`message.NetworkAnomaly`));
                }
              }).catch(err => {
                // this.$Message.error('验证失败');
                this.loadingEmail = false;
              })
            }else{
              this.loadingEmail = false;
              // this.$Message.error('失败');
            }
          })
        },
        showPhone(){                        //下一步手机
          this.loadingPhone = true;
          this.$refs['verification'].validate((valid) => {
            if (valid) {
              if(this.phone_key == ''){
                this.loadingPhone = false;
                this.$Message.error('请发送验证码');
                return false;
              }
              let params = {
                verification_key: this.phone_key,
                verification_code: this.verification.code_phone,
                id: this.forgetValidateInfo.id
              };
              api.forgetValidatePhone(params).then(res => {           //验证码验证
                if (res.status_code == 200) {
                  this.loadingPhone = false;
                  this.$Message.success('成功');
                  this.$router.push({
                    path: '/resetPassword'
                  })
                }
                // else if(res.status_code == 5003) {
                //   this.loadingPhone = false;
                //   this.$Message.error('验证码错误！');
                // }
                else {
                  this.loadingPhone = false;
                }
              }).catch(err => {
                // this.$Message.error('验证失败');
                this.loadingPhone = false;
              })
            }else {
              this.loadingPhone = false;
              // this.$Message.error('失败');
            }
          })
        },
        showGoogle(){               //下一步谷歌
          this.loadingGoogle = true;
          this.$refs['verification'].validate((valid) => {
            if (valid) {
              let params = {
                data:{
                  verify: this.verification.google_code
                },
                id: this.forgetValidateInfo.id
              };
              api.forgetValidateGoogle(params).then(res => {           //验证码验证
                if (res.status_code == 200) {
                  this.loadingGoogle = false;
                  this.$Message.success('成功');
                  this.$router.replace({
                    path: '/resetPassword'
                  })
                }
                // else if(res.status_code == 5003) {
                //   this.loadingGoogle = false;
                //   this.$Message.error('验证码错误！');
                // }
                else {
                  this.loadingGoogle = false;
                  // this.$Message.error(this.$t(`message.NetworkAnomaly`));
                }
              }).catch(err => {
                // this.$Message.error('验证失败');
                this.loadingGoogle = false;
              })
            }else {
              this.loadingGoogle = false;
              // this.$Message.error('失败');
            }
          })
        },
        send_code_email(way){               //发送验证码
          let params = {
            id: this.forgetValidateInfo.id
          }
          if(way == 'email') {             //发送邮箱验证码
            this.loadingCode = true;
            api.forgetEmailVerify(params).then(res => {
              if (res.status_code == 200) {
                // this.loadingCode = false;
                this.email_key = res.data.email_key;
                this.timer = setInterval(() => {
                  if (this.count > 0) {
                    this.count--;
                  } else {
                    this.loadingCode = false;
                    clearInterval(this.timer);
                    this.count = 60;
                  }
                }, 1000);
              } else {
                this.loadingCode = false;
              }
            }).catch(err => {
              this.loadingCode = false;
              console.log('error')
            })
          }else if(way == 'phone'){       //发送手机验证码
            this.loadingCodePhone = true;
            api.forgetPhoneVerify(params).then(res => {
              if (res.status_code == 200) {
                this.loadingCodePhone = false;
                this.phone_key = res.data.verification_key;
                this.pTimer = setInterval(() => {
                  if (this.pCount > 0) {
                    this.pCount--;
                  } else {
                    this.loadingCode = false;
                    clearInterval(this.pTimer);
                    this.pCount = 60;
                  }
                }, 1000);
              } else {
                this.loadingCodePhone = false;
              }
            }).catch(err => {
              this.loadingCodePhone = false;
              console.log('error')
            })
          }
        },
        changeWay(name){
          // clearInterval(this.timer);
          // clearInterval(this.pTimer);
          // this.count = 60;
          // this.pCount = 60;
          this.loadingGoogle= false;
          this.loadingEmail= false;
          this.loadingPhone= false;
          this.$refs[name].resetFields();
          if(this.verification.way == 'phone'){
            this.step = 2;
          }else if(this.verification.way == 'email'){
            this.step = 1;
          }else if(this.verification.way == 'google'){
            this.step = 3;
          }
        },

      },
      mounted(){
        const forgetValidateInfo = JSON.parse(localStorage.getItem('forgetValidate'));
        this.forgetValidateInfo = forgetValidateInfo;
        if(forgetValidateInfo.email){
          this.verification.way = 'email';
          this.step = 1;
        }else if(forgetValidateInfo.phone_number){
          this.verification.way = 'phone';
          this.step = 2;
        }else if(forgetValidateInfo.google){
          this.verification.way = 'google';
          this.step = 3;
        }
      }

    }
</script>

<style scoped lang="scss">

</style>
