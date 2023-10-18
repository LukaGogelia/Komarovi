export function getTranslatedPricingData(pricingText) {
  return {
    pricingData: [
      {
        type: pricingText.Basic,
        price: 0,
        period: pricingText.PerMonth,

        features: [
          pricingText.School1,
          pricingText.School2,
          pricingText.School3,
          pricingText.School4,
          pricingText.School5,
        ],
      },
      {
        type: pricingText.Professional,
        price: 599.95,
        period: pricingText.PerMonth,

        features: [
          pricingText.School1,
          pricingText.School2,
          pricingText.School3,
          pricingText.School4,
          pricingText.School5,
        ],
      },
      {
        type: pricingText.Business,
        price: 999.95,
        period: pricingText.PerMonth,

        features: [
          pricingText.School1,
          pricingText.School2,
          pricingText.School3,
          pricingText.School4,
          pricingText.School5,
        ],
      },
    ],
  };
}
export const pricingData = [
  {
    type: "Basic",
    price: 0,
    period: "per month",

    features: [
      "All Operating Supported",
      "Great Interface",
      "Allows encryption",
      "Face recognized system",
      "24/7 Full support",
    ],
  },
  {
    type: "Professional",
    price: 599.95,
    period: "per month",

    features: [
      "All Operating Supported",
      "Great Interface",
      "Allows encryption",
      "Face recognized system",
      "24/7 Full support",
    ],
  },
  {
    type: "Business",
    price: 999.95,
    period: "per month",

    features: [
      "All Operating Supported",
      "Great Interface",
      "Allows encryption",
      "Face recognized system",
      "24/7 Full support",
    ],
  },
];
