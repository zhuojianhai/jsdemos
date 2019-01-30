/**
 * Created by zhuojh on 2019/1/30.
 * 深入理解javascript原型和闭包（1）——一切都是对象
 *
 * 一切（引用类型）都是对象，对象是属性的集合
 */

/**
 * 判断一个变量是不是对象非常简单。值类型的类型判断用typeof，
 * 引用类型的类型判断用instanceof。
 */
var fn = function () {
};
!function showTypeofAndInstanceOfUse() {
    console.log("typeof x " + typeof x);
    console.log("typeof 10 " + typeof 10);
    console.log("typeof 'abc' " + typeof 'abc');
    console.log("typeof true " + typeof  true);
    console.log("typeof function " + typeof function () {});  //function

    console.log("typeof [1, 'a', true] " + typeof [1, 'a', true]);  //object
    console.log("typeof { a: 10, b: 20 } " + typeof {a: 10, b: 20});  //object
    console.log("typeof null " + typeof null);  //object
    console.log("typeof new Number(10) " + typeof new Number(10));  //object

    console.log("instanceof fn is "+fn instanceof Object)

}()