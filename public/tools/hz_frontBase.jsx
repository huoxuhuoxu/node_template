
// 基础模块

import $ from 'npm-zepto';

// 超级垫片
import 'babel-polyfill';

// 调试
// import { loggerAjax } from './hz_mytools.jsx';



const FN_NULL = function(){};


// 测试函数运行耗时
const SHEEPTEST = (fn = FN_NULL, testName = "a") => {
    console.time(testName);
    fn();
    console.timeEnd(testName);
}

// 同步执行
const SLEEP = async function(ms, fnEnd = FN_NULL)
{
    await new Promise(function(resolve){
        setTimeout(resolve, ms);
    });
    fnEnd();
}

// Promise
const AJAX_PROMISE = function(url, data={}, type="POST", dataType="JSON")
{
    return new Promise(function(resolve, reject){
        $.ajax({
            url,
            data,
            type,
            dataType,
            timeout: 8000,
            success: (res, state, xhr) => {
                resolve(res);
            },
            error: (xhr, errorText, errorStatus) => {
                reject({xhr, errorText, errorStatus});
            }
        });
    });
}

// fetch 
const AJAX_FETCH = (url, data = {},fnSucc = fnNull, fnFail = fnNull) => 
    fetch(url, Object.assign({}, data, {credentials: 'include'}))
        .then(response => response.json())
        .then(response => {fnSucc(response)})
        .catch(err => {fnFail(err)});


// handler promise
const HANDLER_PROMISE = async function(promise_obj, succ = FN_NULL, fail = FN_NULL, complete = FN_NULL)
{
    await promise_obj.then(function(data){
        succ(data);
    }, function({xhr, errorText, errorStatus}){
        fail(xhr, errorText, errorStatus);
    }).catch(function(err){
        console.error(err);
        throw new Error("Error: HANDLER_PROMISE");
    });
    complete();
}

// handler promise front 前置处理
const HANDLER_FPROMISE = function(promise_obj, succ = FN_NULL, fail = FN_NULL, complete = FN_NULL)
{
    promise_obj.then(function(){
        complete();
        return promise_obj;
    }).then(function(data){
        succ(data);
    }, function(xhr, errorText, errorStatus){
        fail(xhr, errorText, errorStatus);
    });
}

// 跳转href
const LOCATION_HREF = function(dom, href = window.location.href, ev = "click", func = FN_NULL)
{
    dom ? 
        (() => {$(dom).on(ev, function(){func();window.location.href = href;})})() 
        : 
        (() => {window.location.href = href})();
}

// 获取元素
const GET_DOM = (selector) => document.querySelector(selector);
// 获取很多元素
const GET_DOMS = (selectors) => document.querySelectorsAll(selectors);


// 删除className
const REMOVE_CLASSNAME = (oDom, sClassName) => {
    let aClassName = oDom.className.split(/\s+/),
        aRemoveClassName = sClassName.split(/\s+/);
    aClassName = aClassName.filter((v)=>!aRemoveClassName.includes(v));
    oDom.className = aClassName.join(" ");
} 

// 添加className
const ADD_CLASSNAME = (oDom, sClassName) => {
    let sDomClassName = oDom.className,
        aClassName = sDomClassName.split(/\s+/);
    if(!aClassName.includes(sClassName)){
        aClassName.push(sClassName);
        oDom.className = aClassName.join(" ");
    }
    return sDomClassName;
}

// 钩子 针对 ADD_CLASSNAME,完成add后等待NS后 回归原className
const SET_ADD_CLASSNAME = (oDom, sClassName, iTime, fnEnd) => {
    let sDomClassName = ADD_CLASSNAME(oDom, sClassName);
    SLEEP(iTime, () => {
        oDom.className = sDomClassName;
    });
}

// 判断是否包含某className
const HAS_CLASSNAME = (oDom, sClassName) => oDom.className.split(/\s+/).includes(sClassName);

// 添加与修改className 
const REUNITE_CLASSNAME = (oDom, sRemove, sAdd) => {
    let aClassName = oDom.className.split(/\s+/),
        aRemoveClassName = sRemove.split(/\s+/);
    aClassName = aClassName.filter((v)=>!aRemoveClassName.includes(v));
    aClassName.push(sAdd);
    oDom.className = aClassName.join(" ");
}

// 获取cookie
const PARSE_COOKIES = (key) => {
    let aCookie = document.cookie.split("; ");
    for(let i=0,l=aCookie.length; i<l; i++){
        let a = aCookie[i].split("=");
        if(a[0] == key){
            return a[1];
        }
    }
    return '';
}



const obj = {
    sleep: SLEEP,
    ajaxPromise: AJAX_PROMISE,
    handlerPromise: HANDLER_PROMISE,
    handlerFPromise: HANDLER_FPROMISE,
    href: LOCATION_HREF,
    fnNull: FN_NULL,
    get: GET_DOM,
    gets: GET_DOMS,
    ajaxFetch: AJAX_FETCH,
    sheep: SHEEPTEST,
    removeClass: REMOVE_CLASSNAME,
    addClass: ADD_CLASSNAME,
    callbackAddClass: SET_ADD_CLASSNAME,
    hasClass: HAS_CLASSNAME,
    reuniteClass: REUNITE_CLASSNAME,
    getCookie: PARSE_COOKIES,
};



export default obj;










