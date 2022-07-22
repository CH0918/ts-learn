type Type<T> = T | string;
function foo<T>(bar: T): T {
  return bar;
}
type Factory<T = boolean> = T | string | number;
const foo1: Factory = 'abc';

// 对象类型中的泛型
interface IRes<TData> {
  code: number;
  resMessage?: string;
  resObject: TData;
}
interface IUserInfo {
  id: number;
  name: string;
  age: number;
}
async function getUser(): Promise<IRes<IUserInfo>> {
  return Promise.resolve({
    code: 1,
    resObject: {
      id: 1,
      name: 'zhangsan',
      age: 10,
    },
  });
}
(async function () {
  const res = await getUser();
  const obj = res.resObject;
  const name = obj.name;
})();

function handle<T>(payload: T): Promise<[T]> {
  return new Promise<[T]>((res, rej) => {
    res([payload]);
  });
}
(async () => {
  const res = await handle({ name: 'zhang' });
})();
const fn1 = <T>(args: T): T => args;

function handle1<T>(input: T): T | number {
  if (typeof input === 'number') {
    console.log(input.toFixed());
    return input * 2;
  }
  return input;
}
