export const optionTemperature = (temperature: number) => {
  return {
    chart: {
      type: "solidgauge"
    },
    title: {
      text: 'Temperatura'
    },
    yAxis: {
      min: 0,
      max: 100,
    },
    series: [
      {
        data: [!temperature ? 0 : temperature]
      }
    ]
  }
}