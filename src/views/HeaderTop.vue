<template>
  <Header class="header">
    <Menu mode="horizontal" theme="dark" class="header-item">
      <div class="logo_img"><div href=''><img src='./../../static/img/logo.png'><span> KF.com</span></div></div>
      <div class="item-list">
        <router-link to="/myPromotion" tag="li" class="ivu-menu-item">
          社区统计
        </router-link>
        <router-link to="/moreRecord" tag="li" class="ivu-menu-item">
          邀请记录
        </router-link>
        <router-link to="/InviteLink" tag="li" class="ivu-menu-item">
          社区设置
        </router-link>
        <router-link to="/accountManagement" tag="li" class="ivu-menu-item">
          社区管理
        </router-link>
      </div>
      <div class="item-padding"></div>
      <div class="item-set">

        <Dropdown v-if="loginInfo.isLogin">
          <a href="javascript:void(0)">
            {{loginInfo.name}}
            <!--用户昵称-->
          </a>
          <DropdownMenu slot="list">
            <DropdownItem><p @click="logout()">退出</p></DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <div class="slot-item" v-else>
          <router-link :to="{path:'/login'}"><span>登录</span></router-link>
        </div>
        <Dropdown>
          <a href="javascript:void(0)" class="language">
            简体中文
            <Icon type="ios-arrow-down"></Icon>
          </a>
          <DropdownMenu slot="list">
            <DropdownItem>简体中文</DropdownItem>
            <!-- <DropdownItem>繁体中文</DropdownItem>
            <DropdownItem>日本文</DropdownItem>
            <DropdownItem>韩语</DropdownItem>
            <DropdownItem>日本文</DropdownItem> -->
          </DropdownMenu>
        </Dropdown>
      </div>
    </Menu>
  </Header>
</template>
<script>
  import {mapState,mapGetters} from 'vuex'
  import api from '../api.js'
  export default {
    data() {
      return {

      }
    },
    computed: {
      ...mapState(['loginInfo','currentTitle','OTCOrderShow','dealShow','languagePackage','language']),
      ...mapGetters(['name']),
      // link(){
      //   return this.$route.path + ''
      // },
      // titleItem(){
      //   return this.languagePackage[this.language].titleItem
      // }
    },
    methods: {
      logout(){
        api.logout().then(res =>{
          if(res.status_code == 200){
            let params = {
              isLogin:false
            }
            this.$store.commit('LOGOUT',params);
            this.$router.push({
              path:'/login'
            })
          }
        })
      }
    },
    mounted() {
      let name = localStorage.getItem('username');
      if(name){
        this.$store.commit('loginInformation',name)
      }
    }
  }
</script>
<style lang="scss" scoped>

</style>
