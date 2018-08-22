<template>
	<div class="morerecord">
		<div class="content">
			<div class="record-header">
                <div class="head-left">
                    <a class="title " :class="{activea: isA}" @click="invitedShow()">邀请记录</a>
                    <a class="title" :class="{activeb: isB}" @click="returnShow()">返佣记录</a>
                    <a class="title" :class="{activec: isC}" @click="transferShow()">划转记录</a>
                </div>
			</div>
			<invited-record v-show="ashow" @derive="deriveshow"></invited-record>
			<return-commission v-show="bshow" @derive="deriveshow"></return-commission>
			<transfer-record v-show="cshow" @derive="deriveshow"></transfer-record>
      <tanchuang v-show= "tshow"></tanchuang>
		</div>
	</div>
</template>

<script>
import InvitedRecord from './components/InvitedRecord.vue'
import ReturnCommission from './components/ReturnCommission.vue'
import TransferRecord from './components/TransferRecord.vue'
import Tanchuang from './components/Tanchuang.vue'
	export default{
		name: 'MyPromotion',
		components: {
			 InvitedRecord,
			 ReturnCommission,
			 TransferRecord,
       Tanchuang
		},
		data () {
      return {
        ashow: true,
        bshow: false,
        cshow: false,
        tshow: false,
        isA: true,
        isB: false,
        isC: false,
        model1: '',
        model2: ''
      }
		},
		methods: {
			invitedShow() {
				this.ashow = true;
        this.bshow = false;
        this.cshow = false;
        this.isA = true;
        this.isB = false;
        this.isC = false
			},
			returnShow() {
				this.ashow = false;
        this.bshow = true;
        this.cshow = false;
        this.isA = false;
        this.isB = true;
        this.isC = false
			},
			transferShow() {
				this.ashow = false;
          this.bshow = false;
          this.cshow = true;
          this.isA = false;
          this.isB = false;
          this.isC = true
			},
      deriveshow() {
        this.tshow = true;
        var _this = this;
          setTimeout(function(){
            _this.tshow = false;
            },1500)
      },

		}
	};
</script>

