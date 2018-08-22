<template>
  <div class="verifysecond">
    <div class="verifysecondbox">
      <span class="icon-wrong" @click="close"></span>
      <p class="headerp">选择验证方式</p>
      <Form ref="verifyway" :model="verifyway" :rules="rule1" label-position="top">
        <p class="input-title">验证方式</p>
        <div ref="verifyselect">
          <FormItem prop="model1" class="whiteTip">
            <Select v-model="verifyway.model1" style="width:460px" @on-open-change="heightchange">
              <Option v-for="item of list" :value="item.value" :key="item.value">{{item.label}}</Option>
            </Select>
          </FormItem>
        </div>
      </Form>
      <!--邮箱验证-->
      <Form ref="emailform" :model="emailform" :rules="rule2" label-position="top" v-show="emailshow">
        <div>
          <!-- <p class="input-title">邮箱</p>
          <div class="disableinfo">{{email}}</div> -->
          <p class="input-title">请填写邮箱收到的验证码</p>
          <div class="inputline">
            <FormItem prop="emailcode" class="whiteTip">
              <Input v-model="emailform.emailcode" placeholder="请输入验证码">
              </Input>
            </FormItem>
            <Button type="primary" @click="sendsms('email')" v-if="count == 60" :loading="loadingEmail">获取验证码</Button>
            <Button type="primary" v-else class="regetCode">重新发送{{count}}</Button>
          </div>
        </div>
      </Form>
        <!--手机验证-->
      <Form ref="phoneform" :model="phoneform" :rules="rule3" label-position="top" v-show="phoneshow">
        <div>
         <!--  <p class="input-title">手机</p>
          <div class="disableinfo">{{idd}}{{phone}}</div> -->
          <p class="input-title">请填写手机收到的验证码</p>
          <div class="inputline">
            <FormItem prop="phonecode" class="whiteTip">
              <Input v-model="phoneform.phonecode" placeholder="请输入验证码">
              </Input>
            </FormItem>

            <Button type="primary" @click="sendsms('phone')" v-if="countphone == 60" :loading="loadingphone">获取验证码</Button>
            <Button type="primary" v-else class="regetCode">重新发送{{countphone}}</Button>
          </div>
        </div>
      </Form>
        <!--谷歌验证-->
      <Form ref="googleform" :model="googleform" :rules="rule4" label-position="top" v-show="googleshow">
        <div>
          <p class="input-title">请填写谷歌验证器收到的验证码</p>
          <div class="inputline googleinput">
            <FormItem prop="googlecode" class="whiteTip">
              <Input v-model="googleform.googlecode" placeholder="请输入验证码">
              </Input>
            </FormItem>
          </div>
        </div>
      </Form>
        <div class="next inputline">
          <button type="button" @click="next">下一步</button>
          <p @click="close">取消</p>
        </div>
    </div>
  </div>
