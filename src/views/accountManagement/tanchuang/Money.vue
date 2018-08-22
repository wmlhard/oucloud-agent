<template>
	<div class="moneypassword">
		<div class="moneypasswordbox phone">
			<span class="icon-wrong close" @click="closeBind()"></span>
			<p class="transfer-header margin-bottom-20">重新设置资金密码</p>
      <Form ref="moneyform" :model="moneyform" :rules="ruleInline" label-position="top">
				<p class="input-title">安全验证</p>
				<div class="number">
					<input type="text" :value="inputPhonenum" readonly >
          <button type="button" @click="sendsms" v-if="count == 60" :loading="loadingEmail">获取验证码</button>
          <Button type="primary" v-else class="regetCode">重新发送{{count}}</Button>
				</div>
				<p class="input-title">验证码</p>
        <FormItem prop="verify" class="whiteTip">
				  <Input type="text" placeholder="请输入验证码" v-model="moneyform.verify">
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
		name: 'Money',
		data () {
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
        phonenumber: '18390123017',
        inputPhonenum: '',
        moneyform: {
          verify: '',
        },
        ruleInline: {
          verify: [
            {validator: validateway, trigger: 'blur'}
          ]
        },
        postverify: '',
        count : 60,
        loadingEmail: false,
      }
        },
		methods: {
			closeBind () {
				this.$emit('moneyClose');
				this.moneyform.verify = ''
        this.$refs['moneyform'].resetFields()
			},
      sendsms(){
        this.loadingEmail = true;
        api.sendemailsms().then(res => {
          if (res.status_code == 200) {
            this.postverify = res.data.email_key
            this.loadingEmail = false;
            this.timer = setInterval(() => {
              if (this.count > 0){
                this.count--;
              } else {
                clearInterval(this.timer);
                this.count = 60;
              }
            },1000);
          } else {
            this.loadingEmail = false;
          }
        }).then(error => {
          this.loadingEmail = false;
        })
      },
			next() {
			  this.$refs['moneyform'].validate((valid)=> {
			    if(valid){
            let params= {
              email_key: this.postverify,
              email_code: this.moneyform.verify
            }
            api.verifyemailsms(params).then(res => {
              if(res.status_code == 200) {
                this.closeBind()
                this.$emit('moneyTwoShow')
              }else{}
            })
          }
        })
			},
      emailInfo() {
			  api.emailInfo().then(res => {
			    this.inputPhonenum = res.data.email
        })
      }
		},
    mounted() {
		  this.emailInfo()
    }
	};
</script>

