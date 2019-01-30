/**
 * Created by zhuojh on 2019/1/30.
 * 每个函数function都有一个prototype，即原型。
 * 这里再加一句话——每个对象都有一个__proto__，可成为隐式原型
 */

var obj = {};

/**
 * {constructor: ƒ, __defineGetter__: ƒ, __defineSetter__: ƒ, hasOwnProperty: ƒ, __lookupGetter__: ƒ, …}
 constructor: ƒ Object()
 hasOwnProperty: ƒ hasOwnProperty()
 isPrototypeOf: ƒ isPrototypeOf()
 propertyIsEnumerable: ƒ propertyIsEnumerable()
 toLocaleString: ƒ toLocaleString()
 toString: ƒ toString()
 valueOf: ƒ valueOf()
 __defineGetter__: ƒ __defineGetter__()
 __defineSetter__: ƒ __defineSetter__()
 __lookupGetter__: ƒ __lookupGetter__()
 __lookupSetter__: ƒ __lookupSetter__()
 get __proto__: ƒ __proto__()
 set __proto__: ƒ __proto__()
 */
console.log(obj.__proto__);

/**
 *{constructor: ƒ, __defineGetter__: ƒ, __defineSetter__: ƒ, hasOwnProperty: ƒ, __lookupGetter__: ƒ, …}
 constructor: ƒ Object()
 hasOwnProperty: ƒ hasOwnProperty()
 isPrototypeOf: ƒ isPrototypeOf()
 propertyIsEnumerable: ƒ propertyIsEnumerable()
 toLocaleString: ƒ toLocaleString()
 toString: ƒ toString()
 valueOf: ƒ valueOf()
 __defineGetter__: ƒ __defineGetter__()
 __defineSetter__: ƒ __defineSetter__()
 __lookupGetter__: ƒ __lookupGetter__()
 __lookupSetter__: ƒ __lookupSetter__()
 get __proto__: ƒ __proto__()
 set __proto__: ƒ __proto__()
 */
console.log(Object.prototype);


// obj.__proto__和Object.prototype的属性一样
