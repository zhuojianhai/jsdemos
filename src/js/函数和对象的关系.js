/**
 * Created by zhuojh on 2019/1/30.
 * 深入理解javascript原型和闭包（2）——函数和对象的关系
 * 1>每个函数都有一个prototype的属性，这个属性值是一个对象。
 *      默认的只有一个叫做constructor的属性，指向这个函数本身。
 */

function Creator(){
    this.name = "zhuojianhai";
    this.address="imagical place";
}
Creator.prototype.name="public name";
Creator.prototype.getYear= function(){
    return new Date();
}
var creator = new Creator();
var json = JSON.stringify(creator);
console.log(json+"");
/***
 * creator 对象是是通过Creator 函数new 出来的，这样creator对象就可以调用Creator.prototype中的属性
 * 因为每个对象都有一个隐藏的属性__proto__,
 *这个属性引用了创建这个对象的函数的prototype。也就是 creator.__proto__= Creator.prototype
 *
 */



console.log(window.constructor);