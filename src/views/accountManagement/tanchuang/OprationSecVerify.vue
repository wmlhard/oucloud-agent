<template>
  <div class="accScuPhoneTwo">
    <div class="accScuPhoneTwobox phonetwo">
      <span class="icon-wrong close" @click="closeBind()"></span>
      <p class="transfer-header margin-bottom-20">操作验证</p>
      <!--邮箱-->
      <Form ref="emailform" :model="emailform" :rules="rule1" label-position="top" v-show="oprationval == 'email'">
        <p class="input-title">邮箱验证码</p>
        <div class="anumber">
          <FormItem prop="verify" class="whiteTip border_radius">
            <Input type="text" placeholder="请输入邮箱验证码" v-model="emailform.verify">
            </Input>
          </FormItem>
          <Button type="primary" @click="sendsms('email')" v-if="Emailcount == 60" :loading="emailLoading">获取验证码</Button>
          <Button type="primary" v-else class="regetCode">重新发送{{Emailcount}}</Button>
        </div>
      </Form>
      <!--手机-->
      <Form ref="phoneform" :model="phoneform" :rules="rule2" label-position="top" v-show="oprationval == 'phone'">
        <p class="input-title">短信验证码</p>
        <div class="anumber">
          <FormItem prop="verify" class="whiteTip">
            <Input type="text" placeholder="请输入短信验证码" v-model="phoneform.verify">
            </Input>
          </FormItem>
          <Button type="primary" @click="sendsms('phone')" v-if="Phonecount == 60" :loading="phoneLoading">获取验证码</Button>
          <Button type="primary" v-else class="regetCode">重新发送{{Phonecount}}</Button>
        </div>
      </Form>
      <!--谷歌-->
      <Form ref="googleform" :model="googleform" :rules="rule3" label-position="top" v-show="oprationval == 'google'" class="googlespace">
        <p class="input-title">谷歌验证码</p>
        <div class="anumber googletip">
          <FormItem prop="verify" class="whiteTip">
            <Input type="text" placeholder="请输入谷歌验证码" v-model="googleform.verify">
            </Input>
          </FormItem>
        </div>
      </Form>
      <button type="button" class="transfer" @click="bind()">确认</button>
      <button type="button" class="cancle" @click="closeBind()">取消</button>
    </div>
  </div>
</template>

<script>
  import api from '../../../api.js'
  export default {
    name: 'PhoneTwo',
    props: {oprationval: String},
    data() {
      const validategoogle = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入验证码'));
        }else if(!/^\d{6}$/.test(value)){
          callback(new Error('请输入6位验证码'));
        }else {
          callback();
        }
      };
      const validateway = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入验证码'));
        }else if(!/^[0-9]*$/.test(value)){
          callback(new Error('请输入正确的验证码'));
        }else {
          callback();
        }
      };
      return {
        emailform: {verify: ''},
        rule1: {verify: [{validator: validateway, trigger: 'blur'}]},
        phoneform: {verify: ''},
        rule2: {verify: [{validator: validateway, trigger: 'blur'}]},
        googleform: {verify: ''},
        rule3: {verify: [{validator: validateway, trigger: 'blur'}]},
        data: {},
        phone_code_key: '',
        email_code_key: '',
        Emailcount: 60,
        emailLoading: false,
        Phonecount: 60,
        phoneLoading: false
      }
    },
    methods: {
      closeBind() {
        this.$emit('Close');
        this.phoneform.verify = '';
        this.emailform.verify = '';
        this.googleform.verify = '';
        this.$refs['phoneform'].resetFields();
        this.$refs['emailform'].resetFields();
        this.$refs['googleform'].resetFields();
      },
      sendsms(value) {
        if(value == 'phone'){
          this.phoneLoading = true;
          api.secondverifyphonesms().then(res => {
            if( res.status_code ==200 ){
              this.timer = setInterval(() => {
                if (this.Phonecount > 0){
                  this.Phonecount--;
                  if( this.Phonecount == 59 ){
                    this.phoneLoading = false;
                  }
                } else {
                  clearInterval(this.timer);
                  this.Phonecount = 60;
                }
              },1000);
              this.phone_code_key = res.data.verification_key;
              this.$Message.success('发送成功');
            }else{
              this.phoneLoading = false;
            }

          }).catch(error=>{
             this.phoneLoading = false;
          })
        }
        else if(value == 'email'){
          this.emailLoading = true;
          api.sendemailsms().then(res => {
            if(res.status_code ==200){
              this.timer = setInterval(() => {
                if (this.Emailcount > 0){
                  this.Emailcount--;
                  if(this.Emailcount ==59){
                    this.emailLoading = false;
                  }
                } else {
                  clearInterval(this.timer);
                  this.Emailcount = 60;
                }
              },1000);
              this.email_code_key = res.data.email_key;
              this.$Message.success('发送成功');
            }else{
              this.emailLoading = false;
            }

          }).catch(error=>{
            this.emailLoading = false;
          })
        }
      },
      bind() {
        //邮箱
        if(this.oprationval == 'email'){
          this.$refs['emailform'].validate((valid)=> {
            if (valid) {
              if( this.email_code_key ){
                let params = {
                  status: this.oprationval,
                  email_code: this.emailform.verify,
                  email_key: this.email_code_key
                }
                api.oprationemailverify(params).then(res => {
                  if (res.status_code == 200) {
                    this.emailLoading = false;
                    clearInterval(this.timer);
                    this.Emailcount = 60;
                    this.$emit('changestate', this.oprationval);
                    this.closeBind();
                    this.$Message.info("操作成功");
                  }
                })

              }
              // else{
              //   this.$Message.info("请获取验证码");
              // }
            }
          })
        }
        else if(this.oprationval == 'phone'){
          this.$refs['phoneform'].validate((valid)=> {
            if (valid) {
              if(this.phone_code_key){

                let params = {
                  status: this.oprationval,
                  verification_code: this.phoneform.verify,
                  verification_key: this.phone_code_key
                }
                api.oprationphoneverify(params).then(res => {
                  if (res.status_code == 200) {
                    this.phoneLoading = false;
                    clearInterval(this.timer);
                    this.Phonecount = 60;
                    this.$emit('changestate', this.oprationval);
                    this.closeBind();
                    this.$Message.info("操作成功");
                  }
                })

              }

            }
          })
        }
        else if(this.oprationval == 'google') {
          this.$refs['googleform'].validate((valid) => {
            if (valid) {
              let params = {
                status: this.oprationval,
                verify: this.googleform.verify
              }
              api.oprationgoogleverify(params).then(res => {
                if (res.status_code == 200) {
                  this.$emit('changestate', this.oprationval);
                  this.closeBind();
                  this.$Message.info("操作成功");
                }
              })
            }
          })
        }
      }
    }
  }
</script>

