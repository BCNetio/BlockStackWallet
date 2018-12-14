import styled from "styled-components";
import IconArrowDown from "../images/common/icon-arrow-down.svg";

export const layout = {
  input: {
    display: "none"
  },
  card: {
    backgroundColor: "#2B3649",
    color: "#FFFFFF",
    fontSize: 12,
    textOverflow: "ellipsis",
    padding: "0 20px",
    marginBottom: "20px",
    boxShadow: "0 25px 40px 0 rgba(0,0,0,0.3)"
  },
  button: {
    color: "#8D96B2",
    margin: "1px",
    borderRadius: "14px",
    borderColor: "#8D96B2",
    fontSize: "12px",
    minHeight: "auto",
    minWidth: "0",
    padding: "4px 8px",
    letterSpacing: "0.45px",
    lineHeight: "14px"
  }
};

export const ChartDrapdawnTitle = styled.div`
  > div {
    div:first-child {
      font-size: 14px;
      letter-spacing: 0.21px;
      cursor: pointer;
      position: relative;
      &:after {
        content: "";
        display: block;
        position: absolute;
        top: 50%;
        right: -20px;
        width: 9px;
        height: 8px;
        transform: translateY(-50%) rotate(-90deg);
        background: url(${IconArrowDown}) no-repeat;
      }
    }
  }
`;

export const ChartBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 0;
`;

export const lineOptions = {
  backgroundColor: "rgba(43, 54, 73, 0.09)",
  borderColor: "rgb(122, 194, 49)",
  borderCapStyle: "butt",
  borderDash: [],
  borderDashOffset: 0.0,
  borderJoinStyle: "miter",
  pointBorderColor: "#7AC231",
  pointBackgroundColor: "inherit",
  pointBorderWidth: 0,
  pointHoverRadius: 3,
  pointHoverBackgroundColor: "#FFFFFF",
  pointHoverBorderColor: "#7AC231",
  pointHoverBorderWidth: 2,
  pointRadius: 0,
  pointHitRadius: 10,
  fill: false,
  lineTension: 0,
  borderWidth: 2
};

export const options = currency => ({
  scales: {
    xAxes: [
      {
        gridLines: {
          display: false
        },
        ticks: {
          fontColor: "#8D96B2",
          fontFamily: "Roboto",
          fontStyle: "bold",
          fontSize: 11
        },
        type: "time",
        distribution: "linear",
        drawOnChartArea: false,
        color: "#FFFFFF"
      }
    ],
    yAxes: [
      {
        scaleLabel: {
          display: true,
          labelString: currency
        },
        gridLines: {
          color: "rgba(141,150,178,0.1)"
        },
        ticks: {
          fontSize: 11,
          fontColor: "#8D96B2",
          fontFamily: "Roboto",
          fontStyle: "bold"
        }
      }
    ]
  },
  legend: { display: false }
});

export const toolTips = abbr => ({
  tooltips: {
    backgroundColor: "#FFFFFF",
    titleFontColor: "rgba(0, 0, 0, 0.87)",
    bodyFontColor: "rgba(0, 0, 0, 0.87)",
    displayColors: false,
    position: "nearest",
    callbacks: {
      label: tooltipItems => `${abbr} ${tooltipItems.yLabel} `
    }
  }
});

export const chartOptions = { search: true, input: false, type: "chart" };

export const periods = ["day", "week", "month", "year"];
