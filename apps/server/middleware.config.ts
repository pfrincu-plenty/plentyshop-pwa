import { ApiClientExtension } from '@vue-storefront/middleware';
import dotenv from 'dotenv';
dotenv.config();

const config = {
  integrations: {
    plentysystems: {
      location: '@plentymarkets/shop-api/server',
      configuration: {
        api: {
          url: process.env.API_ENDPOINT ? `${process.env.API_ENDPOINT}` : 'https://mevofvd5omld.c01-14.plentymarkets.com'
        }
      },
      extensions: (extensions: any[]) => [
        ...extensions, // don't forget to add existing extensions
        {
          name: 'extension-name',
          extendApiMethods: { /* ... */ },
          extendApp: (app: any) => { /* ... */ },
          hooks: (req: any, res: any) => {
            return {
              beforeCreate: ({ configuration }: any) => configuration,
              afterCreate: ({ configuration }: any) => configuration,
              beforeCall: ({ configuration, callName, args }: any) => {
                return args
              },
              afterCall: ({ configuration, callName, args, response }: any) => response
            }
          }
        }
      ]
    }
  },
};

export default config;
