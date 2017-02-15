// 没有返回值
// jquery 出让 $符号使用权限(从这开始 ，$就不是jquery)
jQuery.noConflict();
// zySlide()只要轮播图的根标签(任何选择器)。
   jQuery('.slide').zySlide({speed:1000}).css('background-color','yellow');
   jQuery('#slide').zySlide({delay:2000,speed:5000}).css({
   		'border':'2px solid pink',
   		'backgroundColor':'red'
   });
