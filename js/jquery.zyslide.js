


// 自运行的匿名函数
/*
(function(){
	alert(123)
})()
$(function(){
	alert(123)
});
*/
(function($){
//	var $ = jQuery
	// 本函数每次调用只负责一个轮播图功能
	// 也就是说只会产生一个轮播图，这个函数的作用域只能分配一个轮播图
	// 所以要求每次调用都务必把当前轮播图的根标签传递过来。
	// 这里的形参 ele 就是某个轮播图的根标签 
	var slide = function(ele,options){
		// 把根标签转化为jquery标签对象
		var $ele = $(ele);
		// 默认设置选项
		var setting = {
			// 控制刚开始展开需要的时间
			delay:1000,
			// 控制轮播的 速度事件
			speed:2000,
		};
		// 对象合并 
		$.extend(true,setting,options);
		//轮播图代码
		// 先规定好每张图片的位置和状态
		var states = [
					{zIndex: 1,width: 120,height: 150,top: 69,left: 134,ZOpacity: 0.2},
					{zIndex: 2,width: 130,height: 170,top: 59,left: 0,ZOpacity: 0.5},
					{zIndex: 3,width: 170,height: 218,top: 35,left: 110,ZOpacity: 0.7},
					{zIndex: 4,width: 224,height: 288,top: 0,left: 263,ZOpacity: 1},
					{zIndex: 3,width: 170,height: 218,top: 35,left: 470,ZOpacity: 0.7},
					{zIndex: 2,width: 130,height: 170,top: 59,left: 620,ZOpacity: 0.5},
					{zIndex: 1,width: 120,height: 150,top: 69,left: 500,ZOpacity: 0.2}
			];
		
		var lis = $ele.find('li');
		// 让每个 li 对应上面 states 的每个状态
		function move(){
			lis.each(function(index,value){
				var state = states[index];
				$(value).css('z-index',state.zIndex).finish().animate(state,setting.dalay).find('img').css('opacity',state.ZOpacity);
			})
		}
		// 让 li 从正中间展开
		move();
		
		// 点击下一张 让轮播图发生偏移
		function next(){
			// 把数组最后一个元素移到数组的第一位
			states.unshift(states.pop());
			move();
		}
		
		
		// 点击 下一张
		$ele.find('.zy-next').click(function(){
			next();
		})
		function prev(){
			// 把数组第一个元素移到数组的最后一位
			states.push(states.shift())
			move();
		}
		// 点击 上一张
		$ele.find('.zy-prev').click(function(){
			prev();
		})
		
		// 自动轮播
		var interval = null;
		function autoPlay(){
			interval = setInterval(function(){
				next();
			},setting.speed)
		};
		autoPlay();
		
		// 停止轮播
		$ele.find('section').add(lis).hover(function(){
			clearInterval(interval);
		},function(){
			autoPlay();
		});
	}
	// 找到要轮播的轮播图的标签；调用 slide 方法
	$.fn.zySlide = function(options){
		$(this).each(function(i,ele){
			slide(ele,options);
		})
		console.log(this);
	}
})(jQuery)

/*
 用 jquery 封装插件的几种写法:
 
 插件类写法
 $.fn.customFun = function(){
 	// 自定义插件的代码
 }
 用法：
 $('selector').customFun();
 
 工具类写法:
 $.customFun = function(){
 	// 自定义工具类的用法
 }
 用法：
 $.customFun()
 * */





/*
 
 * 中午遗留问题:想一想我们的轮播图能封装成插件吗？会产生什么问题？
 * 1.插件中最好不要使用id，原因：插件是能够被重复使用，也就是说在同一页面中可能多次使用，造成冲突。
 * 2.变量的命名和方法的命名: states  ,interval , move() ,next(),用户在使用这个插件的时候，可以还会引起
 *   自己创建的 js 文件，也有这样的命名，那么就产生冲突了。
 * 3.标签 class 的值得问题：prev , next ，这些 class太大众化了，谁写标签都想取这个prve 和 next. 势必会冲突。
 * 4.插件文件名问题： index.js ,index.css 命名太大众化 ，比如这样修改:jQuery.ZYSlide.js。
 * */