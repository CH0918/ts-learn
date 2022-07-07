// 用在类型上下文中 获取变量或者属性的类型
let s = 'hello';
// n: string
let n: typeof s = '111';

// 对函数使用
function sum(a: number, b: number) {
  return a + b;
}
// fnType: (a: number, b: number) => number;
type fnType = typeof sum;

// 内置属性ReturnType
type Predicate = (x: unknown) => boolean;
// K = boolean
type K = ReturnType<Predicate>;

function f() {
  return { x: 10, y: 3 };
}
// ReturnType<类型> 下面尖括号接受的不是类型的话会报错
// type P = ReturnType<f>;
type P = ReturnType<typeof f>;

// 限制
function msgbox(s: string) {
  return true;
}
// 获取函数返回值的类型;这样获取不到正确的函数类型
let result = typeof msgbox('haha');
// 正确写法
type result2 = ReturnType<typeof msgbox>;

// 对对象使用typeof
const person = { name: 'zhang', age: 10 };
// p1: {name: string; age: number}
type p1 = typeof person;

// 对函数使用typeof
function sayHi(name: string, helloContent: string) {
  return name + helloContent;
}
// (name: string, helloContent) => string
type fnType2 = typeof sayHi;

// enum使用typeof
enum UserResponsse {
  No = 0,
  Yes = 1,
}
type enumType = typeof UserResponsse;
// 可以
const r3: enumType = { No: 1, Yes: 2, 0: '' };
