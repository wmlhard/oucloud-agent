<template>
	<div class="accountSecurity" v-if='true'>
		<div class="accountSecurityPadding">
			<div class="title2">
				<p class="titleLeft">账户与安全</p>
				<p class="titleCenter">二次验证</p>
				<p class="titleRight">安全等级:<span class="highLow">{{securylevel}}</span></p>
			</div>
			<ul class="accountSecurityContent">
        <!--邮箱-->
				<li class="accountSecurityContentDan">
					<div class="accountSecurityTitle">
						<p class="accountSecurityTitleIcon">
							<span class="icon-mail"></span>
						</p>
						<p class="accountSecurityTitleLetter">邮箱</p>
					</div>
					<div class="accountSecurityContent1">{{info.email}}</div>
					<div class="accountSecuritySwitch">
						<i-Switch v-model="emailswitch" @on-change="changeSwitch('email')" :disabled="info.email_status==0"></i-Switch>
            <div class="fakeswitch" @click="changeSwitch('email')"></div>
					</div>
				</li>
        <!--手机-->
				<li class="accountSecurityContentDan">
					<div class="accountSecurityTitle">
						<p class="accountSecurityTitleIcon">
							<span class="icon-phone1"></span>
						</p>
						<p class="accountSecurityTitleLetter">手机</p>
					</div>
					<div class="accountSecurityContent1">{{info.phone}}</div>
					<div class="accountSecuritySwitch">
						<i-Switch v-model="phoneswitch" @on-change="changeSwitch('phone')" :disabled="info.phone_status==0"></i-Switch>
            <div class="fakeswitch" @click="changeSwitch('phone')"></div>
					</div>
					<!--<div class="accountSecurityBtn" @click="Show('phone')">修改</div>-->
				</li>
        <!--谷歌-->
				<li class="accountSecurityContentDan">
					<div class="accountSecurityTitle">
						<p class="accountSecurityTitleIcon">
							<span class="icon-G2"></span>
						</p>
						<p class="accountSecurityTitleLetter">谷歌验证码</p>
					</div>
					<div class="accountSecurityContent1">{{googlestatus}}</div>
					<div class="accountSecuritySwitch">
						<i-Switch v-model="googleswitch" @on-change="changeSwitch('google')" :disabled="info.google_status==0"></i-Switch>
            <div class="fakeswitch" @click="changeSwitch('google')"></div>
					</div>
					<div class="accountSecurityBtn" @click="Show('googlev')" v-show="this.googlestatus == '已绑定'?false:true">绑定</div>
				</li>
        <!--登陆密码-->
				<li class="accountSecurityContentDan">
					<div class="accountSecurityTitle">
						<p class="accountSecurityTitleIcon">
							<span class="icon-lock"></span>
						</p>
						<p class="accountSecurityTitleLetter">登陆密码</p>
					</div>
					<div class="accountSecurityContent1">{{info.password}}</div>
					<div class="accountSecurityBtn" @click="Show('login')">修改</div>
				</li>
        <!--资金密码-->
				<li class="accountSecurityContentDan">
					<div class="accountSecurityTitle">
						<p class="accountSecurityTitleIcon">
							<span class="icon-key1"></span>
						</p>
						<p class="accountSecurityTitleLetter">资金密码</p>
					</div>
					<div class="accountSecurityContent1">{{info.pin}}</div>
					<!-- <div class="accountSecurityBtn" @click="Show('money')">重置</div> -->
          <div class="accountSecurityBtn" @click="Show('moneyTwo')" v-if="info.pin != ''">重置</div>
          <div class="accountSecurityBtn" @click="Show('moneyBind')" v-if="info.pin == ''">设置</div>
				</li>
			</ul>
		</div>
    <!--二次验证状态安全验证-->
    <verify-second v-show="verifysecondshow" @showpopover="showpopover" @close="Close('verifysecond')" @reapi="apiagain" :secdata="secdata" :state="state"></verify-second>
    <!--二次验证状态操作验证-->
    <opration-secverify v-show="OprationSecVerify" @Close="Close('opration')" :oprationval="oprationval" @changestate="changestate"></opration-secverify>
    <!--修改绑定手机号-->
		<phone v-show="phoneshow" @phoneClose="Close('phone')" @phoneTwoShow="Show('phoneTwo')"></phone>
		<phone-two v-show="phonetwoshow" @phoneTwoClose="Close('phoneTwo')"></phone-two>
    <!--绑定谷歌验证-->
		<google v-show="googleshow" @googleClose="Close('google')" @apiagain="apiagain" :googleinfo="googleinfo"></google>
    <!--修改登录密码-->
		<login-password v-show="loginshow" @loginClose="Close('login')"></login-password>
    <!--修改资金密码-->
		<!--<money v-show="moneyshow" @moneyClose="Close('money')" @moneyTwoShow="Show('moneyTwo')"></money>-->
		<money-two v-show="moneytwoshow" @moneyTwoClose="Close('moneyTwo')"></money-two>
    <money-bind v-show="moneybindshow" @moneyBindClose="Close('moneyBind')" @apiagain="apiagain"></money-bind>
	</div>
