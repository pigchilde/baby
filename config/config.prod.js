'use strict';

module.exports = appInfo => {
  const config = {};

  // add your config here
  config.serviceRoot = {
    news: 'http://news.web.sdp.101.com',
    activity: 'https://activity01.sdp.101.com/',
    resource: 'http://esp-resource-service.sdp.101.com',
    forum: 'http://forum.web.sdp.101.com'
  }
  return config;
};
