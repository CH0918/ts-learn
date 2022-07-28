type First<T extends any[]> = T extends [infer First, ...unknown[]]
  ? First
  : never;
// 匹配模式，infer 占位，匹配成功取出来
