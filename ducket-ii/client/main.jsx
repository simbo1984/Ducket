import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { App } from '/imports/ui/app';

Meteor.startup(() => {

  //for PWA version only
  //navigator.serviceWorker.register('/sw.js').then().catch(error => console.log('ServiceWorker registration failed: ', error)); 

  render(
      <App />,
      document.getElementById('react-target')
  );
});