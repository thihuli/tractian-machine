export const optionsRpm = (rpm: number | undefined) => {
  return {
    chart: {
      type: "solidgauge"
    },
    title: {
      text: 'RPM'
    },
    pane: {
      center: ["50%", "85%"],
      size: "90%",
      startAngle: -90,
      endAngle: 90,
      background: {
        backgroundColor: "#EEE",
        innerRadius: "60%",
        outerRadius: "100%",
        shape: "arc"
      }
    },

    exporting: {
      enabled: false
    },

    tooltip: {
      enabled: false
    },
    plotOptions: {
      solidgauge: {
        dataLabels: {
          y: 0,
          borderWidth: 0,
          useHTML: true
        }
      }
    },
    yAxis: {
      min: 0,
      max: 5000,
      title: {
        text: "RPM"
      }
    },

    series: [
      {
        name: "RPM",
        data: [!rpm ? 0 : rpm],
        dataLabels: {
          format:
            '<div style="text-align:center">' +
            '<span style="font-size:25px">{y:.1f}</span><br/>' +
            '<span style="font-size:12px;opacity:0.4">' +
            "* 1000 / min" +
            "</span>" +
            "</div>"
        },
        tooltip: {
          valueSuffix: " revolutions/min"
        }
      }
    ]
  }
};