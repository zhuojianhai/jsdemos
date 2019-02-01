/**
 * Created by zhuojh on 2019/1/31.
 * call and apply 函数
 * obj.call(thisObj,arg1,arg2,arg3,...)
 * obj.apply(thisObj,[arg1,arg2,arg3,...])
 * 两者作用一致，都是把obj（即this）绑定到thisObj，
 * 这时候thisObj具备了obj的属性和方法，
 * 或者说thisObj继承了obj的属性和方法；
 * 绑定后会立即执行函数
 */



function showThis(){
    setTimeout(function(){
        console.log(this)
    },500);

    setTimeout(()=>console.log(this),500);
}

var obj = {
    name:"zhuojianhai"
};
showThis.apply(obj);