<template>
  <v-app style="height: 100%;">
    <v-main style="height: 100%;" id="mainDiv">

      <router-view></router-view>
    </v-main>
    <v-footer absolute>
      <v-row align="center" justify="center"> Copyright © 2021 杨泽华.All Rights Reserved.</v-row>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  components: {

  },
  mounted: function () {
    //这个是钩子函数
    //如果cartView函数要执行，必须先执行钩子函数
    //这个钩子函数完成了对cratView函数的调用
    //应该注意的是，使用mounted 并不能保证钩子函数中的 this.$el 在 document 中。为此还应该引入       Vue.nextTick/vm.$nextTick
    this.$nextTick(function () {
      this.texiao()
    })
  },
  methods: {
    texiao: function () {
      function get_attribute(node, attr, default_value) {
        return node.getAttribute(attr) || default_value;
      }
      //封装方法，压缩之后减少文件大小
      function get_by_id(name) {
        return document.getElementById(name);
      }
      function get_by_tagname(name) {
        return document.getElementsByTagName(name);
      }
      //获取配置参数
      function get_config_option() {
        var scripts = get_by_tagname("script"),
            script_len = scripts.length,
            script = scripts[script_len - 1]; //当前加载的script
        return {
          l: script_len, //长度，用于生成id用
          z: get_attribute(script, "zIndex", -1), //z-index
          o: get_attribute(script, "opacity", 0.7), //opacity
          c: get_attribute(script, "color", "10,120,240"), //color
          n: get_attribute(script, "count", 200) //count
        };
      }
      //设置canvas的高宽
      function set_canvas_size() {
        canvas_width = the_canvas.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
            canvas_height = the_canvas.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
      }

      //绘制过程
      function draw_canvas() {
        context.clearRect(0, 0, canvas_width, canvas_height);
        //随机的线条和当前位置联合数组
        var all_array = [current_point].concat(random_lines);
        var e, i, d, x_dist, y_dist, dist; //临时节点
        //遍历处理每一个点
        random_lines.forEach(function (r) {
          r.x += r.xa,
              r.y += r.ya, //移动
              r.xa *= r.x > canvas_width || r.x < 0 ? -1 : 1,
              r.ya *= r.y > canvas_height || r.y < 0 ? -1 : 1, //碰到边界，反向反弹
              context.fillRect(r.x - 0.5, r.y - 0.5, 1, 1); //绘制一个宽高为1的点
          for (i = 0; i < all_array.length; i++) {
            e = all_array[i];
            var mycol = "255,190,0";
            if (i % 4=== 0) {
              mycol = config.c;
            }
            else if (i % 4 === 1) {
              mycol = "0,255,2";
            }
            else if (i % 4 === 2) {
              mycol = "255,0,0";
            }
            else if (i % 4 === 3) {
              mycol = "75,0,25";
            }
            //不是当前点
            if (r !== e && null !== e.x && null !== e.y) {
              x_dist = r.x - e.x, //x轴距离 l
                  y_dist = r.y - e.y, //y轴距离 n
                  dist = x_dist * x_dist + y_dist * y_dist; //总距离, m
              dist < e.max && (e === current_point && dist >= e.max / 2 && (r.x -= 0.03 * x_dist, r.y -= 0.03 * y_dist), //靠近的时候加速
                  d = (e.max - dist) / e.max,
                  context.beginPath(),
                  context.lineWidth = d*2/3 ,

                  context.strokeStyle = "rgba(" + mycol + "," + (d + 0.3) + ")",
                  context.moveTo(r.x, r.y),
                  context.lineTo(e.x, e.y),
                  context.stroke());
            }
          }
          all_array.splice(all_array.indexOf(r), 1);

        }), frame_func(draw_canvas);
      }
      //创建画布，并添加到body中
      var the_canvas = document.createElement('canvas'), //画布
          config = get_config_option(), //配置
          canvas_id = "c_n" + config.l, //canvas id

          context = the_canvas.getContext("2d"), canvas_width, canvas_height,
          frame_func = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (func) {
            window.setTimeout(func, 1000 / 45);
          }, random = Math.random,
          current_point = {
            x: null, //当前鼠标x
            y: null, //当前鼠标y
            max: 20000
          };

      the_canvas.id = canvas_id;
      the_canvas.style.cssText = "width: 100%; height: 100%; position: absolute;" + config.z + ";opacity:" + config.o+";background-image: linear-gradient(79deg, #ffffff 0%, #dee2e4 51%, #ebf0f2 100%);";
      //var fsdf=get_by_id("mainDiv").childNodes[0];
      //fsdf.id;
      //get_by_id("mainDiv").appendChild(the_canvas);
      get_by_id("mainDiv").insertBefore(the_canvas,get_by_id("mainDiv").childNodes[0]);
      //初始化画布大小

      set_canvas_size(), window.onresize = set_canvas_size;
      //当时鼠标位置存储，离开的时候，释放当前位置信息
      window.onmousemove = function (e) {
        e = e || window.event, current_point.x = e.clientX, current_point.y = e.clientY;
      }, window.onmouseout = function () {
        current_point.x = null, current_point.y = null;
      };
      //随机生成config.n条线位置信息
      for (var random_lines = [], i = 0; config.n > i; i++) {
        var x = random() * canvas_width, //随机位置
            y = random() * canvas_height,
            xa = 2 * random() - 1, //随机运动方向
            ya = 2 * random() - 1;
        random_lines.push({
          x: x,
          y: y,
          xa: xa,
          ya: ya,
          max: 6000 //沾附距离
        });
      }
      //重绘
      setTimeout(function () {
        draw_canvas();
      }, 200);
    }

  },
  data: () => ({
    //
  }),
};
</script>
<style>

