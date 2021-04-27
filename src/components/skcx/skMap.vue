<template>
  <v-card color="transparent" style="height: 100%;">
    <div class="maps" id="map" style="width:100%;height:98%;z-index:5;">
    <menuTools style="transform: scale(0.85,0.85)"  v-drag></menuTools>

    </div>

  </v-card>
</template>

<script>

import menuTools from "@/components/skcx/menuTools";
import "@/assets/styles/ol.css";
import "@/assets/styles/ol-layerswitcher.css";
import projzh from "@/assets/js/mypro";
import {Map, View} from "ol";
import Tile from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import {format} from 'ol/coordinate';
import MousePosition from "ol/control/MousePosition.js";
import FullScreen from "ol/control/FullScreen.js";
import ScaleLine from "ol/control/ScaleLine.js";
import Image from "ol/layer/Image";
import Point from 'ol/geom/Point';
import Group from "ol/layer/Group";
import Overlay from 'ol/Overlay'
import GeoJSON from "ol/format/GeoJSON";
import {fromLonLat, Projection, addProjection, addCoordinateTransforms} from 'ol/proj';
import Feature from 'ol/Feature';
import {Circle as CircleStyle, Fill, Stroke, Icon, Style, Text} from 'ol/style';
import {XYZ, Vector, ImageWMS, Cluster} from "ol/source";
  export default {
    name: 'skMap',
  methods: {
      //父组件左上角图标点击事件
    cblcf1: function () {

    },
    initMap() {
      const gcj02Extent = [-20037508.342789244, -20037508.342789244, 20037508.342789244, 20037508.342789244];
      const gcjMecator = new Projection({
        code: "GCJ-02",
        extent: gcj02Extent,
        units: "m"
      });
      addProjection(gcjMecator);
      addCoordinateTransforms("EPSG:4326", gcjMecator, projzh.ll2gmerc, projzh.gmerc2ll);
      this.map = new Map({
        layers: [new Group({
          // A layer must have a title to appear in the layerswitcher
          'title': '图层管理',
          'fold': 'open',
          layers: [
            new Group({
              title: '底图选择',
              'fold': 'open',
              layers: [
                new Group({
                  // A layer must have a title to appear in the layerswitcher
                  title: 'arcgis',
                  'fold': 'close',
                  layers: [
                    new Group({
                      // A layer must have a title to appear in the layerswitcher
                      title: 'arcgis矢量',
                      // Setting the layers type to 'base' results
                      // in it having a radio button and only one
                      // base layer being visibile at a time
                      type: 'base',
                      // Setting combine to true causes sub-layers to be hidden
                      // in the layerswitcher, only the parent is shown
                      combine: true,
                      visible: false,
                      layers: [
                        new Tile({
                          source: new XYZ({
                            attributions: '概述：彩色中文含兴趣点版中国基础地图//投影:WGS 1984 Web-Mercator//切片格式:PNG//服务类型:基础地图服务//数据提供商:易图通科技（北京）有限公司//数据获取时间:2020年春季//地图最后更新时间:2020年12月16日//版权所有:北京捷泰天域信息技术有限公司',
                            projection: 'EPSG:3857',
                            url:
                                'https://map.geoq.cn/arcgis/rest/services/ChinaOnlineCommunity/MapServer' +
                                '/tile/{z}/{y}/{x}',
                          }),
                        })
                      ]
                    }),
                    new Group({
                      // A layer must have a title to appear in the layerswitcher
                      title: 'arcgis夜间矢量',
                      // Setting the layers type to 'base' results
                      // in it having a radio button and only one
                      // base layer being visibile at a time
                      type: 'base',
                      // Setting combine to true causes sub-layers to be hidden
                      // in the layerswitcher, only the parent is shown
                      combine: true,
                      visible: false,
                      layers: [
                        new Tile({
                          source: new XYZ({
                            attributions: '概述：蓝黑色中文不含兴趣点版中国基础地图//投影:WGS 1984 Web-Mercator//切片格式:PNG//服务类型:基础地图服务//数据提供商:易图通科技（北京）有限公司//数据获取时间:2019年秋季//地图最后更新时间:2020年5月30日//版权所有:北京捷泰天域信息技术有限公司',
                            projection: 'EPSG:3857',
                            url:
                                'https://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetPurplishBlue/MapServer' +
                                '/tile/{z}/{y}/{x}',
                          }),
                        })
                      ]
                    }),
                    new Group({
                      // A layer must have a title to appear in the layerswitcher
                      title: 'arcgis地形（无标注）',
                      // Setting the layers type to 'base' results
                      // in it having a radio button and only one
                      // base layer being visibile at a time
                      type: 'base',
                      // Setting combine to true causes sub-layers to be hidden
                      // in the layerswitcher, only the parent is shown
                      combine: true,
                      visible: false,
                      layers: [
                        new Tile({
                          source: new XYZ({
                            attributions: 'Source: US National Park Servic',
                            projection: 'EPSG:3857',
                            url:
                                'http://server.arcgisonline.com/arcgis/rest/services/World_Physical_Map/MapServer' +
                                '/tile/{z}/{y}/{x}',
                          }),
                        })
                      ]
                    }),
                    new Group({
                      // A layer must have a title to appear in the layerswitcher
                      title: 'arcgis卫星',
                      // Setting the layers type to 'base' results
                      // in it having a radio button and only one
                      // base layer being visibile at a time
                      type: 'base',
                      // Setting combine to true causes sub-layers to be hidden
                      // in the layerswitcher, only the parent is shown
                      combine: true,
                      visible: false,
                      layers: [
                        new Tile({
                          source: new XYZ({
                            attributions: 'Source: US National Park Servic',
                            projection: 'EPSG:3857',
                            url:
                                'http://server.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer' +
                                '/tile/{z}/{y}/{x}',
                          }),
                        })
                      ]
                    }),
                    new Group({
                      // A layer must have a title to appear in the layerswitcher
                      title: 'arcgis地形（英文标注）',
                      // Setting the layers type to 'base' results
                      // in it having a radio button and only one
                      // base layer being visibile at a time
                      type: 'base',
                      // Setting combine to true causes sub-layers to be hidden
                      // in the layerswitcher, only the parent is shown
                      combine: true,
                      visible: false,
                      layers: [
                        new Tile({
                          source: new XYZ({
                            attributions: 'Sources: Esri, HERE, Garmin, Intermap, increment P Corp., GEBCO, USGS, FAO, NPS, NRCAN, GeoBase, IGN, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), (c) OpenStreetMap contributors, and the GIS User Community',
                            projection: 'EPSG:3857',
                            url:
                                'http://server.arcgisonline.com/arcgis/rest/services/World_Topo_Map/MapServer' +
                                '/tile/{z}/{y}/{x}',
                          }),
                        })
                      ]
                    }),
                  ]
                }),
                new Group({
                  // A layer must have a title to appear in the layerswitcher
                  title: '天地图',
                  'fold': 'close',
                  layers: [
                    new Group({
                      // A layer must have a title to appear in the layerswitcher
                      title: '天地图矢量图',
                      // Setting the layers type to 'base' results
                      // in it having a radio button and only one
                      // base layer being visibile at a time
                      type: 'base',
                      // Setting combine to true causes sub-layers to be hidden
                      // in the layerswitcher, only the parent is shown
                      combine: true,
                      visible: false,
                      layers: [
                        new Tile({
                          source: new XYZ({
                            url:
                                "https://t{0-7}.tianditu.gov.cn/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=ba066bf5232f046de98233ce68ce3eec",
                          }),
                        }),
                        new Tile({
                          source: new XYZ({
                            url:
                                "https://t{0-7}.tianditu.gov.cn/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=ba066bf5232f046de98233ce68ce3eec",
                          }),
                        }),
                      ]
                    }),
                    new Group({
                      // A layer must have a title to appear in the layerswitcher
                      title: '天地图地形图',
                      // Setting the layers type to 'base' results
                      // in it having a radio button and only one
                      // base layer being visibile at a time
                      type: 'base',
                      // Setting combine to true causes sub-layers to be hidden
                      // in the layerswitcher, only the parent is shown
                      combine: true,
                      visible: false,
                      layers: [
                        new Tile({
                          source: new XYZ({
                            url:
                                "https://t{0-7}.tianditu.gov.cn/DataServer?T=ter_w&x={x}&y={y}&l={z}&tk=ba066bf5232f046de98233ce68ce3eec",
                          }),
                        }),
                        new Tile({
                          source: new XYZ({
                            url:
                                "https://t{0-7}.tianditu.gov.cn/DataServer?T=cta_w&x={x}&y={y}&l={z}&tk=ba066bf5232f046de98233ce68ce3eec",
                          }),
                        }),
                      ]
                    }),
                    new Group({
                      // A layer must have a title to appear in the layerswitcher
                      title: '天地图卫星图带标注',
                      // Setting the layers type to 'base' results
                      // in it having a radio button and only one
                      // base layer being visibile at a time
                      type: 'base',
                      // Setting combine to true causes sub-layers to be hidden
                      // in the layerswitcher, only the parent is shown
                      combine: true,
                      visible: false,
                      layers: [
                        new Tile({
                          source: new XYZ({
                            url:
                                "https://t{0-7}.tianditu.gov.cn/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=ba066bf5232f046de98233ce68ce3eec",
                          }),
                        }),
                        new Tile({
                          title: '天地图标注',
                          source: new XYZ({
                            url:
                                "https://t{0-7}.tianditu.gov.cn/DataServer?T=cia_w&x={x}&y={y}&l={z}&tk=ba066bf5232f046de98233ce68ce3eec",
                          }),
                        }),
                      ]
                    }),
                  ]
                }),
                new Group({
                  // A layer must have a title to appear in the layerswitcher
                  title: '高德',
                  'fold': 'open',
                  layers: [
                    new Group({
                      // A layer must have a title to appear in the layerswitcher
                      title: '高德卫星图',
                      // Setting the layers type to 'base' results
                      // in it having a radio button and only one
                      // base layer being visibile at a time
                      type: 'base',
                      // Setting combine to true causes sub-layers to be hidden
                      // in the layerswitcher, only the parent is shown
                      combine: true,
                      visible: true,
                      layers: [
                        new Tile({
                          source: new XYZ({
                            projection: gcjMecator,
                            url:
                                "http://wprd0{1-4}.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scl=2&style=6 ",
                          }),
                        }),
                      ]
                    }),
                    new Group({
                      // A layer must have a title to appear in the layerswitcher
                      title: '高德矢量图',
                      // Setting the layers type to 'base' results
                      // in it having a radio button and only one
                      // base layer being visibile at a time
                      type: 'base',
                      // Setting combine to true causes sub-layers to be hidden
                      // in the layerswitcher, only the parent is shown
                      combine: true,
                      visible: false,
                      layers: [
                        new Tile({
                          source: new XYZ({
                            projection: gcjMecator,
                            url:
                                "http://wprd0{1-4}.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scl=2&style=7 ",

                          }),
                        }),
                      ]
                    }),
                  ]
                }),
                new Group({
                  // A layer must have a title to appear in the layerswitcher
                  title: '矢量底图',
                  type: 'base',
                  combine: true,
                  visible: false,
                  layers: [
                    new Image({
                      title: '边界',
                      opacity: 0.9,
                      source: new ImageWMS({
                        url: "http://172.18.142.202:8880/geoserver/yzhGeoserver/wms",
                        // Layers需要指定要显示的图层名
                        params: {LAYERS: "yzhGeoserver:ChinaBj", TILED: false},
                        // serverType明显为geoserver
                        serverType: "geoserver",

                        /* ratio:1*/
                      }),
                    }),
                    /*ew Vector({
                      visible: false,
                      source: new Stamen({
                        projection: 'EPSG:4326',
                        url: "../json/旗县界.json",
                        format:GeoJSON(),
                      }),
                    })*/

                  ]
                }),
                new Group({
                  // A layer must have a title to appear in the layerswitcher
                  title: '腾讯矢量图',
                  // Setting the layers type to 'base' results
                  // in it having a radio button and only one
                  // base layer being visibile at a time
                  type: 'base',
                  // Setting combine to true causes sub-layers to be hidden
                  // in the layerswitcher, only the parent is shown
                  combine: true,
                  visible: false,
                  layers: [
                    new Tile({
                      source: new XYZ({
                        projection: gcjMecator,
                        url:
                            "http://rt{0-3}.map.gtimg.com/realtimerender?z={z}&x={x}&y={-y}&type=vector&style=0",

                      }),
                    }),
                  ]
                }),


              ]
            }),
            new Group({
              title: '标注 ',
              'fold': 'open',
              visible: false,
              layers: [

                new Tile({
                  title: '天地图标注',
                  visible: false,
                  source: new XYZ({
                    url:
                        "https://t1.tianditu.gov.cn/DataServer?T=cia_w&x={x}&y={y}&l={z}&tk=ba066bf5232f046de98233ce68ce3eec",
                  }),
                }),
                new Tile({
                  title: '高德标注',
                  visible: false,
                  source: new XYZ({
                    projection: gcjMecator,
                    url:
                        "http://wprd0{1-4}.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scl=1&style=8",
                  }),
                }),
              ]
            }),
            new Group({
              // A layer must have a title to appear in the layerswitcher
              title: '边界',
              visible: false,
              'fold': 'open',
              layers: [
                new Image({
                  title: '边界',
                  visible: false,
                  opacity: 0.5,
                  source: new ImageWMS({
                    url: "http://172.18.142.202:8880/geoserver/yzhGeoserver/wms",
                    // Layers需要指定要显示的图层名
                    params: {LAYERS: "yzhGeoserver:ChinaBj", TILED: false},
                    // serverType明显为geoserver
                    serverType: "geoserver",

                    /* ratio:1*/
                  }),
                }),
                /*ew Vector({
                  visible: false,
                  source: new Stamen({
                    projection: 'EPSG:4326',
                    url: "../json/旗县界.json",
                    format:GeoJSON(),
                  }),
                })*/

              ]
            }),
          ]
        })
        ],
        target: 'map',
        view: new View({
          projection: "EPSG:4326",
          center: [111.70893300, 40.76124776],
          zoom: 10
        })
      });
      //鼠标获取坐标控件
      const mousePositionControl = new MousePosition({
        coordinateFormat: function (coordinate) {
          return format(coordinate, '经度:{x} 纬度:{y}', 4);
        },
        projection: 'EPSG:4326',
        /* ol-mouse-position*/
        undefinedHTML: '&nbsp;'
      });
//添加控件到地图
      this.map.addControl(mousePositionControl);
      this.map.addControl(new FullScreen({
        tipLabel: '全屏显示'
      }));
      this.map.addControl(new ScaleLine());
    },
    csClisc(){
      alert('cs')
    },
    },
    data () {
      return {
        map: {},
      }
    },
    mounted() {
      this.initMap();
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
