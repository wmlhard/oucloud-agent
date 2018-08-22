<template>
	<div class="deletebindaccount">
		<div class="deletebindaccountbox">
			<span class="icon-wrong close" @click="closeDelete()"></span>
			<p class="transfer-header margin-bottom-20">删除提醒</p>
			<p class="tips">此次将会删除所有记录，是否删除</p>
			<button type="button" class="transfer" @click="deleteConfirm()">确定</button>
			<button type="button" class="cancle" @click="closeDelete()">取消</button>
		</div>
	</div>
</template>

<script>
  import api from '../../../api.js'
	export default{
		name: 'Delete',
    props:{
		  deleteitem: Number
    },
		data () {
            return {

            }
        },
		methods: {
			closeDelete () {
				this.$emit('closeDelete')
			},
      deleteConfirm () {
        let params= {id : this.deleteitem}

			  api.deletebind(params).then(res => {
          if(res.status_code == 200) {
            this.closeDelete()
            this.$emit('apiSecTime')
          }
        })
      }
		}
	};
</script>

