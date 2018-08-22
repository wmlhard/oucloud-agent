<template>
  <div id="app">
    <div class="layout">
      <Layout>
        <Header></Header>
        <div class="content">
          <router-view></router-view>
        </div>
        <Footer></Footer>
      </Layout>
    </div>
  </div>
</template>

<script>
  import Header from '@/views/HeaderTop'
  import Footer from '@/views/Footer'
export default {
  name: 'App',
  data(){
    return{

    }
  },
  components:{
    Header,
    Footer
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
