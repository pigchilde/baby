'use strict';

module.exports = app => {
  class HomeController extends app.Controller {
    * index() {
      /* this.validate({
        
      }) */

      //获取首页新闻模块数据
      const newList = yield this.service.news.newsIndexList({
        page: 1,
        size: 5,
      });

      //获取首页专题模块数据
      const activityList = yield this.service.activity.activityIndexList({
        limit: 4,
      });


      //获取首页论坛模块数据
      const activityList = yield this.service.activity.forumIndex({
        page: 1,
        size: 8,
      });

      this.ctx.body = 'hell0';
    }
  }
  return HomeController;
};
