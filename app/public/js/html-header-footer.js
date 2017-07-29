/**
 * 用脚本方式插入头部和底部的结构
 * @wxm(you@example.org)
 * @date    2017-06-27 17:41:01
 * @version $Id$
 */

var html_header = '<div class="header">\
					    <div class="top">\
					        <div class="wrapper clearfix">\
					            <h1 class="logo fl">\
					                <a href="javascript:;" title="福建省学前教育公共服务平台">\
					                    <img src="http://image.101.com/baby/img/logo.png" alt="">\
					                </a>\
					            </h1>\
					            <div class="search-wrap fl">\
					                <div class="search-engine">\
					                    <div class="result"><span>资源</span>\
					                        <i class="ico-toggle"></i>\
					                        <ul class="list-xiala">\
					                            <li><a href="javascript:;" title="">资源</a></li>\
					                            <li><a href="javascript:;" title="">专题</a></li>\
					                            <li><a href="javascript:;" title="">资讯</a></li>\
					                            <li><a href="javascript:;" title="">论坛</a></li>\
					                        </ul>\
					                    </div>\
					                </div>\
					                <div class="search-input">\
					                    <input type="text" placeholder="搜索关键词...">\
					                </div>\
					                <button class="search-btn"></button>\
					            </div>\
					            <div class="login-wrap fr">\
					                <img class="ico-avatar js-avatar" src="http://image.101.com/baby/img/user-default.png" alt="" onerror="this.src=\'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==\';this.onerror = null;">\
					                <a class="js-login user-login" href="https://uc-personal-beta.101.com/passport/login.html?app_id=baby" title="" target="_blank">登录</a>\
					                <span>/</span>\
					                <a class="js-register user-register" href="https://uc-personal-beta.101.com/passport/mobile-register.html?app_id=baby" title="" target="_blank">注册</a>\
					                <a class="js-name user-name" href="javascript:;" title="">刘一二</a>\
					                <a class="js-logout user-logout" href="javascript:;">退出</a>\
					            </div>\
					        </div>\
					    </div>\
					    <div class="nav">\
					        <div class="wrapper">\
					            <ul class="nav-list clearfix">\
					                <li><a href="http://preschool2.wxm.millylee.cn:8777/index.shtml" title="首页">首页</a></li>\
					                <li>|</li>\
					                <li class="on"><a href="http://preschool2.wxm.millylee.cn:8777/supermarket-index.shtml" title="资源超市">资源超市</a></li>\
					                <li>|</li>\
					                <li><a href="https://activity01.beta.101.com/baby" title="专题">专题</a></li>\
					                <li>|</li>\
					                <li><a href="http://preschool2.wxm.millylee.cn:8777/mskj-default.shtml" title="名师空间">名师空间</a></li>\
					                <li>|</li>\
					                <li><a href="http://preschool2.wxm.millylee.cn:8777/qzsc-default.shtml" title="亲子商城">亲子商城</a></li>\
					                <li>|</li>\
					                <li><a href="http://news-web.beta.web.sdp.101.com/baby" title="资讯">资讯</a></li>\
					                <li>|</li>\
					                <li><a href="http://forum-web.beta.web.sdp.101.com/baby" title="论坛">论坛</a></li>\
					            </ul>\
					            <a class="btn-vr" href="http://preschool2.wxm.millylee.cn:8777/vrty-list.shtml" title="">VR体验</a>\
					        </div>\
					    </div>\
				   </div>';
var html_footer = '<div class="footer">\
						<p>福建省教育厅主办</p>\
						<p>技术支持 网龙网络公司</p>\
					</div>';
// var css_header_footer = '<link type="text/css" rel="stylesheet" href="http://baby.101.com/css/17v1/hfcommon.css">';

function writeHeader(idname){
    var desEle = document.getElementById(idname);
    var header = document.createElement('div');
    header.innerHTML = html_header;
    document.body.insertBefore(header,desEle);
}

function insertAfter( newElement, targetElement ){
    var parent = targetElement.parentNode;
    if( parent.lastChild == targetElement ){
	    parent.a( newElement, targetElement );
	}else{
	    parent.insertBefore( newElement, targetElement.nextSibling );
	}
}

function writeFooter(idname){
	var desEle = document.getElementById(idname);
    var footer = document.createElement('div');
    footer.innerHTML = html_footer;
	insertAfter(footer,desEle);
}

function creatLink(){
	var comCssLink = document.createElement('link');
    comCssLink.rel = "stylesheet";
    comCssLink.type="text/css";
    comCssLink.href = "http://baby.101.com/css/17v1/hfcommon.css";
    document.getElementsByTagName("head")[0].appendChild(comCssLink);
}
function creatScript(){
	var script1 = document.createElement('script');
	script1.src='http://baby.101.com/js/17v1/jquery-1.8.0.min.js';
	document.getElementsByTagName("head")[0].appendChild(script1);
	script1.onload = script1.onreadystatechange = function(){
		if (!script1.readyState || 'loaded' === script1.readyState || 'complete' === script1.readyState) {
			var script2 = document.createElement('script');
			script2.src ='http://baby.101.com/js/17v1/header.js';
			document.getElementsByTagName("head")[0].appendChild(script2);
		}
		
	}
	
}
creatLink();
creatScript();
