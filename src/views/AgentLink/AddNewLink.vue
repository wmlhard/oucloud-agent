<template>
    <div class="add-newlink" v-show="isShow">
      <div class="add-newlink-content">
        <span class="icon-wrong" @click="closeDialog"></span>
        <p>是否要新增邀请链接?</p>
        <span class="sure_btn" @click="sureBtn_add">确定</span>
        <span class="fou_btn" @click="cancelBtn">取消</span>
      </div>
    </div>
</template>

<script>
    import api from '../../api'
    export default {
        name: "addNewLink",
        props:['isShow'],
      data(){
          return{

          }
      },
      methods:{
        closeDialog(){
          this.$emit('hide')
        },
        cancelBtn(){
          this.$emit('hide')
        },
        sureBtn_add(){
          api.sureBtn_add().then(res=>{
            if (res.status_code == 200) {
              const listData = res.data;
              this.$emit('hide', listData);
              this.$emit('tabDataListAdd')
            }
          })
            .catch(error=>{

            });
        }
      }
    }
</script>

<style scoped lang="scss">

</style>
