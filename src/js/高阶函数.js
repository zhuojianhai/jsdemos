/**
 * Created by zhuojh on 2019/1/31.
 * 高阶函数，就是让函数的参数能够接受别的函数
 */
function add(x,y ,f){
    return f(x)+f(y);
}

var result = add(19,-5,Math.abs);
console.log("the last result is "+ result);



//=============定义一个高阶函数，返回每个数组的长度的值==start=======
var array = ["javascript","java","c#","pathyon"];
function mapForEach(array,fn){
var newArray = [];
    for(let i =0;i<array.length;i++){
        newArray.push( fn(array[i]));
    }
    return newArray;
}

let results = mapForEach(array,item=>item.length);
console.log(results);
//=============定义一个高阶函数，返回每个数组的长度的值====end=====



