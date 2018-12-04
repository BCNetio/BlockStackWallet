import React from "react";
import Card from "@material-ui/core/Card";
import styled from "styled-components";
import { has } from "ramda";
import { toFiat } from "../Providers/Wallets";
import { BalanceCard } from "../Views";

const styles = {
  card: {
    backgroundColor: "#2B3649",
    color: "#FFFFFF",
    fontSize: 12,
    marginBottom: "20px",
    boxShadow: "0 25px 40px 0 rgba(0,0,0,0.3)",
    transition: "background-color 0.7s ease",
    padding: "20px"
  }
};

const Dots = styled.span``;

export const SummaryCash = ({
  currencySum,
  countOfWallets,
  selectedFiat,
  course
}) => {
  const sum = currencySum || 0;
  return (
    <Card style={styles.card}>
      <BalanceCard>
        <div>
          <p className="title">Total Balance</p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <div>
            <p className="total">{sum} BTC</p>
            <p className="currency">
              {has("BTC", course) ? (
                toFiat(currencySum, course.BTC[selectedFiat.abbr])
              ) : (
                <Dots className="loading" />
              )}{" "}
              {selectedFiat.abbr}
            </p>
          </div>
          <div className="wallets-number">
            <p>{countOfWallets.length}</p>
            <p>wallets</p>
          </div>
        </div>
      </BalanceCard>
    </Card>
  );
};
