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
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
    },
    plotOptions: {
      pie: {
        size: '60%',
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          alignTo: 'connectors',
          format: '<b>{point.name}</b>: {point.percentage:.1f} %',
          style: {
            color: '#a5a5a5',
            fontFamily: 'Verdana',
            fill: '#a5a5a5',
            letterSpacing: '1px',
          },
        },
        showInLegend: false,
      },
    },
    series: series,
  }
}
