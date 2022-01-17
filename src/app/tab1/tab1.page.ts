import { Component } from '@angular/core';
declare let cordova: any;

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor() {}


  processPayment() {
    const billing = {
      name: 'John Smith',
      email: 'bilal@footspot.com',
      phone: '+201111111111',
      addressLine: 'Address line',
      city: 'Dubai',
      state: 'Dubai',
      countryCode: 'AE',
      zip: '1234'
    };

    const billingDetails = new cordova.plugins.CordovaPaymentPlugin.PaymentSDKBillingDetails(billing);

    const shippingDetails = new cordova.plugins.CordovaPaymentPlugin.PaymentSDKShippingDetails(billing);

    const configuration = new cordova.plugins.CordovaPaymentPlugin.PaymentSDKConfiguration();

    configuration.profileID = '56513';
    configuration.serverKey= 'SWJN9D6LLT-J2GZ2MWTJK-HZLHTDMDDH';
    configuration.clientKey = 'CTKM2Q-9Q9K6M-T9MNV7-GKTGGG';
    configuration.cartID = '545454';
    configuration.currency = 'SAR';
    configuration.cartDescription = 'Flowers';
    configuration.merchantCountryCode = 'sa';
    configuration.merchantName = 'Footspot App';
    configuration.amount = 20;
    configuration.screenTitle = 'Pay with Card';
    configuration.billingDetails = billingDetails;
    configuration.forceShippingInfo = false;

    configuration.showBillingInfo = true;
    configuration.showShippingInfo = true;

    cordova.plugins.CordovaPaymentPlugin.startCardPayment(configuration, (result) => {
      alert(JSON.stringify(result));
      if (result.status === 'success') {
          // Handle transaction details here.
          const transactionDetails = result.data;
          console.log('responseCode:' + transactionDetails.paymentResult.responseCode);
          console.log('transactionTime:' + transactionDetails.paymentResult.transactionTime);
          console.log('responseMessage:' + transactionDetails.paymentResult.responseMessage);
          console.log('transactionReference:' + transactionDetails.transactionReference);
          console.log('token:' + transactionDetails.token);
        } else if (result.status === 'error') {
          // Handle error here the code and message.
        } else if (result.status === 'event') {
          // Handle events here.
        }
  }, (error) => {
      console.log(error);
      alert(error);
  });



  }

}
