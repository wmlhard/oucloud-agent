<template>
	<div class="promotiontransfer">
		<div class="promotionbox">
			<span class="icon-wrong close" @click="closeTransfer()"></span>
			<p class="transfer-header margin-bottom-20">划转</p>
      <Form ref="transferform" :model="transferform" :rules="ruleInline" label-position="top">
				<p class="input-title">划转金额</p>
				<div class="number">
          <FormItem prop="tranmoney" class="blackTip whiteTip">
            <Input type="text" placeholder="请输入划转金额" v-model="transferform.tranmoney">
            </Input>
          </FormItem>
					<p class="usdt">KT</p>
				</div>
				<p class="input-title" placeholder="请选择">划转对象</p>
        <FormItem prop="tranobj">
          <Select v-model="transferform.tranobj" style="width:370px">
                <Option v-for="item in tranObjList" :value="item.label" :key="item.id">{{ item.label }}</Option>
            </Select>
        </FormItem>
				<p class="input-title">支付密码</p>
        <FormItem prop="password" class="blackTip whiteTip">
          <Input type="password" placeholder="请输入支付密码" v-model="transferform.password">
          </Input>
        </FormItem>
				<button type="button" class="transfer" @click="confirm">确定</button>
				<button type="button" class="cancle" @click="closeTransfer()">取消</button>
			</Form>
		</div>
	</div>
</template>

<script>
	export default{
		name: 'Transfer',
		data () {
            return {
              transferform:{
                tranmoney: '',
                tranobj: '',
                password: ''
              },
              ruleInline: {
                tranmoney: [
                  {required: true, type:'number',message: '请输入划转金额', trigger: 'blur'}
                ],
                tranobj:[
                  {required: true, message:'请选择划转对象', trigger:'blur'}
                ],
                password: [
                  {required: true, message: '请输入支付密码', trigger: 'blur'}
                ]
              },
                tranObjList: [
                    {
                        id: '0001',
                        label: '划转对象'
                    },
                    {
                        id: '0002',
                        label: '划转对象'
                    }
                ],
                model1: ''
            }
        },
		methods: {
			closeTransfer () {
				this.$emit('close');
        this.$refs['transferform'].resetFields()
			},
      confirm() {
        this.$refs['transferform'].validate((valid)=> {
          if (valid) {
            this.closeTransfer()
          }
        })
      }
		}
	};
</script>


