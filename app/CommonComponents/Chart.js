import React from "react";
import styled from "styled-components";
import { Line } from "react-chartjs-2";
import { v4 } from "uuid";
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
  periods
} from "./ChartOptions";

class Chart extends React.Component {
  static currnetTime() {
    return Math.round(new Date().getTime() / 1000.0);
  }

  constructor(props) {
    super(props);
    const currency = config.avCurrencyes.get(props.currency);

    this.state = {
      currency: currency || config.avCurrencyes.get(curNames.BTC),
      period: "day"
    };

    this.fetchData = this.fetchData.bind(this);
    this.onChangePeriod = this.onChangePeriod.bind(this);
    this.handleCurrency = this.handleCurrency.bind(this);
    this.mergeCallbacksForFiat = this.mergeCallbacksForFiat.bind(this);
  }

  componentDidMount() {
    this.props.action(
      this.state.currency.abbr,
      this.state.period,
      Chart.currnetTime(),
      this.props.selectedFiat.abbr
    );
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
    return prevState;
  }

  fetchData() {
    this.props.action(
      this.state.currency.abbr,
      this.state.period,
      Chart.currnetTime(),
      this.props.selectedFiat.abbr
    );
  }

  handleCurrency(currency) {
    this.setState({ currency });
  }

  mergeCallbacksForFiat() {
    const { name, abbr } = this.props.selectedFiat;
    return merge(options(`${name} (${abbr})`), {
      tooltips: {
        backgroundColor: "#FFFFFF",
        titleFontColor: "rgba(0, 0, 0, 0.87)",
        bodyFontColor: "rgba(0, 0, 0, 0.87)",
        displayColors: false,
        position: "nearest",

        callbacks: {
          label: tooltipItems =>
            `${this.props.selectedFiat.abbr} ${tooltipItems.yLabel.toString()} `
        }
      }
    });
  }

  render() {
    return (
      <Card style={this.props.layout ? this.props.layout : layout.card}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "15px 0"
          }}
        >
          <ChartDrapdawnTitle>
            <Select
              selectItem={this.state.currency}
              list={Array.from(config.avCurrencyes)}
              config={{ search: true, input: false, type: "chart" }}
              handleMenuItemClick={this.handleCurrency}
            />
          </ChartDrapdawnTitle>
          <div>
            {periods.map(period => (
              <Button
                onClick={() => this.onChangePeriod(period)}
                key={v4()}
                style={layout.button}
                variant={this.state.period === period ? "outlined" : null}
              >
                {period}
              </Button>
            ))}
          </div>
        </div>
        {this.props.data.labels ? (
          <Line
            data={over(
              lensPath(["datasets", 0]),
              __ => merge(lineOptions, __),
              this.props.data
            )}
            options={this.mergeCallbacksForFiat()}
            redraw
          />
        ) : null}
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
