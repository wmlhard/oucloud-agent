<template>
	<div class="googlebind">
		<div class="googlebindbox phone">
			<div class="head">
				<span class="icon-wrong close" @click="closeBind()"></span>
				<p class="transfer-header margin-bottom-20">绑定谷歌验证器</p>
				<p class="introduce">谷歌验证器是一款动态口令工具，工作原理类似短信动态验证，绑定后30S产生一个动态验证码，验证码可用于登录，提现，修改安全设置等操作的安全验证。</p>
			</div>
			<div class="content">
				<div class="item">
					<p class="introduce">1.下载谷歌验证器APP</p>
					<p class="secp">IOS用户登录APP Store搜索“Authenticator”下载。安卓用户登录应用商店或使用手机浏览器搜索“谷歌验证器”下载。</p>
					<div class="download">
						<button type="button"><span class="icon-apple appleGoogle"></span><p>APP Store</p></button>
						<button type="button"><span class="icon-google appleGoogle"></span><p>Google Play</p></button>
					</div>
				</div>
				<div class="item">
					<p class="introduce">2.在谷歌验证器添加秘钥并备份</p>
					<p class="secp">打开谷歌验证器，扫描下方二维码或手动输入下述秘钥添加验证令牌。</p>
					<p class="redp">秘钥用于手机更换或遗失时找回谷歌验证器，绑定前请务必讲下述密钥备份保存</p>
					<div class="DQcode">
						<img :src="qrurl" alt="">
						<div class="secretkey">
							<p>密钥</p>
							<p><span ref="secretGoogle">{{secretkey}}</span><span class="copy" @click="copySucc()">复制</span></p>
						</div>
					</div>
				</div>
				<div class="item">
          <Form ref="googleform" :model="googleform" :rules="ruleInline" label-position="top">
            <p class="introduce margin-bottom">3.输入谷歌验证器中6位验证码</p>
            <FormItem prop="verify" class="whiteTip">
              <Input type="text" placeholder="请输入谷歌验证码" v-model="googleform.verify">
              </Input>
            </FormItem>
            <div>
              <button type="button" class="transfer" @click="next">绑定</button>
              <button type="button" class="cancle" @click="closeBind()">取消</button>
            </div>

          </Form>
				</div>
			</div>
		</div>
    <div class="tips" v-show="copysuccshow">
      <span class="icon-success-gou"></span>
      <p>复制成功</p>
    </div>
	</div>
</template>

<script>
  import api from '../../../api.js'
	export default{
		name: 'Google',
    // props: ['googleinfo'],
    props:{
      googleinfo:{
        type:Object,
        default:{}
      }
    },
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
        googleform:{
          verify: ''
        },
        ruleInline:{
          verify: [
            {validator: validateway, trigger: 'blur'}
          ]
        },
        // secretkey: '',
        copysuccshow: false,
        // qrurl: ''
      }
    },
    computed:{
      secretkey(){
        return this.googleinfo.secret
      },
      qrurl(){
        return this.googleinfo.QrCode
      },
    },
		methods: {
			closeBind () {
				this.$emit('googleClose')
				this.googleform.verify = ''
        this.$refs['googleform'].resetFields()
			},
			copySucc() {
        let Url2 = this.$refs.secretGoogle.innerText;
        let oInput = document.createElement('input');
        oInput.value = Url2;
        document.body.appendChild(oInput);
        oInput.select(); // 选择对象
        document.execCommand("Copy"); // 执行浏览器复制命令
        oInput.className = 'oInput';
        oInput.style.display='none';
        this.$Message.success('复制成功');




				// this.copysuccshow = true;
    //     var _this = this;
    //     setTimeout(function(){
    //       _this.copysuccshow = false;
    //     },1500)
			},
      next() {
			  this.$refs['googleform'].validate((valid)=> {
          if (valid) {
            let params = {
              secret: this.secretkey,
              verify: this.googleform.verify
            }
            api.bindGoogle(params).then(res => {
              if (res.status_code == 200) {
                this.$Message.success('绑定成功!')
                this.closeBind()
                this.$emit('apiagain')
              }
            })
          }else {}
        })

      }
		}
	};
</script>

