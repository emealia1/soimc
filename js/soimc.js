var soimc = (function() {
	var carousel_items = document.getElementsByClassName('carousel_item'),
		carouselVideo = document.getElementsByClassName('carousel_video')[0],
		currentlyVisible = 0,
		nextVisible = 0,
		runCarousel;

	var startCarousel = function() {
		moveCarousel(nextVisible);
		runCarousel = setInterval(function() {
			moveCarousel(nextVisible);
		}, 5000);
	};

	var stopCarousel = function() {
		clearInterval(runCarousel);
	};

	var moveCarousel = function() {
		document.getElementsByClassName('visible')[0].classList.remove('visible');
		carousel_items[nextVisible].classList.add('visible');
		nextVisible++;
		if(nextVisible === carousel_items.length) {
			nextVisible = 0;
			return nextVisible;
		} else if ((nextVisible - 1) < 0){
			nextVisible = carousel_items.length - 1;
			return nextVisible;
		}
	};

	var nextSlide = function(){
		stopCarousel();
		if(nextVisible >= carousel_items.length) {
			nextVisible = 0;
			moveCarousel(nextVisible);
			return nextVisible;
		} else {
			moveCarousel(nextVisible);
			return nextVisible;
		}
	};

	var prevSlide = function() {
		stopCarousel();
		currentlyVisible -= 1;
		if(currentlyVisible <= -1) {
console.log('<0: ' + currentlyVisible);
			currentlyVisible = carousel_items.length - 1;
console.log('<0: ' + currentlyVisible);
			moveCarousel(currentlyVisible);
			nextVisible = currentlyVisible;
			return nextVisible;
		} else {
console.log(currentlyVisible);
			moveCarousel(currentlyVisible);
			nextVisible = currentlyVisible;
			return nextVisible;
		}
	};

	if(carouselVideo) {
		carouselVideo.addEventListener('play', function() {
			stopCarousel();
		});

		carouselVideo.addEventListener('ended', function() {
			moveCarousel(nextVisible);
			startCarousel();
			carouselVideo.load();
		});
	}

	return {
		startCarousel: startCarousel,
		stopCarousel: stopCarousel,
		nextSlide: nextSlide,
		prevSlide: prevSlide
	};
}());;/*
 FastClick: polyfill to remove click delays on browsers with touch UIs.

 @version 0.6.11
 @codingstandard ftlabs-jsv2
 @copyright The Financial Times Limited [All Rights Reserved]
 @license MIT License (see LICENSE.txt)
*/

