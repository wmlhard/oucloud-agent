<template>
	<div class="loginpasswordchange">
		<div class="loginpasswordchangebox phone">
			<span class="icon-wrong close" @click="closeBind()"></span>
			<p class="transfer-header">修改登录密码</p>
      <Form ref="loginpawform" :model="loginpawform" :rules="ruleInline" label-position="top">
				<p class="input-title">原始密码</p>
        <FormItem prop="oldpassword" class="whiteTip">
          <Input type="password" placeholder="请输入原始密码" v-model="loginpawform.oldpassword">
          </Input>
        </FormItem>
				<p class="input-title">新密码</p>
        <FormItem prop="newpassword" class="whiteTip">
          <Input type="password" placeholder="请输入新密码" v-model="loginpawform.newpassword">
          </Input>
        </FormItem>
				<p class="input-title">确认新密码</p>
        <FormItem prop="newpasswordconfirmation" class="whiteTip">
          <Input type="password" placeholder="请确认新密码" v-model="loginpawform.newpasswordconfirmation">
          </Input>
        </FormItem>
				<button type="button" class="transfer" @click="next()">修改</button>
				<button type="button" class="cancle" @click="closeBind()">取消</button>
			</Form>
		</div>
	</div>
</template>

<script>
  import api from '../../../api.js'
	export default{
		name: 'LoginPassword',
		data () {
		  const validatenew = (rule,value,callback) => {
        if (value === '') {
          callback(new Error('请输入5-15位数的字母数字密码'));
        } else if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{5,15}$/.test(value)) {
          callback(new Error('请输入5-15位数的字母数字密码'));
        } else {
          callback();
        }
      }
      const validatennewconf = (rule,value,callback) =>{
		    if(!value){
		      callback(new Error('请再次输入密码'))
        }
		    else if(value != this.loginpawform.newpassword) {
		      callback (new Error('两次输入的密码不一致'))
        }else {
          callback();
		    }
      }
      return {
        loginpawform:{
          oldpassword: '',
          newpassword: '',
          newpasswordconfirmation: ''
        },
        ruleInline: {
          oldpassword: [
            {required: true, message:'请输入原密码', trigger: 'blur' }
          ],
          newpassword: [
            {required: true, validator:validatenew, trigger: 'blur' }
          ],
          newpasswordconfirmation: [
            {required: true, validator:validatennewconf, trigger: 'blur' }
          ]
        }
      }
    },
		methods: {
			closeBind () {
				this.$emit('loginClose');
				this.loginpawform.oldpassword = ''
				this.loginpawform.newpassword = ''
        this.loginpawform.newpasswordconfirmation = ''
        this.$refs['loginpawform'].resetFields()
			},
      next() {
        this.$refs['loginpawform'].validate((valid) => {
          if (valid) {
            let params = {
              old_password: this.loginpawform.oldpassword,
              new_password: this.loginpawform.newpassword,
              new_password_confirmation: this.loginpawform.newpasswordconfirmation
            }
            api.loginpassword(params).then(res => {
              if(res.status_code == 200){
                this.$Message.success('修改成功!')
                this.closeBind()
              }
            })
          } else {}
        })
      }
		}
	};
</script>
