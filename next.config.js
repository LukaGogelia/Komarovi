/** @type {import('next').NextConfig} */

const withNextIntl = require("next-intl/plugin")(
  // This is the default (also the `src` folder is supported out of the box)
  "./i18n.js"
);

module.exports = withNextIntl({
  images: {
    domains: ["i.ibb.co", "res.cloudinary.com", "komarovi.edu.ge"],
  },
});
