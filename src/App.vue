<template>
  <div id="app">
      <mt-picker :slots="slots" @change="handleChange"></mt-picker>
  </div>
</template>
<script>
// import { Swipe, SwipeItem } from 'mint-ui';
export default {
  components:{
  },
  methods:{
    handleChange(index){
      console.log(index)
    }
  },
  data(){
    return {
      slots: [
        {
          flex: 1,
          values: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
          className: 'slot1',
          textAlign: 'right'
        }, {
          divider: true,
          content: '-',
          className: 'slot2'
        }, {
          flex: 1,
          values: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
          className: 'slot3',
          textAlign: 'left'
        }
      ]
    }
  }
}
</script>
