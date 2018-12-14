import React from "react";
import { Line } from "react-chartjs-2";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import { merge, lensPath, over, equals } from "ramda";
import Select from "./Select";
import { config, curNames } from "../AppConfig";
import {
  layout,
  ChartDrapdawnTitle,
  lineOptions,
  options,
  periods,
  ChartBox,
  chartOptions,
  toolTips
} from "./ChartOptions";

class Chart extends React.Component {
  static currentTime() {
    return Math.round(new Date().getTime() / 1000.0);
  }

  constructor(props) {
    super(props);
    const currency = config.avCurrencyes.get(props.currency);

    this.state = {
      currency: currency || config.avCurrencyes.get(curNames.BTC),
      period: "day",
      list: Array.from(config.avCurrencyes)
    };

    this.fetchData = this.fetchData.bind(this);
    this.onChangePeriod = this.onChangePeriod.bind(this);
    this.handleCurrency = this.handleCurrency.bind(this);
    this.mergeCallbacksForFiat = this.mergeCallbacksForFiat.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !equals(this.props, nextProps) || !equals(this.state, nextState);
  }

  onChangePeriod(period) {
    this.setState({ period });
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    if (
      !equals(prevProps.selectedFiat, this.props.selectedFiat) ||
      !equals(prevState.period, this.state.period) ||
      !equals(prevState.currency, this.state.currency)
    ) {
      this.fetchData();
    }
    return null;
  }

  fetchData() {
    this.props.action(
      this.state.currency.abbr,
      this.state.period,
      Chart.currentTime(),
      this.props.selectedFiat.abbr
    );
  }

  handleCurrency(currency) {
    this.setState({ currency });
  }

  mergeCallbacksForFiat() {
    const { name, abbr } = this.props.selectedFiat;
    return merge(options(`${name} (${abbr})`), toolTips(abbr));
  }

  render() {
    return (
      <Card style={layout.card}>
        <ChartBox>
          <ChartDrapdawnTitle>
            <Select
              selectItem={this.state.currency}
              list={this.state.list}
              config={chartOptions}
              handleMenuItemClick={this.handleCurrency}
            />
          </ChartDrapdawnTitle>
          <div>
            {periods.map(period => (
              <Button
                onClick={() => this.onChangePeriod(period)}
                key={period}
                style={layout.button}
                variant={"outlined"}
              >
                {period}
              </Button>
            ))}
          </div>
        </ChartBox>
        {this.props.data.datasets && (
          <Line
            data={over(
              lensPath(["datasets", 0]),
              __ => merge(lineOptions, __),
              this.props.data
            )}
            options={this.mergeCallbacksForFiat()}
            redraw
          />
        )}
      </Card>
    );
  }
}

const wrapWallet = (
  data,
  action,
  selectedFiat,
  currency,
  wrappedLayout
) => Component => (
  <Component
    data={data}
    action={action}
    layout={wrappedLayout}
    currency={currency}
    selectedFiat={selectedFiat}
  />
);

const wrapedWallet = (data, action, selectedFiat, currency, wrappedLayout) =>
  wrapWallet(data, action, selectedFiat, currency, wrappedLayout)(Chart);

export default wrapedWallet;
