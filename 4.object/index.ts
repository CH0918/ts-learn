// 1.可选属性
interface PaintOptions {
  shape: 'circle' | 'triangle';
  xPos?: number;
  yPos?: number;
}
function paintShape(opts: PaintOptions) {
  // let xPos = opts.xPos;
  // let yPos = opts.yPos;
  // 如果xPos没有值则为0
  let xPos = opts.xPos === undefined ? 0 : opts.xPos;
}
function paintShape2({ shape, xPos = 0, yPos = 0 }: PaintOptions) {
  // xPos 给默认值
  console.log(xPos);
}
// 注意和js的解构赋值的区别
function paintShape3({ shape: Shape, xPos: a, yPos: b }) {}
paintShape({ shape: 'circle' });
paintShape({ shape: 'triangle', xPos: 1, yPos: 2 });

// 2.readonly
type someType = {
  readonly prop: string;
};
function doSomething(p: someType) {
  console.log(p.prop);
  // p.prop = 1;// 报错
}
// readonly的值可以通过别名修改
interface Person {
  name: string;
  age: number;
}
interface ReadonlyPerson {
  readonly name: string;
  readonly age: number;
}
let writablePerson: Person = {
  name: 'zhangsan',
  age: 20,
};
let readonlyPerson: ReadonlyPerson = writablePerson;
writablePerson.age = 10; // readonlyPerson的值也会跟着变
console.log(readonlyPerson);

// 3.索引签名
interface StringArray {
  [key: string]: string;
  name: string;
}
let hh: StringArray = { name: '', city: '' };
let val = hh['1'];
interface Animal {
  name: string;
}
interface Dog extends Animal {
  bread: string;
}
// 数字索引类型一定是字符串索引类型的子类型
interface OkIndexSignature {
  [x: string]: Animal;
  [y: number]: Dog;
}
// 反例
// interface NotOkIndexSignature {
// 	[x: number]: Animal;
//   [y: string]: Dog;
// }
interface NumberDictionary {
  [index: string]: number;
  length: number;
  // name: string;// 会报错
}
interface NumberOrStringDic {
  [index: string]: string | number;
  length: number;
  name: string;
}
// readonly 索引签名
interface ReadonlyStringArray {
  readonly [index: number]: string;
}
let arr2: ReadonlyStringArray = ['1'];

// 属性继承
interface Colorful {
  color: string;
}

interface Circle1 {
  radius: number;
}
interface ColorfulCircle extends Colorful, Circle1 {}
const cc: ColorfulCircle = {
  color: 'red',
  radius: 10,
};

// 交叉类型  跟属性继承有点像，区别是处理冲突方式不一样；属性继承 会报错，交叉类型如果类型不一样取交集为never
type ColorCircle2 = Colorful & Circle1;
const cc2: ColorCircle2 = {
  color: 'yellow',
  radius: 10,
};

// 泛型对象类型
interface Box {
  // 写any不好，
  // contents: any;
  contents: unknown;
}
let box: Box = {
  contents: 'zhangsan',
};
if (typeof box.contents === 'string') {
}
console.log((box.contents as string).toLocaleLowerCase());
interface Box2<Type> {
  contents: Type;
}
let box1: Box2<string> = { contents: 'haha' };
let c1 = box1.contents.toLocaleLowerCase();
interface Apple {
  name: string;
}
// Type可以是任何类型
let box2: Box2<Apple> = { contents: { name: 'apple' } };
function setContents<Type>(box: Box2<Type>, newContents: Type) {
  box.contents = newContents;
}
// 类型别名也可以用泛型
type OrNull<Type> = Type | null;
type OneOrMany<Type> = Type | Type[];
type OneOrManyOrNull<Type> = OrNull<OneOrMany<Type>>;
// 元祖类型
type StringNumberPair = [string, number];
function doSomething2(pair: StringNumberPair) {
  const a = pair[0];
  const b = pair[1];
}
doSomething2(['abc', 1]);

// 元祖可选属性
type Either2dOr3d = [number, number, number?];
function setCoordinate(coord: Either2dOr3d) {
  // z: number | undefined
  const [x, y, z] = coord;

  console.log(`Provided coordinate had ${coord.length}`);
}
// 元祖剩余参数
type StringNumberBooleans = [string, number, ...boolean[]];
type StringBooleansNumber = [string, ...boolean[], number];
type BooleansStringNumber = [...boolean[], string, number];
const a: StringNumberBooleans = ['hello', 1, true, false];
const b: StringBooleansNumber = ['hi', true, false, 1];
const c: BooleansStringNumber = [false, true, false, 'hei', 1];
// aLength: number
const aLength = a.length;

type StringNumber = [string, number];
const d: StringNumber = ['hello', 1];
// dLength: 2
const dLength = d.length;

// 使用元祖
function readButtonInput(...args: StringNumberBooleans) {
  const [name, version, ...inputs] = args;
}
// 等价下面
function readButtonInput2(name: string, version: number, inputs: boolean[]) {
  // other code
}

// readOnly tuple types
type ReadOnlyTurple = readonly [string, number];
function doSomethings2(pair: ReadOnlyTurple) {
  // 报错
  // pair[0] = 'hi';
}
// 给一个数组字面量const 断言 会被推断为readonly类型
// points: readonly [3,4]
const points = [2, 4] as const;
function distanceFromOrigin([x, y]: [number, number]) {
  return Math.sqrt(x ** 2 + y ** 2);
}
// 报错 readonly [2, 4] 是字面量类型 不跟[number, number]元祖类型兼容
// distanceFromOrigin(points);
