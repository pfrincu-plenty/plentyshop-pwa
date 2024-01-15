import dotenv from 'dotenv';
import * as path from 'path';

let endpoint = '';
if(process.env.API_ENDPOINT){
  endpoint = process.env.API_ENDPOINT
} else {
  dotenv.config({
    path: path.resolve(__dirname, '../web/.env'),
  });
  endpoint = process.env.API_ENDPOINT || ''
}



const config = {
  integrations: {
    plentysystems: {
      location: '@plentymarkets/shop-api/server',
      configuration: {
        api: {
          url: endpoint,
        },
      },
    },
  },
};

export default config;
