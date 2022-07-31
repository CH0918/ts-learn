// 1.修饰类型
type PartialRes = Partial<{ name: string }>;
type RequiredRes = Required<{ name: string; age?: number }>;
type ReadonlyRes = Readonly<{ name: string }>;

// 2.结构化工具类型
type RecordRes = Record<string | number | symbol, number>;
type PickRes = Pick<{ name: string; age: number }, 'name'>;
type OmitRes = Omit<{ name: string; age: number }, 'name'>;

// 3.集合工具类型
type ExtractRes = Extract<1 | 2 | 3, 1>; // 交集
type ExcludeRes = Exclude<1 | 2 | 3, 1 | 2>; // 差集
type Concurrence<A, B> = A | B; // 并集
// type Complement<A, B extends A> = Difference<A, B>;

// 4.模式匹配 infer
