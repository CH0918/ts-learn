// 类
// class Point2 {
//   x: number = 1;
//   y: number = 2;
// }
// const pt = new Point2();

// 类型推断
class Point2 {
  x = 1;
  y = 2;
}
const pt = new Point2();
// 报错 x推断为number类型
// pt.x = '1'

// 需要在初始化时赋值
// class BadGreeter {
//   name: string;
// }
class GoodGreeter {
  name: string;
  constructor() {
    this.name = 'hello';
  }
}
var good = new GoodGreeter();
console.log('good = ', good);
// 会报错，因为ts不会分析构造函数的调用的方法
class BadGreeter {
  name: string;
  setName(): void {
    this.name = '111';
  }
  constructor() {
    this.setName();
  }
}
const badGreeter1 = new BadGreeter();

// readonly 只能在构造函数中赋值
class Greeter {
  readonly name: string = 'str';
  constructor(otherName?: string) {
    if (otherName) {
      this.name = otherName;
    }
  }
  err() {
    // 报错，不能再除构造函数外的函数赋值给只读属性
    // this.name = 'not ok!';
  }
}
const g2 = new Greeter('xx');
// 同样会报错
// g2.name = 'also not ok';

// 构造函数重载
const typeObj = {
  name: 'zhangsan',
  age: 20,
};
// type TypeObj = {[key in keyof Object.keys()]}

// super
class Base {
  public k = 4;
  public name = 'zhangsan';
}
class Dervied extends Base {
  constructor() {
    super();
    // 需要再this之前调用super
    console.log(this);
  }
}

let x: number = 0;
class C {
  x: string = 'hello';
  m() {
    // x指向外面的x
    // x = 'a';
  }
}

// 存取器
class C2 {
  _length = 0;
  get length() {
    return this._length;
  }
  set length(value) {
    this._length = value;
  }
}

// 允许传不同的值
class Thing {
  _size = 0;

  get size(): number {
    return this._size;
  }

  set size(value: string | number | boolean) {
    let num = Number(value);
    if (!Number.isFinite(num)) {
      this._size = 0;
      return;
    }
    this._size = num;
  }
}

// implements
interface Pingable {
  ping(): void;
}
class Sonar implements Pingable {
  ping() {
    console.log('ping');
  }
}
// 错误实现会报错
class Ball implements Pingable {
  // pong() {

  // }
  ping() {}
}

interface Checkable {
  check(name: string): boolean;
}
class NameChecker implements Checkable {
  // check中s并不会被推断为string类型
  check(s) {
    return s.toLowercase() === 'ok';
  }
}

interface A {
  x: number;
  y?: number;
}
class D implements A {
  x = 0;
}
const d = new D();
d.x = 2;
// d.y = 1; // 报错，不会检查可选属性

// extends
class Animal {
  move() {}
}
class Dog extends Animal {
  woof(times: number) {}
}
const dog = new Dog();
dog.move();
dog.woof(1);

// 重写
class Base2 {
  greet() {}
}
class Derived extends Base2 {
  greet(name?: string) {}
}
const der = new Derived();
der.greet('1');
der.greet();
const der2: Base2 = der;
// der2.greet('11'); // 报错

// 成员可见性
// public 都能访问
class Greeter2 {
  public greet() {
    console.log('hi!');
  }
}
const c1 = new Greeter2();
c1.greet();
// protected 只有在类里面和子类里面才能访问
class Greeter3 {
  protected getName() {
    return 'hi';
  }
  public greet() {
    console.log('Hello, ' + this.getName());
  }
}
const g1 = new Greeter3();
// g1.getName(); 报错
class SpecialGreeter extends Greeter3 {
  public howdy() {
    console.log('Howdy, ' + this.getName());
  }
}
const s1 = new SpecialGreeter();
// s1.getName(); // 报错，只能再子类的内部使用

// private
class Base3 {
  private x = 0;
  public greet() {
    console.log(this.x);
  }
}
const b = new Base3();
// b.x; //报错
class Derived3 extends Base3 {
  showX() {
    // this.x; 报错
  }
}

// 静态成员
class MyClass {
  static x = 0;
  public static printX() {
    console.log(MyClass.x);
  }
}
MyClass.printX();

// 泛型类
class Box<Type> {
  contents: Type;
  constructor(value: Type) {
    this.contents = value;
  }
}
const box = new Box('hello!');

class Person {
  protected print(name?: string) {}
  // 加了访问权限修饰符，相当于在类中声明了成员属性
  constructor(public name: string, public age: number) {}
}
class Son extends Person {
  constructor() {
    super('zhangsan', 20);
    super.print();
  }
  override print(name: string) {}
}
const p = new Person('zhangsan', 20);
