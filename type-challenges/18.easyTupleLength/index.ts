type Length<T extends readonly any[]> = T['length'];
const tesla = ['tesla', 'model 3', 'model X', 'model Y'] as const;
type tt = Length<typeof tesla>;

// 实验
type t1 = keyof [1, 2, 3];
type t2 = 'length' extends t1 ? true : false;

type Length2<T extends any[]> = {
  [key in keyof T]: key;
};
type t3 = Length2<[1, 2, 3]>;

// <T extends xxx> 泛型约束后，T通过索引访问可以访问到xxx相关的属性，比如xxx是数组类型，那么可以用过T['length']访问到数组的长度
