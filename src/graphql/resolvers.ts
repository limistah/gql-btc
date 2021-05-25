import axios from "axios";

interface ICoinBaseRes {
  time: {
    updated: string;
    updatedISO: string;
    updateduk: string;
  };
  disclaimer: string;
  bpi: {
    USD: {
      code: "USD";
      rate: string;
      description: "United States Dollar";
      rate_float: number;
    };
    BTC: {
      code: "BTC";
      rate: number;
      description: "Bitcoin";
      rate_float: number;
    };
  };
}

const resolvers = {
  Query: {
    calculatePrice: async function (
      _: any,
      query: {
        type: string;
        margin: number;
        exchangeRate: number;
      }
    ) {
      // Fetch the data latest rate from coinbase
      const { data } = await axios.get(
        "https://api.coindesk.com/v1/bpi/currentprice/BTC.json"
      );
      const coinBaseData: ICoinBaseRes = data;

      const currentRate = coinBaseData.bpi.USD.rate_float;
      // Convert margin to float for precision
      const marginPercent = parseFloat(String(query.margin));
      // Do 100 * 0.2 to get 20 which is the margin to be used
      const computedMargin = currentRate * marginPercent;
      // Make the necessary adjustments
      let adjustedRate =
        query.type === "sell"
          ? currentRate - computedMargin
          : currentRate + computedMargin;

      // Convert the $$ rate to NN
      const adjustedToExchangeRate =
        adjustedRate * parseFloat(String(query.exchangeRate));

      // Return a 2 decimal place precision value of the adjusted rate
      return adjustedToExchangeRate.toFixed(2);
    },
  },
};

export default resolvers;
