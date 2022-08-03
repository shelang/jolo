const convertNameToImage = (name) => {
  switch (name) {
    case 'Chrome Webview':
    case 'Chrome':
      return 'https://cdn-icons-png.flaticon.com/128/732/732205.png'
    case 'Firefox':
      return 'https://cdn-icons-png.flaticon.com/128/5968/5968827.png'
    case 'Safari':
      return 'https://cdn-icons-png.flaticon.com/128/564/564442.png'
    case 'MOBILE':
    case 'Phone':
      return 'https://cdn-icons-png.flaticon.com/512/545/545245.png'
    case 'desktop':
    case 'DESKTOP':
      return 'https://cdn-icons-png.flaticon.com/128/3474/3474360.png'
    case 'Samsung':
      return 'https://cdn-icons-png.flaticon.com/128/5969/5969116.png'
    case 'Apple':
      return 'https://cdn-icons-png.flaticon.com/128/0/747.png'
    case 'Xiaomi':
    case 'Huawei':
  }
}

export const PieChartConfig = (response) => {
  const series = [
    {
      allowPointSelect: true,

      name: '',
      color: '#006600',
      lineWidth: 1,
      marker: {
        enabled: false,
        symbol: 'circle',
        radius: 3,
        states: {
          hover: {
            enabled: true,
            lineWidth: 1,
          },
        },
      },
      data: response.data.map((item) => {
        return { name: item.key, y: Number(item.value) }
      }),
    },
  ]
  return {
    colors: ['#003f5c', '#58508d', '#bc5090', '#ff6361', '#ffa600'],
    chart: {
      type: 'pie',
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
    },
    title: {
      text: '',
    },
    credits: {
      enabled: false,
    },
    tooltip: {
      formatter: function () {
        console.log(this, 'this')
        return (
          'The value for <b>' +
          this.key +
          '</b> is <b>' +
          this.point.percentage.toFixed(2) +
          '</b>'
        )
      },
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
      backgroundColor: '#fff',
      borderRadius: 8,
      borderWidth: 1,
    },
    legend: {
      enabled: true,
      align: 'left',
      verticalAlign: 'top',
      layout: 'vertical',
      useHTML: true,
      // labelFormatter: function () {
      //   console.log(this.name, 'this name')
      //   if (this.name == 'Microsoft Internet Explorer') {
      //     return (
      //       '<div style="width:200px;"><span style="float:left; margin-left:10px"><img src = "http://cdn.onlinewebfonts.com/svg/img_508736.svg" width = "40px" height = "40px" style="background-color:' +
      //       this.color +
      //       ';"></span><span style="float:right;padding:9px">' +
      //       this.percentage.toFixed(2) +
      //       ' ' +
      //       this.y +
      //       '%</span></div>'
      //     )
      //   }
      //   if (this.name == 'Chrome') {
      //     return (
      //       '<div style="width:200px;"><span style="float:left; margin-left:10px"><img src = "http://cdn.onlinewebfonts.com/svg/img_159842.svg" width = "40px" height = "40px" style="background-color:' +
      //       this.color +
      //       ';"></span><span style="float:right;padding:9px">' +
      //       this.percentage.toFixed(2) +
      //       ' ' +
      //       this.y +
      //       '%</span></div>'
      //     )
      //   }
      //   if (this.name == 'Firefox') {
      //     return (
      //       '<div style="width:200px;"><span style="float:left; margin-left:10px"><img src = "http://cdn.onlinewebfonts.com/svg/img_261106.svg" width = "40px" height = "40px" style="background-color:' +
      //       this.color +
      //       ';"></span><span style="float:right;padding:9px">' +
      //       this.percentage.toFixed(2) +
      //       ' ' +
      //       this.y +
      //       '%</span></div>'
      //     )
      //   }
      // },
    },
    plotOptions: {
      pie: {
        innerSize: '50%',
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          connectorWidth: 2,
          distance: 60,
          enabled: false,
          alignTo: 'connectors',
          format: '<b>{point.name}</b>: {point.percentage:.1f} %',
          style: {
            color: '#a5a5a5',
            fontFamily: 'Open Sans',
            fill: '#a5a5a5',
            letterSpacing: '1px',
          },
        },
        showInLegend: true,
      },
    },
    series: series,
  }
}
