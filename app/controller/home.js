'use strict';

module.exports = app => {
  class HomeController extends app.Controller { *
    index() {
      /* this.validate({
        
      }) */

      //获取首页新闻模块数据
      const newsList = yield this.service.news.newsIndexList({
        page: 0,
        size: 5,
      });

      //获取首页专题模块数据
      const activityList = yield this.service.activity.activityIndexList({
        limit: 4,
      });
  // 
      //获取首页论坛模块数据
      const forumIndex = yield this.service.forum.forumIndex({
        page: 0,
        size: 8,
      });

      //x渲染页面
      yield this.ctx.render('index.html', {
        newsList: newsList,
        activityList: activityList,
        forumIndex: forumIndex,
        title: '福建省学前教育公共服务平台',
      });
    }
  }
  return HomeController;
};