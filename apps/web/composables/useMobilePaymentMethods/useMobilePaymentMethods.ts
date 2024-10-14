import { PaymentEligibility, UseMobileMethodsReturn, UseMobilePaymentMethods } from './types';

const checkMobilePayments = async (): Promise<PaymentEligibility> => {
  // Load Google Pay SDK and check if loaded successfully
  const googlePayLoaded = await loadGooglePayScript();

  const applePayEligible = checkApplePayEligibility();
  const googlePayEligible = googlePayLoaded ? await checkGooglePayEligibility() : false;

  return {
    applePayEligible,
    googlePayEligible,
  };
};

// Dynamically load Google Pay SDK
function loadGooglePayScript(): Promise<boolean> {
  return new Promise((resolve, reject) => {
    if (document.querySelector('#google-pay-script')) {
      // Script is already loaded
      resolve(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://pay.google.com/gp/p/js/pay.js';
    script.async = true;
    script.id = 'google-pay-script';

    script.addEventListener('load', () => {
      resolve(true);
    });

    document.head.append(script);
  });
}

// Check if Google Pay is available
async function checkGooglePayEligibility(): Promise<boolean> {
  if (typeof window === 'undefined' || typeof google === 'undefined' || !google.payments) return false; // Ensure running in a browser environment

  const googlePayClient = new google.payments.api.PaymentsClient({
    environment: 'PRODUCTION', // or 'TEST' depending on your environment
  });

  const googlePayRequest = {
    apiVersion: 2,
    apiVersionMinor: 0,
    allowedPaymentMethods: [
      {
        type: 'CARD',
        parameters: {
          allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
          allowedCardNetworks: ['MASTERCARD', 'VISA'],
        },
      },
    ],
  };

  try {
    const result = await googlePayClient.isReadyToPay(googlePayRequest);
    return result.result; // true if eligible, false otherwise
  } catch (error) {
    console.error('Error checking Google Pay eligibility:', error);
    return false;
  }
}

// Check if Apple Pay is available
function checkApplePayEligibility(): boolean {
  if (typeof window === 'undefined') return false; // Ensure running in a browser environment
  return window.ApplePaySession && ApplePaySession.canMakePayments();
}

export const useMobileMethods: UseMobileMethodsReturn = (): UseMobilePaymentMethods => {
  // eslint-disable-next-line unicorn/consistent-function-scoping
  const setMobilePayments: any = async () => {
    const { applePayEligible, googlePayEligible } = await checkMobilePayments();
    const { data, error } = await useAsyncData(() => {
      const mobilePayments: string[] = [];

      if (applePayEligible) {
        mobilePayments.push('PAYPAL_APPLE_PAY');
      }

      if (googlePayEligible) {
        mobilePayments.push('PAYPAL_GOOGLE_PAY');
      }
      if (mobilePayments && mobilePayments.length > 0) {
        useSdk().plentysystems.setMobilePaymentProviderList({
          mobilePayments: mobilePayments,
        });
      }
    });
  };

  return {
    setMobilePayments,
  };
};
