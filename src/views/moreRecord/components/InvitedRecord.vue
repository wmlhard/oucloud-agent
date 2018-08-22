<template>
	<div class="invitedrecord">
    <div class="head-right">
      <div class="dealrecord">
        <p>邀请编码</p>
        <input type="text" v-model="invitedcode"/>
        <p>邀请人</p>
        <input type="text" v-model="inviter"/>
        <Button type="primary" @click="search">搜索</Button>
        <Button type="primary" @click="tanchuangshow()">导出</Button>
      </div>
    </div>
		<div class="ontable">
			<p>邀请人数：{{invitednum}}</p>
			<p>获取佣金：{{gotmoney}} <span class="usdt">KT</span></p>
		</div>
		<table>
			<tr class="tr-first">
				<th>被邀请人昵称</th>
				<th>邀请人昵称</th>
				<th>邀请链接编码</th>
				<th>时间</th>
				<th class="state">状态</th>
			</tr>
			<tr v-for="item of list" :key="item.id">
				<td>{{item.user_name}}</td>
				<td>{{item.parent_user_name}}</td>
				<td>{{item.agent_promo}}</td>
				<td>{{item.created_at}}</td>
				<td class="state"
          :class="{active:item.status==2}"
        >{{item.status}}</td>
			</tr>
		</table>
    <div class="page" v-if="list != ''">
      <Page :total="total" class="pageOrder" @on-change="handleChange" :page-size="10"></Page>
    </div>
    <div class="record_nomassage" v-if="list == ''">
      <span class="icon-no_info"></span>
      <p>暂无记录</p>
    </div>
	</div>
</template>

<script>
  import api from '../../../api.js'
	export default{
		name: 'InvitedRecord',
		data () {
      return {
        invitednum: '',
        gotmoney: '-',
        pageSize:10,
        total:0,
        invitedcode: '',
        inviter: '',
        list: [],
        count:'',     //总条数
        list1:[]
      }
    },
    // filters:{
		//   state: function(value){
		//     if(value == 1){
		//       return '未交易'
    //     }else if(value == 2){
		//       return '已交易'
    //     }
    //   }
    // },
    watch:{
      // invitedcode: function (val) {
      //   if(val == ''){
      //     this.invitedlist()
      //   }
      // },
      // inviter: function (val) {
      //   if(val == ''){
      //     this.invitedlist()
      //   }
      // },
    },
    methods: {
      tanchuangshow() {
        // this.handleDownload()
        this.Downloadlist(1,this.count);
        this.$emit('derive')
      },

      //导出请求接口
      Downloadlist(page,count) {
        let params = {
          order: 'DESC',
          limit: count,
          page: page,
          user_name: '',
          parent_user_name: this.inviter,
          agent_promo: this.invitedcode
        }
        api.invitedlist(params).then(res => {
          console.log(res,'98');
          if (res.status_code == 200) {
            // this.list1 = res.data.list;
            require.ensure([], () => {
              const { export_json_to_excel } = require('vendor/Export2Excel')
              const tHeader = ['被邀请人昵称', '邀请人昵称', '邀请链接编码', '时间', '状态']
              const filterVal = ['user_name', 'parent_user_name', 'agent_promo', 'created_at', 'status']
              // const list = this.list1;
              const data = this.formatJson(filterVal, res.data.list);
              export_json_to_excel(tHeader, data, '邀请记录')
            })
          }
        })
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
      },
    //  分页
      handleChange(page) {
        this.invitedlist(page)
      },
      //搜索
      search() {
        this.invitedlist(1)
      },
      //渲染
      invitedlist(page) {
        let params = {
          order: 'DESC',
          limit: 10,
          page: page,
          user_name: '',
          parent_user_name: this.inviter,
          agent_promo: this.invitedcode
        }
        api.invitedlist(params).then(res => {
          console.log(res,'119')
          if (res.status_code == 200) {
            this.list = res.data.list;
            this.count = res.data.page.count;
            console.log(this.count,'count')
            this.list.forEach((val, index) => {
              val.status = val.status == 1 ? '已交易' : '未交易';
            });
            this.total = res.data.page.count
            if(res.data.page.count != ''){
              this.invitednum = res.data.page.count
            }else{
              this.invitednum = 0
            }
          }
        })
      }
    },
    mounted(){
		  this.invitedlist(1)
    }
	};
</script>

