export const TreemapChartConfig = (response) => {
  const colors = ['#003f5c', '#58508d', '#bc5090', '#ff6361', '#ffa600']
  const series = [
    {
      allowPointSelect: true,
      legendType: 'point',
      showInLegend: true,
      type: 'treemap',
      layoutAlgorithm: 'squarified',
      data: response.data.map((item, index) => {
        return {
          name: item.key,
          value: Number(item.value),
          color: colors[index],
        }
      }),
    },
  ]

  return {
    chart: {
      type: 'treemap',
    },
    credits: {
      enabled: false,
    },
    title: {
      text: '',
    },
    legend: {
      enabled: true,
      align: 'left',
      verticalAlign: 'top',
      layout: 'vertical',
      useHTML: true,
    },
    series: series,
  }
}
