<template lang="html">
    <div class="invite-content">
      <content>
        <div class="invite-content-main">
          <router-view></router-view>
          <InviteLinkHead></InviteLinkHead>
          <InviteLinkMiddle></InviteLinkMiddle>
        </div>
      </content>
    </div>
</template>

<script>
  import InviteLinkHead from '../../views/AgentLink/InviteLinkHead'
  import InviteLinkMiddle from '../../views/AgentLink/InviteLinkMiddle'
    export default {
        name: "InviteLink",
      data(){
          return{
          }
      },
      components:{
        InviteLinkHead,
        InviteLinkMiddle
      },


    }
</script>

<style scoped lang="scss">

</style>
