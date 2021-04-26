<template>
  <div fluid style="height: 100%;">
    <v-app-bar

        color="blue lighten-1"
    >
      <v-app-bar-nav-icon @click.stop="cblcf"></v-app-bar-nav-icon>
      <v-toolbar-title  class="text-h4">
        呼和浩特市气象数据查询系统
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <v-menu auto :offset-y=true open-on-hover  transition="slide-y-transition" >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
              v-bind="attrs"
              v-on="on"
              router-link :to="encodeURI('/实况查询')"
              class="text-h5"
          >
            实况查询
          </v-btn>
        </template>
      </v-menu>
      <v-menu auto :offset-y=true open-on-hover  transition="slide-y-transition" >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
              v-bind="attrs"
              v-on="on"
              router-link :to="encodeURI('/数据统计')"
              class="text-h5"
          >
            数据统计
          </v-btn>
        </template>
      </v-menu>

      <v-btn icon >
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>
    <v-container fluid style="height: 90%;">
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
