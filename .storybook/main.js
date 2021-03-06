const { webpack } = require("../react/config");
const maxAssetSize = 1024 * 1024;

module.exports = {
  stories: [
    "../components/**/*.stories.mdx",
    "../components/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
  webpackFinal: (config) => {
    config.module.rules = config.module.rules.map((data) => {
      /* add our loader for inline svg icons */
      if (/svg\|/.test(String(data.test)))
        data.test = /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani)(\?.*)?$/;
      return data;
    });
    config.module.rules.push(webpack.module.rules[1]);
    config.optimization = {
      ...config.optimization,
      splitChunks: {
        chunks: "all",
        minSize: 30 * 1024,
        maxSize: maxAssetSize,
      },
    };
    config.performance = {
      ...config.performance,
      maxAssetSize: maxAssetSize,
    };
    return config;
  },
};
