<template>
  <v-sheet color="transparent" style="height: 100%;" class="overflow-x-auto">
    <div class="maps" id="map" style="width:100%;height:98%;z-index:5;">
<!--      <menuTools style="transform: scale(0.85,0.85)"  v-drag></menuTools>-->
    </div>

  </v-sheet>
</template>

<script>

import menuTools from "@/components/skcx/menuTools";
  export default {
    name: 'skMap',
  methods: {
      //父组件左上角图标点击事件
    cblcf1: function () {
      this.drawer = !this.drawer
    }},
    data () {
      return {
      }
    },
    components:{
      menuTools
    },
    directives: {
      drag(el) {
        el.onmousedown = function (e) {
          let disx = e.pageX - el.offsetLeft
          let disy = e.pageY - el.offsetTop
          document.onmousemove = function (e) {
            el.style.left = e.pageX - disx + 'px'
            el.style.top = e.pageY - disy + 'px'
          }
          document.onmouseup = function () {
            document.onmouseup = document.onmousemove = null
          }
          e.preventDefault()
        }
      }
    },
  }
</script>
