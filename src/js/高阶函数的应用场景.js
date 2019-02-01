/**
 * Created by zhuojh on 2019/1/31.
 * 高阶函数定义：
 *  1》函数可以作为参数被传递
 *  2》函数可以作为返回值输出
 *  JavaScript语言中的函数显然满足高阶函数的条件，
 *  在实际开发中，无论是将函数当作参数传递，
 *  还是让函数的执行结果返回另外一个函数，
 *  这两种情形都有很多应用场景，以下就是一些高阶函数的应用。
 */
//====场景一 作为参数传递====开始==
function commonAjax(paramData,callback){
    //ajax请求地址
    var reqURL =  window.location.protocol + '//' + window.location.host + '/项目名称'+ paramData.url || '';
    //请求参数
    var reqData = paramData.param || {};
    //请求方式，默认是POST
    var reqType = paramData.method || 'POST';

var baseSetting = ajaxOption();
    //合并请求的参数设置
    $.extend(true,baseSetting,{
        data:reqData,
        type:reqType,
        url:reqURL
    });
    //发送ajax网络请求
    $.ajax(baseSetting)
}
function ajaxOption(showLoading,callback){
  return   {
        type: 'POST',
            url: '',
        data: {},
        //contentType: 'application/json; charset=utf-8', 默认是application/x-www-form-urlencoded
        dataType: 'JSON',
            timeout: 60000,
        async: true,
        cache: false,
        beforeSend: function(xhr, settings) {
        if (showLoading && window.loading) {
            console.log("loading ....");
        }
    },
        success: function(data, status, xhr) {
            var res = {};
            try {
                var d = JSON.parse(data);
                res.status = '000000';
                res.responseBody = d;

            } catch (e) {
                res.status = '000003';
                res.responseBody = '';
                res.errorMsg = '数据格式错误，请重试';

            }
            $.isFunction(callback) && callback(res);
        },
        error: function(xhr, errorType, error) {
            var errorMsg = '请求失败，请重试！';
            if (errorType === "abort") {
                //无网络
                errorMsg = "网络已断开";
            } else if (errorType === "timeout") {
                //超时
                errorMsg = "系统连接超时";
            } else if (errorType === "error") {
                //服务器或者客户端错误
                switch (xhr.status) {
                    case 303:
                        errorMsg = '重定向';
                        console.log("跳转到项目设置的303页面");
                        break;
                    case 404:
                        errorMsg = "未找到服务器";
                        console.log("跳转到项目设置的404页面");
                        break;
                    case 500:
                        //内部服务器错误。
                        errorMsg = "服务器未响应";
                        break;
                    case 503:
                        //服务不可用。这个错误代码为IIS6.0所专用。
                        errorMsg = "服务器不可用";
                        break;
                    case 504:
                        //网关超时。
                        errorMsg = "网关超时";
                        break;
                }
            }
            if ($.isFunction(callback)) {
                callback({
                    status: '000001',
                    errorMsg: errorMsg
                });
            }
        },
        complete: function(xhr, status) {
            if (showLoading && window.loading) {
                var time = window.setInterval(function() {
                    var loadingExist = loading.isloaded();
                    if (loadingExist) {
                        window.clearInterval(time);
                        loading.close();
                    }
                }, 500);
            }
        }
    };
}
//====场景一 作为参数传递====结束==


//=========场景二  单例模式====开始===
var getSingle = function  (fn){
    var single;
    return function(){
        return single ||(single = fn.apply(this, arguments));
    }
}
//=========场景二  单例模式====结束===


//===场景三  实现AOP=============开始=========
Function.prototype.before = function(beforeFn){
    var _self = this;// 保存原函数的引用
    return function(){ // 返回包含了原函数和新函数的"代理"函数
        beforeFn.apply(this,arguments);// 执行新函数，修正this
        return _self.apply(this,arguments); // 执行原函数
    }
};
Function.prototype.after = function(afterfn) {
    var __self = this;// 保存原函数的引用
    return function() {// 返回包含了原函数和新函数的"代理"函数
        var ret = __self.apply(this, arguments);// 执行原函数
        afterfn.apply(this, arguments);// 执行新函数，修正this
        return ret;  //返回原函数执行结果
    }
};
var func = function() {
    console.log(2);
};

func = func.before(function() {
    console.log(1);
}).after(function() {
    console.log(3);
});

// 按顺序打印出1，2，3
func();
//===场景三  实现AOP=============结束=========



//===场景四  实现函数柯里化=============开始=========
/*
* 又称部分求值。
* 一个currying的函数首先会接受一些参数，
* 接受了这些参数之后，
* 该函数并不会立即求值，
* 而是继续返回另外一个函数，
* 刚才传入的参数在函数形成的闭包中被保存起来。
* 待到函数被真正需要求值的时候，之前传入的所有参数都会被一次性用于求值。*/


// 通用currying函数，接受一个参数，即将要被currying的函数
    var currying = function(fn){
        //存储每次fn函数传递的参数
        var args = [];
        return function(){
            if(arguments.length ==0){//当fn传递的参数为0时候，就这行fn这个函数
                return fn.apply(this,args);
            }else{
                //将传入的参数保存到定义的args数组中
                [].push.apply(args,arguments);
                return arguments.callee;//返回当前正在执行的函数
            }
        }
    }

    // 将被currying的函数
    var cost = (function(){
        var money = 0;
        return function(){
            var i = 0;
            //参数长度
            var l=arguments.length;
            // debugger;
            for( i=0;i<l;i++){
                money +=arguments[i];
            }
            return money
        }
    })();
    var coast = currying(cost);
for(var i=0;i<10;i++){
    coast(i);
    if(i==9){
        var result =  coast();
        console.log("the last result is "+result);
    }
}


