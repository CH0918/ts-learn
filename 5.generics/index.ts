// 泛型

// 1.恒等函数 接受什么返回什么
function identity(arg: number) {
  return arg;
}
function identity2(arg: any) {
  return arg;
}
function identity3<T>(arg: T): T {
  return arg;
}
const r1 = identity3(1);
const r2 = identity3<number>(1);
console.log(r1);

// 2.泛型类型变量
function identity4<Type>(arg: Type) {
  // 使用属性 会报错
  // console.log(arg.length);
}
function loggingItentity<Type>(arg: Type[]): Type[] {
  console.log(arg.length);
  return arg;
}

// 3.泛型类型
let myIdentity: <Type>(arg: Type) => Type = identity3;
// 泛型参数名字可以不一致
let myIdentity2: <Input>(arg: Input) => Input = identity3;
// 对象类型调用签名形式
let myIdentity3: { <Type>(arg: Type): Type } = identity3;
// 变一变
interface IdentityFn {
  <Type>(arg: Type): Type;
}
let myIdentity4: IdentityFn = identity3;
// 再变一变 使用泛型类型
interface IdentityFn2<Type> {
  (arg: Type): Type;
}
let myIdentity5: IdentityFn2<string> = identity3;

// 4.泛型类
class GenericNumber<NumType> {
  zeroValue: NumType;
  // add: (x: NumType, y: NumType) => NumType;
  constructor(val: NumType) {
    this.zeroValue = val;
  }
}

let myGenericNumber = new GenericNumber<number>(1);
// myGenericNumber.zeroValue = 0;
// myGenericNumber.add = function (x, y) {
//   return x + y;
// };
console.log('4 = ', myGenericNumber);

// 5.泛型约束
interface Lengthwise {
  length: number;
}
function loggingIdentity<Type extends Lengthwise>(arg: Type): Type {
  console.log(arg.length);
  return arg;
}

// 6.在类型约束中使用类型参数
function getProperty<Type, Key extends keyof Type>(obj: Type, key: Key) {
  return obj[key];
}
let x2 = { a: 1, b: 2, c: 3 };
// 报错 对象x2中不存在d属性
// getProperty(x2, 'd');

// 7.在泛型中使用类类型
function create2<Type>(c: { new (): Type }): Type {
  return new c();
}
class Person {}
create2(Person);

class Beekeeper {
  hasMask: boolean = true;
}
class Zookeeper {
  nameTag: string = 'Mikle';
}
class Animal {
  numLegs: number = 4;
}
class Bee extends Animal {
  keeper: Beekeeper = new Beekeeper();
}
class Lion extends Animal {
  keeper: Zookeeper = new Zookeeper();
}
function createInstance<A extends Animal>(c: { new (): A }): A {
  return new c();
}
createInstance(Lion).keeper.nameTag;
createInstance(Bee).keeper.hasMask;
