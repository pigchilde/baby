/**
 *
 * @authors chenzl(199283)
 * @editor  chenzl(199283)
 * @date    2017-04-24 17:05:56
 */

var home = {},
	newsUrl = 'http://news.beta.web.sdp.101.com/v0.1/',//新闻的接口
	forumUrl = 'http://forum.beta.web.sdp.101.com/v0.1/',//论坛的接口
	activityUrl = 'https://activity01.beta.101.com/v0.3/', //活动的预生产接口
	sourceUrl ='http://esp-resource-service.beta.101.com/',//资源的接口
    ucUrl = 'https://ucbetapi.101.com/v0.1/', //uc预生产的接口
    sourceCoverges = 'App/xq/OWNER', //资源的覆盖范围，先用fj:rg/nd/OWNER,App/fj/OWNER，后面真正是Org/xq/OWNER,App/xq/OWNER
	csUrl = 'http://cdncs.101.com/v0.1/',//生产环境
	csUrl2 = 'http://betacs.101.com/v0.1/',//预生产环境
	
	detailNewsUrl = 'http://news-web.beta.web.sdp.101.com/baby#/news/',//新闻的跳转地址
	detailForumUrl = 'http://forum-web.beta.web.sdp.101.com/baby#/forumBoardContent/',//论坛的跳转地址
	detailActivityUrl = 'https://activity01.beta.101.com/baby#/detail/',//活动的跳转地址
	detailSourceUrl = 'http://esp-edu-kid.beta.101.com/client/#/commodity/',//资源的跳转地址域名commodity指资源信息
	imgUrl = csUrl+'download?dentryId=',
	imgUrl2 = csUrl2+'download?dentryId=',
	sourceImgUrl = 'http://sdpcs.beta.web.sdp.101.com/v0.1/static/',
	userUrl = 'http://mypage.social.web.sdp.101.com/v0.1/pages/users/actions/query',//用户
	Oname = 'fjsygzxx',
	threadsNum = 0,
	threadsUserId = new Array(),
    defalutTipHtml = '<div class="list-no-cont-wrap">\
                                <img src="http://image.101.com/baby/img/no-cont.png" alt="">\
                                <p class="tip-txt">小编正在拼命编辑中...</p>\
                            </div>',
    imgDefault = 'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==';//base64，1像素gif


home.swiper = function(swiper,left,right,num){//轮播
	var mySwiper = new Swiper(swiper,{
		calculateHeight: true,
		paginationClickable: true,
		slidesPerView: num,
		loop: true,
		observer:true,
		observeParents:true
	});

	$(left).on('click', function(){
    	mySwiper.swipePrev()
  	});

  	$(right).on('click', function(){
    	mySwiper.swipeNext()
  	});

	return mySwiper;
};
var mySwiper6 = home.swiper('.swiper6','.btn-prev6','.btn-next6',1);
var getTimestamp = new Date().getTime();//时间戳		

home.add0= function(m){return m<10?'0'+m:m } // 转成时间

home.transdate= function(date){
	var time = new Date(date);
	var y = time.getFullYear();
	var m = time.getMonth()+1;
	var d = time.getDate();
	var h = time.getHours();
	var mm = time.getMinutes();
	var s = time.getSeconds();
	return y+'-'+home.add0(m)+'-'+home.add0(d);
};

home.tab= function(tab,icon,item){// 切换
	$(tab).click(function(){
		var i = $(this).index();
		$(this).addClass(icon).siblings().removeClass(icon);
		$(item).eq(i).show().siblings(item).hide();
  	});
};

home.post = function(post) {
	var dataId,
		divId = new Array(),
		userId = new Array(),
		idData = new Array();
	idData = {"object_ids" : []};
	
	for (var i = 0; i < 3; i++) {
		dataId = $('#hotSwiper .swiper-slide').eq(i).attr('data-id');
        if(dataId){
    		divId.push(dataId);
    		$.ajax({ 
    	        url: forumUrl+'timelines/forum/'+dataId+'?$limit=2',
    	        type: "GET",
    	        headers: {
    	            Orgname: Oname
    	        },
    	        success: function(data){
    	        	var forumId,
    	        		hotHtml='';
    	        	hotData = data.items;
    	            postDiv = $('<div class="resp fl"></div>');
    	        	for (var b = 0; b < hotData.length; b++) {

    	        		// 帖子
    		        	hotHtml += '<a class="post-list" href="http://forum-web.beta.web.sdp.101.com/baby#/postDetails/'+ hotData[b].id + '" data-id="'+ hotData[b].id + '" title="" >\
    										<dl class="clearfix user-id" data-user = "'+ hotData[b].uid +'">\
    											<dt class="fl">\
    												<img src="http://image.101.com/baby/img/ico-tx-man.png" alt="">\
    											</dt>\
    											<dd class="fl">\
    												<p class="auth"><em>用户名</em>：'+ hotData[b].title +'</p>\
    												<p class="pcor info">\
    													<span class="comment">'+ hotData[b].thread_num +'</span>\
    													<span class="zan"></span>\
    												</p>\
    											</dd>\
    										</dl>\
    									</a>';

    					userId.push({"user_id":hotData[b].uid});
    					idData.object_ids.push(hotData[b].id);
    					home.threads(hotData[b].id);
    					// postDiv.append(hotHtml);
    				}
                    if(hotData.length){
                        forumId = hotData[0].forum_id;
                        for (var j in divId) {
                            if(divId[j] == forumId) {
                                $('#hotSwiper .swiper-slide').eq(j).find('.resp').html(hotHtml);
                            }
                        };
                    }
    				
    				// formDiv.append(dtHtml,postDiv);
    				// $('#hotSwiper').append(formDiv);
    				if(idData.object_ids.length > 0){
                        // console.log("这里执行了");
    					home.zan(idData);
    					home.user(userId,0);
    					
    				}
    				
    	        }
    	    });
        }
	};	
};

