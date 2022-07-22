// 一、鸭子类型系统 Dog 实际上跟继承Cat没啥区别
// class Cat {
//   eat() {}
// }
// class Dog {
//   eat() {}
//   bark() {}
// }
// function feedCat(cat: Cat) {}
// feedCat(new Dog());

// 但是会检测类型
// class Cat {
//   eat(): true {return true;}
// }
// class Dog {
//   eat(): string {return ''}
//   bark() {}
// }
// function feedCat(cat: Cat) {}
// 报错
// feedCat(new Dog());

// 二、模拟标称类型系统
// 1.eg1
// class TagProtector<T extends string> {
//   protected __tag__: T;
// }
// type Nominal<T, U extends string> = T & TagProtector<U>;
// type CNY = Nominal<number, 'CNY'>;
// type USD = Nominal<number, 'USD'>;

// const CNYCount = 100 as CNY;
// const USDCount = 100 as USD;
// function addCNY(source: CNY, input: CNY) {
//   return source + input;
// }
// addCNY(CNYCount, CNYCount);

// 2.eg2
class CNY {
  private __tag!: void;
  constructor(public value: number) {}
}
class USD {
  private __tag!: void;
  constructor(public value: number) {}
}
const CNYCount = new CNY(100);
const USDCount = new USD(100);

function addCNY(source: CNY, input: CNY) {
  return source.value + input.value;
}

addCNY(CNYCount, CNYCount);
// 报错了！
// addCNY(CNYCount, USDCount);
