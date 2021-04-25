<template>
  <v-container fluid>
    <v-card width="70%"
            style="margin-top:10%;margin-left: 15%;background-image: linear-gradient(160deg, #0093E9 0%, #80D0C7 100%);opacity: 80%;height: 60%">
      <br><br><br>
      <v-row justify="center">
        <v-col className="text-h5" cols="12" sm="6" md="6">
          <v-text-field
              className="text-h5"
              v-model="loginForm.username"
              label="用户名"
              hint="请输入用户名"
              outlined
              :rules="[rules.required]"
              Centered
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="12" sm="6" md="6">
          <v-text-field
              v-model="loginForm.password"
              className="text-h5"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required]"
              :type="show1 ? 'text' : 'password'"
              name="input-10-1"
              label="密码"
              outlined
              hint="请输入密码"
              @click:append="show1 = !show1"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="12" sm="4" md="4">
          <v-btn block large outlined v-on:click="login" className="text-h5">
            <v-icon className="text-h5" left>mdi-account</v-icon>
            登录
          </v-btn>
        </v-col>

      </v-row>
      <br><br><br>
      <v-alert :type="alerttype" dismissible v-model="alert">
        {{ mytip }}
      </v-alert>
    </v-card>
  </v-container>
</template>
<script>


export default {

  name: "Login",
  data() {
    return {
      mytip: "",
      show1: false,
      alert: false,
      alerttype: "success",
      rules: {
        required: value => !!value || '必填.',
        min: v => v.length >= 8 || 'Min 8 characters',
        emailMatch: () => ('The email and password you entered don\'t match'),
      },
      loginForm: {
        username: '',
        password: '',
        expiresTime: new Date(Date.now() + 24 * 60 * 60 * 1000).getTime()

      },
      responseResult: []
    }
  },
  methods: {
    closeAlert() {
      if (this.alert) {
        this.alert = false;
      }
    },
    login() {
      const _this = this
      this.$axios
          .post('/login', {
            username: this.loginForm.username,
            password: this.loginForm.password
          })
          .then(successResponse => {
            if (successResponse.data.code === 200) {
              _this.$store.commit('login', _this.loginForm)
              this.mytip = "登录成功";
              this.alerttype = "success";
              this.alert = true;
              const path = this.$route.query.redirect;

              this.$router.replace({path: path === '/' || path === undefined ? '/index' : path}).catch(()=>{})
            } else {
              switch (successResponse.data.code){
                case 201:
                  this.mytip = "密码错误";
                  break;
                case -1:
                  this.mytip = "用户被临时禁用，请联系管理员";
                  break;
                  case -2:
                  this.mytip = "过期用户，请联系管理员";
                  break;
                  case -3:
                  this.mytip = "封停用户，请联系管理员";
                  break;
                  case 204:
                  this.mytip = "IP异常，请联系管理员";
                  break;
                case 202:
                  default:
                    this.mytip = "用户名或者密码错误";
                    break;
              }

              this.alerttype = "error";
              this.alert = true;
            }
          })
          // eslint-disable-next-line no-unused-vars
          .catch(failResponse => {
          })
    }
  },
  watch: {
    alert(val) {
      if (val) {
        setTimeout(this.closeAlert, 3000)
      }

    }
  },


}
</script>

<style lang="scss">

</style>