home.zan = function(zan) {
	
	var idDataJson = JSON.stringify(zan);
	$.ajax({ 
        url: 'http://interaction.beta.web.sdp.101.com/v0.1/counters/object/FORUM/OBJECT?$select=comment,praise,favor',
        data:idDataJson,
        type: "POST",
        headers: {
            Orgname: Oname
        },
        beforeSend: function(request) {
            request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        },
        success: function(result){
        	if(typeof result.items == 'undefined' || result.items.length <= 0) return;
        	for (var i = 0; i < result.items.length; i++) {
        		var picSrc = $(".post-list").eq(i).attr('data-id');
        		for (var o = 0; o < result.items.length; o++){
        			if(result.items[o].id == picSrc){
                       // console.log(result.items.length);
        				$(".post-list").eq(i).find('.zan').html(result.items[o].praise)
        			}
		        };
	        };
        }
    });
};

home.user = function(user,num) {
	var userJson = JSON.stringify(user),
		userData,userAttr,userImg;
	$.ajax({ 
        url: 'http://mypage.beta.web.sdp.101.com/v0.1/pages/users/actions/query',
        data:userJson,
        type: "POST",
        headers: {
            Orgname: Oname
        },
        success: function(result){
        	if(typeof result.items == 'undefined' || result.items.length <= 0) return;
        	userData = result.items;
            // console.log(userData.length);

        	for(var i = 0; i < userData.length; i++){
        		userAttr = $('.user-id').eq(i).attr('data-user');
        		threadsUserAttr = $('.auth-oth').eq(i).find('em').attr('user-id');

        		for (var j in userData) {
					if( num == 0 && userData[j].user_id == userAttr) {
						userImg = 'http://betacs.101.com/v0.1/static/preproduction_content_cscommon/avatar/'+result.items[j].user_id+'/'+result.items[j].user_id+'.jpg?size=80';
                        // console.log('userImg');
						$('.user-id').eq(i).find('dt img').attr('src', userImg);
						$('.user-id').eq(i).find('.auth em').html(result.items[j].name);
					}
					if( num == 1 && userData[j].user_id == threadsUserAttr) {
						$('.auth-oth').eq(i).find('em').html(result.items[j].name);
					}
				};
        	}
        }
    });
};
home.threads = function(threads) {
	var threadsData,threadsHtml;
	$.ajax({ 
        url: forumUrl+'threads/posts/'+ threads +'?$limit=1',
        type: "GET",
        headers: {
            Orgname: Oname
        },
        success: function(result){
        	threadsNum++;

        	if(typeof result.items == 'undefined' || result.items.length <= 0) {
        		if(threadsNum >0){
	        		home.user(threadsUserId,1);
	        	};
        		return;
        	}else{
        		threadsData = result.items;
        		threadsUserId.push({"user_id":threadsData[0].uid});
	        	for(var i = 0; i < 6; i++){
	        		var picSrc = $(".post-list").eq(i).attr('data-id');

	        		for (var j in threadsData) {
						if(threadsData[j].post_id == picSrc) {
							var threadsHtml = '<p class="pcor auth-oth"><em>用户2</em>回复：<span>'+ threadsData[j].article +'</span></p>';
							$('.post-list').eq(i).find('dd').append(threadsHtml);
							$('.post-list').eq(i).find('.auth-oth em').attr('user-id',threadsData[j].uid);
						}
					};
	        	};
	        	if(threadsNum > 0){
	        		home.user(threadsUserId,1);
	        	};
	        	
        	};
        	
        	
        	
        }
    });
};

