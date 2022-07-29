type MyExclude<T, U> = T extends U ? never : T;
// 1.分发条件类型：MyExclude<T, U>,T 如果传进来的是联合类型，会分发去匹配有面的U，比如T 传1|2 会拆开1 extends U ? never : 1  |   2 extends ...

// 2.如果不是通过类型体操的形式来操作，比如下面直接写'a' | 'b' extends 'a' ? 'a' : 1; 不会分发去匹配
// type tttt = 'a' | 'b'  extends 'a' ? true : false;
// type Type<T> = T extends 'a' | 'b' ? 1 : 'a';
// type TTT = Type<'a' | 'c'>;
