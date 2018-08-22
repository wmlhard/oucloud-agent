<template>
  <div class="accScuPhone">
    <div class="accScuPhonebox phone">
      <span class="icon-wrong close" @click="closeBind()"></span>
      <p class="transfer-header margin-bottom-20">验证旧手机号码</p>
      <Form ref="phoneform" :model="phoneform" :rules="ruleInline" label-position="top">
        <p class="input-title">手机号码<span>{{data.phone_idd}}  {{data.phone_number}}</span></p>
        <FormItem prop="inputPhonenum" class="whiteTip">
          <Input v-model="phoneform.inputPhonenum" placeholder="请输入绑定的11位手机号码">
          </Input>
        </FormItem>
        <button type="button" class="transfer" @click="next()">下一步</button>
        <button type="button" class="cancle" @click="closeBind()">取消</button>
      </Form>
    </div>
  </div>
</template>

<script>
  import api from '../../../api.js'
  export default{
    name: 'Phone',
    data () {
      const validatephone= function(rule,value,callback){
        if(!value){
          return callback(new Error('请输入绑定的手机号'));
        }else if(!/^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/.test(value)){
          return callback(new Error('请正确输入手机号码'));
        }else{
          callback();
        }
      };
      return {
        data: {},
        phoneform: {
          inputPhonenum: ''
        },
        ruleInline: {
          inputPhonenum: [
            { required: true, validator:validatephone, trigger: 'blur' }
          ]
        }
      }
    },
    mounted(){
      // this.phoneInfo()
      this.phoneform.inputPhonenum = ''
    },
    methods: {
      phoneInfo(){
        api.phoneInfo().then((res => {
          this.data = res.data;
        }))
      },
      closeBind () {
        this.$emit('phoneClose');
        this.$refs['phoneform'].resetFields()
      },
      next() {
        this.$refs['phoneform'].validate((valid)=> {
          if (valid) {
            let params = {
              phone_number: this.phoneform.inputPhonenum,
              phone_idd: this.data.phone_idd
            };
            api.verifyphone(params).then(res => {
              if (res.status_code == 200) {
                this.$Message.success('验证成功')
                this.$emit('phoneClose');
                this.$emit('phoneTwoShow')
              } else {}
            })
          } else { }
        })

      }
    }
  };
</script>

