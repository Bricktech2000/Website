//https://medium.com/frontend-digest/how-to-import-svgs-into-nextjs-8ec6100e613f

module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgoConfig: {
              plugins: {
                removeViewBox: false,
              },
            },
          },
        },
      ],
    });

    return config;
  },
  //https://nextjs.org/docs/api-reference/next.config.js/trailing-slash
  trailingSlash: true,
};
