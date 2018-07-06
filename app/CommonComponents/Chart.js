import React from 'react';
import { Line } from 'react-chartjs-2';
import styled from 'styled-components';
import { merge, lensPath, over, __, equals, not } from 'ramda';
import { v4 } from 'uuid';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Select from './Select';
import { config, curNames } from '../AppConfig';
import IconArrowDown from '../images/common/icon-arrow-down.svg';

const layout = {
  input: {
    display: 'none',
  },
  card: {
    backgroundColor: '#2B3649',
    color: '#FFFFFF',
    fontSize: 12,
    textOverflow: 'ellipsis',
    padding: '0 20px',
    marginBottom: '20px',
    boxShadow: '0 25px 40px 0 rgba(0,0,0,0.3)',
  },
  button: {
    color: '#8D96B2',
    margin: '1px',
    borderRadius: '14px',
    borderColor: '#8D96B2',
    fontSize: '12px',
    minHeight: 'auto',
    minWidth: '0',
    padding: '4px 8px',
    letterSpacing: '0.45px',
    lineHeight: '14px',
  },
};

const lineOpstions = {
  backgroundColor: 'rgba(43, 54, 73, 0.09)',
  borderColor: 'rgb(122, 194, 49)',
  borderCapStyle: 'butt',
  borderDash: [],
  borderDashOffset: 0.0,
  borderJoinStyle: 'miter',
  pointBorderColor: '#7AC231',
  pointBackgroundColor: 'inherit',
  pointBorderWidth: 0,
  pointHoverRadius: 3,
  pointHoverBackgroundColor: '#FFFFFF',
  pointHoverBorderColor: '#7AC231',
  pointHoverBorderWidth: 2,
  pointRadius: 0,
  pointHitRadius: 10,
  fill: false,
  lineTension: 0,
  borderWidth: 2,
};

const options = {
  scales: {
    xAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          fontColor: '#8D96B2',
          fontFamily: 'Roboto',
          fontStyle: 'bold',
          fontSize: 11,
        },
        type: 'time',
        distribution: 'linear',
        drawOnChartArea: false,
        color: '#FFFFFF',
      },
    ],
    yAxes: [
      {
        gridLines: {
          color: 'rgba(141,150,178,0.1)',
        },
        ticks: {
          fontSize: 11,
          fontColor: '#8D96B2',
          fontFamily: 'Roboto',
          fontStyle: 'bold',
        },
      },
    ],
  },
  legend: { display: false },
};

const ChartDrapdawnTitle = styled.div`
  > div {
    div:first-child {
      font-size: 14px;
      letter-spacing: 0.21px;
      cursor: pointer;
      position: relative;
      &:after {
        content: '';
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

const periods = ['day', 'week', 'month', 'year'];

class Chart extends React.Component {
  constructor(props) {
    super(props);
    const currency = config.avCurrencyes.get(props.currency);
    this.state = {
      currency: currency || config.avCurrencyes.get(curNames.BTC),
      period: 'day',
    };
  }

  currnetTime = () => Math.round(new Date().getTime() / 1000.0);

  componentDidMount() {
    this.props.action(
      this.state.currency.abbr,
      this.state.period,
      this.currnetTime(),
      this.props.selectedFiat.abbr,
    );
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    if (not(equals(prevProps.selectedFiat, this.props.selectedFiat))) {
      this.fetchData();
    }
    return prevState;
  }

  fetchData = () => {
    this.props.action(
      this.state.currency.abbr,
      this.state.period,
      this.currnetTime(),
      this.props.selectedFiat.abbr,
    );
  };

  onChangeCurrency = (currency) => {
    this.setState({ currency });
  };

  onChangePeriod = (period) => {
    this.setState({ period });
  };

  handleCurrency = (currency) => {
    this.setState({ currency });
  };

  mergeCallbacksForFiat = fiat =>
    merge(options, {
      tooltips: {
        backgroundColor: '#FFFFFF',
        titleFontColor: 'rgba(0, 0, 0, 0.87)',
        bodyFontColor: 'rgba(0, 0, 0, 0.87)',
        displayColors: false,
        position: 'nearest',
        callbacks: {
          label: (tooltipItems, data) =>
            `${tooltipItems.yLabel.toString()} ${this.props.selectedFiat.abbr}`,
        },
      },
    });

  render() {
    return (
      <Card style={this.props.layout ? this.props.layout : layout.card}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '15px 0',
          }}
        >
          <ChartDrapdawnTitle>
            <Select
              selectItem={this.state.currency}
              list={Array.from(config.avCurrencyes)}
              config={{ search: true, input: false, type: 'chart' }}
              handleMenuItemClick={this.handleCurrency}
            />
          </ChartDrapdawnTitle>
          <div>
            {periods.map(period => (
              <Button
                onClick={() => this.onChangePeriod(period)}
                key={v4()}
                style={layout.button}
                variant={this.state.period === period ? 'outlined' : null}
              >
                {period}
              </Button>
            ))}
          </div>
        </div>
        {this.props.data.labels ? (
          <Line
            data={over(lensPath(['datasets', 0]), __ => merge(lineOpstions, __), this.props.data)}
            options={this.mergeCallbacksForFiat()}
            redraw
          />
        ) : null}
      </Card>
    );
  }
}

const wrapWallet = (data, action, selectedFiat, currency, layout) => Component => (
  <Component
    data={data}
    action={action}
    layout={layout}
    currency={currency}
    selectedFiat={selectedFiat}
  />
);

const wrapedWallet = (data, action, selectedFiat, currency, layout) =>
  wrapWallet(data, action, selectedFiat, currency, layout)(Chart);

export default wrapedWallet;
