// any unknown never

// 一. any
// 1.可以赋值给任何类型 也可以被任何类型赋值
// 2.top type 最顶层的类型

// 二. unknown
// 1.可以接受任何类型赋值 但是只能赋值给unknown 和 any
// 2.不能随意操作 eg:
const abc: unknown = 'str';
// abc.toString(); // 报错
// 3.在不确定类型时，不要用any，最好用unknow

// 三. never
// 1.是任何类型的子类型，可以赋值给任意类型
// 2.bottom type 最底层的类型，只能接受never类型的值
// 3.运用场景，在穷尽联合类型时使用 eg:
function sayHi(p: string | number) {
  if (typeof p === 'string') {
    return p.toLowerCase();
  } else if (typeof p === 'number') {
    return p.toFixed();
  } else {
    // 利用第2个特点，只能接受never类型的值可以避免p的类型被穷尽完
    const _never: never = p;
    throw new Error('error');
  }
}

// 四. 类型断言
// 1.语法：as newType
interface IFoo {
  name: string;
}
declare const obj: {
  foo: IFoo;
};
const {
  // 利用断言修整类型错误推断
  foo = {} as IFoo,
} = obj;
// 2.当单重断言失败时，需要先断言为一种通用点的类型后再断言想要的类型，使用双重断言 as newType as newType2
const str: string = 'linbudu';
// 从 X 类型 到 Y 类型的断言可能是错误的，blabla
// (str as { handler: () => {} }).handler()
(str as unknown as { handler: () => {} }).handler();
// 3.利用类型断言来获得代码提示和类型检查的能力
interface IStruct {
  foo: string;
  bar: {
    barPropA: string;
    barPropB: number;
    barMethod: () => void;
    baz: {
      handler: () => Promise<void>;
    };
  };
}
// 想要基于此结构来实现一个对象
// const obj1: IStruct = {};// 一堆报错
const obj2 = <IStruct>{
  foo: '1',
  bar: {
    baz: {
      handler: () => {
        return new Promise((resolve, reject) => {});
      },
    },
  },
};
// 可以获得类型推断和类型检查
// obj2.xxxx
// 五. 非空断言
declare const foo1: {
  func?: () => {
    prop?: number | null;
  };
};
// foo1.func().prop.toFixed(); // 报错
foo1.func!().prop!.toFixed();
// 1.非空断言是类型断言的简写，上面可以用类型断言来处理
(
  ((foo1.func as () => { props: number | null })() as { props: number | null })
    .props as number
).toFixed();
// 2.配置non-nullable-type-assertion-style 检查可以通过利用非空断言类替代类型断言
