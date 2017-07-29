'use strict';

module.exports = app => {
  class ForumService extends app.Service {
    //封装通用的请求方法
    * request(url, opts) {
      url = `${this.ctx.app.config.serviceRoot.forum}${url}`;
      opts = Object.assign({
        timeout: ['30s', '30s'],
        dataType: 'json',
        headers: {
          Orgname: this.ctx.app.config.orgname
        }
      }, opts);
      return yield this.ctx.curl(url, opts);
    }
    //获取首页新闻数据
    * forumIndex(params) {
      const hotResult = yield this.request('/v0.1/forums/hot', {
        data: params,
      });
      this.checkSuccess(hotResult);

      for(var i=0; i<hotResult.data.items.length; i++){
        let topForumResult = yield this.request('/v0.1/timelines/forum/' + hotResult.data.items[i].id, {
          data: {limit: 2},
        });
        this.checkSuccess(topForumResult);
        hotResult.data.items[i].threadInfoList = topForumResult.data
      }
      return hotResult.data;
    }

    //封装接口统一调用结果处理
    checkSuccess(result) {
      if (result.status !== 200) {
        const errorMsg = result.data && result.data.message ? result.data.message : 'unknown error';
        //this.ctx.throw(result.status, errorMsg);
      }
      if (!result.data.success) {
        //this.ctx.throw(500, 'remote response error', { data: result.data });
      }
    }
  }

  return ForumService;
}