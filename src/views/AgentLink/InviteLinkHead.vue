<template lang="html">
    <div class="Link-head">
      <div class="Link-head-top">
        <p>佣金返点<span v-model="yjfd">{{yjfd+'%'}}</span></p>
        <!--<button type="button" class="btn-set" @click="showDialog">设置</button>-->
      </div>
      <div class="Link-head-main">
        <p>{{p_wordOne}}</p>
        <p>{{p_wordTwo}}</p>
      </div>
      <div class="set-back" v-show="show">
        <div class="setBack-content">
          <span class="icon-wrong" @click="closeDialog"></span>
          <p>返佣设置</p>
          <p>佣金返点</p>
          <Form ref="SetBackform" :model="SetBackform" :rules="ruleInline">
            <FormItem prop="rebate_val" class='number_num'>
              <input type="number" :max="100" :min="0" placeholder="请输入返点值" v-model="SetBackform.rebate_val">
            </FormItem>
          </Form>
          <span class="sure_btn" @click="sureBtn">确定</span>
          <span class="fou_btn" @click="closeDialog">取消</span>
        </div>
      </div>
    </div>
</template>

<script>
  import api from '../../api'
    export default {
        name: "InviteLinkHead",
      data(){
        const validateBack = function (rule,value,callback) {
          if (!value){
            return callback(new Error('请输入返点值'));
          } else if (value<0 || value>100){
            return callback(new Error('请输入正确的返点值'))
          } else{
            callback();
          }
        };
        return{
          p_wordOne:"代理商设置的返点率将用于会员推广的用户在平台交易后，根据平台设置的成交手续费进行按比例提成佣金。",
          p_wordTwo:"例如：平台设置手续费提成为10%，则推广用户获取到的佣金返点=手续费*(1~10%)*代理商设置的返点率",
          show:false,
          yjfd:'',

          SetBackform:{
            rebate_val:'',
            number:true,
          },
          ruleInline: {
            rebate_val:[
              {required: true, validator: validateBack, trigger: 'blur'}
            ]

          },
        }
      },
      methods:{
        //  获取代理返点率信息 接口
        getreat() {
          api.getreat().then(res => {
            console.log(res.data.rebate,'h');
            if (res.status_code == 200){
              if (res.data.rebate==''){
                this.yjfd = '—'
              }else if (res.data.rebate!='') {
                this.yjfd = res.data.rebate;
              }
            }

          }).catch(error => {
            // console.log(error)
          })
        },



        showDialog(){
          this.show = true;
        },
        closeDialog(){
            this.show = false;
        },

        sureBtn(){
          this.$refs['SetBackform'].validate((valid)=>
          {
            if (valid) {
              let p = {
                rebate: this.SetBackform.rebate_val,
              };
              api.sureBtn(p).then(res => {
                if (res.status_code == 200) {
                  this.show = false;
                  this.yjfd = this.SetBackform.rebate_val;
                  // this.yjfd = res.data.rebate;
                  this.getreat();

                  console.log(res,'78')

                }

              })
                .catch(error => {

                })
            }else{}
          })

        }

      },
      mounted(){
        this.getreat();
      }
    }
</script>

<style scoped lang="scss">

</style>