!function showTimeout(){
    var s = arguments.callee;
    /**
     * s的值，就是代表当前执行的函数
     * VM2273:3 ƒ showTimeout(){
     * var s = arguments.callee;
     * console.log(s);
     * return arguments.callee;
     * }
     */
    console.log(s);
    /**arguments.callee 指向当前执行的函数。*/
    return arguments.callee;
}();

/***
 * 警告：在严格模式下，第5版 ECMAScript (ES5) 禁止使用 arguments.callee()。
 * 当一个函数必须调用自身的时候, 避免使用 arguments.callee(),
 * 1》通过要么给函数表达式一个名字,
 * 2》要么使用一个函数声明.
 */
var showme = function(x){
    console.log(x);
    if(x>10 && x==18){
        console.log("current value is large 10"+x);
        x++;
        showme(x)
    }
}
for(var  i=0;i<20;i++){
    showme(i);
}
//===场景四  实现函数柯里化=============结束=========



//场景五  惰性加载函数 =================开始=========
/**
 *在Web开发中，因为浏览器之间的实现差异，一些嗅探工作总是不可避免。
 * 比如我们需要一个在各个浏览器中能够通用的事件绑定函数addEvent，常见的写法如下：
 * 缺点：当它每次被调用的时候都会执行里面的if条件分支，
 * 虽然执行这些if分支的开销不算大，但也许有一些方法可以让程序避免这些重复的执行过程。
  */
var event = function(elem,type,handler){
    if(window.addEventListener){
        return elem.addEventListener(type,handler,false);
    }
    if(window.attachEvent){
        return elem.attachEvent('on' + type, handler);
    }
}

/**
 * 缺点：也许我们从头到尾都没有使用过addEvent函数，
 * 这样看来，一开始的浏览器嗅探就是完全多余的操作，
 * 而且这也会稍稍延长页面ready的时间。
 */
var addEvent = (function(elem,type,handler){
    if (window.addEventListener) {
        return function(elem, type, handler) {
            elem.addEventListener(type, handler, false);
        }
    }
    if (window.attachEvent) {
        return function(elem, type, handler) {
            elem.attachEvent('on' + type, handler);
        }
    }
})();


/**
 * 此时addEvent依然被声明为一个普通函数，在函数里依然有一些分支判断。
 * 但是在第一次进入条件分支之后，在函数内部会重写这个函数，
 * 重写之后的函数就是我们期望的addEvent函数，
 * 在下一次进入addEvent函数的时候，addEvent函数里不再存在条件分支语句。
 * @param elem
 * @param type
 * @param handler
 */
var addEvent = function(elem, type, handler) {
    if (window.addEventListener) {
        addEvent = function(elem, type, handler) {
            elem.addEventListener(type, handler, false);
        }
    } else if (window.attachEvent) {
        addEvent = function(elem, type, handler) {
            elem.attachEvent('on' + type, handler);
        }
    }
    addEvent(elem, type, handler);
};

//场景五  惰性加载函数 =================结束=========


//场景六 分时函数=================================开始======
/**
 * 当一次的用户操作会严重地影响页面性能，
 * 如在短时间内往页面中大量添加DOM节点显然也会让浏览器吃不消，
 * 我们看到的结果往往就是浏览器的卡顿甚至假死。
 * 这个问题的解决方案之一是下面的timeChunk函数，
 * timeChunk函数让创建节点的工作分批进行，比如把1秒钟创建1000个节点，改为每隔200毫秒创建8个节点。
 * timeChunk函数接受3个参数，
 * @param ary  第1个参数是创建节点时需要用到的数据，
 * @param fn  第2个参数是封装了创建节点逻辑的函数，
 * @param count  第3个参数表示每一批创建的节点数量。
 * @returns {Function}
 */
var timeChunk = function(ary, fn, count) {
    var t;

    var start = function() {
        for ( var i = 0; i < Math.min( count || 1, ary.length ); i++ ){
            var obj = ary.shift();
            fn( obj );
        }
    };

    return function() {
        t = setInterval(function() {
            if (ary.length === 0) {  // 如果全部节点都已经被创建好
                return clearInterval(t);
            }
            start();
        }, 200);    // 分批执行的时间间隔，也可以用参数的形式传入
    };
};
//场景六 分时函数=================================结束======

//场景七  函数节流========================================开始===

/**
 * 当一个函数被频繁调用时，如果会造成很大的性能问题的时候，这个时候可以考虑函数节流，降低函数被调用的频率。
 * throttle函数的原理是，将即将被执行的函数用setTimeout延迟一段时间执行。
 * 如果该次延迟执行还没有完成，则忽略接下来调用该函数的请求。
 * throttle函数接受2个参数
 * @param fn    第一个参数为需要被延迟执行的函数
 * @param interval  第二个参数为延迟执行的时间。
 * @returns {Function}
 */
var throttle = function(fn, interval) {
    var __self = fn,    // 保存需要被延迟执行的函数引用
        timer,      // 定时器
        firstTime = true;    // 是否是第一次调用

    return function() {
        var args = arguments,
            __me = this;

        if (firstTime) {    // 如果是第一次调用，不需延迟执行
            __self.apply(__me, args);
            return firstTime = false;
        }

        if (timer) {    // 如果定时器还在，说明前一次延迟执行还没有完成
            return false;
        }

        timer = setTimeout(function() {  // 延迟一段时间执行
            clearTimeout(timer);
            timer = null;
            __self.apply(__me, args);
        }, interval || 500 );
    };
};

window.onresize = throttle(function() {
    console.log(1);
}, 500 );
//场景七  函数节流========================================结束===


//页面重新加载
window.location.reload()