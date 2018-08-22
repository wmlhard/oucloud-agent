<template>
	<div class="accScuPhoneTwo">
		<div class="accScuPhoneTwobox phonetwo">
			<span class="icon-wrong close" @click="closeBind()"></span>
			<p class="transfer-header margin-bottom-20">修改绑定手机号码</p>
      <Form ref="phonetwoform" :model="phonetwoform" :rules="ruleInline" label-position="top">
				<p class="input-title">手机号码</p>
				<div class="phonenumchange">
					<Select style="width:100px"  v-model="choose" placeholder="0866" >
						<OptionGroup label="常用">
					    <Option :value="item.num" :label="item.num" v-for="item in list" :key="item.id">
							<span class="country">{{item.country}}</span>
							<span class="num">{{item.num}}</span>
					    </Option>
            </OptionGroup>
					</Select>
          <FormItem prop="inputPhonenum" class="whiteTip">
            <Input type="text" placeholder="请输入要绑定的11位手机号码" v-model="phonetwoform.inputPhonenum">
            </Input>
          </FormItem>
				</div>
				<p class="input-title">短信验证码</p>
				<div class="anumber">
          <FormItem prop="verify" class="whiteTip">
            <Input type="text" placeholder="请输入6位短信验证码" v-model="phonetwoform.verify">
            </Input>
          </FormItem>
					<button type="button" @click="sendsms" v-if="count == 60" :loading="loadingEmail">获取验证码</button>
          <Button type="primary" v-else class="regetCode">重新发送{{count}}</Button>
				</div>
				<button type="button" class="transfer" @click="bind">绑定</button>
				<button type="button" class="cancle" @click="closeBind()">取消</button>
			</Form>
		</div>
	</div>
</template>

<script>
  import api from '../../../api.js'
	export default {
    name: 'PhoneTwo',
    data() {
      const validatephone = function (rule, value, callback) {
        if (!value) {
          return callback(new Error('请输入手机号'));
        } else if (!/^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/.test(value)) {
          return callback(new Error('请正确输入手机号'));
        } else {
          callback();
        }
      };
      return {
        phonetwoform: {
          inputPhonenum: '',
          verify: ''
        },
        ruleInline: {
          inputPhonenum: [
            {required: true, type: 'number', validator: validatephone, trigger: 'blur'}
          ],
          verify: [
            {required: true, message: '请输入验证码', trigger: 'blur'}
          ]
        },
        choose: '+86',
        verification_key: '',
        count: 60,
        loadingEmail: false,
        list: [{
          id: '001',
          country: '中国',
          num: '+86'
        }, {
          id: '002',
          country: '香港（中国）',
          num: '00852'
        }, {
          id: '003',
          country: '台湾（中国）',
          num: '00886'
        }, {
          id: '004',
          country: '日本',
          num: '0081'
        }]
      }
    },
    methods: {
      closeBind() {
        this.$emit('phoneTwoClose');
        this.phonetwoform.inputPhonenum = ''
        this.phonetwoform.verify = ''
        this.$refs['phonetwoform'].resetFields()
      },
      sendsms() {
        this.loadingEmail = true;
        let params = {
          phone_number: parseInt(this.phonetwoform.inputPhonenum),
          phone_idd: this.choose
        };
        api.sendsms(params).then(res => {
          if (res.status_code == 200) {
            this.verification_key = res.data.verification_key
            this.loadingEmail = false;
            this.timer = setInterval(() => {
              if (this.count > 0) {
                this.count--;
              } else {
                clearInterval(this.timer);
                this.count = 60;
              }
            }, 1000);
          } else {
            this.loadingEmail = false;
          }
        }).catch(error => {
          this.loadingEmail = false;
        })
      },
      bind() {
        this.$refs['phonetwoform'].validate((valid) => {
          if (valid) {
            let params = {
              phone_number: this.phonetwoform.inputPhonenum,
              phone_idd: this.choose,
              verification_code: this.phonetwoform.verify,
              verification_key: this.verification_key
            }
            api.resetbind(params).then(res => {
              if (res.status_code == 200) {
                this.$Message.success('重新设置成功！')
                this.closeBind()
              } else{}
            })
          } else {
          }
        })
      }
    }
  }
</script>

