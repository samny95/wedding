module.exports = {
  pathPrefix: "/wedding",  // <- repo name
  siteMetadata: {
    title: `손샘❤이나영 결혼식에 초대합니다`,
    description: `2026년 3월 2일, 월요일 17시 30분 | 엘리에나 호텔, 5층 그랜드볼룸`,
    siteUrl: `https://samny95.github.io`,
    image: `/og-image.jpg`
  },
  plugins: [
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [
          "G-Y11DT5E9L4",
        ],
        pluginConfig: {
          head: true,
          respectDNT: true,
        },
      },
    },
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-styled-components",
    "gatsby-plugin-image",
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {
          formats: [`auto`, `webp`],
          quality: 90,
          breakpoints: [750, 1080, 1366, 1920],
          backgroundColor: `transparent`,
          placeholder: `blurred`,
        },
      },
    },
    {
      resolve: `gatsby-transformer-sharp`,
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `assets`,
        path: `${__dirname}/src/assets`,
      },
    },
  ]
};
