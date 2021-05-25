//types query/mutation/subscription
export default `
    type Query {
        calculatePrice(type: MarginType! = sell, margin: Float!, exchangeRate: Float!): Float!
    }

    enum MarginType {
        sell
        buy
    }
`;
