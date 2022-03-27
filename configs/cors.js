const originProduction = process.env.CLIENT_URL_PRODUCTION
const originDevelopement = process.env.CLIENT_URL_DEVELOPMENT

const corsConfig =
  process.env.NODE_ENV === 'production'
    ? {
        origin: originProduction,
        credentials: true,
      }
    : {
        origin: originDevelopement,
        credentials: true,
      }

module.exports = corsConfig
