module.exports = {
  type: "react-component",
  npm: {
    esModules: true,
    umd: {
      global: "feedbackit",
      externals: {}
    }
  },
  webpack: {
    html: {
      template: "demo/src/index.html"
    }
  }
};
