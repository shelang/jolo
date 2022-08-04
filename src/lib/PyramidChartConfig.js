export const PyramidChartConfig = (response) => {
  const series = {
    data: response.data.map((item) => {
      return [`${item.key}`, item.value]
    }),
  }

  return {
    colors: ['#003f5c', '#58508d', '#bc5090', '#ff6361', '#ffa600'],
    chart: {
      type: 'pyramid',
    },
    title: {
      text: '',
    },
    plotOptions: {
      series: {
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b> ({point.y:,.0f})',
          softConnector: true,
        },
        center: ['40%', '50%'],
        width: '60%',
      },
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
    series: series,
  }
}