</template>
<script>
  import api from '../../../api'
  export default {
    name: 'VerifySecondVerify',
    data(){
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
        email: '',
        idd: '',
        phone: '',
        emailshow: false,
        phoneshow: false,
        googleshow: false,
        count : 60,
        loadingEmail: false,
        countphone : 60,
        loadingphone: false,
        email_code_key: '',
        phone_code_key: '',
        verifyway:{model1: ''},
        emailform:{emailcode: ''},
        phoneform:{phonecode: ''},
        googleform:{googlecode: ''},
        rule1:{model1: [{required: true, message: '请选择验证方式', trigger: 'blur'}]},
        rule2:{emailcode: [{validator: validateway, trigger: 'blur'}]},
        rule3:{phonecode: [{validator: validateway, trigger: 'blur'}]},
        rule4:{googlecode: [{validator: validateway, trigger: 'blur'}]},
        timerPhone:null,
        timerEmail:null
      }
    },
    // props: ['state','secdata'],
    props:{
      state:{
        type:String,
        default:''
      },
      secdata:{
        type:Object,
        default:{}
      }
    },
    computed:{
      list:function() {
        let olist = []
        if(this.secdata.email){
          olist.push({value: 'email',label: '邮箱验证'})
        }
        if(this.secdata.phone){
          olist.push({value: 'phone',label: '手机验证'})
        }
        if(this.secdata.google){
          olist.push({value: 'google',label: '谷歌验证'})
        }
        return olist
      }
    },
    methods: {
      heightchange(data) {
        if (data) {
          this.$refs['verifyselect'].style.height = 70 + this.list.length * 30 + 'px'
        } else {
          this.$refs['verifyselect'].style.height = 60 + 'px';
        }
        if(this.verifyway.model1 == 'email'){
          this.emailshow = true;
          this.phoneshow = false;
          this.googleshow = false;
        }else if(this.verifyway.model1 == 'phone'){
          this.emailshow = false;
          this.phoneshow = true;
          this.googleshow = false;
        }else if(this.verifyway.model1 == 'google'){
          this.emailshow = false;
          this.phoneshow = false;
          this.googleshow = true;
        }else{
          this.emailshow = false;
          this.phoneshow = false;
          this.googleshow = false;
        }
      },
      close(){
        this.verifyway.model1 = ''
        this.emailform.emailcode = ''
        this.phoneform.phonecode = ''
        this.googleform.googlecode = ''
        this.$refs['verifyway'].resetFields();
        this.$refs['emailform'].resetFields();
        this.$refs['phoneform'].resetFields();
        this.$refs['googleform'].resetFields();
        this.$emit('close')
      },
      sendsms(val){
        if(val == 'email') {
          this.loadingEmail = true;
          api.sendemailsms().then(res => {
            if( res.status_code == 200 ){
              this.timerEmail = setInterval(() => {
                if (this.count > 0){
                  this.count--;
                  if(this.count==59){
                    this.loadingEmail = false;
                  }
                } else {
                  clearInterval(this.timerEmail);
                  this.count = 60;
                }
              },1000);
              this.email_code_key = res.data.email_key
            }else{
              this.loadingEmail = false;
            }

          }).catch(error=>{
            this.loadingEmail = false;
          })
        }else if(val == 'phone') {
          this.loadingphone = true;
          api.secondverifyphonesms().then(res => {
            if( res.status_code == 200 ){
              this.timerPhone = setInterval(() => {
                if (this.countphone > 0){
                  this.countphone--;
                  if(this.countphone == 59){
                    this.loadingphone = false;
                  }

                } else {
                  clearInterval(this.timerPhone);
                  this.countphone = 60;
                }
              },1000);
              this.phone_code_key = res.data.verification_key
            }else{
              this.loadingphone = false;
            }


          }).catch(error=>{
            this.loadingphone = false;
          })
        }
      },
      next() {
        this.$refs['verifyway'].validate((valid) => {
          if (valid) {
            //邮箱验证
            if(this.verifyway.model1 == 'email'){
              this.$refs['emailform'].validate((valid) => {
                if(valid) {
                  if(this.email_code_key){

                    let params = {
                      status: this.state,
                      email_code: this.emailform.emailcode,
                      email_key: this.email_code_key
                    }
                    api.emailsecVerifychange(params).then(res => {
                      console.log(this.state)
                      if(res.status_code == 200){
                        this.loadingEmail = false;
                        this.loadingphone = false;
                        clearInterval(this.timerEmail);
                        this.count = 60;
                        clearInterval(this.timerPhone);
                        this.countphone = 60;
                        if(this.state == 'email' || this.state == 'phone' || this.state == 'google'){
                          // this.$emit('changestate',this.state)
                          this.$emit('showpopover',res.data.status)
                        }

                        else if(this.state == 'login' || this.state == 'moneyTwo' ||  this.state == 'googlev'){
                          this.$emit('showpopover',this.state)
                        }

                        this.close()
                      }
                      // this.$emit('reapi')
                    }).catch(error=>{

                      // this.$Message.error('修改失败')
                    })

                  }
                  // else{
                  //   this.$Message.info('请获取验证码');
                  // }


                }
              })
            }
            //手机验证
            else if(this.verifyway.model1 == 'phone'){
              this.$refs['phoneform'].validate((valid) => {
                if(valid) {
                  if( this.phone_code_key ){

                    let params = {
                      status: this.state,
                      verification_code: this.phoneform.phonecode,
                      verification_key: this.phone_code_key
                    }
                    api.phonesecVerifychange(params).then(res => {
                      if(res.status_code == 200){
                        if(this.state == 'email' || this.state == 'phone' || this.state == 'google'){
                          // this.$emit('changestate',this.state)
                          this.$emit('showpopover',res.data.status)
                        }

                        else if(this.state == 'login' || this.state == 'moneyTwo' ||  this.state == 'googlev'){
                          this.$emit('showpopover',this.state)
                        }

                        this.close()
                      }
                    }).catch(error=>{

                      // this.$Message.error('修改失败')
                    })


                  }
                  // else{
                  //   this.$Message.info('请获取验证码');
                  // }

                }
              })
            }else if(this.verifyway.model1 == 'google'){
              this.$refs['googleform'].validate((valid) => {
                if(valid) {
                  let params = {
                    status: this.state,
                    verify: this.googleform.googlecode
                  }
                  api.googlesecVerifychange(params).then(res => {
                    if(res.status_code == 200){
                      if(this.state == 'email' || this.state == 'phone' || this.state == 'google'){
                        this.$emit('showpopover',res.data.status)
                      }
                      else if(this.state == 'login' || this.state == 'moneyTwo' ||  this.state == 'googlev'){
                        this.$emit('showpopover',this.state)
                      }

                      this.close()
                    }
                  }).catch(error=>{
                    // this.$Message.error('修改失败')
                  })
                }
              })
            }

          }
        })
      }
    },
    // mounted(){
    //   api.emailInfo().then(res=>{
    //     this.email = res.data.email
    //   })
    //   api.phoneInfo().then(res => {
    //     this.idd = res.data.phone_idd
    //     this.phone = res.data.phone_number
    //   })
    // }
  }