$(function (){
	/* banner */
	var mySwiper = new Swiper('.banner',{
		resizeReInit: true,
		calculateHeight: true,
		pagination: '.pagination',
		paginationClickable: true,
		loop: true
	})
    /*test 因没有数据要效果展示*/
    /* st2b */
    var mySwiperbf = home.swiper('.swiperbf','.btn-prevbf','.btn-nextbf',4);
    /* st2a  */
    var mySwiperaf = home.swiper('.swiperaf','.btn-prevaf','.btn-nextaf',4);
    /* st5b */
    var mySwiper5b = home.swiper('.swiper5b','.btn-prev5b','.btn-next5b',4);
    /* st5a */
    var mySwiper5a = home.swiper('.swiper5a','.btn-prev5a','.btn-next5a',4);
	/* st4b */
	var mySwiper4b = home.swiper('.swiper4b','.btn-prev4b','.btn-next4b',1);
	/* st4a */
	var mySwiper4a = home.swiper('.swiper4a','.btn-prev4a','.btn-next4a',1);


    /*test tab 因没有数据要效果展示*/
    home.tab('.st2btit-s a','iton','.swiper2-cont .swiper2-nav');
    home.tab('.st5btit-s a','iton5','.swiper5-cont .swiper5-nav');
	home.tab('.st4btit-s a','iton4','.swiper4-cont .swiper4-nav');
    

    
    //回到顶部
    $(window).scroll(function(){
        if ($(window).scrollTop()>1500){
            $(".gotop").addClass('show');
        }
        else
        {
            $(".gotop").removeClass('show');
        }
    });

    //当点击跳转链接后，回到页面顶部位置
    $(".gotop").click(function(){
        $('body,html').animate({scrollTop:0},1000);
        return false;
    });	

    // 新闻接口套用
	jQuery.support.cors = true;
	
	//资讯
	// $.ajax({ 
 //        url: newsUrl+'news?&size=5&count=true&timesTamp=' + getTimestamp,
 //        type: "GET",
 //        headers: {
 //            Orgname: Oname
 //        },
 //        success: function(result){
 //            var dlHtml = '',liHtml = '';
 //        	if(typeof result.items == 'undefined' || result.items.length <= 0) {
 //                dlHtml = '当前没有数据哦~';
 //                $('#hot').html(dlHtml);
 //                return;
 //            }else{
 //                var data = result.items;

 //                var imgUrl = data[0].thumbnail != ''? imgUrl2 + data[0].thumbnail + '&size=320' : '';
 //                var picListLen =  data.length>1 ? 1: data.length;
 //                var txtListLen =  data.length>1 ? data.length : 0;

 //                for(var i = 0; i< picListLen; i++){
 //                    dlHtml += '<dt class="fl">\
 //                            <a href="' + detailNewsUrl + data[0].id + '" title=""><img src="' + imgUrl+'" alt=""  onerror="this.src=\'' + imgDefault + '\';this.onerror = null;"></a>\
 //                        </dt>\
 //                        <dd class="detail">\
 //                            <h3 class="tit"><a href="' + detailNewsUrl + data[0].id + '" title="' + data[0].title + '">' + data[0].title + '</a></h3>\
 //                            <p class="intro">'+data[0].summary+'</p>\
 //                        </dd>';
 //                }
 //                $('#hot').html(dlHtml);
 //                for(var i = 1; i < txtListLen; i++) {
 //                    var time = home.transdate(data[i].publish_time);
 //                    liHtml += '<li class="clearfix">\
 //                                <a href="' + detailNewsUrl + data[i].id + '" title="' + data[i].title + '">\
 //                                    <em class="num">' + i + '</em>\
 //                                    <span class="fr">' + time + '</span>\
 //                                    <h3 class="tit">' + data[i].title + '</h3>\
 //                                </a>\
 //                            </li>';
 //                };
 //                $('#newsList').append(liHtml);
 //            }
 //        }
 //    });

	//专题（活动）
	// $.ajax({ 
 //        url: activityUrl+'activities/hot?limit=4&timesTamp=' + getTimestamp,
 //        type: "GET",
 //        headers: {
 //            Orgname: Oname
 //        },
 //        success: function(result){
 //            var liHtml = '';
 //        	if(typeof result.items == 'undefined' || result.items.length <=0){
 //                liHtml = '<li>最近没有热门专题活动，敬请期待~</li>';
 //                $('#topic').html(liHtml);
 //                return;
 //            }else{
 //                var data = result.items;
 //                console.log(result);
 //                for (var i = 0; i < data.length; i++) {
 //                    var imgUrl = data[i].poster != ''? imgUrl2+data[i].poster + '&size=240' : '';
 //                    liHtml += '<li>\
 //                                <a href="'+detailActivityUrl+data[i].activity_id+' " title="'+data[i].name+'">\
 //                                    <img src="'+imgUrl+'" alt=""  onerror="this.src=\'' + imgDefault + '\';this.onerror = null;">\
 //                                </a>\
 //                            </li>';
 //                };
 //                $('#topic').html(liHtml);
 //            }
        	
 //        }
 //    });
    
    //资源-职前培养
    // $.ajax({
    // 	url: sourceUrl+'/v2.0/search?page=1&size=5&types=system_courseware&sorts=!rank_score,!download_count,!shelve_time&coverages='+sourceCoverges+'&priceType=1&patternId=JB',
    // 	type: "GET",
    	
    // 	success: function(result){
    //         var liHtml = '';
    //         home.tab('.st2btit-s a','iton','.swiper2-cont .swiper2-nav'); 
    //         if(typeof result.items == 'undefined' || result.items.length <= 0) {
    //             liHtml = defalutTipHtml;
    //             $('#zqpycourse').html(liHtml);
    //             return;
    //         }else{
    //             var data =  result.items;
    //             for(var i = 0; i< data.length; i++){
    //                 var imgUrl = data[i].resource.cover != ''? sourceImgUrl + data[i].resource.cover.split('${ref-path}/')[1] : ''; 
    //                 liHtml += '<div class="swiper-slide">\
    //                                 <dl>\
    //                                     <dt>\
    //                                         <a href="'+detailSourceUrl+data[i].id+'" title="'+data[i].resource.name+'">\
    //                                             <img src="'+imgUrl+'" alt="" onerror="this.src=\'' + imgDefault + '\';this.onerror = null;">\
    //                                         </a>\
    //                                     </dt>\
    //                                     <dd>\
    //                                         <a href="'+detailSourceUrl+data[i].id+'" title="'+data[i].resource.name+'">'+data[i].resource.name+'</a>\
    //                                     </dd>\
    //                                 </dl>\
    //                             </div>';  
    //             }
    //             $('#zqpycourse').html(liHtml);
    //             home.swiper('.swiperbf','.btn-prevbf','.btn-nextbf',4);
    //         }  
    // 	}
    // });
    
    // //资源-职后培训
    // $.ajax({
    //     url: sourceUrl+'/v2.0/search?page=1&size=5&types=system_courseware&sorts=!rank_score,!download_count,!shelve_time&coverages='+sourceCoverges+'&priceType=1&patternId=JA',
    //     type: "GET",
        
    //     success: function(result){
    //         var liHtml = '';
    //         if(typeof result.items == 'undefined' || result.items.length <= 0){
    //             liHtml = defalutTipHtml;
    //             $('#zhpxcourse').html(liHtml);
    //             return;
    //         }else{
    //             var data =  result.items;
    //             for(var i = 0; i< data.length; i++){
    //                 var imgUrl = data[i].resource.cover != ''? sourceImgUrl + data[i].resource.cover.split('${ref-path}/')[1] : ''; 
    //                 liHtml += '<div class="swiper-slide">\
    //                                 <dl>\
    //                                     <dt>\
    //                                         <a href="'+detailSourceUrl+data[i].id+'" title="'+data[i].resource.name+'">\
    //                                             <img src="'+imgUrl+'" alt="" onerror="this.src=\'' + imgDefault + '\';this.onerror = null;">\
    //                                         </a>\
    //                                     </dt>\
    //                                     <dd>\
    //                                         <a href="'+detailSourceUrl+data[i].id+'" title="'+data[i].resource.name+'">'+data[i].resource.name+'</a>\
    //                                     </dd>\
    //                                 </dl>\
    //                             </div>';  
    //             }
    //             $('#zhpxcourse').append(liHtml);
    //             home.swiper('.swiperaf','.btn-prevaf','.btn-nextaf',4); 
    //         }         
    //     }
    // });

    // //资源-海量资源-VR
    // $.ajax({
    //     url: sourceUrl+'/v2.0/search?page=1&size=1&types=system_vr&sorts=!rank_score,!download_count,!shelve_time&coverages='+sourceCoverges+'&priceType=1',
    // 	type: "GET",
    // 	headers: {
    // 	    Orgname: Oname
    // 	},
    // 	success: function(result){
    //         var liHtml = '';
    // 	    if(typeof result.items == 'undefined' ||  result.items.length <= 0){
    //             liHtml = '<a href="javascript:;" title="">\
    //                             <img src="" alt=""  onerror="this.src=\'' + imgDefault + '\';this.onerror = null;">\
    //                             <p>当前没有vr资源数据</p>\
    //                       </a>';
    //             $('#vrhot').html(liHtml);
    //             return;
    //         }else{
    //             var data = result.items;
    //             for(var i = 0; i< data.length; i++){
    //                 var imgUrl = data[i].resource.cover != ''? sourceImgUrl + data[i].resource.cover.split('${ref-path}/')[1] : '';  
    //                 liHtml += '<a href="'+detailSourceUrl+data[i].id+'" title="'+data[i].resource.name+'">\
    //                             <img src="'+imgUrl+'" alt=""  onerror="this.src=\'' + imgDefault + '\';this.onerror = null;">\
    //                             <p>'+data[i].resource.name+'</p>\
    //                         </a>';  
    //             }
    //             $('#vrhot').html(liHtml);
    //         }
           
    // 	}
    // });

    // //资源-海量资源-图片
    // $.ajax({
    //     url: sourceUrl+'/v2.0/search?page=1&size=1&types=system_image&sorts=!rank_score,!download_count,!shelve_time&coverages='+sourceCoverges+'&priceType=1',
    // 	type: "GET",
    // 	headers: {
    // 	    Orgname: Oname
    // 	},
    // 	success: function(result){
    //         var liHtml = '';
    // 	    if(typeof result.items == 'undefined' ||  result.items.length <= 0){
    //             liHtml = '<a href="javascript:;" title="">\
    //                             <img src="" alt=""  onerror="this.src=\'' + imgDefault + '\';this.onerror = null;">\
    //                             <p>当前没有图片资源数据</p>\
    //                       </a>';
    //             $('#imagehot').html(liHtml);
    //             return;
    //         }else{
    //             var data = result.items;
    //             for(var i = 0; i< data.length; i++){
    //                 var imgUrl = data[i].resource.cover != ''? sourceImgUrl + data[i].resource.cover.split('${ref-path}/')[1] : ''; 
    //                 liHtml += '<a href="'+detailSourceUrl+data[i].id+'" title="'+data[i].resource.name+'">\
    //                             <img src="'+imgUrl+'" alt="" onerror="this.src=\'' + imgDefault + '\';this.onerror = null;">\
    //                             <p>'+data[i].resource.name+'</p>\
    //                         </a>';  
    //             }
    //             $('#imagehot').append(liHtml);
    //         }   
    // 	}
    // });

    // //资源-海量资源-动画flash
    // $.ajax({
    //     url: sourceUrl+'/v2.0/search?page=1&size=1&types=system_flash&sorts=!rank_score,!download_count,!shelve_time&coverages='+sourceCoverges+'&priceType=1',
    // 	type: "GET",
    // 	headers: {
    // 	    Orgname: Oname
    // 	},
    // 	success: function(result){
    //        var liHtml = '';
    // 	    if(typeof result.items == 'undefined' || result.items.length <= 0){
    //             liHtml = '<a href="javascript:;" title="">\
    //                             <img src="" alt=""  onerror="this.src=\'' + imgDefault + '\';this.onerror = null;">\
    //                             <p>当前没有flash资源数据</p>\
    //                       </a>';
    //             $('#flashhot').html(liHtml);
    //             return;
    //         }else{
    //             var data = result.items;
    //             for(var i = 0; i< data.length; i++){
    //                 var imgUrl = data[i].resource.cover != ''? sourceImgUrl + data[i].resource.cover.split('${ref-path}/')[1] : '';  
    //                 liHtml += '<a href="'+detailSourceUrl+data[i].id+'" title="'+data[i].resource.name+'">\
    //                             <img src="'+imgUrl+'" alt=""  onerror="this.src=\'' + imgDefault + '\';this.onerror = null;">\
    //                             <p>'+data[i].resource.name+'</p>\
    //                         </a>';
    //             }
    //             $('#flashhot').html(liHtml);
    //         }  
    // 	}
    // });

    // //资源-海量资源-视频
    // $.ajax({
    //     url: sourceUrl+'/v2.0/search?page=1&size=1&types=system_audio&sorts=!rank_score,!download_count,!shelve_time&coverages='+sourceCoverges+'&priceType=1',
    // 	type: "GET",
    // 	headers: {
    // 	    Orgname: Oname
    // 	},
    // 	success: function(result){
    //         var liHtml = '';
    // 	    if(typeof result.items == 'undefined' || result.items.length <= 0){
    //             liHtml = '<a href="javascript:;" title="">\
    //                             <img src="" alt=""  onerror="this.src=\'' + imgDefault + '\';this.onerror = null;">\
    //                             <p>当前没有视频资源数据</p>\
    //                       </a>';
    //             $('#videohot').html(liHtml);
    //             return;
    //         }else{
    //             var data = result.items;
               
    //             for(var i = 0; i< data.length; i++){
    //                 var imgUrl = data[i].resource.cover != ''? sourceImgUrl + data[i].resource.cover.split('${ref-path}/')[1] : ''; 
    //                 liHtml += '<a href="'+detailSourceUrl+data[i].id+'" title="'+data[i].resource.name+'">\
    //                             <img src="'+imgUrl+'" alt=""  onerror="this.src=\'' + imgDefault + '\';this.onerror = null;">\
    //                             <p>'+data[i].resource.name+'</p>\
    //                         </a>';  
    //             }
    //             $('#videohot').append(liHtml);
    //         }
            
    // 	}
    // });

    // //资源-海量资源-教案
    // $.ajax({
    //     url: sourceUrl+'/v2.0/search?page=1&size=1&types=system_lesson_plan&sorts=!rank_score,!download_count,!shelve_time&coverages='+sourceCoverges+'&priceType=1',
    // 	type: "GET",
    // 	headers: {
    // 	    Orgname: Oname
    // 	},
    // 	success: function(result){
    //         var liHtml = '';
    // 	    if(typeof result.items == 'undefined' || result.items.length <= 0){
    //             liHtml = '<a href="javascript:;" title="">\
    //                             <img src="" alt=""  onerror="this.src=\'' + imgDefault + '\';this.onerror = null;">\
    //                             <p>当前没有教案资源数据</p>\
    //                       </a>';
    //             $('#lessonplanhot').html(liHtml);
    //             return;
    //         }else{
    //             var data = result.items;
    //             for(var i = 0; i< data.length; i++){
    //                 var imgUrl = data[i].resource.cover != ''? sourceImgUrl + data[i].resource.cover.split('${ref-path}/')[1] : '';
    //                 liHtml += '<a href="'+detailSourceUrl+data[i].id+'" title="'+data[i].resource.name+'">\
    //                             <img src="'+imgUrl+'" alt=""  onerror="this.src=\'' + imgDefault + '\';this.onerror = null;">\
    //                             <p>'+data[i].resource.name+'</p>\
    //                         </a>';  
    //             }
    //             $('#lessonplanhot').append(liHtml);
    //         }
            
    // 	}
    // });

    // //资源-海量资源-课件
    // $.ajax({
    //     url: sourceUrl+'/v2.0/search?page=1&size=1&types=system_courseware&sorts=!rank_score,!download_count,!shelve_time&coverages='+sourceCoverges+'&priceType=1',
    // 	type: "GET",
    // 	headers: {
    // 	    Orgname: Oname
    // 	},
    // 	success: function(result){
    //         var liHtml = '';
    // 	    if(typeof result.items == 'undefined' || result.items.length <= 0){
    //             liHtml = '<a href="javascript:;" title="">\
    //                             <img src="" alt=""  onerror="this.src=\'' + imgDefault + '\';this.onerror = null;">\
    //                             <p>当前没有课件资源数据</p>\
    //                       </a>';
    //             $('#coursewarehot').html(liHtml);
    //             return;
    //         }else{
    //             var data = result.items;
    //             for(var i = 0; i< data.length; i++){
    //                 var imgUrl = data[i].resource.cover != ''? sourceImgUrl + data[i].resource.cover.split('${ref-path}/')[1] : ''; 
    //                 liHtml += '<a href="'+detailSourceUrl+data[i].id+'" title="'+data[i].resource.name+'">\
    //                             <img src="'+imgUrl+'" alt=""  onerror="this.src=\'' + imgDefault + '\';this.onerror = null;">\
    //                             <p>'+data[i].resource.name+'</p>\
    //                         </a>';  
    //             }
    //             $('#coursewarehot').append(liHtml);
    //         }
            
    // 	}
    // });

    // //资源-海量资源-习题
    // $.ajax({
    //     url: sourceUrl+'/v2.0/search?page=1&size=1&types=system_question&sorts=!rank_score,!download_count,!shelve_time&coverages='+sourceCoverges+'&priceType=1',
    // 	type: "GET",
    // 	headers: {
    // 	    Orgname: Oname
    // 	},
    // 	success: function(result){
    //         var liHtml = '';
    // 	    if(typeof result.items == 'undefined' || result.items.length <= 0){
    //             liHtml = '<a href="javascript:;" title="">\
    //                             <img src="" alt=""  onerror="this.src=\'' + imgDefault + '\';this.onerror = null;">\
    //                             <p>当前没有习题资源数据</p>\
    //                       </a>';
    //             $('#questionhot').html(liHtml);
    //             return;
    //         }else{
    //             var data = result.items;
              
    //             for(var i = 0; i< data.length; i++){
    //                 var imgUrl = data[i].resource.cover != ''? sourceImgUrl + data[i].resource.cover.split('${ref-path}/')[1] : '';  
    //             liHtml += '<a href="'+detailSourceUrl+data[i].id+'" title="'+data[i].resource.name+'">\
    //                         <img src="'+imgUrl+'" alt=""  onerror="this.src=\'' + imgDefault + '\';this.onerror = null;">\
    //                         <p>'+data[i].resource.name+'</p>\
    //                     </a>';  
    //             }
    //             $('#questionhot').append(liHtml); 
    //         }
            
    // 	}
    // });

    // //资源-父母课堂
    // $.ajax({
    //     url: sourceUrl+'/v2.0/search?page=1&size=4&types=system_courseware&sorts=!rank_score,!download_count,!shelve_time&coverages='+sourceCoverges+'&priceType=1&patternId=FA',
    //     type: "GET",
        
    //     success: function(result){
    //         var liHtml = '';
    //         home.tab('.st5btit-s a','iton5','.swiper5-cont .swiper5-nav');
    //         if(typeof result.items == 'undefined' || result.items.length <= 0){
    //             liHtml = defalutTipHtml;
    //             $('#fmktcourse').append(liHtml);
    //             return;
    //         }else{
    //             var data =  result.items;
                
    //             for(var i = 0; i< data.length; i++){
    //                 var imgUrl = data[i].resource.cover != ''? sourceImgUrl + data[i].resource.cover.split('${ref-path}/')[1] : '';  
    //                 liHtml += '<div class="swiper-slide">\
    //                                 <dl>\
    //                                     <dt>\
    //                                         <a href="'+detailSourceUrl+data[i].id+'" title="'+data[i].resource.name+'">\
    //                                             <img src="'+imgUrl+'" alt=""  onerror="this.src=\'' + imgDefault + '\';this.onerror = null;">\
    //                                         </a>\
    //                                     </dt>\
    //                                     <dd>\
    //                                         <a href="'+detailSourceUrl+data[i].id+'" title="'+data[i].resource.name+'">'+data[i].resource.name+'</a>\
    //                                     </dd>\
    //                                     <dd class="ico-clip"></dd>\
    //                                 </dl>\
    //                             </div>'; 
    //             }

    //             $('#fmktcourse').append(liHtml);
    //             home.swiper('.swiper5b','.btn-prev5b','.btn-next5b',4);
    //         }
    //     }
    // });
   
    // //资源-科学育儿
    // $.ajax({
    //     url: sourceUrl+'/v2.0/search?page=1&size=4&types=system_courseware&sorts=!rank_score,!download_count,!shelve_time&coverages='+sourceCoverges+'&priceType=1&patternId=HM',
    //     type: "GET",
        
    //     success: function(result){
    //         var liHtml = '';
    //         if(typeof result.items == 'undefined' || result.items.length <= 0){
    //             liHtml = defalutTipHtml;
    //             $('#kxyecourse').append(liHtml);
    //             return;
    //         }else{
    //             var data =  result.items;
    //             for(var i = 0; i< data.length; i++){
    //                 var imgUrl = data[i].resource.cover != ''? sourceImgUrl + data[i].resource.cover.split('${ref-path}/')[1] : ''; 
    //                 liHtml += '<div class="swiper-slide">\
    //                                 <dl>\
    //                                     <dt>\
    //                                         <a href="'+detailSourceUrl+data[i].id+'" title="'+data[i].resource.name+'">\
    //                                             <img src="'+imgUrl+'" alt="" onerror="this.src=\'' + imgDefault + '\';this.onerror = null;">\
    //                                         </a>\
    //                                     </dt>\
    //                                     <dd>\
    //                                         <a href="'+detailSourceUrl+data[i].id+'" title="'+data[i].resource.name+'">'+data[i].resource.name+'</a>\
    //                                     </dd>\
    //                                     <dd class="ico-clip"></dd>\
    //                                 </dl>\
    //                             </div>'; 
    //             }
    //             $('#kxyecourse').append(liHtml);
    //             /* st5a */
    //             home.swiper('.swiper5a','.btn-prev5a','.btn-next5a',4);
    //         }    
    //     }
    // });

    //资源-早教启迪-能力培养
    // $.ajax({
    //     url: sourceUrl+'/v2.0/search?page=1&size=5&types=system_vr,system_objective,system_lesson_plan,system_ebook,system_courseware,system_question,system_image,system_audio,system_video,system_flash&sorts=!rank_score,!download_count,!shelve_time&coverages='+sourceCoverges+'&priceType=1&patternId=EL&categories=EL$T10001,EL$T10002,EL$T10003,EL$T10008,EL$T10013,EL$T10014,EL$T10015',
    //     type: "GET",
        
    //     success: function(result){
    //         var liHtml = '';
    //         home.tab('.st4btit-s a','iton4','.swiper4-cont .swiper4-nav');
    //         console.log(result.items.length);
    //         if(typeof result.items == 'undefined' || result.items.length <= 0){
    //             liHtml = defalutTipHtml;
    //             $('#nlpysource').html(liHtml);
    //             return;
    //         }else{
    //             var data =  result.items;
    //             var bigHtml = '';
    //             var smallHtml = '';

    //             for(var i=0; i<1;i++){
    //                 var imgUrl = data[i].resource.cover != ''? sourceImgUrl + data[i].resource.cover.split('${ref-path}/')[1] : '';
    //                 bigHtml += '<li class="longli">\
    //                                 <a href="'+detailSourceUrl+data[i].id+'" title="'+data[i].resource.name+'">\
    //                                     <img src="'+imgUrl+'" alt="" onerror="this.src=\'' + imgDefault + '\';this.onerror = null;">\
    //                                     <div class="li-on">\
    //                                         <h4>'+data[i].resource.name+'</h4>\
    //                                         <p>'+data[i].resource.description+'</p>\
    //                                     </div>\
    //                                 </a>\
    //                             </li>';
    //             }
    //             for(var i=1; i<data.length; i++){
    //                 var imgUrl = data[i].resource.cover != ''? sourceImgUrl + data[i].resource.cover.split('${ref-path}/')[1] : '';
    //                 smallHtml += '<li>\
    //                                 <a href="'+detailSourceUrl+data[i].id+'" title="'+data[i].resource.name+'">\
    //                                     <img src="'+imgUrl+'" alt="" onerror="this.src=\'' + imgDefault + '\';this.onerror = null;">\
    //                                     <div class="li-on">\
    //                                         <h4>'+data[i].resource.name+'</h4>\
    //                                         <p>'+data[i].resource.description+'</p>\
    //                                     </div>\
    //                                 </a>\
    //                             </li>';
    //             }
    //             liHtml = '<div class="swiper-slide">\
    //                         <ul class="st4-list clearfix" >'+
    //                         bigHtml + smallHtml+'</ul>\
    //                       </div>';
    //             $('#nlpysource').html(liHtml);
    //             /* st4b */
    //             home.swiper('.swiper4b','.btn-prev4b','.btn-next4b',1);
    //         }    
    //     }
    // });

    //资源-早教启迪-素质拓展
    // $.ajax({
    //     url: sourceUrl+'/v2.0/search?page=1&size=5&types=system_vr,system_objective,system_lesson_plan,system_ebook,system_courseware,system_question,system_image,system_audio,system_video,system_flash&sorts=!rank_score,!download_count,!shelve_time&coverages='+sourceCoverges+'&priceType=1&patternId=EL&categories=EL$T10004,EL$T10005,EL$T10006,EL$T10007,EL$T10009,EL$T10010,EL$T10011,EL$T10012',
    //     type: "GET",
        
    //     success: function(result){
    //         var liHtml = '';
    //         console.log(result.items.length);
    //         if(typeof result.items == 'undefined' || result.items.length <= 0){
    //             liHtml = defalutTipHtml;
    //             $('#sztzsource').html(liHtml);
    //             return;
    //         }else{
    //             var data =  result.items;
    //             var bigHtml = '';
    //             var smallHtml = '';

    //             for(var i=0; i<1;i++){
    //                 var imgUrl = data[i].resource.cover != ''? sourceImgUrl + data[i].resource.cover.split('${ref-path}/')[1] : '';
    //                 bigHtml += '<li class="longli">\
    //                                 <a href="'+detailSourceUrl+data[i].id+'" title="'+data[i].resource.name+'">\
    //                                     <img src="'+imgUrl+'" alt="" onerror="this.src=\'' + imgDefault + '\';this.onerror = null;">\
    //                                     <div class="li-on">\
    //                                         <h4>'+data[i].resource.name+'</h4>\
    //                                         <p>'+data[i].resource.description+'</p>\
    //                                     </div>\
    //                                 </a>\
    //                             </li>';
    //             }
    //             for(var i=1; i<data.length; i++){
    //                 var imgUrl = data[i].resource.cover != ''? sourceImgUrl + data[i].resource.cover.split('${ref-path}/')[1] : '';
    //                 smallHtml += '<li>\
    //                                 <a href="'+detailSourceUrl+data[i].id+'" title="'+data[i].resource.name+'">\
    //                                     <img src="'+imgUrl+'" alt="" onerror="this.src=\'' + imgDefault + '\';this.onerror = null;">\
    //                                     <div class="li-on">\
    //                                         <h4>'+data[i].resource.name+'</h4>\
    //                                         <p>'+data[i].resource.description+'</p>\
    //                                     </div>\
    //                                 </a>\
    //                             </li>';
    //             }
    //             liHtml = '<div class="swiper-slide">\
    //                         <ul class="st4-list clearfix" >'+
    //                         bigHtml + smallHtml+'</ul>\
    //                       </div>';
    //             $('#sztzsource').html(liHtml);
    //             /* st4a */
    //             home.swiper('.swiper4a','.btn-prev4a','.btn-next4a',1);
    //         }    
    //     }
    // });

    // 推荐版块
	// $.ajax({ 
 //        url: forumUrl+'forums/hot?page=0&size=8&timesTamp=' + getTimestamp,
 //        type: "GET",
 //        headers: {
 //            Orgname: Oname
 //        },
 //        success: function(result){
 //            var liHtml = '';
 //        	if(typeof result.items == 'undefined' || result.items.length <= 0){
 //                liHtml = '<li>论坛的小伙伴都集体去看世界了，当前没有数据哦~</li>';
 //                $('#forumsHot').append(liHtml);
 //                return;
 //            }else{
 //                var data = result.items;
                
 //                for (var i = 0; i < data.length; i++) {
 //                    var imgUrl = data[i].image_id != ''? imgUrl2+data[i].image_id + '&size=80' : '';
 //                    liHtml += '<li>\
 //                                    <a href="' + detailForumUrl + data[i].id + '" title="' + data[i].name + '">\
 //                                        <div class="img-bord">\
 //                                            <img src="'+imgUrl+'" alt="" onerror="this.src=\'' + imgDefault + '\';this.onerror = null;">\
 //                                        </div>\
 //                                        <span>' + data[i].name + '</span>\
 //                                    </a>\
 //                                </li>';
 //                };
 //                $('#forumsHot').append(liHtml);
 //            }
        	
 //        }
 //    });

    // 论坛更贴
   //  $.ajax({ 
   //      url: forumUrl+'forums/hot?page=0&size=3&timesTamp=' + getTimestamp,
   //      type: "GET",
   //      headers: {
   //          Orgname: Oname
   //      },
   //      success: function(result){

   //      	if(typeof result.items == 'undefined' || result.items.length <= 0) return;
   //      	var data = result.items;
   //          var sHtml,hotHtml,dtHtml = '',hotData,userHtml,formDiv,postDiv,userId = {"user_id" : []},idData =new Array();
   //          for (var i = 0; i < data.length; i++) {
   //          	// 版块
   //              var imgUrl = data[i].image_id != ''? imgUrl2+data[i].image_id + '&size=80': '';
			// 	dtHtml = '<div class="swiper-slide clearfix" data-id = "'+ data[i].id +'"><div class="intd fl">\
			// 					<img src="'+imgUrl+'" alt="" onerror="this.src=\'' + imgDefault + '\';this.onerror = null;">\
			// 					<h4>' + data[i].name + '</h4>\
			// 					<p><i></i>'+ data[i].member_num +'</p>\
			// 				</div><div class="resp fl"></div></div>';
			// 	idData.push(data[i].id);
			// 	$('#hotSwiper').append(dtHtml);
   //              mySwiper6.init();
			// 	if(idData.length == data.length ){
   //                  home.post();
			// 	};
			// };
			// mySwiper6.reInit();
   //      }
   //  });
});

	