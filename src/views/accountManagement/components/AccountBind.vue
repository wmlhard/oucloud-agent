<template>
	<div class="accountbind">
		<div class="apiManagementPadding whitepage ">
			<div class="titleLine">
				<div class="title">绑定账号</div>
				<div class="secretKey" @click="bindShow()">
					<p class="secretKeySpan">
						<span class="KeySpan icon-add-yellow"></span>
					</p>
					<p class="secretKeyZi">新建绑定</p>
				</div>
			</div>
			<div class="apiManagementContent">
				<ul class="apiContentdan contentLine">
					<li class="contentTitle">账号名称</li>
					<li class="contentTitle">绑定日期</li>
					<li class="contentTitle">操作</li>
				</ul>
        <div class="scroll">
          <ul class="apiContentdan apiXia contentLine"  v-for="(item,index) in list" :key="item.id">
            <li class="contentTitle">{{item.user_name}}</li>
            <li class="contentTitle">{{item.created_at}}</li>
            <li class="contentTitle" @click="deleteShow(item.agent_contacts_id)"><a class="opration">删除</a></li>
          </ul>
        </div>

			</div>
      <Page :total="total" class="pageOrder" @on-change="handleChange" :page-size="pageSize" v-if="total>5"></Page>
		</div>
		<bind v-show="bindshow" @closeBind="closeBind()" @bindlistAgain="getBindList"></bind>
		<Delete v-show="deleteshow" @closeDelete="closeDelete()" :deleteitem="deleteitem" @apiSecTime="getBindList"></Delete>
	</div>
</template>

<script>
import Bind from '../tanchuang/BindAccount.vue'
import Delete from '../tanchuang/Delete.vue'
import api from '../../../api'
	export default{
		name: 'AccountBind',
		components: {
			Bind,
			Delete
		},
		data() {
			return{
				bindshow: false,
				deleteshow: false,
        total: 0,
        pageSize:5,
        list: [],
        deleteitem: 0
			}
		},
		methods: {
			bindShow(){
        api.getAgentInfo().then(res => {
          if (res.status_code == 200) {
            this.bindshow = true
          }
        })
			},
			closeBind(){
				this.bindshow = false
			},
			deleteShow(data){
        api.getAgentInfo().then(res => {
          if (res.status_code == 200) {
            this.deleteitem = parseInt(data)
            this.deleteshow = true
          }
        })
      },
			closeDelete(){
				this.deleteshow = false
			},
      handleChange(page) {
			  this.getBindList(page)
      },
      getBindList(page){
			  let params={
			    limit: this.pageSize,
          page: page
        };
			  api.getBindList(params).then((res => {
			    this.list = res.data.list
          this.total = res.data.count
        }))
      }
		},
    mounted(){
		  this.getBindList()
    }
	};
</script>