(function() {
	function FastClick(a){var c,b=this;this.trackingClick=!1;this.trackingClickStart=0;this.targetElement=null;this.lastTouchIdentifier=this.touchStartY=this.touchStartX=0;this.touchBoundary=10;this.layer=a;if(!a||!a.nodeType)throw new TypeError("Layer must be a document node");this.onClick=function(){return FastClick.prototype.onClick.apply(b,arguments)};this.onMouse=function(){return FastClick.prototype.onMouse.apply(b,arguments)};this.onTouchStart=function(){return FastClick.prototype.onTouchStart.apply(b,arguments)};this.onTouchMove=function(){return FastClick.prototype.onTouchMove.apply(b,arguments)};this.onTouchEnd=function(){return FastClick.prototype.onTouchEnd.apply(b,arguments)};this.onTouchCancel=function(){return FastClick.prototype.onTouchCancel.apply(b,arguments)};FastClick.notNeeded(a)||(this.deviceIsAndroid&&(a.addEventListener("mouseover",this.onMouse,!0),a.addEventListener("mousedown",this.onMouse,!0),a.addEventListener("mouseup",this.onMouse,!0)),a.addEventListener("click",this.onClick,!0),a.addEventListener("touchstart",this.onTouchStart,!1),a.addEventListener("touchmove",this.onTouchMove,!1),a.addEventListener("touchend",this.onTouchEnd,!1),a.addEventListener("touchcancel",this.onTouchCancel,!1),Event.prototype.stopImmediatePropagation||(a.removeEventListener=function(b,c,e){var f=Node.prototype.removeEventListener;"click"===b?f.call(a,b,c.hijacked||c,e):f.call(a,b,c,e)},a.addEventListener=function(b,c,e){var f=Node.prototype.addEventListener;"click"===b?f.call(a,b,c.hijacked||(c.hijacked=function(a){a.propagationStopped||c(a)}),e):f.call(a,b,c,e)}),"function"===typeof a.onclick&&(c=a.onclick,a.addEventListener("click",function(a){c(a)},!1),a.onclick=null))}FastClick.prototype.deviceIsAndroid=0<navigator.userAgent.indexOf("Android");FastClick.prototype.deviceIsIOS=/iP(ad|hone|od)/.test(navigator.userAgent);FastClick.prototype.deviceIsIOS4=FastClick.prototype.deviceIsIOS&&/OS 4_\d(_\d)?/.test(navigator.userAgent);
	FastClick.prototype.deviceIsIOSWithBadTarget=FastClick.prototype.deviceIsIOS&&/OS ([6-9]|\d{2})_\d/.test(navigator.userAgent);FastClick.prototype.needsClick=function(a){switch(a.nodeName.toLowerCase()){case "button":case "select":case "textarea":if(a.disabled)return!0;break;case "input":if(this.deviceIsIOS&&"file"===a.type||a.disabled)return!0;break;case "label":case "video":return!0}return/\bneedsclick\b/.test(a.className)};
	FastClick.prototype.needsFocus=function(a){switch(a.nodeName.toLowerCase()){case "textarea":return!0;case "select":return!this.deviceIsAndroid;case "input":switch(a.type){case "button":case "checkbox":case "file":case "image":case "radio":case "submit":return!1}return!a.disabled&&!a.readOnly;default:return/\bneedsfocus\b/.test(a.className)}};
	FastClick.prototype.sendClick=function(a,c){var b,d;document.activeElement&&document.activeElement!==a&&document.activeElement.blur();d=c.changedTouches[0];b=document.createEvent("MouseEvents");b.initMouseEvent(this.determineEventType(a),!0,!0,window,1,d.screenX,d.screenY,d.clientX,d.clientY,!1,!1,!1,!1,0,null);b.forwardedTouchEvent=!0;a.dispatchEvent(b)};FastClick.prototype.determineEventType=function(a){return this.deviceIsAndroid&&"select"===a.tagName.toLowerCase()?"mousedown":"click"};
	FastClick.prototype.focus=function(a){var c;this.deviceIsIOS&&a.setSelectionRange&&0!==a.type.indexOf("date")&&"time"!==a.type?(c=a.value.length,a.setSelectionRange(c,c)):a.focus()};FastClick.prototype.updateScrollParent=function(a){var c,b;c=a.fastClickScrollParent;if(!c||!c.contains(a)){b=a;do{if(b.scrollHeight>b.offsetHeight){c=b;a.fastClickScrollParent=b;break}b=b.parentElement}while(b)}c&&(c.fastClickLastScrollTop=c.scrollTop)};
	FastClick.prototype.getTargetElementFromEventTarget=function(a){return a.nodeType===Node.TEXT_NODE?a.parentNode:a};
	FastClick.prototype.onTouchStart=function(a){var c,b,d;if(1<a.targetTouches.length)return!0;c=this.getTargetElementFromEventTarget(a.target);b=a.targetTouches[0];if(this.deviceIsIOS){d=window.getSelection();if(d.rangeCount&&!d.isCollapsed)return!0;if(!this.deviceIsIOS4){if(b.identifier===this.lastTouchIdentifier)return a.preventDefault(),!1;this.lastTouchIdentifier=b.identifier;this.updateScrollParent(c)}}this.trackingClick=!0;this.trackingClickStart=a.timeStamp;this.targetElement=c;this.touchStartX=b.pageX;this.touchStartY=b.pageY;200>a.timeStamp-this.lastClickTime&&a.preventDefault();return!0};FastClick.prototype.touchHasMoved=function(a){a=a.changedTouches[0];var c=this.touchBoundary;return Math.abs(a.pageX-this.touchStartX)>c||Math.abs(a.pageY-this.touchStartY)>c?!0:!1};FastClick.prototype.onTouchMove=function(a){if(!this.trackingClick)return!0;if(this.targetElement!==this.getTargetElementFromEventTarget(a.target)||this.touchHasMoved(a))this.trackingClick=!1,this.targetElement=null;return!0};
	FastClick.prototype.findControl=function(a){return void 0!==a.control?a.control:a.htmlFor?document.getElementById(a.htmlFor):a.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")};
	FastClick.prototype.onTouchEnd=function(a){var c,b,d=this.targetElement;if(!this.trackingClick)return!0;if(200>a.timeStamp-this.lastClickTime)return this.cancelNextClick=!0;this.cancelNextClick=!1;this.lastClickTime=a.timeStamp;c=this.trackingClickStart;this.trackingClick=!1;this.trackingClickStart=0;this.deviceIsIOSWithBadTarget&&(b=a.changedTouches[0],d=document.elementFromPoint(b.pageX-window.pageXOffset,b.pageY-window.pageYOffset)||d,d.fastClickScrollParent=this.targetElement.fastClickScrollParent);b=d.tagName.toLowerCase();if("label"===b){if(c=this.findControl(d)){this.focus(d);if(this.deviceIsAndroid)return!1;d=c}}else if(this.needsFocus(d)){if(100<a.timeStamp-c||this.deviceIsIOS&&window.top!==window&&"input"===b)return this.targetElement=null,!1;this.focus(d);this.deviceIsIOS4&&"select"===b||(this.targetElement=null,a.preventDefault());return!1}if(this.deviceIsIOS&&!this.deviceIsIOS4&&(c=d.fastClickScrollParent)&&c.fastClickLastScrollTop!==c.scrollTop)return!0;this.needsClick(d)||(a.preventDefault(),this.sendClick(d,a));return!1};FastClick.prototype.onTouchCancel=function(){this.trackingClick=!1;this.targetElement=null};FastClick.prototype.onMouse=function(a){return this.targetElement&&!a.forwardedTouchEvent&&a.cancelable?!this.needsClick(this.targetElement)||this.cancelNextClick?(a.stopImmediatePropagation?a.stopImmediatePropagation():a.propagationStopped=!0,a.stopPropagation(),a.preventDefault(),!1):!0:!0};
	FastClick.prototype.onClick=function(a){if(this.trackingClick)return this.targetElement=null,this.trackingClick=!1,!0;if("submit"===a.target.type&&0===a.detail)return!0;a=this.onMouse(a);a||(this.targetElement=null);return a};
	FastClick.prototype.destroy=function(){var a=this.layer;this.deviceIsAndroid&&(a.removeEventListener("mouseover",this.onMouse,!0),a.removeEventListener("mousedown",this.onMouse,!0),a.removeEventListener("mouseup",this.onMouse,!0));a.removeEventListener("click",this.onClick,!0);a.removeEventListener("touchstart",this.onTouchStart,!1);a.removeEventListener("touchmove",this.onTouchMove,!1);a.removeEventListener("touchend",this.onTouchEnd,!1);a.removeEventListener("touchcancel",this.onTouchCancel,!1)};
	FastClick.notNeeded=function(a){var c,b;if("undefined"===typeof window.ontouchstart)return!0;if(b=+(/Chrome\/([0-9]+)/.exec(navigator.userAgent)||[,0])[1])if(FastClick.prototype.deviceIsAndroid){if((c=document.querySelector("meta[name=viewport]"))&&(-1!==c.content.indexOf("user-scalable=no")||31<b&&window.innerWidth<=window.screen.width))return!0}else return!0;return"none"===a.style.msTouchAction?!0:!1};FastClick.attach=function(a){return new FastClick(a)};"undefined"!==typeof define&&define.amd?define(function(){return FastClick}):"undefined"!==typeof module&&module.exports?(module.exports=FastClick.attach,module.exports.FastClick=FastClick):window.FastClick=FastClick;

	window.addEventListener('load', function() {
	    FastClick.attach(document.body);
	}, false);
}());
;soimc.startCarousel();
;/*! classList: http://purl.eligrey.com/github/classList.js/blob/master/classList.js */
if("document" in self&&!("classList" in document.createElement("_")&&"classList" in document.createElementNS("http://www.w3.org/2000/svg","svg"))){(function(j){"use strict";if(!("Element" in j)){return}var a="classList",f="prototype",m=j.Element[f],b=Object,k=String[f].trim||function(){return this.replace(/^\s+|\s+$/g,"")},c=Array[f].indexOf||function(q){var p=0,o=this.length;for(;p<o;p++){if(p in this&&this[p]===q){return p}}return -1},n=function(o,p){this.name=o;this.code=DOMException[o];this.message=p},g=function(p,o){if(o===""){throw new n("SYNTAX_ERR","An invalid or illegal string was specified")}if(/\s/.test(o)){throw new n("INVALID_CHARACTER_ERR","String contains an invalid character")}return c.call(p,o)},d=function(s){var r=k.call(s.getAttribute("class")),q=r?r.split(/\s+/):[],p=0,o=q.length;for(;p<o;p++){this.push(q[p])}this._updateClassName=function(){s.setAttribute("class",this.toString())}},e=d[f]=[],i=function(){return new d(this)};n[f]=Error[f];e.item=function(o){return this[o]||null};e.contains=function(o){o+="";return g(this,o)!==-1};e.add=function(){var s=arguments,r=0,p=s.length,q,o=false;do{q=s[r]+"";if(g(this,q)===-1){this.push(q);o=true}}while(++r<p);if(o){this._updateClassName()}};e.remove=function(){var t=arguments,s=0,p=t.length,r,o=false;do{r=t[s]+"";var q=g(this,r);if(q!==-1){this.splice(q,1);o=true}}while(++s<p);if(o){this._updateClassName()}};e.toggle=function(p,q){p+="";var o=this.contains(p),r=o?q!==true&&"remove":q!==false&&"add";if(r){this[r](p)}return !o};e.toString=function(){return this.join(" ")};if(b.defineProperty){var l={get:i,enumerable:true,configurable:true};try{b.defineProperty(m,a,l)}catch(h){if(h.number===-2146823252){l.enumerable=false;b.defineProperty(m,a,l)}}}else{if(b[f].__defineGetter__){m.__defineGetter__(a,i)}}}(self))};