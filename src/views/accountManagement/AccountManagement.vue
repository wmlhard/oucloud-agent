<template>
	<div>
		<Content>
			<div class="accountmanagement">
				<div class="accountSettingInner">
					<basic-info :info="info"></basic-info>
					<account-security :info="info" @reapi="getAgentInfo"></account-security>
					<account-bind></account-bind>
				</div>
			</div>
		</Content>
	</div>

</template>
<script>
import BasicInfo from './components/BasicInfo.vue'
import AccountSecurity from './components/AccountSecurity.vue'
import AccountBind from './components/AccountBind.vue'
import api from '../../api'
import {mapState} from 'vuex'

export default{
	components: {
		BasicInfo,
		AccountSecurity,
		AccountBind
	},
	data(){
		return{
      info:{},
      timeroutApi:null
		}
	},
  computed:{
    ...mapState(['loginInfo','currentTitle','OTCOrderShow','dealShow','languagePackage','language']),
  },
	methods:{
    getAgentInfo() {
      this.timeroutApi = setTimeout(() => {
        api.getAgentInfo().then(res => {
          if (res.status_code == 200) {
            this.info = res.data
          }
        })
      }, 1000);
    }
	},
  created(){
	  this.getAgentInfo()
  }
}

</script>
