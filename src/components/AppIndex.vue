<template>
  <div style="height:100%;">
    <v-app-bar
        height="100px"
        color="blue lighten-1"
    >
      <v-row align="center" no-gutters style="height: 120px">
        <v-col cols="6">
          <v-row align="center" no-gutters >
            <v-app-bar-nav-icon @click.stop="cblcf"></v-app-bar-nav-icon>
            <v-toolbar-title  class="text-h4">
              呼和浩特市气象数据查询系统
            </v-toolbar-title>
          </v-row>
        </v-col>
        <v-col cols="6">
          <v-row  no-gutters align="center" style="height: 100px" justify="start" >
            <v-card  elevation="0" color="transparent" width="130px"  router-link :to="encodeURI('/实况查询')">
              <v-row justify="center" style="height: 65px" align="end" no-gutters>
                <v-icon size="50" class>mdi-cloud-outline</v-icon>
              </v-row>
              <v-row justify="center" style="height: 35px" align="start" no-gutters>
                实况查询
              </v-row>
            </v-card>
            <v-card  elevation="0" color="transparent" width="130px"  router-link :to="encodeURI('/数据统计')">
              <v-row justify="center" style="height: 65px" align="end" no-gutters>
                <v-icon size="50" class>mdi-chart-areaspline</v-icon>
              </v-row>
              <v-row justify="center" style="height: 35px" align="start" no-gutters>
                数据统计
              </v-row>
            </v-card>
          </v-row>
        </v-col>
      </v-row>
    </v-app-bar>
    <v-container fluid style="height: 95%;">
      <router-view ref="myzjm"></router-view>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'AppIndex',
  methods: {
  cblcf: function () {
    this.$refs.myzjm.cblcf1();
  }}

}
</script>

<style scoped>

</style>
