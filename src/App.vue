<template>
  <div id="app">
<keep-alive >
    <router-view v-if="$route.meta.keepAlive"></router-view>
</keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
[v-cloak]{
  display: none!important;
}
#app{
  width: 100%;
}
p{
  margin: 0px;
}
</style>
