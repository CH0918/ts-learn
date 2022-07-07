// 索引访问类型
type Person1 = { age: number; name: string; alive: boolean };
type Age = Person1['age'];

type I1 = Person1['age' | 'name'];
// number | string | boolean
type I2 = Person1[keyof Person1];
type AliveName = 'alive' | 'name';
type I3 = Person1[AliveName];
// 尝试访问不存在的类型 会报错
// type I4 = Person1['haha'];

// 用number 获取数组元素类型
const MyArray = [
  { name: 'zhangsan', age: 10 },
  { name: 'lisi', age: 20 },
];
// string
type T1 = typeof MyArray[number];
type T3 = typeof MyArray[number]['age'];

// 作为索引的只能是类型，用const创建变量引用不行，要用type
const key = 'age';
// type T2 = T1[key]; // no ok
type key = 'age';
type T2 = T1[key]; // ok

// 实战：一个页面要用在不同的 APP 里，比如淘宝、天猫、支付宝，根据所在 APP 的不同，调用的底层 API 会不同
const APP = ['TaoBao', 'Tmall', 'Alipay'];
function getPhoto(app: string) {
  //........
}
getPhoto('TaoBao'); // ok
getPhoto('hahah'); // ok
// getPhoto 可以传入任意的东西，如果想约束一下呢？
// 方案1
type app = 'TaoBao' | 'Tmall' | 'Alipay';
function getPhoto2(app: app) {
  // .........
}
// getPhoto2('haha');// no ok
getPhoto2('TaoBao'); // ok

// 方案2 优化
// as const 把APP2从string[] 类型变为readonly ['TaoBao', 'Tmall', 'Alipay']类型
const APP2 = ['TaoBao', 'Tmall', 'Alipay'] as const;
// typeof 获取APP2的类型 是一个数组，通过number获取数组类型，数组里面是常量，所以是TaoBao | Tmall | Alipay
type app2 = typeof APP2[number];
function getPhoto3(app: app2) {}
// getPhoto3('xixi');// no ok
getPhoto3('Tmall');
