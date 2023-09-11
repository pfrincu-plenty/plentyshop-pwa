import dotenv from 'dotenv';
dotenv.config();

console.log('Middleware api endpoint', process.env.API_ENDPOINT);

const config = {
  integrations: {
    plentysystems: {
      location: '@plentymarkets/shop-api/server',
      configuration: {
        api: {
          url: process.env.API_ENDPOINT ? `${process.env.API_ENDPOINT}` : 'https://mevofvd5omld.c01-14.plentymarkets.com'
        }
      },
    }
  },
};

export default config;
