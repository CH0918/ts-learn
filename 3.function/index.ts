function greeter(fn: (name: string) => void) {
  fn('zhangsan');
}
function sayHi(name: string): void {
  console.log(name);
}
greeter(sayHi);

// 调用签名
type DescribableFunction = {
  description: string;
  // 函数类型定义
  (args: number): boolean;
};
function doSomething1(fn: DescribableFunction) {
  console.log(fn.description + ' returned' + fn(1));
}

// 构造签名
type SomeContructor = {
  new (s: string): {};
};
function fn(ctor: SomeContructor) {
  return new ctor('zhangsan');
}

interface CallOrConstructor {
  // 可以一起写
  new (s: string): Date;
  (num: number): void;
}
function fn1(fn: CallOrConstructor) {
  const date = new fn('ch');
  console.log(fn(1));
}

// 函数泛型 需求：输出类型依赖输入类型，输入一个数组，总是返回数组的第一项
function getFirstElement<Type>(arr: Type[]): Type | undefined {
  return arr[0];
}
// res 应该被推断为number 实际上被推断为number | undefined
const res = getFirstElement([1, 2, 3]);
// console.log(res.toFixed())

// 推断 将字符串类型的数组转为数字类型的数组
function strMapToNum<Input, Output>(
  arr: Input[],
  fn: (n: Input) => Output
): Output[] {
  return arr.map(fn);
}
const res2 = strMapToNum(['1', '2'], (n: string) => parseInt(n));

// 约束 只能操作一些固定操作
// eg 函数返回两个值中比较长的那个 有一个length属性
function getLongest<Type extends { length: number }>(
  arr1: Type,
  arr2: Type
): Type {
  return arr1.length > arr2.length ? arr1 : arr2;
}
// 函数传入的参数应该有length属性
const r1 = getLongest([1, 2, 3], [2, 3, 4, 5]);
// 报错，boolean类型没有length类型
// const r2 = getLongest(true, false);
function miniLength<Type extends { length: number }>(obj: Type, len: number) {
  if (obj.length > len) {
    return obj;
  }
  // 报错 obj传入什么类型，函数返回什么类型
  // return {length: len};
}

// 声明类型参数
// eg 合并两个数组
function combine<Type>(arr1: Type[], arr2: Type[]): Type[] {
  return arr1.concat(arr2);
}
// 报错
// const r2 = combine([1,2,3], ['hello']);
// 解决方案：
combine<string | number>([1, 2, 3], ['hahah']);

// 写好泛型的建议：
// 1.类型参数下移
function firstElement<Type>(arr: Type[]) {
  return arr[0];
}
function firstElement2<Type extends any[]>(arr: Type) {
  return arr[0];
}
// bad r3: any
const r3 = firstElement2([1, 2, 3]);
// good r4: number
const r4 = firstElement([1, 2, 3]);

// 2.使用更少的类型参数
function filter1<Type>(arr: Type[], func: (arg: Type) => boolean): Type[] {
  return arr.filter(func);
}
// bad Func这个类型不是必要的
function filter2<Type, Func extends (arg: Type) => boolean>(
  arr: Type[],
  func: Func
): Type[] {
  return arr.filter(func);
}
const f1 = filter1([1, 2, 3], (i: number) => i < 1);
const f2 = filter2([1, 2, 3], (i: number) => i < 2);

// 3.类型参数应该出现两次以上
// bad
function sayHi2<Str extends string>(str: Str) {
  console.log(str);
}
// good
function sayHi3(str: string) {
  console.log(str);
}

// 可选参数
function toFixed(x?: number) {
  if (x) {
    return x.toFixed();
  }
  return x;
}
toFixed(); // ok
toFixed(undefined); // ok
toFixed(10); // ok

// 回调中的可选参数
function myForEach(arr: any[], cb: (arg: any, i?: number) => void) {
  for (let n = 0; n < arr.length; n++) {
    cb(arr[0], n);
  }
}
myForEach([1, 2, 3], (i: number) => console.log(i));
myForEach(['1', '2'], (i: string) => console.log('1111', i));

// 函数重载
function makeDate(timestamp: number): Date;
function makeDate(m: number, d: number, y: number): Date;
function makeDate(m: number, d?: number, y?: number): Date {
  if (d !== undefined && y != undefined) {
    return new Date(y, m, d);
  }
  return new Date(m);
}
const d1 = makeDate(1111);
const d2 = makeDate(1, 2, 3);
// 报错 需要两个参数
// const d3 = makeDate(1,2);

// 写好函数重载和签名的建议 尽可能使用联合类型替代函数重载
function getLen(arr: any[]): number;
function getLen(str: string): number;
function getLen(x: any): number {
  return x.length;
}
getLen([1, 2, 3]); // ok
getLen('abc'); // ok
// 报错 函数要重载只有字符串或者数组，调用时要确认具体的类型，
// getLen(Math.random() > 0.5 ? 'abc' : [1,2]);
// 解决方案
function getLen2(x: number[] | string): number {
  return x.length;
}

// unknow 可以表示任何值  和any的区别是更安全，不允许用来做任何操作
function a1(x: any) {
  x.b(); // ok
}
function a2(x: unknown) {
  // return x.b(); 报错
}
function safeParse(s: string): unknown {
  return JSON.parse(s);
}

// never 从来不会返回值
function fn2(x: string | number): never {
  throw new Error('hahah');
}

// 剩余参数
function multiply(x: number, ...n: number[]): number[] {
  return n.map((i) => x * i);
}
const r5 = multiply(10, 1, 2, 3, 4);

// 参数解构 js
function sum({ a, b, c }) {
  return a + b + c;
}
// 参数解构 ts 解构后要写上类型的注解
function sum2({ a, b, c }: { a: number; b: number; c: number }): number {
  return a + b + c;
}

// 函数的可赋值性 尽管函数的类型返回的的void，但是实际上函数返回任何类型都可以
type voidFunc = () => void;
const f5: voidFunc = () => true; // ok
const f6: voidFunc = function () {
  return 'hahha';
}; // ok
const v1 = f5(); // v1: void
// 正式因为这个特性，下面代码才不会报错
const arr = [1, 2, 3];
const data: number[] = [];
arr.forEach((i) => data.push(i));
