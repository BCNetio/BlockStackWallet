import { filter } from "ramda";

export const searachFunctions = {
  transactions: (searchPredicate, list) =>
    filter(
      wallet =>
        wallet.alias.toUpperCase().includes(searchPredicate.toUpperCase()),
      list
    ),
  fiat: (searchPredicate, list) =>
    filter(
      fiat =>
        fiat.name.toUpperCase().includes(searchPredicate.toUpperCase()) ||
        fiat.abbr.toUpperCase().includes(searchPredicate.toUpperCase()),
      list
    ),
  chart: (searchPredicate, list) =>
    filter(
      currency =>
        currency[1].name
          .toUpperCase()
          .includes(searchPredicate.toUpperCase()) ||
        currency[1].abbr.toUpperCase().includes(searchPredicate.toUpperCase()),
      list
    ),
  wallet: (searchPredicate, list) =>
    filter(
      currency =>
        currency[1].name
          .toUpperCase()
          .includes(searchPredicate.toUpperCase()) ||
        currency[1].abbr.toUpperCase().includes(searchPredicate.toUpperCase()),
      list
    )
};