</script>
<style scoped>
  .verifysecond{
    z-index: 999;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(51,51,51,.6);
  }
  .verifysecondbox{
    width: 540px;
    margin: 300px auto;
    padding: 20px 20px 0 40px;
    background: #fff;
    border-radius: 5px;
  }
  .icon-wrong{
    float: right;
    width: 20px;
    height: 20px;
    font-size: 20px;
    color: #ffffff;
    cursor: pointer;
  }
  .headerp{
    margin-top: 20px;
    font-size: 18px;
    line-height: 18px;
    color: #333;
    margin-bottom: 30px;
  }
  .input-title{
    padding-bottom: 10px;
    font-size: 16px;
    line-height: 16px;
    color: #666;
  }
  .disableinfo{
    width: 460px;
    height: 40px;
    border: 1px solid #eee;
    border-radius: 5px;
    margin-bottom: 20px;
    font-size: 14px;
    color: #666;
    padding: 0 10px;
    line-height: 40px;
  }
  .inputline{
    display: flex;
  }
  .inputline button{
    width: 100px;
    height: 40px;
    padding: 0;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    background: #f3ba2f;
    border: none;
    box-shadow: none !important;
    -webkit-box-shadow: none !important;
    color: #fff;
    font-size: 12px;
    line-height: 40px;
    cursor: pointer;
    outline: none;
  }
  .next{
    padding-top: 40px;
    padding-bottom:40px;
  }
  .next button{
    border-radius: 5px;
    outline: none;
  }
  .next p{
    line-height: 40px;
    margin-left: 50px;
    color: #333;
    font-size: 14px;
    cursor: pointer;
  }
</style>
