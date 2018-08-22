<template>
	<div class="newbindaccount">
		<div class="newbindaccountbox phone">
			<span class="icon-wrong close" @click="closeBind()"></span>
			<p class="transfer-header margin-bottom-20">绑定账号</p>
      <!--邮箱绑定-->
      <Form ref="emailform" :model="emailform" :rules="rule1" label-position="top" v-show="emailbind">
        <div class="email_phone_toogle">
          <p class="input-title">邮箱账号</p>
          <p class="tooglep" @click="toogle('email')">手机绑定</p>
        </div>
        <FormItem prop="inputAccount" class="whiteTip">
          <Input type="text" placeholder="请输入要绑定的邮箱账号" v-model="emailform.inputAccount">
          </Input>
        </FormItem>
        <p class="input-title">昵称</p>
        <FormItem prop="inputname" class="whiteTip">
          <Input type="text" placeholder="请输入要绑定的昵称" v-model="emailform.inputname">
          </Input>
        </FormItem>
        <button type="button" class="transfer" @click="newBind('email')">确定</button>
        <button type="button" class="cancle" @click="closeBind()">取消</button>
      </Form>
        <!--手机绑定-->
        <Form ref="phoneform" :model="phoneform" :rules="rule2" label-position="top" v-show="phonebind">
          <div class="email_phone_toogle">
            <p class="input-title">手机账号</p>
            <p class="tooglep" @click="toogle('phone')">邮箱绑定</p>
          </div>
        <div class="phoneline">
          <FormItem prop="choose" class="idd">
            <Select style="width:100px"  v-model="phoneform.choose" placeholder="0866" >
                <Option :value="item.country_idd" :label="item.country_idd" v-for="item in list" :key="item.country_id">
                  <span class="country">{{item.country_name}}</span>
                  <span class="num">{{item.country_idd}}</span>
                </Option>
            </Select>
          </FormItem>
          <FormItem prop="inputPhone" class="whiteTip phone">
            <Input type="text" placeholder="请输入要绑定的手机账号" v-model="phoneform.inputPhone">
            </Input>
          </FormItem>
        </div>
				<p class="input-title">昵称</p>
        <FormItem prop="inputname" class="whiteTip">
          <Input type="text" placeholder="请输入要绑定的昵称" v-model="phoneform.inputname">
          </Input>
        </FormItem>
				<button type="button" class="transfer" @click="newBind('phone')">确定</button>
				<button type="button" class="cancle" @click="closeBind()">取消</button>
			</Form>
		</div>
	</div>
</template>

<script>
  import api from '../../../api.js'
  import axios from 'axios'
  import config from '../../../../static/config.json'
  import resOnline from '../../../../static/configOnline.json'
	export default{
		name: 'Bind',
		data () {
      const validatePhone = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入手机账号'));
        }else if(!/^[0-9]{2,20}$/.test(value)){
          callback(new Error('手机号格式错误'));
        }else {
          callback();
        }
      };
      return {
        choose: '+86',
        list: [],
        emailbind: true,
        phonebind: false,
        emailform:{
          inputAccount: '',
          inputname: ''
        },
        phoneform:{
          inputname: '',
          choose: '',
          inputPhone: ''
        },
        rule1: {
          inputAccount:[
            {required: true, message: '请输入邮箱账号', trigger: 'blur'},
            {type: 'email', message: '请输入正确的邮箱账号', trigger: 'blur'}
          ],
          inputname: [
            {required: true, message: '请输入要绑定的昵称', trigger: 'blur'}
          ]
        },
        rule2: {
          choose:[
            {required: true, message: '请选择国家区号', trigger: 'blur'}
          ],
          inputPhone:[
            {validator: validatePhone, trigger: 'blur'}
          ],
          inputname: [
            {required: true, message: '请输入要绑定的昵称', trigger: 'blur'}
          ]
        }
      }
    },
		methods: {
      toogle(val) {
        this.emailform.inputAccount = ''
        this.emailform.inputname = ''
        this.phoneform.choose = '+86'
        this.phoneform.inputPhone = ''
        this.phoneform.inputname = ''
        this.$refs['emailform'].resetFields()
        this.$refs['phoneform'].resetFields()
        if (val == 'email') {
          this.emailbind = false
          this.phonebind = true

        } else if (val == 'phone') {
          this.emailbind = true
          this.phonebind = false
        }
      },
      iddlist() {
        let instances = axios.create();
        instances.defaults.timeout = 10000;
        const domainnn = window.location.origin;
        if (domainnn.indexOf('bitboole') > -1) {
          instances.defaults.baseURL = resOnline.phone_url;
        }else {
          instances.defaults.baseURL = config.phone_url;
        }
        instances.get('common/get_country').then(res=>{
          if(res.data.status_code ==200){
            this.list = res.data.data.list;
          }
        });
      },
      closeBind() {
        this.emailform.inputAccount = ''
        this.emailform.inputname = ''
        this.phoneform.choose = '+86'
        this.phoneform.inputPhone = ''
        this.phoneform.inputname = ''
        this.$emit('closeBind');
        this.$refs['emailform'].resetFields()
        this.$refs['phoneform'].resetFields()
      },
      newBind(val) {
        if (val == 'email') {
          this.$refs['emailform'].validate((valid) => {
            if (valid) {
              let params = {
                phone_idd: this.phoneform.choose,
                phone_number: this.phoneform.inputPhone,
                email: this.emailform.inputAccount,
                user_name: this.emailform.inputname
              }
              api.newBind(params).then(res => {
                if (res.status_code == 200) {
                  this.$Message.success('绑定成功')
                  this.$emit('bindlistAgain')
                  this.closeBind()
                } else {
                }
              })
            }
          })
        }
        else if (val == 'phone') {
          this.$refs['phoneform'].validate((valid) => {
            if (valid) {
              let params = {
                phone_idd: this.phoneform.choose,
                phone_number: this.phoneform.inputPhone,
                email: this.emailform.inputAccount,
                user_name: this.phoneform.inputname
              }
              api.newBind(params).then(res => {
                if (res.status_code == 200) {
                  this.$Message.success('绑定成功')
                  this.$emit('bindlistAgain')
                  this.closeBind()
                } else {
                }
              })
            }
          })
        }
      }
		},
    mounted(){
		  this.iddlist()
    }
	};
</script>

