type TupleToObject<T extends readonly (string | number)[]> = {
  [key in T[number]]: key;
};
// 1. 一个常量数组后面加 as const 会变成readonly 元祖，eg:
//   const tt = [1,2,3] as const;  // tt: readonly [1,2,3]
// 2.typeof 一个数据实体，得到它的类型，eg:
//   type Type = typeof tt; // readonly [1,2,3];
// 3.T[number] 得到元祖的联合类型tt[number] 得到 1|2|3
// 4.[key in T[number]] 遍历联合类型
// 5.TupleToObject<[1,2]> 这里的[]传进来的是类型而不是数据实体，如果尖括号传进来的是变量要先用typeof 变成类型，eg:
//   const arr = [1,2] as const; TupleToObject<typeof arr>;
