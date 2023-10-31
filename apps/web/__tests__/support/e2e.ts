import 'cypress-real-events';
import './commands';

import failOnConsoleError, { Config } from 'cypress-fail-on-console-error'

const config: Config = {
    consoleMessages: [/.*useUser\/login.*/, /.*paypal.*/],
    consoleTypes: ['error'],
    debug: false
};

failOnConsoleError(config);
