
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['exports', 'echarts'], factory);
  } else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {
    // CommonJS
    factory(exports, require('echarts'));
  } else {
    // Browser globals
    factory({}, root.echarts);
  }
}(this, function (exports, echarts) {
  var log = function (msg) {
    if (typeof console !== 'undefined') {
      console && console.error && console.error(msg);
    }
  };
  if (!echarts) {
    log('ECharts is not Loaded');
    return;
  }
  echarts.registerTheme('yzhBlack', {
    "color": [
      "#fcae34",
      "#01c2f9",
      "#12e78c",
      "#f4cb29",
      "#4b7cf3",
      "#d325dc",
      "#213de8",
      "#f64b4b",
      "#e8df44",
      "#0bce01",
      "#ef2744"
    ],
    "backgroundColor": {
      type: 'linear',
      x: 0,
      y: 0,
      x2: 0,
      y2: 1,
      colorStops: [{
        offset: 0, color: 'rgba(7,116,114,0.3)' // 0% 处的颜色
      }, {
        offset: 0.4, color: 'rgba(2,16,16,0.3)' // 100% 处的颜色
      }, {
        offset: 1, color: 'rgba(9,39,49,0.1)' // 100% 处的颜色
      }]
    },
    "textStyle": {},
    "title": {
      "textStyle": {
        "color": "#ffffff"
      },
      "subtextStyle": {
        "color": "#ffffff"
      }
    },
    "line": {
      "itemStyle": {
        "borderWidth": 1
      },
      "lineStyle": {
        "width": 2
      },
      "symbolSize": 4,
      "symbol": "emptyCircle",
      "smooth": true
    },
    "radar": {
      "itemStyle": {
        "borderWidth": 1
      },
      "lineStyle": {
        "width": 2
      },
      "symbolSize": 4,
      "symbol": "emptyCircle",
      "smooth": true
    },
    "bar": {
      "itemStyle": {
        "barBorderWidth": 0,
        "barBorderColor": "#ccc"
      }
    },
    "pie": {
      "itemStyle": {
        "borderWidth": 0,
        "borderColor": "#ccc"
      }
    },
    "scatter": {
      "itemStyle": {
        "borderWidth": 0,
        "borderColor": "#ccc"
      }
    },
    "boxplot": {
      "itemStyle": {
        "borderWidth": 0,
        "borderColor": "#ccc"
      }
    },
    "parallel": {
      "itemStyle": {
        "borderWidth": 0,
        "borderColor": "#ccc"
      }
    },
    "sankey": {
      "itemStyle": {
        "borderWidth": 0,
        "borderColor": "#ccc"
      }
    },
    "funnel": {
      "itemStyle": {
        "borderWidth": 0,
        "borderColor": "#ccc"
      }
    },
    "gauge": {
      "itemStyle": {
        "borderWidth": 0,
        "borderColor": "#ccc"
      }
    },
    "candlestick": {
      "itemStyle": {
        "color": "#c23531",
        "color0": "#314656",
        "borderColor": "#c23531",
        "borderColor0": "#314656",
        "borderWidth": 1
      }
    },
    "graph": {
      "itemStyle": {
        "borderWidth": 0,
        "borderColor": "#ccc"
      },
      "lineStyle": {
        "width": 1,
        "color": "#aaaaaa"
      },
      "symbolSize": 4,
      "symbol": "emptyCircle",
      "smooth": true,
      "color": [
        "#fcae34",
        "#01c2f9",
        "#12e78c",
        "#f4cb29",
        "#4b7cf3",
        "#d325dc",
        "#213de8",
        "#d46d01",
        "#d46d01",
        "#0bce01",
        "#fa4660",
        "#02eaf1",
      ],
      "label": {
        "color": "#eeeeee"
      }
    },
    "map": {
      "itemStyle": {
        "normal": {
          "areaColor": "#eeeeee",
          "borderColor": "#444444",
          "borderWidth": 0.5
        },
        "emphasis": {
          "areaColor": "rgba(255,215,0,0.8)",
          "borderColor": "#444444",
          "borderWidth": 1
        }
      },
      "label": {
        "normal": {
          "textStyle": {
            "color": "#000000"
          }
        },
        "emphasis": {
          "textStyle": {
            "color": "rgb(100,0,0)"
          }
        }
      }
    },
    "geo": {
      "itemStyle": {
        "normal": {
          "areaColor": "#eeeeee",
          "borderColor": "#444444",
          "borderWidth": 0.5
        },
        "emphasis": {
          "areaColor": "rgba(255,215,0,0.8)",
          "borderColor": "#444444",
          "borderWidth": 1
        }
      },
      "label": {
        "normal": {
          "textStyle": {
            "color": "#000000"
          }
        },
        "emphasis": {
          "textStyle": {
            "color": "#ffffff"
          }
        }
      }
    },
    "categoryAxis": {
      "axisLine": {
        "show": true,
        "lineStyle": {
          "color": "#c9c9c9"
        }
      },
      "axisTick": {
        "show": false,
        "lineStyle": {
          "color": "#333"
        }
      },
      "axisLabel": {
        "show": true,
        "textStyle": {
          "color": "#c9c9c9"
        }
      },
      "splitLine": {
        "show": false,
        "lineStyle": {
          "color": [
            "#ccc"
          ]
        }
      },
      "splitArea": {
        "show": false,
        "areaStyle": {
          "color": [
            "rgba(250,250,250,0.3)",
            "rgba(200,200,200,0.3)"
          ]
        }
      }
    },
    "valueAxis": {
      "axisLine": {
        "show": true,
        "lineStyle": {
          "color": "#c9c9c9"
        }
      },
      "axisTick": {
        "show": false,
        "lineStyle": {
          "color": "#333"
        }
      },
      "axisLabel": {
        "show": true,
        "textStyle": {
          "color": "#c9c9c9"
        }
      },
      "splitLine": {
        "show": false,
        "lineStyle": {
          "color": [
            "#e6e6e6"
          ]
        }
      },
      "splitArea": {
        "show": false,
        "areaStyle": {
          "color": [
            "rgba(250,250,250,0.3)",
            "rgba(200,200,200,0.3)"
          ]
        }
      }
    },
    "logAxis": {
      "axisLine": {
        "show": true,
        "lineStyle": {
          "color": "#c9c9c9"
        }
      },
      "axisTick": {
        "show": false,
        "lineStyle": {
          "color": "#333"
        }
      },
      "axisLabel": {
        "show": true,
        "textStyle": {
          "color": "#c9c9c9"
        }
      },
      "splitLine": {
        "show": false,
        "lineStyle": {
          "color": [
            "#e6e6e6"
          ]
        }
      },
      "splitArea": {
        "show": false,
        "areaStyle": {
          "color": [
            "rgba(250,250,250,0.3)",
            "rgba(200,200,200,0.3)"
          ]
        }
      }
    },
    "timeAxis": {
      "axisLine": {
        "show": true,
        "lineStyle": {
          "color": "#c9c9c9"
        }
      },
      "axisTick": {
        "show": false,
        "lineStyle": {
          "color": "#333"
        }
      },
      "axisLabel": {
        "show": true,
        "textStyle": {
          "color": "#c9c9c9"
        }
      },
      "splitLine": {
        "show": false,
        "lineStyle": {
          "color": [
            "#e6e6e6"
          ]
        }
      },
      "splitArea": {
        "show": false,
        "areaStyle": {
          "color": [
            "rgba(250,250,250,0.3)",
            "rgba(200,200,200,0.3)"
          ]
        }
      }
    },
    "toolbox": {
      "iconStyle": {
        "normal": {
          "borderColor": "#999999"
        },
        "emphasis": {
          "borderColor": "#666666"
        }
      }
    },
    "legend": {
      "textStyle": {
        "color": "#eaeaea"
      }
    },
    "tooltip": {
      "axisPointer": {
        "lineStyle": {
          "color": "#cccccc",
          "width": 1
        },
        "crossStyle": {
          "color": "#cccccc",
          "width": 1
        }
      }
    },
    "timeline": {
      "lineStyle": {
        "color": "#87f7cf",
        "width": 1
      },
      "itemStyle": {
        "normal": {
          "color": "#87f7cf",
          "borderWidth": 1
        },
        "emphasis": {
          "color": "#f7f494"
        }
      },
      "controlStyle": {
        "normal": {
          "color": "#87f7cf",
          "borderColor": "#87f7cf",
          "borderWidth": 0.5
        },
        "emphasis": {
          "color": "#87f7cf",
          "borderColor": "#87f7cf",
          "borderWidth": 0.5
        }
      },
      "checkpointStyle": {
        "color": "#fc97af",
        "borderColor": "rgba(252,151,175,0.3)"
      },
      "label": {
        "normal": {
          "textStyle": {
            "color": "#87f7cf"
          }
        },
        "emphasis": {
          "textStyle": {
            "color": "#87f7cf"
          }
        }
      }
    },
    "visualMap": {
      "color": [
        "#fc97af",
        "#87f7cf"
      ]
    },
    "dataZoom": {
      "backgroundColor": "rgba(255,255,255,0)",
      "dataBackgroundColor": "rgba(14,156,236,1)",
      "fillerColor": "rgba(114,204,255,0.2)",
      "handleColor": "#299bef",
      "handleSize": "100%",
      "textStyle": {
        "color": "#333333"
      }
    },
    "markPoint": {
      "label": {
        "color": "#eeeeee"
      },
      "emphasis": {
        "label": {
          "color": "#eeeeee"
        }
      }
    }
  });
}));
