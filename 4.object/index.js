function paintShape(opts) {
    // let xPos = opts.xPos;
    // let yPos = opts.yPos;
    // 如果xPos没有值则为0
    var xPos = opts.xPos === undefined ? 0 : opts.xPos;
}
function paintShape2(_a) {
    var shape = _a.shape, _b = _a.xPos, xPos = _b === void 0 ? 0 : _b, _c = _a.yPos, yPos = _c === void 0 ? 0 : _c;
    // xPos 给默认值
    console.log(xPos);
}
// 注意和js的解构赋值的区别
function paintShape3(_a) {
    var Shape = _a.shape, a = _a.xPos, b = _a.yPos;
}
paintShape({ shape: 'circle' });
paintShape({ shape: 'triangle', xPos: 1, yPos: 2 });
function doSomething(p) {
    console.log(p.prop);
    // p.prop = 1;// 报错
}
var writablePerson = {
    name: 'zhangsan',
    age: 20
};
var readonlyPerson = writablePerson;
writablePerson.age = 10; // readonlyPerson的值也会跟着变
console.log(readonlyPerson);