</template>

<script>
  import api from '../../../api'
  import VerifySecond from '../tanchuang/VerifySecondVerify.vue'
  import Phone from '../tanchuang/Phone.vue'
  import PhoneTwo from '../tanchuang/PhoneTwo.vue'
  import Google from '../tanchuang/Google.vue'
  import LoginPassword from '../tanchuang/LoginPassword.vue'
  import Money from '../tanchuang/Money.vue'
  import MoneyTwo from '../tanchuang/MoneyTwo.vue'
  import MoneyBind from '../tanchuang/MoneyBind.vue'
  import OprationSecverify from '../tanchuang/OprationSecVerify.vue'
	export default{
		name: 'accountSecurity',
    props:{
		  info: Object
    },
		components: {
      VerifySecond,
      OprationSecverify,
			Phone,
			PhoneTwo,
			Google,
			LoginPassword,
			Money,
			MoneyTwo,
      MoneyBind
		},
		data(){
			return{
        state: '',
        secdata: {},
        OprationSecVerify: false,
        oprationval: '',
        verifysecondshow: false,
        //status-绑定状态，switch二次验证开启状态
        emailswitch: '',
        phoneswitch: '',
        //弹窗显示状态
				phoneshow: false,
				phonetwoshow: false,
				googleshow: false,
				loginshow: false,
				moneyshow: false,
				moneytwoshow: false,
        moneybindshow: false,
        googleinfo: {}
			}
		},
    computed:{
      securylevel(){
        if (this.emailswitch && this.phoneswitch && this.googleswitch){
          return '高'
        }else if ((this.emailswitch  && this.phoneswitch && this.googleswitch==false) ||
          (this.emailswitch==false  && this.phoneswitch && this.googleswitch) ||
          (this.emailswitch  && this.phoneswitch==false && this.googleswitch) ||
        (this.emailswitch  && this.phoneswitch)){
          return  '中'
        }else
          // if((this.emailswitch == false && this.phoneswitch==false && this.googleswitch==false) ||
          // (this.emailswitch && this.phoneswitch==false && this.googleswitch==false) ||
          // (this.emailswitch==false && this.phoneswitch && this.googleswitch==false) ||
          // (this.emailswitch==false && this.phoneswitch==false && this.googleswitch))
        {
          return  '低'
        }
      },
      googlestatus(){
        if(this.info.google_status > 0){
          return '已绑定'
        }else{
          return '未绑定'
        }
      },
      googleswitch:{
        get: function () {
          if(this.info.google_status == 1){
            return false
          }else if(this.info.google_status == 2){
            return true
          }else{}
        },
        // setter
        set: function () {
          if(this.info.google_status == 1){
            return false
          }else if(this.info.google_status == 2){
            return true
          }else{}
        }

      }
    },
		methods: {
      Show(value) {
        api.checksecVerify().then(res => {
          if (res.status_code == 200) {
            if (value == 'googlev') {
              this.googleshow = true
              this.googleInfo()
              //  修改登陆密码
            }
            else if (value == 'login') {
              this.loginshow = true
              //  修改资金密码
            }
            else if (value == 'money') {
              this.moneyshow = true
            }
            else if (value == 'moneyTwo') {
              this.moneytwoshow = true
            }
            else if (value == 'moneyBind') {
              this.moneybindshow = true
            }
          }
          else if (res.status_code == 6001) {
            this.verifysecondshow = true;
            this.secdata = res.data;
            this.state = value;
          }
          else if (res.status_code == 5010) {
            this.$router.push({path: '/login'});
          }
        })
      },
      Close(value) {
        //  修改手机
        if (value == 'phone') {
          this.phoneshow = false
        } else if (value == 'phoneTwo') {
          this.phonetwoshow = false
        }
        //  绑定google
        else if (value == 'google') {
          this.googleshow = false
          //  修改登陆密码
        } else if (value == 'login') {
          this.loginshow = false
          //  修改资金密码
        } else if (value == 'money') {
          this.moneyshow = false
        } else if (value == 'moneyTwo') {
          this.moneytwoshow = false
        } else if (value == 'moneyBind') {
          this.moneybindshow = false
        } else if (value == 'verifysecond') {
          this.verifysecondshow = false
        } else if (value == 'opration') {
          this.OprationSecVerify = false
        }
      },
      // 二次验证安全验证
      changeSwitch(status) {
        if(status == 'email' || status == 'phone' || this.googlestatus == '已绑定'){
          api.checksecVerify().then(res => {
            if (res.status_code == '200') {
              this.OprationSecVerify = true;
              this.oprationval = status;
            }
            else if (res.status_code == '6001') {
              this.secdata = res.data
              this.verifysecondshow = true
              this.state = status
            }
          })
        }
      },
      //二次验证状态改变
      changestate(status) {
        let params = {status: status}
        api.secondVerify(params).then(res => {
          if(res.status_code == 200){
            this.apiagain()
          }else if(res.status_code == 6001){
            this.secdata = res.data;
            this.verifysecondshow = true;
            this.state = status;
          }
        })
      },
      //二次验证操作验证or弹窗显示
      showpopover(value) {
        if (value == 'googlev') {
          this.googleshow = true;
          this.googleInfo();
          //  修改登陆密码
        }
        else if (value == 'login') {
          this.loginshow = true
          //  修改资金密码
        }
        else if (value == 'money') {
          this.moneyshow = true
        }
        else if (value == 'email' || value == 'phone' || value == 'google') {
          this.OprationSecVerify = true;
          this.oprationval = value;
        }
        else if(value == 'moneyTwo'){
          this.moneytwoshow = true;
        }
        else if(value == 'moneyBind'){
          this.moneybindshow = true;
        }
      },
      apiagain() {
        this.$emit('reapi')
      },
      googleInfo() {
        api.googleInfo().then(res => {
          this.googleinfo = res.data
        })
      },
    },
      updated() {
        //邮箱二次验证状态
        if (this.info.email_status == 1) {
          this.emailswitch = false
        } else if (this.info.email_status == 2) {
          this.emailswitch = true
        } else {
        }
        //手机二次验证状态
        if (this.info.phone_status == 1) {
          this.phoneswitch = false
        } else if (this.info.phone_status == 2) {
          this.phoneswitch = true
        } else {
        }
        // //google绑定and二次验证状态
        // if(this.info.google_status == 1){
        //   // this.googlestatus = '已绑定'
        //   this.googleswitch = false
        // }else if(this.info.google_status == 2){
        //   this.googlestatus = '已绑定'
        //   this.googleswitch = true
        // }else{
        //   // this.googlestatus = '未绑定'
        // }
      }
	};
</script>

