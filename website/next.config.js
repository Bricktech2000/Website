// https://medium.com/frontend-digest/how-to-import-svgs-into-nextjs-8ec6100e613f
// https://stackoverflow.com/questions/64376001/pass-options-to-the-builtin-svgo-from-svgr-webpack

module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgoConfig: {
              plugins: [{ name: 'removeViewBox', active: false }],
            },
          },
        },
      ],
    });

    return config;
  },
  // https://nextjs.org/docs/api-reference/next.config.js/trailing-slash
  trailingSlash: true,
  // https://mmazzarolo.com/blog/2021-04-10-nextjs-scroll-restoration/
  experimental: {
    scrollRestoration: true,
  },
};
