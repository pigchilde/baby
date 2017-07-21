'use strict';

module.exports = app => {
  class HomeController extends app.Controller {
    * index() {
      /* this.validate({
        
      }) */
      this.ctx.body = yield this.service.home.news({
        page: 1,
        size: 5,
      });
    }
  }
  return HomeController;
};
