<template>
	<div class="returncommission">
    <div class="head-right">
      <div class="dealrecord">
        <p>邀请编码</p>
        <input type="text" />
        <p>邀请人</p>
        <input type="text" />
        <div class="timesearch">
          <p>时间</p>
          <Row class="time">
            <Col span="12">
            <DatePicker type="date" placeholder="请选择" style="width: 100px"></DatePicker>
            </Col>
          </Row>
          <span>-</span>
          <Row class="time">
            <Col span="12">
            <DatePicker type="date" placeholder="请选择" style="width: 100px"></DatePicker>
            </Col>
          </Row>
        </div>
        <Button type="primary">搜索</Button>
        <Button type="primary" @click="tanchuangshow()" v-if="false">导出</Button>
      </div>
    </div>
		<div class="ontable">
			<p>邀请人数：-</p>
			<p>获取佣金：- <span class="usdt">KT</span></p>
		</div>
		<table>
			<tr class="tr-first">
				<th>被邀请人昵称</th>
				<th>邀请人昵称</th>
				<th>邀请链接编码</th>
				<th>时间</th>
				<th class="money">佣金（KT）</th>
			</tr>
			<tr v-for="item of list" :key="item.id">
				<td>{{item.inviteename}}</td>
				<td>{{item.invitername}}</td>
				<td>{{item.code}}</td>
				<td>{{item.date}}</td>
				<td class="money">{{item.money}}</td>
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
	export default{
		name: 'ReturnCommission',
		data () {
      return {
        pageSize:10,
        total:0,
        list: []
      }
    },
    methods: {
      tanchuangshow() {
        this.handleDownload()
        this.$emit('derive')
      },
      //导出
      handleDownload() {
        require.ensure([], () => {
          const { export_json_to_excel } = require('vendor/Export2Excel')
          const tHeader = ['被邀请人昵称', '邀请人昵称', '邀请链接编码', '时间', '佣金（USDT）']
          const filterVal = ['inviteename', 'invitername', 'code', 'date', 'money']
          const list = this.list
          const data = this.formatJson(filterVal, list)
          export_json_to_excel(tHeader, data, '返佣记录')
        })
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
      },
      //  分页
      handleChange(page) {
        // this.invitedlist(page)
      }
    }
	};
</script>

