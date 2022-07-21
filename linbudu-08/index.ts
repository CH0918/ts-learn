// 一、typeof
// 1.用type来声明，typeof 得到类型
const str = 'huangdongjiang';
const obj = { name: 'huangdongjiang' };
const nullVal = null;
const undefinedVal = undefined;
const fn = (input: string) => input.length > 10;
type T1 = typeof str;
type T2 = typeof fn;

// 二、类型守卫
// 1.控制流
declare const strOrNumOrBool: string | number | boolean;
// 会进行类型收窄
if (typeof strOrNumOrBool === 'string') {
  console.log('is string', strOrNumOrBool.toLowerCase());
} else if (typeof strOrNumOrBool === 'number') {
  console.log(strOrNumOrBool.toFixed());
} else if (typeof strOrNumOrBool === 'boolean') {
  console.log(strOrNumOrBool.valueOf());
} else {
  const _exhaustiveCheck: never = strOrNumOrBool;
  throw new Error('error!');
}
// 2.if条件中被提取出来
// function isString(input: unknown) {
// 	return typeof input === 'string';
// }
// function foo(input: string | number) {
// 	if (isString(input)) {
// 		// input.replace(); // 报错，input不能被推到出事string类型
// 	}
// }
// 解决方案： is关键字
function isString(input: unknown): input is string {
  return typeof input === 'string';
}
function foo(input: string | number) {
  if (isString(input)) {
    input.replace('hdj', 'hahah');
  } else if (typeof input === 'number') {
    input.toFixed();
  } else {
    const inputCopy: never = input;
  }
}
// eg1: falsy
type Falsy = undefined | null | '' | 0 | false;
function isFalsy(input: unknown): input is Falsy {
  return !input;
}
// eg2 primitive
type Primitive = string | number | boolean | undefined;
const isPrimitive = (val: unknown): val is Primitive =>
  ['string', 'number', 'boolean', 'undefined'].includes(typeof val);

// 2.in与instanceof
interface Foo {
  foo: string;
  fooOnly: boolean;
  shared: number;
}
interface Bar {
  bar: string;
  barOnly: boolean;
  shared: number;
}
function handle(input: Foo | Bar) {
  if ('foo' in input) {
    console.log(input.fooOnly);
  } else if ('bar' in input) {
    console.log(input.barOnly);
  } else {
    // never
  }
}
