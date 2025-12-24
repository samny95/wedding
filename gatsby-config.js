module.exports = {
  pathPrefix: "/wedding",  // <- repo name
  siteMetadata: {
    title: `Sam & Nayoung's Wedding Invitation`,
    description: `We are getting married! Please join us to celebrate our special day.`,
    siteUrl: `https://samny95.github.io`
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
