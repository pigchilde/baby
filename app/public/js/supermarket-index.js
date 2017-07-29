/**
 * 资源首页的请求相关脚本
 * @authors wxm (you@example.org)
 * @date    2017-06-29 16:41:23
 * @version $Id$
 */

var sourceUrl ='http://esp-resource-service.beta.101.com/',//资源的预生产接口
    sourceModuleUrl = 'http://esp-edu-kid.beta.101.com/',
    detailSourceUrl = sourceModuleUrl+'client/#/commodity/',//资源的跳转地址域名commodity指资源信息
    sourceImgUrl = 'http://sdpcs.beta.web.sdp.101.com/v0.1/static/',
    sourceCoverges = 'App/xq/OWNER', //资源的覆盖范围，先用fj:rg/nd/OWNER,App/fj/OWNER，后面真正是Org/xq/OWNER,App/xq/OWNER
    Oname = 'fjsygzxx',
    imgDefault = 'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==';//base64，1像素gif;

$(function(){
	//时间戳
	var getTimestamp = new Date().getTime();

    //模块数据
	var moduleData = {
		vrar : {
			chooseEl : '.vr-sort',
			data: [
			    //vr的数据
			    {
			    	url: '&types=system_vr',
			    	allPageNum : 0,
			    	starPage : 1,
			    	leftIdName : '#vrarsource',
			    	rightIdName : '#vrarhotsouce',
			    	moreListUrl : sourceModuleUrl+'#/resourceList?types=system_vr',
			    	changeId : 'vrchange'
			    },
			    //ar的数据
			    {
			    	url: '&types=system_courseware',
			    	allPageNum : 0,
			    	starPage : 1,
			    	leftIdName : '#vrarsource',
			    	rightIdName : '#vrarhotsouce',
			    	moreListUrl : sourceModuleUrl+'#/resourceList?types=system_courseware',
			    	changeId :'archange'
			    },
			    //flash的数据
			    {
			    	url: '&types=system_flash',
			    	allPageNum : 0,
			    	starPage : 1,
			    	leftIdName : '#vrarsource',
			    	rightIdName : '#vrarhotsouce',
			    	moreListUrl : sourceModuleUrl+'#/resourceList?types=system_flash',
			    	changeId :'flashchange'
			    }
			]
		},
		teach : {
			chooseEl : '.teach-sort',
			data:[
			   //教案的数据
               {
					url: '&types=system_lesson_plan',
					allPageNum : 0,
					starPage : 1,
					leftIdName : '#teachsource',
					rightIdName : '#teachhotsource',
					moreListUrl : sourceModuleUrl+'#/resourceList?types=system_lesson_plan',
					changeId :'jachange'
				},
				//课件的数据
				{
					url: '&types=system_courseware',
					allPageNum : 0,
					starPage : 1,
					leftIdName : '#teachsource',
					rightIdName : '#teachhotsource',
					moreListUrl : sourceModuleUrl+'#/resourceList?types=system_courseware',
					changeId : 'kjchange'
				},
				//电子教材的数据
				{
					url: '&types=system_ebook',
					allPageNum : 0,
					starPage : 1,
					leftIdName : '#teachsource',
					rightIdName : '#teachhotsource',
					moreListUrl : sourceModuleUrl+'#/resourceList?types=system_ebook',
					changeId : 'jjchange'
				}
			]
		},
		media : {
			chooseEl : '.media-sort',
			data:[
				//图片的数据
				{
					url: '&types=system_image',
					allPageNum : 0,
					starPage : 1,
					leftIdName : '#mediasource',
					rightIdName : '#mediahotsource',
					moreListUrl : sourceModuleUrl+'#/resourceList?types=system_image',
					changeId : 'tpchange'
				},
				//音频的数据
				{
					url: '&types=system_audio',
					allPageNum : 0,
					starPage : 1,
					leftIdName : '#mediasource',
					rightIdName : '#mediahotsource',
					moreListUrl : sourceModuleUrl+'#/resourceList?types=system_audio',
					changeId : 'ypchange'
				},
			    //视频的数据
                {
					url: '&types=system_video',
					allPageNum : 0,
					starPage : 1,
					leftIdName : '#mediasource',
					rightIdName : '#mediahotsource',
					moreListUrl : sourceModuleUrl+'#/resourceList?types=system_video',
					changeId :'dhchange'
				}
			]
		},
		lesson : {
			chooseEl : '.lesson-sort',
			data:[
			    //教案的数据
				{
					url: '&types=system_lesson_plan',
					allPageNum : 0,
					starPage : 1,
					leftIdName : '#lessonsource',
					rightIdName : '#lessonhotsource',
					moreListUrl : sourceModuleUrl+'#/resourceList?types=system_lesson_plan',
					changeId : 'ztchange'
				},
				//习题的数据
				{
					url: '&types=system_question',
					allPageNum : 0,
					starPage : 1,
					leftIdName : '#lessonsource',
					rightIdName : '#lessonhotsource',
					moreListUrl : sourceModuleUrl+'#/resourceList?types=system_question',
					changeId : 'ztchange'
				}
			]
		}
	};

	//允许跨域
	jQuery.support.cors = true;	

    //模块——tab切换
    function tabChange(tabObj , el){
    	$(el+' .btn-db a').on('click',function(){
    		var $self = $(this),
    		    nowIndex = $(this).index();
    		$self.addClass('on').siblings().removeClass('on');
    		$(el+' .more-link').attr('href',tabObj[nowIndex].moreListUrl);
    		$(el+' .another').attr('id',tabObj[nowIndex].changeId);
    		dataRequest(tabObj[nowIndex]);
    		changeYchange(tabObj[nowIndex]);
    	});	
    }
    
    //模块——数据请求
    function dataRequest(RequestObj){
    	var htmlLoading = '<div class="loading-wrap">\
    	                        <img src="http://image.101.com/baby/img/loading.gif" alt="">\
    	                        <p>加载中......</p>\
                            </div>';
        var htmlNocont = '<div class="list-no-cont-wrap">\
						    	<img src="http://image.101.com/baby/img/no-cont.png" alt="">\
						    	<p class="tip-txt">小编正在拼命编辑中...</p>\
						    </div>';
    	$(RequestObj.leftIdName).html(htmlNocont); //缺省提示
    	$(RequestObj.rightIdName).html(htmlNocont); //缺省提示

     	$.ajax({
	    	url: sourceUrl+'/v2.0/search?page='+RequestObj.starPage+'&size=7'+ RequestObj.url+'&sorts=!rank_score,!download_count,!shelve_time&coverages='+sourceCoverges+'&priceType=1&timesTamp='+getTimestamp,
	    	type: "GET",
	    	async:false,
	    	headers: {
	    	    Orgname: Oname
	    	},
	    	success: function(result){
	    	    if(typeof result == 'undefined' || result.items.length <= 0) return;
	            var data =  result.items;
	            var liHtml = '';
	            var liHtml2 = data.length>3 ? '' : htmlNocont;
                
                var picListLen = data.length>3 ? 3: data.length;
                var txtListLen = data.length>3 ? data.length : 0;

	            for(var i = 0; i< picListLen; i++){
	                var imgUrl = data[i].resource.cover != ''? sourceImgUrl + data[i].resource.cover.split('${ref-path}/')[1] : ''; 
	                var starWidth = data[i].rank.total_score/5*100+'%';
	                
	                // console.log(getDownloadUrl(data[i].id));
	                liHtml += '<dl>\
									<dt>\
										<a href="'+detailSourceUrl+data[i].id+'" title="'+data[i].resource.name+'"><img src="'+imgUrl+'" alt="" onerror="this.src=\'' + imgDefault + '\';this.onerror = null;"></a>\
									</dt>\
									<dd>\
										<p class="biaoti"><a href="'+detailSourceUrl+data[i].id+'" title="'+data[i].resource.name+'">'+data[i].resource.name+'</a></p>\
										<span class="fonf free">免费</span>\
										<div class="star">\
	                                        <i class="star-back"></i>\
	                                        <i style="width:'+starWidth+'" class="star-former"></i>\
	                                    </div>\
										<a class="download" href="'+getDownloadUrl(data[i].id)+'" title=""><i></i>下载</a>\
									</dd>\
								</dl>'; 
	            }
	            for(var i = 3; i< txtListLen; i++){

	                var starWidth = data[i].rank.total_score/5*100+'%';

				    liHtml2 += '<div class="hoton">\
									<p class="biaoti"><a href="'+detailSourceUrl+data[i].id+'" title="'+data[i].resource.name+'">'+data[i].resource.name+'</a></p>\
									<p class="score"><span class="getsc">'+data[i].rank.total_score.toFixed(1)+'</span>/<span class="fulsc">'+data[i].rank.total_download_count+'</span></p>\
									<div class="star star-smal">\
	                                    <i class="star-back"></i>\
	                                    <i style="width:'+starWidth+'" class="star-former"></i>\
	                                </div>\
								</div>';
	            }
	            $(RequestObj.leftIdName).html(liHtml);
	            $(RequestObj.rightIdName).html(liHtml2);

     
	            RequestObj.allPageNum = Math.ceil(result.total_count/7);  
	    	},
	    	error: function(XMLHttpRequest, textStatus, errorThrown) {
				alert('XMLHttpRequest.status:'+XMLHttpRequest.status);
				alert('XMLHttpRequest.readyState:'+XMLHttpRequest.readyState);
				alert(textStatus);
			}
	    });
    }

    //模块——换一换默认最多切换5页
    function changeYchange(changeObj){
    	var limitNum = changeObj.allPageNum > 5 ? 5 : changeObj.allPageNum;
    	$('#'+changeObj.changeId).unbind('click');
        $('#'+changeObj.changeId).on('click',function(){
            changeObj.starPage ++;
            if(changeObj.starPage >limitNum){
            	changeObj.starPage = 1;
            }
            console.log(changeObj);
            dataRequest(changeObj);
        });
    }

    //模块——初始化
    function moduleInit(moduleObj){
    	tabChange(moduleObj.data, moduleObj.chooseEl);
    	$(moduleObj.chooseEl+' .btn-db a').eq(0).trigger('click');
    	// console.log($(moduleObj.chooseEl+' .btn-db a').length);
    }

    //各个模块初始化
    moduleInit(moduleData.vrar);
    moduleInit(moduleData.teach);
    moduleInit(moduleData.media);
    moduleInit(moduleData.lesson);
    
    
    
    function getUrlPath(){
    	var loc = window.location;
    	return loc.protocol + "//" +loc.hostname;
    }
    function calculateToken(){
    	var loc = window.location;
		var mac = JsMAF.getAuthHeader(getUrlPath()+'/', 'GET') + ",host=\"" +loc.hostname + "\"";
		// console.log(mac);
		return BASE64.encoder(mac);
    }
    function getDownloadUrl(sourceid){
    	return sourceUrl + '/download?id=' + sourceid + '&error_url="'+ sourceUrl  + '"&sid=' + calculateToken();
    }

    //uc判断是否登录，才能下载资源
    ucManager.isLogin().then(function(res) {
 	    //当前登录
 	    if(res=="true"){
 	        //当前已登录，可以获取mactoken签名头，用户信息等操作
 	        $('.download-tc').hide();
 	    }
 	    //当前未登录
 	    else{
 	       //自定义重新登录或其他
 	       $('.sort-cont .download').on('click',function(e){
 	       	    e.preventDefault();
 	       	   $('.download-tc').show();
 	       });
 	    }
 	});

 	//未登录下载弹窗
 	$('.getin-tc .btn-quxiao,.close-getin').on('click',function(){
 		$(this).closest('.getin-tc').hide();
 	})
});