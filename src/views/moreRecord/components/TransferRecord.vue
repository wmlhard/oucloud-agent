<template>
	<div class="transferrecord">
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
				<th>时间</th>
				<th>类型</th>
				<th>数量</th>
				<th>对象</th>
				<th class="opration">操作</th>
			</tr>
			<tr v-for="item of list" :key="item.id">
				<td>{{item.time}}</td>
				<td>{{item.type}}</td>
				<td>{{item.number}}</td>
				<td>{{item.object}}</td>
				<td class="opration"><a href="#" @click="check">查看</a></td>
			</tr>
		</table>
    <div class="page" v-if="list != ''">
      <Page :total="total" class="pageOrder" @on-change="handleChange" :page-size="10"></Page>
    </div>
    <div class="record_nomassage" v-if="list == ''">
      <span class="icon-no_info"></span>
      <p>暂无记录</p>
    </div>
    <check v-show="checkshow" @close="checkclose"></check>
	</div>
</template>

<script>
  import Check from './check.vue'
	export default{
		name: 'InvitedRecord',
    components: {
		  Check
    },
		data () {
      return {
        isA: false,
        checkshow: false,
        pageSize:10,
        total:0,
        list: []
      }
    },
    methods: {
      check() {
        this.checkshow = true
      },
      checkclose() {
        this.checkshow = false
      },
      tanchuangshow() {
        this.handleDownload()
        this.$emit('derive')
      },
      //导出
      handleDownload() {
        require.ensure([], () => {
          const { export_json_to_excel } = require('vendor/Export2Excel')
          const tHeader = ['时间', '类型', '数量', '对象']
          const filterVal = ['time', 'type',  'number', 'object']
          const list = this.list
          const data = this.formatJson(filterVal, list)
          export_json_to_excel(tHeader, data, '划转记录')
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

