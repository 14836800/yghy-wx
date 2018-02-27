<template>
  <div id="app">
      <keep-alive>
          <router-view v-if="$route.meta.notKeepAlive"></router-view>
      </keep-alive>
          <router-view v-if="!$route.meta.notKeepAlive"></router-view>
  </div>
</template>

<script>
import { wxCofig} from './components/common';
export default {
  name: 'App',
  beforeCreate() {
    //do something before creating vue instance
    wxCofig();
  },
}
</script>
<style>
#app {
  font-size: 0.6rem;
}
.slide-fade-enter-active {
  transition: all .5s ease .5s;
}
.slide-fade-leave-active {
  transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter
 {
  transform: translateX(100%);
}
.slide-fade-leave-to{
  transform: translateX(-100%);
}
</style>
