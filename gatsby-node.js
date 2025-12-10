exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    module: {
      rules: [
        {
          test: /\.(jpg|jpeg|png|gif|svg|mp4|mp3)$/i,
          type: 'asset/resource',
          generator: {
            filename: '[name][ext]'
          }
        },
      ],
    },
  })
}

