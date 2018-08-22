<template>
  <div class="mask">
    <div class="mask_bg"></div>
    <div class="slide-fade">
      <div class="cancelOrder"><span class="icon-wrong" @click="hide"></span></div>
      <div class="model">
        <div class="model-header">
          <slot name="modelSlotHeader"></slot>
        </div>
        <div class="model-content">
          <slot name="modelSlotContent"></slot>
        </div>
        <div class="model_footer">
          <slot name="modelSlotFooter"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "Model",
      data(){
          return{

          }
      },
      methods:{
        hide(){
          let flag = false;
          this.$emit('hide',flag)
        }
      }
    }
</script>

<style scoped>

</style>
