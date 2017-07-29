'use strict';

module.exports = appInfo => {

  const config = {};

  // add your config here
  config.serviceRoot = {
    news: 'http://news.beta.web.sdp.101.com',
    activity: 'https://activity01.beta.101.com/',
    resource: 'http://esp-resource-service.beta.101.com',
    forum: 'http://forum.beta.web.sdp.101.com',
  }
  return config;
};