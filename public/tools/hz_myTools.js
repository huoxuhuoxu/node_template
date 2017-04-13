

import $ from 'npm-zepto';

// 检测访问来源,pc || wep
const DETECTMOD = () => {
    let n = window.navigator.userAgent;
    if( n.match(/Android/i)  
        || n.match(/webOS/i)  
        || n.match(/iPhone/i)  
        || n.match(/iPad/i)  
        || n.match(/iPod/i)  
        || n.match(/BlackBerry/i)  
        || n.match(/Windows Phone/i)  
    ){  
        return true;  
    }else {  
        return false;  
    }  
}

const TOOLS = {
	detechmod: DETECTMOD,
}


// 手机端调试方式,转发信息
const LOGGER_AJAX = (infos) => {
    let obj = {
        url: "/logger/infos",
        data: infos,
        type: "GET",
    }
    $.ajax(obj);
}

// 转发给日志服务器
const LOGGER_AJAXPARAMS = (infos) => {
    let obj = {
        url: 'https://qixidamodaoshi.com/logger/infos',
        data: infos,
        type: "GET",
        jsonp: "callbackparams"
    }
    $.ajax(obj);
}

// rgb转hsl
const RGB_TO_HSL = (r, g, b) => {
    r /= 255, g /= 255, b /= 255;
    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if(max == min){
        h = s = 0; // achromatic
    }else{
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    return [h, s, l];
}

// hsl转rgb
const HSL_TO_RGB = (h, s, l) => {
    let r, g, b;

    if(s == 0){
        r = g = b = l; // achromatic
    }else{
        let hue2rgb = function (p, q, t){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        let p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

// 微信 SPA 更换 title
const UPDATE_DOCUMENT_TITLE = (n) => {
    let $body = $('body');
    document.title = n;
    let _$iframe = $('<iframe src="/favicon.ico"></iframe>').on('load', function() {
        setTimeout(function() {
            _$iframe.off('load').remove();
        },0)
    }).appendTo($body);
}

// 适用于自动执行的动画
const RAF = (() => {
	return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
		window.setTimeout(callback, 1000 / 60);
	};
})();

// 递归树,解析DOM
const REDUCE_DOM_TREE = (oDomObject, sDomName) => {
    if(oDomObject.nodeName.toLowerCase() == sDomName){
        return oDomObject;
    }
    return REDUCE_DOM_TREE(oDomObject.parentNode, sDomName);
}





exports.loggerAjax = LOGGER_AJAX;
exports.loggerAjaxParams = LOGGER_AJAXPARAMS;
exports.rgbToHsl = RGB_TO_HSL;
exports.hslToRgb = HSL_TO_RGB;
exports.updateDocumentTitle = UPDATE_DOCUMENT_TITLE;
exports.RAF = RAF;
exports.reduceDomTree = REDUCE_DOM_TREE;


export default TOOLS;


