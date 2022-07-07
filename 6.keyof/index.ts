// 对对象类型进行操作，获取对象属性名组成的字符串或者数字
type Point = { x: string; y: string };
// 相当于 'x' | 'y'
type PointKeyOf = keyof Point;
const x1: PointKeyOf = 'x';

// keyof 索引签名类型
type Arrayish = { [index: string]: number };
type ArrayishKeyof = keyof Arrayish;
// x3: string | number
let x3: ArrayishKeyof = 1;

// 数字字面量联合类型
const NumericObject = {
  1: '1',
  2: '2',
  3: '3',
};
// result: 1 | 2 | 3
// typeof NumericObject 转换成类型
// {1: string; 2: string; 3: string}
type result = keyof typeof NumericObject;

// keyof symbol
const sym1 = Symbol();
const sym2 = Symbol();
const symbolToNumberMap = {
  sym1: 1,
  sym2: 2,
};
type KS = keyof typeof symbolToNumberMap;
function useKey<T, K extends keyof T>(o: T, k: K) {
  // k的类型： string | number | symbol; 所以会报错
  // var name: string = k;
  var name: string | number | symbol = k;
}

// 对类使用keyof
class Person2 {
  name: 'zhangsan';
}
// classKeyof: 'name'
type classKeyof = keyof Person2;
class Person3 {
  1: 'haha';
}
// classKeyof3: 1
type classKeyof2 = keyof Person3;

// 对接口使用keyof
interface Interface1 {
  name: string;
}
// 'name'
type iKeyof = keyof Interface1;
