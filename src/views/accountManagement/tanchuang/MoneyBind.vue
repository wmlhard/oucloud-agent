<template>
  <div class="moneypasswordtwo">
    <div class="moneypasswordtwobox phone">
      <span class="icon-wrong close" @click="closeBind()"></span>
      <p class="transfer-header margin-bottom-20">设置资金密码</p>
      <Form ref="moneytwoform" :model="moneytwoform" :rules="ruleInline" label-position="top">
        <p class="input-title">支付密码</p>
        <FormItem prop="inputPhonenum" class="whiteTip">
          <Input type="password" placeholder="输入支付密码" v-model="moneytwoform.inputPhonenum">
          </Input>
        </FormItem>
        <p class="input-title">确认支付密码</p>
        <FormItem prop="verify" class="whiteTip">
          <Input type="password" placeholder="确认支付密码" v-model="moneytwoform.verify">
          </Input>
        </FormItem>
        <button type="button" class="transfer" @click="submit">提交</button>
        <button type="button" class="cancle" @click="closeBind()">取消</button>
      </Form>
    </div>
  </div>
</template>

<script>
  import api from '../../../api.js'
  export default{
    name: 'MoneyTwo',
    data () {
      const validatenew = (rule, value, callback) => {
        if ( !value ) {
          callback(new Error('请输入5-15位数的字母数字密码'));
        } else if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{5,15}$/.test(value)) {
          callback(new Error('请输入5-15位数的字母数字密码'));
        } else {
          callback();
        }
      };
      const validatennewconf = (rule,value,callback) =>{
        if(!value){
          callback(new Error('请再次输入密码'))
        }else{
          if(value != this.moneytwoform.inputPhonenum){
            callback (new Error('两次输入的密码不一致'))
          }else{
            callback();
          }
        }
      }
      return {
        moneytwoform:{
          inputPhonenum: '',
          verify: ''
        },
        ruleInline:{
          inputPhonenum:[
            {required: true, validator:validatenew, trigger: 'blur'}
          ],
          verify: [
            {required: true, validator:validatennewconf, trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      submit(){
        this.$refs['moneytwoform'].validate((valid)=> {
          if (valid) {
            let params = {
              pin: this.moneytwoform.inputPhonenum,
              pin_confirmation: this.moneytwoform.verify
            }
            api.moneypawchange(params).then(res => {
              if(res.status_code == 200) {
                this.$Message.success('设置成功！')
                this.closeBind()
                this.$emit('apiagain')
              }else{}
            })
          }
        })
      },
      closeBind () {
        this.$emit('moneyBindClose');
        this.moneytwoform.inputPhonenum = '';
        this.moneytwoform.verify = '';
        this.$refs['moneytwoform'].resetFields()
      }
    }

  };
</script>

