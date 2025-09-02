const delivery = {
  deliveryOptions: [
    {
      id: "1",
      deliveryDays: 7,
      priceCents: 0,
    },
    {
      id: "2",
      deliveryDays: 3,
      priceCents: 499,
    },
    {
      id: "3",
      deliveryDays: 1,
      priceCents: 999,
    },
  ],
  findMatchingOption(deliveryOptionId) {
    if (!deliveryOptionId) return null;
    return (
      this.deliveryOptions.find((Option) => Option.id === deliveryOptionId) ||
      this.deliveryOptions[0]
    );
  },
};

export default delivery;
