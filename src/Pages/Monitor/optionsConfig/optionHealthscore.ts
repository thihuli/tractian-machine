export const optionHealthscore = (healthscore: number) => {
  return {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Saúde do Motor'
    },
    xAxis: {
      categories: ['Saúde']
    },
    series: [
      {
        data: [!healthscore ? 0 : healthscore]
      }
    ]
  }
};