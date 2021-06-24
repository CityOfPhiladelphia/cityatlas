const Visualizer = require('webpack-visualizer-plugin');

module.exports = {
  publicPath: '/',
  configureWebpack: {
    plugins: [
      new Visualizer({ filename: './statistics.html' }),
    ],
  },
  chainWebpack: (config) => {
    config.plugins.delete('prefetch');
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/scss/_variables.scss";
              @import "@/scss/_mixins.scss";`,
      },
    },
  },
  transpileDependencies: [
    // can be string or regex
    '@mapbox/mapbox-gl-draw',
    '@phila/mapboard',
    '@phila/vue-comps',
    '@phila/vue-mapping',
    '@phila/vue-datafetch',
    // /other-dep/
  ],
};
