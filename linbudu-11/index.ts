// object {} Object
type r1 = {} extends object ? 1 : 2;
type r2 = {} extends Object ? 1 : 2;
type r3 = object extends {} ? 1 : 2;
type r4 = Object extends {} ? 1 : 2;
type r5 = object extends Object ? 1 : 2;
type r6 = Object extends object ? 1 : 2;
type r7 = string extends {} ? 1 : 2;
type r8 = '' extends object ? 1 : 2;
// 不成立
type Result30 = "I'm string!" | {} extends string ? 1 : 2; // 2
// 成立
type r9 = any extends string ? 1 : 2; // 1 | 21
type Result23 = Object extends unknown ? 1 : 2; // 1

type r10 = any[] extends number[] ? 1 : 2;
type r12 = any extends number ? 1 : 2;

type r11 = number[] extends any[] ? 1 : 2;
type r13 = number extends any ? 1 : 2;

const c1: any[] = ['1'];
const c2: number[] = c1;
const c3: any = true;
const c4: number = c3;

// 总结：层级链
type VerboseTypeChain = never extends 'linbudu'
  ? 'linbudu' extends 'linbudu' | 'budulin'
    ? 'linbudu' | 'budulin' extends string
      ? string extends {}
        ? string extends String
          ? String extends {}
            ? {} extends object
              ? object extends {}
                ? {} extends Object
                  ? Object extends {}
                    ? object extends Object
                      ? Object extends object
                        ? Object extends any
                          ? Object extends unknown
                            ? any extends unknown
                              ? unknown extends any
                                ? 8
                                : 7
                              : 6
                            : 5
                          : 4
                        : 3
                      : 2
                    : 1
                  : 0
                : -1
              : -2
            : -3
          : -4
        : -5
      : -6
    : -7
  : -8;

// 其他类型比较
// 1.派生类 extends 基类 成立
// 2.多个联合类型比较   看左边能不能在右边全部找到 eg:
type t1 = 1 | 2 extends 1 | 2 | 3 ? true : false;
type t2 = 1 | 2 | 4 extends 1 | 2 | 3 | 5 | 6 ? true : false;
// 3.数组和元祖的比较
type Result40 = [number, number] extends number[] ? 1 : 2; // 1
type Result41 = [number, string] extends number[] ? 1 : 2; // 2
type Result42 = [number, string] extends (number | string)[] ? 1 : 2; // 1
type Result43 = [] extends number[] ? 1 : 2; // 1
type Result44 = [] extends unknown[] ? 1 : 2; // 1
type Result45 = number[] extends (number | string)[] ? 1 : 2; // 1
type Result46 = any[] extends number[] ? 1 : 2; // 1
type Result461 = any extends number ? 1 : 2;
type Result47 = unknown[] extends number[] ? 1 : 2; // 2
type Result48 = never[] extends number[] ? 1 : 2; // 1
