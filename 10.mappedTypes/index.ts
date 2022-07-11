// 映射类型
// 语法：{[T in K]: T}  T 表示key  K 表示要遍历的类型或者联合类型  T表示任意类型，赋值给遍历的key
// 映射类型建立
type Horse = {
  name: string;
};
type OnlyBoolsAndHorses = {
  [key: string]: boolean | Horse;
};
const confirms: OnlyBoolsAndHorses = {
  del: true,
  rodney: false,
};

type OptionsFlags<Type> = {
  [Property in keyof Type]: boolean;
};
type FeatureFlags = {
  darkMode: () => void;
  newUserProfiles: () => void;
};
type FeatureOptions = OptionsFlags<FeatureFlags>;

// 删除属性中的只读属性
type CreateMutable<Type> = {
  -readonly [Property in keyof Type]: Type[Property];
};
type LockedAccount = {
  readonly id: string;
  readonly name: string;
};
// 去掉了属性中readonly
type UnLockedAccount = CreateMutable<LockedAccount>;

// 删除属性中的可选属性
type Concreate<Type> = {
  [Property in keyof Type]-?: Type[Property];
};
type MayUser = {
  id: number;
  name?: string;
  age?: number;
};
type User = Concreate<MayUser>;

// 通过as实现健明重映射
type Getters<Type> = {
  [Property in keyof Type as `get${Capitalize<
    string & Property
  >}`]: () => Type[Property];
};
interface Person {
  name: string;
  age: number;
  locations: string;
}
type LazyPerson = Getters<Person>;

// 利用条件类型返回never 过滤属性
type RemoveKindField<Type> = {
  [Property in keyof Type as Exclude<Property, 'kind'>]: Type[Property];
};
interface Circle {
  kind: 'circle';
  radius: number;
}
type KindClassCircle = RemoveKindField<Circle>;

// 遍历联合类型
type EventConfig<Events extends { kind: string }> = {
  [E in Events as E['kind']]: (event: E) => void;
};
type SquareEvent = { kind: 'square'; x: number; y: number };
type CircleEvent = { kind: 'circle'; x: number; y: number };
// config = {square: (event: SquareEvent) => void, circle: (event: CircleEvent) => void}
type Config = EventConfig<SquareEvent | CircleEvent>;

// 判断是否有pii属性
type ExtractPII<Type> = {
  [Property in keyof Type]: Type[Property] extends { pii: true } ? true : false;
};
type DBField = {
  id: { format: 'incrementing' };
  name: { type: string; pii: true };
};
type ObjectNeedingGDPRDeletion = ExtractPII<DBField>;

// 例子
type Item = { a: string; b: number; c: boolean };
// P1 = {x: boolean; y: boolean};
type P1 = { [P in 'x' | 'y']: boolean };
// P2 = {x: 'x', y: 'y'};
type P2 = { [P in 'x' | 'y']: P };
type P3 = { [P in keyof Item]: Item[P] };
type P4 = { [P in 'a' | 'b']: Item[P] };
