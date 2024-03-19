const withLinaria = require("next-with-linaria");

const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },

  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = withLinaria(nextConfig);