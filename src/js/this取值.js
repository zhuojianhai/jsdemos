/**
 * Created by zhuojh on 2019/1/30.
 * this的取值，分四种情况。我们来挨个看一下。
 * 在此再强调一遍一个非常重要的知识点：
 *  在函数中this到底取何值，是在函数真正被调用执行的时候确定的，函数定义的时候确定不了。
 *  因为this的取值是执行上下文环境的一部分，每次调用函数，都会产生一个新的执行上下文环境。
 */


/**
 * 情况一
 * 构造函数
 * @constructor
 */
function  Constructor1(){
    this.name = "constructor";
    this.address="jiangsu province";
}

/**
 *
 * 如果函数做为构造函数使用，
 * 那么其中的this就代表它即将创建出来的对象
 */
var c = new Constructor1();
console.log(c.name);
console.log(c.address);


/**
 * 情况二
 * 函数作为对象的一个属性
 * 以上代码中，fn不仅作为一个对象的一个属性，而且的确是作为对象的一个属性被调用。结果this就是obj对象。
 * */
var obj = {
    x:10,
    fn:function(){
        console.log(this);
        console.log(this.x);
    }
};
obj.fn();

/**
 * 如上代码，如果fn函数被赋值到了另一个变量中，并没有作为obj的一个属性被调用，
 * 那么this的值就是window，this.x为undefined。
 * 如上代码，如果fn函数被赋值到了另一个变量中，并没有作为obj的一个属性被调用，那么this的值就是window，this.x为undefined。
 * @type {obj.fn}
 */
var fn1 = obj.fn;
fn1();


//=================情况三 开始====================================
var objs = {x:10};
var fs = function(){
    console.log(this);
    console.log(this.x);
}

/**
 * 当一个函数被call和apply调用时，this的值就取传入的对象的值
 */
fs.call(objs)
//=================情况三 结束====================================




//========情况四 全局 & 调用普通函数 开始===================
/**
 * 普通函数在调用时，其中的this也都是window。
 */
var z = 10;
var f = function(){
    console.log(this);//Window
    console.log(this.x);//10
}

var myObj = {
    x:100,
    fn:function(){
        function f(){
            console.log(this);//指向window
            console.log(this.x);//undefined
        }
        f();
    }
};
// 函数f虽然是在obj.fn内部定义的，但是它仍然是一个普通的函数，this仍然指向window。
myObj.fn();

//========情况四 全局 & 调用普通函数 结束===================