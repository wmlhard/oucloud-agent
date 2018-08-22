<template>
	<div>
		<div class="promotionmoney">
			<div class="left">
				<p class="big">获得返佣</p>
				<p class="small">KT<span>0.000000</span></p>
			</div>
			<div class="left margin-left-70">
				<p class="big">已转账</p>
				<p class="small">KT<span>0.078000</span></p>
			</div>
			<div class="right">
				<p class="big">可划转</p>
				<div>
					<p class="small">KT
						<span>0.078000</span>
					</p>
					<button @click="transfershow()">划转</button>
				</div>
			</div>
		</div>
		<transfer v-show="tshow" v-on:close="closeTransfer()"></transfer>
	</div>
</template>

<script>
import Transfer from './Transfer.vue'
	export default{
		name: 'Money',
		components: {
			Transfer
		},
		data() {
			return{
				tshow: false
			}
		},
		methods: {
			transfershow() {
				this.tshow = true
			},
			closeTransfer() {
				this.tshow = false
			}
		}
	};
</script>


