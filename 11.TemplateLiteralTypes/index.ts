// 模板字面量类型
type World = 'world';
type Greeting = `hello ${World}`;

// 联合类型 会遍历
type EmailLocaleIDs = 'welcome_email' | 'email_heading';
type FooterLocaleIDs = 'footer_title' | 'footer_sendoff';
type AllLocaleIds = `${EmailLocaleIDs | FooterLocaleIDs}_id`;
type Lang = 'en' | 'ja' | 'pt';
// 2 * 2 * 3 = 12种
type LoaleMessageIds = `${Lang}_${AllLocaleIds}`;

// 类型中的字符串联合类型
// function makeWatchedObject(obj) {
// 	return Object.keys(obj).map(item => `$`)
// }
// type PropEventSource<Type> = {
// 	on(eventName: `${string & keyof Type}Changed`, callback: (newVal: any) => void);
// }
type PropEventSource<Type> = {
  on<Key extends string & keyof Type>(
    eventName: `${Key}Changed`,
    callback: (newVal: Type[Key]) => void
  ): void;
};
declare function makeWatchedObject<Type>(
  obj: Type
): Type & PropEventSource<Type>;
const person = makeWatchedObject({
  firstName: 'hdj',
  lastName: 'zhangsan',
  age: 20,
});
// // person.on第一个参数会做校验，只能是传入对象的属性名 + Changed
person.on('firstNameChanged', (newVal) => console.log(newVal.toUpperCase()));
person.on('ageChanged', (newVal) => console.log(newVal));

// 内置字符串操作类型
type Greeting2 = 'hahah';
// 装换为大写
type ShoutyGreeting = Uppercase<Greeting2>;
// 字符串第一个字符转为大写
type FirstCase = Capitalize<Greeting2>;
// 第一个字符转为小写
type greeting3 = 'Haha';
type UnCapitalizeGreeting = Uncapitalize<greeting3>;
// 类
