/**
 * Created by zhuojh on 2019/1/30.
 * 我们总结一下，在“准备工作”中完成了哪些工作：
 * 变量、函数表达式——变量声明，默认赋值为undefined；
 * this——赋值；
 * 函数声明——赋值；
 * 这三种数据的准备情况我们称之为“执行上下文”或者“执行上下文环境”。
 */


/**
 *我们所说的“准备工作”主要做了三个部分工作：
 *      变量、函数表达式-------变量声明，默认值是为undefined
 *      this--------赋值
 *      函数声明---------赋值
 *  这三种数据的准备工作，我们称之为“执行上下文”
 * @param x
 * 函数在定义的时候（不是调用的时候），
 * 就已经确定了函数体内部自由变量的作用域
 */
function show(x){
    console.log(arguments);
    console.log(x);
}

var a =10;
function fn(){
    //a  是自由变量
    console.log(a);
    //函数创建的时候，就确定了a要取值的作用域
}

function executedFn(fn){
    var a = 20;
    fn();//这里打印的是10，而不是20
}
executedFn(fn);
