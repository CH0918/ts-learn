function universalAdd<T extends number | bigint | string>(
  x: T,
  y: T
): LiteralToPrimitive<T> {
  return x + (y as any);
}

export type LiteralToPrimitive<T> = T extends number
  ? number
  : T extends bigint
  ? bigint
  : T extends string
  ? string
  : never;

universalAdd('linbudu', '599'); // string
universalAdd(599, 1); // number
universalAdd(10n, 10n); // bigint

type PropType<T, K extends keyof T> = T extends { [key in K]: infer R }
  ? R
  : never;
type PP = PropType<{ name: string; age: number }, 'name' | 'age'>; // string | number

type ArrayItemType<T> = T extends Array<infer Item> ? Item : never;
type AA = ArrayItemType<string[]>;
type AA2 = ArrayItemType<[number, string]>;

type ReverseKeyValue<T extends Record<string, unknown>> = T extends Record<
  infer K,
  infer V
>
  ? Record<V & string, K>
  : never;

// never作为泛型参数传进来或者作为判断类型都会跳过判断直接返回never
type IsNever2<T> = T extends never ? true : false;
type Res1 = IsNever2<never>;
// 如果包裹起来，则会进行类型判断
type IsNever<T> = [T] extends [never] ? true : false;
type Res2 = IsNever<any>; // false
type Res3 = IsNever<never>; // true
// 如果不是作为类型参数进行判断则会进行判断
type Res4 = never extends never ? true : false;
type Res5 = never extends string ? true : false;

// ??
type tem1 = { name: number } & { age: number };
type temp2 = 1 & (1 | 2);
type temp3 = 1 & number;
type temp4 = (1 | 2) & (2 | 3);
type temp5 = (1 | 2) & any;

// any 作为泛型参数传进来判断跟直接判断结果都是一样的会进行判断

// 分布式条件类型触发的条件：
// 1.一定是作为泛型参数传进来判断才会触发
// 2.作为裸类型判断才会触发  比如：type Wraped<T> = [T] extends [any] ? true : false; 这样是不会触发分布式条件的
