<template lang="html">
    <div class="Link-middle">
      <div class="Link-middle-top">
        <p>邀请链接</p>
        <p @click="showDialog">
          <span class="icon-add-yellow"></span>
          <span>新增</span>
        </p>
      </div>
      <div class="table-data">
        <Table :columns="columns1" :data="data1" ></Table>
      </div>
      <Page :total="total" class="pageOrder" @on-change="handleChange" :page-size="10" v-if="total>10"></Page>
      <AddNewLink :is-show="show" @hide="hideDialog" @tabDataListAdd="tabDataList1"></AddNewLink>
      <LinkTips v-show="tips"></LinkTips>
    </div>
</template>

<script>
  import AddNewLink from './AddNewLink'
  import LinkTips from '../../views/AgentLink/LinkTips'
  import api from '../../api'
  import Clipboard from 'clipboard';
  import res from '../../../static/config'
    export default {

      data(){
          return{
            show:false,
            tips:false,
            pageSize:10,
            total:10,
            columns1:[
              {
                title: '编码',
                key: 'agent_promo_id',
                minWidth: 40,
                render:(h,params)=>{
                  return h('div',[
                    h('span', {
                      style:{
                        color:'#ffffff',
                        fontSize:'14px',
                      }

                    },params.row.agent_promo_id)
                  ])
                }
              },
              {
                title: '创建时间',
                key: 'created_at',
                minWidth: 120,
                render:(h,params)=>{
                  return h('div',[
                    h('span', {
                      style:{
                        color:'#ffffff',
                        fontSize:'14px',
                      }

                    },params.row.created_at)
                  ])
                }
              },
              {
                title: '链接',
                key: 'agent_promo_url',
                minWidth: 700,
                render:(h,params)=>{
                  return h('div',[
                    h('span', {
                      attrs: {
                        class: 'activeSpan'
                      },
                      style:{
                        display:"block",
                        float:"left",
                        color:"#f3ba2f",
                        fontSize:"14px",
                      }

                    },
                      params.row.agent_promo_url = require('../../../static/config').url_agent_reg +'?code='+params.row.agent_promo),
                      h('button', {
                        props: {
                          type: 'button',

                        },
                        attrs:{
                          class:'btn',
                          'data-clipboard-text':params.row.agent_promo_url
                        },
                        style: {
                          width:'120px',
                          height:'27px',
                          color:'#ffffff',
                          background:'#f3ba2f',
                          borderRadius:'5px',
                          border:'none',
                          outline:'none',
                          float:'right',
                          marginRight:'10px',
                          cursor:'pointer'
                        },
                        on:{
                            click: () => {
                              this.copy(params.index);
                            }
                        }

                      }, '复制链接分享')

                  ])
                }
              },
            ],
            data1:[]
          }
      },
      components:{
          AddNewLink,
          LinkTips
      },
      methods:{
        url(){
          const domain = window.location.origin;
          if (domain.indexOf('bitboole') > -1) {
            return config.url_agent_reg;
          } else {
            return res.url_agent_reg;
          }
        },
        showDialog(){
          this.show = true;
        },
        //新增
        hideDialog(listData){
          const as = {agent_promo:listData};
          // this.data1.push(as);
          this.show = false;
        },

        //复制链接及复制成功弹出tips(未完)

        copy(){
          let clipboard = new Clipboard('.btn');
          clipboard.on('success',e=>{
            clipboard.destroy();
            this.showTips()
          });
          clipboard.on('error',e=>{
            clipboard.destroy();
            alert('请重新复制')
          })
        },

        showTips(){
          this.tips=true;
          var _this = this;
          setTimeout(function(){
            _this.tips = false;
          },1500)

        },

        //取数据渲染
        tabDataList(page){
          let p={
              limit:this.pageSize,
              page:page,
          };
            api.tabDataList(p).then(res=>{

              if (res.status_code == 200){
                this.data1 = res.data.list;
                this.total = res.data.count;

              }
          })
            .catch(error=>{

            })
        },
        // 分页
        handleChange(page) {
          this.tabDataList(page)
        },
        tabDataList1(){
          this.tabDataList(1)
        }
      },
      mounted(){
        this.tabDataList(1);

      }

    }
</script>

<style scoped lang="scss">

</style>
