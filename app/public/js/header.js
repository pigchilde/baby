/**
 * 头部的脚本
 * @wxm (you@example.org)
 * @date    2017-06-27 15:02:12
 * @version $Id$
 */
$(function(){
    var getTimestamp = new Date().getTime();//时间戳
    
    //-----------登录注册处理（预生产环境）-----------------
  //   var user = {
 	//     $layout : $('.login-wrap'),
  //       $btnLogout : $('.js-logout'),
  //       $name : $('.js-name'),
  //       $head : $('.js-avatar')
  //   };
  //   var csUrl2 = 'http://betacs.101.com/v0.1/';
  //   //uc登录判断
 	// ucManager.isLogin().then(function(res) {
 	//     //当前登录
 	//     if(res=="true"){
 	//         //当前已登录
 	//         loginOperate();
 	//     }
 	//     //当前未登录
 	//     else{
 	//        //自定义重新登录或其他
 	//        logoutOperate();
 	//     }
 	// });
  //   //点击“退出”登录
 	// user.$btnLogout.on('click',function(){
  //    	ucManager.logOut().then(function(res) {
  //           //退出成功
  //           if(res=="success"){
  //               logoutOperate();
  //           }else{
  //               alert("fail:"+res);
  //           }
  //       });
  //   });
  //    //登录后操作
 	// function loginOperate(){
  //       user.$layout.addClass('hasin');
  //       ucManager.getUserInfo().then(function(res) {
  //    	    //获取成功
  //    	    if(typeof res=="object" && undefined!=res.user_id){
  //    	        user.$name.text(res.user_id).attr({'title':res.user_id});
  //    	        user.$head.attr('src',csUrl2+'static/preproduction_content_cscommon/avatar/'+res.user_id+'/'+res.user_id+'.jpg?hash=' + getTimestamp );
  //    	    }else{
  //    	        alert("获取不到,登录状态已失效:"+res);
  //    	    }
  //       }); 
 	// }
  //    //登出后操作
 	// function logoutOperate(){
 	// 	user.$layout.removeClass('hasin');
 	// 	user.$head.attr('src','http://image.101.com/baby/img/user-default.png');
 	// }

 	//----------------头部搜索选择及相应跳转-------------------
 	var babySearch = {
 	    $result : $('.search-engine .result'),      //选择模块
 	    $dropdownlist : $('.list-xiala'),        //搜索模块下拉框
 	    $input : $('.search-input input'),          //搜索输入框
 	    $btn : $('.search-btn'),                    //搜索按钮
 	    $module : $('.search-engine .result span'), //搜索名称
 	    urls:{                                      //不同的搜索跳转地址
 	        news: 'http://news-web.beta.web.sdp.101.com/baby#/search/', //新闻搜索的跳转地址
 	        forum: 'http://forum-web.beta.web.sdp.101.com/baby#/search/', //论坛搜索的跳转地址
 	        activity:'https://activity01.beta.101.com/baby#/search/',//专题活动搜索的跳转地址
            resource:'http://esp-edu-kid.beta.101.com/client/#/doSearch?keyword='//资源搜索的跳转地址
 	    },
 	    work: function(){
 	        this.moduleChoose();
 	        this.goToSearchPage();
 	    }
 	};
 	babySearch.moduleChoose = function(){
 	    var self = this;
 	    
 	    self.$result.on('click',function(){
 	        $(this).toggleClass('on')
 	               .find('.list-xiala').slideToggle();
 	    });

 	    self.$dropdownlist.on('click','a', function(e){
 	        e.stopPropagation();
 	        self.$result.removeClass('on').find('span').html($(this).html());
 	        self.$dropdownlist.slideUp();
 	    });
        // $('doucment,body').on('click',function(){
        //     self.$dropdownlist.slideUp();
        //     self.$result.removeClass('on');
        // });
 	};
 	babySearch.goToSearchPage = function(){
 	    var self = this;
 	    //键入回车跳转
 	    self.$input.on('keydown', function(e){
 	        var keyWord = $(this).val(),
 	            searchModuleName = self.$module.html();
 	        
 	        if(keyWord && e.keyCode === 13){
 	            self.searchLink(searchModuleName,keyWord);
 	        }
 	        
 	    });
 	    //点击按钮跳转
 	    self.$btn.on('click',function(){
 	        var keyWord = self.$input.val(),
 	            searchModuleName = self.$module.html();

 	        if(keyWord){
 	            self.searchLink(searchModuleName,keyWord);
 	        }
 	        
 	    });
 	};
 	babySearch.searchLink = function( searchModuleName, keyWord ){
 	    var self = this;
 	    switch(searchModuleName)
 	    {
 	        case '资讯':
 	            window.location.href = self.urls.news + keyWord;
 	            break;
 	        case '论坛':
 	            window.location.href = self.urls.forum + keyWord;
 	            break;
 	        case '专题':
 	            window.location.href = self.urls.activity + keyWord;
 	            break;
            case '资源':
                window.location.href = self.urls.resource + keyWord;
                break;
 	        default:
 	            break;
 	    }
 	};
 	babySearch.work();
   
});