'use strict';

const Promise = require('bluebird');

let validate = {
  hostUser: (hostUser) => {
      return;
  },
  id: (id) => {
    return;
  },
  header: (header) => {
    return;
  },
  description: (description) => {
   return;
  },
  hostUser: (hostUser) => {
    return;
  },
  childName: (childName) => {
    return;
  },
  startDateTime: (startDateTime) => {
    return;
  },
  endDateTime: (endDateTime) => {
    return;
  },
  partyLocation: (partyLocation) => {
    return;
  },
  locale:(locale) => {
    return;
  },
  theme:(theme) => {
    return;
  }
};


module.exports = (data) => {
  Object.keys(data).forEach((d) => {validate[d](data[d])});
  return Promise.resolve();
}
