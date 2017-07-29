/*返回顶部*/
$(function () {
    var $popupScroll = $('.pdf-tc .fultc-scrollcont'),
        $pdfScroll = $('.pdf-arc .arcscroll-cont');
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

    /*播放----暂停 按钮切换*/
    $('.playorpause').click(function(){
        $(this).toggleClass('pause');
    })

    /*弹窗提示用户登录*/
    $('.plsgetin a').click(function(){
        $('.comment-tc').show();
    })
    $('.takeucom').click(function(){
        $('.comment-tc').show();
    })
    $('.storage').click(function(){
        $('.comment-tc').show();
    })
    $('.btn-dnow').click(function(){
        $('.comment-tc').show();
    })



    $('.downloadit').click(function(){
        $('.purch-tc').show();
    })



    $('.comment-tc-close').click(function(){
        $('.comment-tc').hide();
    })
    $('.purch-tc-close').click(function(){
        $('.purch-tc').hide();
    })
    $('.purch-tc-close').click(function(){
        $('.purch-tc').hide();
    })

    /*全屏弹窗*/
    $('.ppt-arc .allscreen').click(function(){
        $('.ppt-tc').show();
    })
    $('.ppt-tc .allscreen').click(function(){
        $('.ppt-tc').hide();
    })

    $('.pdf-arc .allscreen').click(function(){
        $('body').css('overflow-y','hidden');
        $('#ascrail2001').show();
        $('.pdf-tc').show();
        if($popupScroll.length>0 ){
            initPopupScroll();
        }
    })
    $('.pdf-tc .allscreen').click(function(){
        $('body').css('overflow-y','auto');
        $('#ascrail2001').hide();
        $('.pdf-tc').hide();

    })

    $('.video-arc .allscreen').click(function(){
        $('.video-tc').show();
    })
    $('.video-tc .allscreen').click(function(){
        $('.video-tc').hide();
    })

    $('.pic-arc .allscreen').click(function(){
        $('.pic-tc').show();
        initSwiper2();
    })
    $('.pic-tc .allscreen').click(function(){
        $('.pic-tc').hide();
    })

    $(document).keydown(function(event){
        if(event.keyCode == 27){
            $('body').css('overflow-y','auto');
            $('#ascrail2001').hide();
            $('.getin-tc').hide();
        }
    });

    if( $pdfScroll.length>0 ){
        initPdfScroll();
    }
});

function initSwiper2(){
    var mySwiper2 = new Swiper('.banner-all-pic',{
        resizeReInit: true,
        calculateHeight: true,
        slidesPerView: 1,
        loop: true
    })
    $('.fulpic-goon').on('click', function(){
        mySwiper2.swipePrev()
    });
    $('.fulpic-come').on('click', function(){
        mySwiper2.swipeNext()
    });
}
//初始化弹窗滚动条
function initPopupScroll(){
    // $('.nicescroll-rails').show();
    $(".pdf-tc .fultc-scrollcont").niceScroll({
        cursorcolor:"#eee",// 设置光标颜色
        sensitiverail:true,// 点击滚动条，滚动到指定位置
        cursorfixedheight:30, //设置固定高度游标
        autohidemode:false, // 怎样隐藏滚动条
        background:"#eee", // 设置滚动条背景颜色
        cursoropacitymax:1,//设置活动状态光标透明度
        touchbehavior:false,//设置触摸滑动
        cursorwidth:"15px",//设置光标宽度
        cursorborder:"1px solid #ccc",// 设置光标边框
        cursorborderradius:"15px",// 设置光标边框圆角
        horizrailenabled:false
    });
}
//初始化pdf页面滚动条
function initPdfScroll(){
    $(".pdf-arc .arcscroll-cont").niceScroll({
        cursorcolor:"#eee",// 设置光标颜色
        sensitiverail:true,// 点击滚动条，滚动到指定位置
        cursorfixedheight:30, //设置固定高度游标
        autohidemode:false, // 怎样隐藏滚动条
        background:"#eee", // 设置滚动条背景颜色
        cursoropacitymax:1,//设置活动状态光标透明度
        touchbehavior:false,//设置触摸滑动
        cursorwidth:"15px",//设置光标宽度
        cursorborder:"1px solid #ccc",// 设置光标边框
        cursorborderradius:"15px"// 设置光标边框圆角

    });
}

//解决ie10以下不支持placeholder
if (!placeholderSupport()) {   // 判断浏览器是否支持 placeholder
    $('[placeholder]').focus(function () {
        var input = $(this);
        if (input.val() == input.attr('placeholder')) {
            input.val('');
            input.removeClass('placeholder');
        }
    }).blur(function () {
        var input = $(this);
        if (input.val() == '' || input.val() == input.attr('placeholder')) {
            input.addClass('placeholder');
            input.val(input.attr('placeholder'));
        }
    }).blur();
};
function placeholderSupport() {
    return 'placeholder' in document.createElement('input');
}







