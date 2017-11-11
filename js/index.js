$(function(){
// 显示导航
navShow();
function navShow(){
	$(window).scroll(function(){
		var liTop = $('#content>li').eq(1).offset().top;
		if ($(window).scrollTop() >= liTop) {
			$('#top').show();
		}else{
			$('#top').hide();
		}
	});
}

// 导航开关
navOnOff();
function navOnOff(){
	var i = 0;
	$('.onOff img').click(function(){
		i++;
		if (i%2) {
			$('.nav').slideDown();
			$(this).attr('src','img/close.png');
		}else{
			$('.nav').slideUp();
			$(this).attr('src','img/menu.png');
		}
	});
	$('.nav a').click(function(){
			if ($(window).outerWidth() <= 500) {
				i++;
				$('.nav').slideUp();
				$('.onOff img').attr('src','img/menu.png');
			}
	});
}

position();
function position(){
var onOff = true;
var iNow = 0;
var liHeighy = $('#content>li').eq(0).outerHeight();
// 窗口改变事件
$(window).resize(function(){
	liHeighy = $('#content>li').eq(0).outerHeight();
});
// 初始化
initialize();
// 点击导航定位
$('.nav a').click(function(){
	iNow = $(this).index();
	initialize();
});
// 点击关于我定位
$('.intro a').click(function(){
	$('html,body').animate({scrollTop:liHeighy});
});
// 鼠标滚动定位
window.onmousewheel = fn1;
if (window.addEventListener) {
	window.addEventListener('DOMMouseScroll', fn1, false);
}
function fn1(ev){
	if (!onOff) {return;}
	onOff = false;
	var b = true;
	var ev = ev || window.event;
	if (ev.wheelDelta) {
		b = ev.wheelDelta > 0 ? true : false;
	} else {
		b = ev.detail < 0 ? true : false;
	}
	if (b) {
		iNow--;
		if (iNow < 0) {
			iNow = 0;
		}
	}else{
		iNow++;
		if (iNow > $('.nav a').length-1) {
			iNow = $('.nav a').length-1;
		}
	}
	initialize();
}
// 移动端滑屏事件
document.addEventListener('touchstart',touchStart,false);
document.addEventListener('touchmove',touchmove,false);
document.addEventListener('touchend',touchEnd,false);
var startY = 0;
function touchStart(ev){
    var y = ev.changedTouches[0].pageY;
    startY = y;
}
function touchmove(ev){
	ev.preventDefault();
}
function touchEnd(ev){
    var y = ev.changedTouches[0].pageY;
    if (y - startY > 0) {
        iNow--;
        if (iNow < 0) {
        	iNow = 0;
        }
		initialize();
    }else if (y - startY < 0) {
        iNow++;
        if (iNow > $('.nav a').length-1) {
        	iNow = $('.nav a').length-1;
        }
		initialize();
    }
}

function initialize(){
	$('.nav a').removeClass('active');
	$('.nav a').eq(iNow).addClass('active');
		switch(iNow){
			case 0: 
				homePage();
			 	break;
			case 1: 
				aboutMe();
			 	break;
			case 2: 
				experience();
			 	break;
			case 3: 
				skill();
			 	break;
			case 4: 
				production();
			 	break;
			case 5: 
				contactMe();
			 	break;
		}
	$('html,body').animate({scrollTop:liHeighy * iNow},function(){
		onOff = true;
		if (iNow == 5) {
			$('#arrows').hide();
		}else{
			$('#arrows').show();
		}
	});
}

};


// 音乐控制
music();
function music(){
	var i = 0;
	var j = 0;
	var timer = null;
	$('.music img').click(function(){
		i++;
		if (i%2) {
			document.getElementById('myaudio').pause();
			clearInterval(timer);
		}else{
			document.getElementById('myaudio').play();
			autoplay();
		}
	});
	autoplay();
	function autoplay(){
		timer = setInterval(function(){
			j += 360;
			$('.music img').css('transition','2s linear');
			$('.music img').css('-webkit-transform','rotate('+j+'deg)');
		},2000);
	}
}

// 下边箭头动画
arrows();
function arrows(){
	fn1();
	function fn1(){
		$('#arrows').animate({bottom: 40},2000,function(){
			$(this).css('bottom','0');
			fn1();
		});
	}
}


// 首页
function homePage(){
	var img = $('.intro img');
	var h1 = $('.intro h1');
	var p = $('.intro p');
	var a = $('.intro a');
	img.css({position:'relative',top:-200,opacity:0});
	h1.css({position:'relative',top:200,opacity:0});
	p.eq(0).css({position:'relative',left:-200,opacity:0});
	p.eq(1).css({position:'relative',left:200,opacity:0});
	p.eq(2).css({position:'relative',left:-200,opacity:0});
	a.css({position:'relative',top:200,opacity:0});
	img.delay(400).animate({top:0,opacity:1},function(){
		h1.animate({top:0,opacity:1},function(){
			p.eq(0).animate({left:0,opacity:1},function(){
				p.eq(1).animate({left:0,opacity:1},function(){
					p.eq(2).animate({left:0,opacity:1},function(){
						a.animate({top:0,opacity:1});
					});
				});
			});
		});
	});
}

// 关于我
function aboutMe(){
	var Title = $('.aboutMe .title');
	var divE = $('.aboutMe .box div:even');
	var divO = $('.aboutMe .box div:odd');
	Title.css({position:'relative',top:-200});
	divE.css({position:'relative',left:-200,opacity:0});
	divO.css({position:'relative',left:200,opacity:0});
	Title.delay(400).animate({top:0},function(){
		divE.animate({left:0,opacity:1});
		divO.animate({left:0,opacity:1});
	});
}
// 经历
function experience(){
	var li = $('.experience');
	var Title = $('.experience .title');
	var div = $('.experience .box div');
	li.css({transition:'1ms',transform:'scale(0)'});
	Title.css({transition:'1ms',transform:'translateY(-200px)'});
	div.eq(0).css({transition:'1ms',transform:'rotate(-45deg)'});
	div.eq(1).css({transition:'1ms',transform:'rotate(45deg)'});
	setTimeout(function(){
		li.css({transition:'0.4s',transform:'scale(1)'});
		Title.css({transition:'0.4s 0.4s',transform:'translateY(0px)'});
		div.css({transition:'0.4s 0.8s',transform:'rotate(0deg)'});
	},400);
}
// 技能
function skill(){
	var Title = $('.skill .title');
	var ul = $('.skill ul');
	Title.css({position:'relative',top:-200});
	ul.eq(0).css({position:'relative',top:200,opacity:0});
	ul.eq(1).css({position:'relative',top:-200,opacity:0});
	Title.delay(400).animate({top:0},function(){
		ul.animate({top:0,opacity:1});
	});
}
// 作品
function production(){
	var box = $('.production .box');
	var li = $('.production');
	var Title = $('.production .title');
	var a = $('.production .box a');
	box.css({perspective:'800px'});
	li.css({transition:'1ms',transform:'scale(0)'});
	Title.css({transition:'1ms',transform:'translateY(-200px)'});
	a.css({transition:'1ms',transform:'rotateX(0deg)'});
	setTimeout(function(){
		li.css({transition:'0.4s',transform:'scale(1)'});
		Title.css({transition:'0.4s 0.4s',transform:'translateY(0px)'});
		a.css({transition:'1s 0.8s',transform:'rotateX(360deg)'});
	},400);
}
// 联系我
function contactMe(){
	var box = $('.contactMe .box');
	var Title = $('.contactMe .title');
	var div = $('.contactMe .box div');
	var p = $('.contactMe .box div p');
	box.css({perspective:'800px'});
	Title.css({transition:'1ms',transform:'translateY(-200px)'});
	div.css({transition:'1ms',transform:'scale(0.8,1.2)'});
	$('.contactMe .box div p').css({transition:'1ms',transform:'scale(0)'});
	setTimeout(function(){
		Title.css({transition:'0.4s 0.4s',transform:'translateY(0px)'});
		div.css({transition:'0.4s 0.8s',transform:'scale(1,1)'});
		p.eq(0).css({transition:'1s 1.2s',transform:'scale(1)'});
		p.eq(1).css({transition:'1s 2.2s',transform:'scale(1)'});
		p.eq(2).css({transition:'1s 3.2s',transform:'scale(1)'});
		p.eq(3).css({transition:'1s 4.2s',transform:'scale(1)'});
		p.eq(4).css({transition:'1s 5.2s',transform:'scale(1)'});
		p.eq(5).css({transition:'1s 6.2s',transform:'scale(1)'});
		p.eq(6).css({transition:'1s 7.2s',transform:'scale(1)'});
		p.eq(7).css({transition:'1s 8.2s',transform:'scale(1)'});
		p.eq(8).css({transition:'1s 9.2s',transform:'scale(1)'});
	},400);
}

span();
function span(){
var i = null;
var arr = ['么么哒！','你真棒！','你真聪明','你真帅！','你真美！','爱你哟！','喜欢你！','厉害呢！'];
$(document).click(function(ev){
	i++;
	if (i > arr.length-1) {
		i = 0;
	}
	var x = ev.pageX;
	var y = ev.pageY;
	var span = $('<div class="fixedDiv">'+arr[i]+'</div>');
		span.css({top:y-10,left:x-30});
		span.appendTo('body');
		span.animate({top:'-=150',opacity:0},1000,function(){
			$(this).remove();
		});
});
}

});