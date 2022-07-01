// 类型收窄： 将类型推导为更精确的类型
function padLeft(padding: number | string, input: string): string {
  // return new Array(padding + 1).join(' ') + input;
  if (typeof padding === 'number') {
    return new Array(padding + 1).join(' ') + input;
  }
  return padding + input;
}

// typeof 类型保护
function printAll(text: string | string[] | null) {
  if (typeof text === 'object') {
    // 报错 text可能是null
    // for (let s of text) {
    //   console.log(s);
    // }
  } else if (typeof text === 'string') {
    console.log(text);
  } else {
    // dosomething
  }
}

// 真值收窄
function getUserOnlineMessage(onlineNumber: number) {
  if (onlineNumber) {
    // onlineNumber自动转化为boolean
    return `There is ${onlineNumber} persons online`;
  }
  return 'There is nobody online';
}
// 解决上面printAll类型收窄报错可以用真值收窄
function printAll2(text: string | string[] | null) {
  // 排查了null的可能性
  if (text && typeof text === 'object') {
    for (const s of text) {
      console.log(s);
    }
  } else if (typeof text === 'string') {
    console.log(text);
  }
}

function multiplyAll(
  values: number[] | undefined,
  factor: number
): number[] | number {
  if (!values) {
    return factor;
  }
  return values.map((item) => item * factor);
}

// 等值收窄
function example(x: string | number, y: string | undefined) {
  if (x === y) {
    console.log(x.toLowerCase() + y.toUpperCase());
  }
}
interface Container {
  value: number | null | undefined;
}
function multiplyValue(container: Container, factor: number) {
  if (container.value != null) {
    // 这里排除了container.value 等于null 和undefined
    return container.value * factor;
  }
}

// in操作符收窄
type Bird = { fly: () => void };
type Fish = { swim: () => void };
function move(animal: Bird | Fish) {
  if ('fly' in animal) {
    // 收窄animal属于Fish
    return animal.fly();
  }
  // 收窄为类型是Bird
  return animal.swim();
}

// instanceof收窄
function logValue(x: Date | string) {
  if (x instanceof Date) {
    console.log(x.toUTCString());
  }
  console.log(x.toString());
}

// 赋值收窄
let x = Math.random() < 0.5 ? 10 : 'hello';
x = 2; // 收窄为number形
x = 'haha'; // 收窄为string

// 控制流分析 会分析if 等代码推断出类型
function example2() {
  let x: string | number | boolean;
  // x被推断为boolean
  x = Math.random() < 0.5;
  if (Math.random() < 0.5) {
    // 类型推断为string
    x = 'haha';
  } else {
    x = 2;
  }
  // 类型推断为 number | string
  return x;
}

// 类型判断式
function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}
function getSmallPet(): Fish | Bird {
  return Math.random() > 0.5
    ? {
        swim: () => {
          console.log('swim');
        },
      }
    : {
        fly: () => {
          console.log('fly');
        },
      };
}
const zoo: (Fish | Bird)[] = [getSmallPet(), getSmallPet()];
// isFish 被判断为Fish类型
const underWater1: Fish[] = zoo.filter(isFish);
// 等价下面写法
const underWater2: Fish[] = zoo.filter(
  (item) => (item as Fish).swim !== undefined
) as Fish[];

// 可辨别联合
interface Shape {
  kind: 'circle' | 'square';
  radius?: number;
  sideLength?: number;
}
function handleShape(shape: Shape) {
  // 报错
  // if (shape.kind === 'react') {
  // }
}
function getArea(shape: Shape) {
  // 会报错 radius 可能不存在
  // return Math.PI * shape.radius **2;
  // 可以去掉错误 但是不好 前面定义类型时radiu是可传可不传
  return Math.PI * shape.radius! ** 2;
}
interface Circle {
  kind: 'circle';
  radius: number;
}
interface Square {
  kind: 'square';
  sideLength: number;
}
type Shape2 = Circle | Square;
function getArea2(shape: Shape2) {
  if (shape.kind === 'circle') {
    // 这里应为只有Circle的kind是circle 所以推断出shape一定是Circle类型
    return Math.PI * shape.radius ** 2;
  }
}
function getArea3(shape: Shape2) {
  switch (shape.kind) {
    case 'circle':
      return Math.PI * shape.radius ** 2;
    case 'square':
      return shape.sideLength ** 2;
  }
}

// 穷尽检查
interface Triangle {
  kind: 'triangle';
  sideLength: number;
}
type Shape3 = Shape2 | Triangle;
function getArea4(shape: Shape3) {
  switch (shape.kind) {
    case 'circle':
      return Math.PI * shape.radius ** 2;
    case 'square':
      return shape.sideLength ** 2;
    case 'triangle':
      return shape.sideLength ** 2;
    default:
      // 报错，类型shape已经被穷尽玩了,只能是never
      const _exhaustiveCheck: never = shape;
      return _exhaustiveCheck;
  }
}