.canvas { width: 100%; height: 100%; position: absolute;
  background: linear-gradient(calc(377deg), rgba(163, 163, 163, 0.09) 0%, rgba(163, 163, 163, 0.09) 33.3%, rgba(100, 100, 100, 0.09) 33.3%, rgba(100, 100, 100, 0.09) 66.6%, rgba(162, 162, 162, 0.09) 66.6%, rgba(162, 162, 162, 0.09) 99%), linear-gradient(calc(586deg), rgba(193, 193, 193, 0.06) 0%, rgba(193, 193, 193, 0.06) 33.3%, rgba(169, 169, 169, 0.06) 33.3%, rgba(169, 169, 169, 0.06) 66.6%, rgba(92, 92, 92, 0.06) 66.6%, rgba(92, 92, 92, 0.06) 99%), linear-gradient(calc(567deg), rgba(45, 45, 45, 0.03) 0%, rgba(45, 45, 45, 0.03) 33.3%, rgba(223, 223, 223, 0.03) 33.3%, rgba(223, 223, 223, 0.03) 66.6%, rgba(173, 173, 173, 0.03) 66.6%, rgba(173, 173, 173, 0.03) 99%), linear-gradient(calc(462deg), rgba(226, 226, 226, 0.06) 0%, rgba(226, 226, 226, 0.06) 33.3%, rgba(81, 81, 81, 0.06) 33.3%, rgba(81, 81, 81, 0.06) 66.6%, rgba(186, 186, 186, 0.06) 66.6%, rgba(186, 186, 186, 0.06) 99%), linear-gradient(calc(486deg), rgba(225, 225, 225, 0.04) 0%, rgba(225, 225, 225, 0.04) 33.3%, rgba(95, 95, 95, 0.04) 33.3%, rgba(95, 95, 95, 0.04) 66.6%, rgba(39, 39, 39, 0.04) 66.6%, rgba(39, 39, 39, 0.04) 99%), linear-gradient(calc(479deg), rgba(184, 184, 184, 0.06) 0%, rgba(184, 184, 184, 0.06) 33.3%, rgba(0, 0, 0, 0.06) 33.3%, rgba(0, 0, 0, 0.06) 66.6%, rgba(140, 140, 140, 0.06) 66.6%, rgba(140, 140, 140, 0.06) 99.9%), linear-gradient(calc(612deg), rgba(40, 40, 40, 0.07) 0%, rgba(40, 40, 40, 0.07) 33.3%, rgba(214, 214, 214, 0.07) 33.3%, rgba(214, 214, 214, 0.07) 66.6%, rgba(190, 190, 190, 0.07) 66.6%, rgba(190, 190, 190, 0.07) 99.9%), linear-gradient(calc(505deg), rgba(230, 230, 230, 0) 0%, rgba(230, 230, 230, 0) 33.3%, rgba(241, 241, 241, 0) 33.3%, rgba(241, 241, 241, 0) 66.6%, rgba(55, 55, 55, 0) 66.6%, rgba(55, 55, 55, 0) 99%), linear-gradient(calc(279deg), rgb(38, 38, 227), rgb(11, 186, 239));
}

</style>