export const ColumnChartConfig = (response) => {
  console.log(response)
  const series = {
    colorByPoint: true,
    data: response.map((item) => {
      return {
        name: item.name,
        y: Number(item.data[0]),
      }
    }),
  }

  return {
    colors: ['#003f5c', '#58508d', '#bc5090', '#ff6361', '#ffa600'],

    chart: {
      type: 'column',
    },
    title: {
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
    yAxis: {
      min: 0,
      title: {
        text: '',
      },
      credits: {
        enabled: false,
      },
      labels: {
        overflow: 'justify',
      },
    },
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
            color: '#a5a5a5',
            fontFamily: 'Verdana',
            fill: '#a5a5a5',
            letterSpacing: '1px',
          },
        },
      },
    },
    legend: {
      enabled: false,
    },
    series: series,
  }
}
