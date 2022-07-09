// T extends U ? X : Y
type IsString<T> = T extends string ? true : false;
type C11 = IsString<number>;
type C1 = IsString<1>;
type C22 = IsString<string>;
type C2 = IsString<'1'>;

interface Animal {
  live(): void;
}
interface Dog extends Animal {
  woof(): void;
}
type IsAnimal<T> = T extends Animal ? number : string;
type C3 = IsAnimal<Dog>; //number
type C4 = IsAnimal<Date>; //string

interface IdLabel {
  id: number;
}
interface NameLabel {
  name: string;
}
function createLabel(id: number): IdLabel;
function createLabel(name: string): NameLabel;
function createLabel(nameOrId: string | number): IdLabel | NameLabel;
function createLabel(nameOrId: string | number): IdLabel | NameLabel {
  throw '';
}
let a1 = createLabel('str');
let a2 = createLabel(1);
let a3 = createLabel(Math.random() > 0.5 ? 'str' : 1);
// 简化函数重载
type NameOrId<T extends string | number> = T extends number
  ? IdLabel
  : NameLabel;
function createLabel2<T extends string | number>(nameOrId: T): NameOrId<T> {
  throw '';
}
// NameLabel
let a = createLabel2('str');
let b = createLabel2(1);
let c = createLabel2(Math.random() > 0.5 ? 'str' : 1);

// 条件类型约束
// type MessageOf<T> = T['message']; // not ok
type MessageOf<T extends { message: string }> = T['message']; // ok
type MessageOf2<T> = T extends { message: unknown } ? T['message'] : never;
interface Email {
  message: string;
}
interface Dog {
  bark(): void;
}
type EmailMessageContents = MessageOf2<Email>;
type DogMessageContents = MessageOf2<Dog>;

// 判断是否是数组类型，是的话返回数组元素的类型，否则返回类型本身
type Flatten<T> = T extends any[] ? T[number] : T;
type Str = Flatten<string>;
type Num = Flatten<number>;
type StringArr = string[];
type StrFromArr = Flatten<StringArr>;

type T1 = 1 | 2;
type T2 = 1;
type T3 = T1 extends T2 ? string : boolean;

type Other = 'a' | 'b';
type Merge<T> = T extends 'x' ? T : Other;
// x | a | b
type values = Merge<'x' | 'y'>;
// let abc: values = 'x';
type Merge2<T> = T extends 'x' ? Other : T;
// a | b | y
type values2 = Merge2<'x' | 'y'>;

// 过滤
type Filter<T, U> = T extends U ? never : T;
type values3 = Filter<1 | 2 | 3, 1>;

type T5 = { name: string; age: number; say(): void };
type T6 = { name: string; age: number };
type T7 = T5 extends T6 ? 1 : 2;

// infer
// 去除数组中的类型
type ExtractArrayItemType<T> = T extends (infer U)[] ? U : T;
// string
type T11 = ExtractArrayItemType<string>;
// () => void
type T13 = ExtractArrayItemType<() => void>;
// Date
type T12 = ExtractArrayItemType<Date[]>;
// 获取函数返回值类型
type ExtractReturnType<T> = T extends (name: string) => infer U ? U : T;
type T14 = ExtractReturnType<(name: string) => void>;
// 推导出联合类型
type ExtractAll<T> = T extends { x: infer U; y: infer U } ? U : T;
// string | number
type T15 = ExtractAll<{ x: string; y: number }>;
// 接受任意数量
type ExtractAllType<T> = T extends { [key: string]: infer U } ? U : T;
type T16 = ExtractAllType<{ x: boolean; y: boolean; z: string; n: number }>;
// 将元祖类型转化为联合类型
type ItemTypes = ExtractArrayItemType<[string, number]>;

type GetReturnType<Type> = Type extends (...args: never[]) => infer Return
  ? Return
  : Type;
type Num1 = GetReturnType<(a, b) => number>;

let tt: Dog = { live: () => {}, woof: () => {}, bark: () => {} };
let tt1: Animal = tt;

// infer 只能放在extends后面，且只能放在true分支
type Flatten1<T> = T extends (infer U)[] ? U : T;
type T17 = Flatten1<string[]>;
type T18 = Flatten1<() => void>;

// 重载函数，会按照最后一个函数的签名进行推断
declare function stringOrNum(x: string): number;
declare function stringOrNum(x: string | number): string | number;
declare function stringOrNum(x: number): string;
// type T19 = string
type T19 = ReturnType<typeof stringOrNum>;

// 分发条件类型
type ToArray<Type> = Type extends any ? Type[] : never;
// 会拆成：string extends any ? Type[] : never   |    number extends any ? Type[] : never
// 最后变成：string[] | number[]
type StrArrOrNumArr = ToArray<string | number>;

// 要避免分发条件，可以用[]包裹起来
type ToArrayNonDist<Type> = [Type] extends any ? Type[] : never;
// (string | number)[]
type StrArrOrNumArr2 = ToArrayNonDist<string | number>;
