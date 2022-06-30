function greet2(person: string, date: Date) {
  console.log(`Hello ${person}, today is ${date.toLocaleDateString()}!`);
}

function sayHi(name: string): string {
  return '张三';
}

// ts知道函数怎么被调用，会自动进行类型推导
var list = ['zhangsan', 'lisi', 'wangwu'];
list.forEach(function (item) {
  item.toLowerCase();
});

// 对象类型
function printCoord(pt: { x: number; y: number }): void {
  console.log(pt.x);
  console.log(pt.y);
}

// 可选属性
function optionFn(pt: { x?: number; y?: string }) {
  // console.log(pt.y.toLocaleLowerCase());
}

// 联合类型
function sayHi2(name: string | number): void {
  console.log((name as string).toLowerCase());
  return undefined;
}

// 类型别名和接口
type Point = {
  x: number;
  y: number;
};
type Point4 = Point & Point3;
interface Point2 {
  name: string;
}
interface Point3 extends Point2 {
  id: number;
}

function getPoint(pt: Point4) {
  pt.id, pt.id;
}

function getWinInfo(info: Window) {
  const atob = info.atob;
}

// 字面量类型
function printText(text: 'left' | 'right'): void {
  console.log(text);
}
printText('left');

// 字面量推断 obj.count 被推断为number 而不是字面量类型1
const obj = { count: 1 };
if (true) {
  obj.count = 2;
}

declare function handleRequest(url: string, method: 'GET' | 'POST');
const req = { url: 'https://baidu.con', method: 'GET' };
// 这里会报错 原因是req.method 被推断为string 而 method要求是字面量类型 类型放宽了不行
// 如果method类型是字符串类型，实际接受的字符串字面量类型则不会报错
handleRequest(req.url, req.method as 'GET');

// 类型收窄 narrowing
function doSomething(x: string | null) {
  // const name = x.charAt(1);
  if (x === null) {
    // x 为null时
  } else {
    // x 为string时
  }
}

// 非空断言操作符 !
function liveDangerously(x?: number | null) {
  console.log(x!.toFixed());
}
