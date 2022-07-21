// 类型工具 创建型类型：类型别名、交叉类型、索引类型、映射类型

// 一、类型别名  对别名传入一个泛型，对泛型进行操作后得到一个新的类型
type Factory<T> = T | string | number;
type FactoryWithBool = Factory<boolean>;
const trueOrNotTrue: FactoryWithBool = true;

// 二、交叉类型 得到 同时符合所有的类型
// 1.基本类型 合并
type str = string & number; // never
// 2. 对象类型的交叉类型 同名称类型会合并,不同类型融合
interface NameStruct {
  name: string;
}
interface AgeStruct {
  age: number;
}
type NameOrAgeStruct = NameStruct & AgeStruct; // {name: string; age: number}
const t1: NameOrAgeStruct = {
  name: 'zhangsal',
  age: 20,
};
// 3.联合类型  取满足两者的最小集
type UnionIntersection1 = (1 | 2 | 3) & (1 | 2); // 1 | 2
type UnionIntersection2 = (string | number | symbol) & string; // string

// 三、索引类型
interface StringOrBooleanTypes {
  propA: number;
  propB: boolean;
  [key: string]: number | boolean;
}

type Type1 = keyof any;

// 四、映射类型
type Stringify<T> = {
  [K in keyof T]: T[K];
};
type objType = {
  name: string;
  age: 20;
};
type objType2 = {
  [K in 'foo' | 'bar']: string;
};
