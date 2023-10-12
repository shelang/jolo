export const ColumnChartConfig = (response) => {
  return {
    colors: ['#003f5c', '#ffa600', '#bc5090', '#ff6361', '#ffa600'],

    chart: {
      zoomType: 'xy',
    },
    title: {
      text: '',
    },
    subtitle: {
      text: '',
    },
    xAxis: {
      categories: response.map((item) => {
        return item.name
      }),
      title: {
        text: null,
      },
    },
    yAxis: [
      {
        // Primary yAxis

        title: {
          text: 'click counts',
        },
      },
      {
        // Secondary yAxis
        title: {
          text: 'unique click count',
        },

        opposite: true,
      },
    ],
    tooltip: {
      headerFormat: '',
      pointFormat:
        '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b>',
    },
    plotOptions: {
      series: {
        borderWidth: 0,
        dataLabels: {
          enabled: true,
          format: '{point.y}',
          style: {
            color: '#dedede',
            fontFamily: 'Verdana',
            fill: '#dedede',
            letterSpacing: '1px',
          },
        },
      },
    },
    legend: {
      enabled: false,
    },
    series: [
      {
        name: 'click counts',
        type: 'column',
        yAxis: 1,
        data: response.map((item) => item.count),
        tooltip: {
          valueSuffix: ' {value} times clicked',
        },
        dataLabels: {
          enabled: true,
          format: '{point.y}',
          style: {
            color: '#030303',
            fontFamily: 'Verdana',
            fill: '#030303',
            letterSpacing: '1px',
          },
        },
      },
      {
        name: 'unique click count',
        type: 'spline',
        data: response.map((item) => item.uniqCount),

        tooltip: {
          valueSuffix: ' {value} times clicked with unique IP',
        },
      },
    ],
  }
}
