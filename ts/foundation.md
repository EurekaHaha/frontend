# 基础

强类型语言：不允许改变变量的数据类型，除非进行强制转换

弱类型语言：变量可以被赋予不同的数据类型

静态类型语言：在编译阶段确定所有变量的类型  

*  编译阶段确定属性偏移量
*  偏移量访问代替属性名访问
*  偏移量信息共享

动态类型语言：在执行阶段确定所有变量的类型

*  程序运行时动态计算属性偏移量
*  需要额外空间储存属性名
*  所有对象偏移量各存一份 (各对象)

## 基本类型

ts中新增的数据类型

1. void
2. any
3. never
    * 永远不会有返回值的类型
4. 元组
5. 枚举
    * 一组有名字的常量集合
    * 数字枚举、字符串枚举、异构枚举
    ```typescript
    enum numberEnum {
        a = 1,    // 可设置初始化的值,否则为0
        b,        // 2
        c         // 3
    };
    // 数字枚举可以反向映射
    numberEnum[1] === 'a';
    numberEnum.a === 1;
    ---
    enum stringEnum {
        a = 'aaa',
        b = 'bbb'
    }
    // 字符串枚举不可反向映射
    stringEnum.a = 'aaa';
    stringEnum.aaa === undefined;
    ---
    enum heterogeneousEnum {
        a,
        b = 'bbb'
    }
    // 异构枚举是指字符串枚举和数字枚举混用
    ---
    const enum constEnum {
        Jan,
        Feb,
        Mar
    }
    // 常量枚举在编译阶段会被移除
    ```
    * 枚举成员的值不可修改
    * 枚举成员分为常量成员和计算成员
    * 枚举类型不可被比较
6. 高级类型

## 接口(interface) type关键字 类(class)
---

### 接口

接口可以用来约束对象、函数和类的结构。  

### type关键字

type关键字
* 类型别名：可以用来给一个类型起一个新的名字，常用于联合类型
```typescript
type str1 = string;
type str2 = () => string;
type str = str1 | str2;
```
* 字符串字面量
```typescript
type Name = 'zhangsan' | 'lisi' | 'wangwu';
let name1 = 'zhangsan'; // 正常
let name2 = 'zhaoliu'; // 报错
```

type与interface的区别  
* type: 不是创建新的类型,只用来给一个或几个类型起一个名字.type还可以用来进行联合,交叉等操作,便于引用.  
* interface: 创建新的类型,接口之间可以进行继承,声明合并.  
**优先使用interface**

### 类(class)

**类的成员属性都是实例属性,类的成员方法都是原型方法 ES TS都是这样**  
**TS中类的属性需要有初始值或者在构造函数中被初始化**

类的修饰符:
* public 公有方法
* protectd 被保护的方法,只能在类本身或者子类中访问,不能在实例中调用
* protected constructor 基类 类本身只能被继承,不能实例化
* private 私有方法,只能在类本身调用,不能被实例和子类调用
* private constructor 不能被继承,也不能被实例化
    * 可以保证有限个数的实例
    ```typescript
    class A {
        private constructor(public s: string) {
        }

        static size = 0;

        static getNewA(str: string) {
            if (this.size < 3) {
                this.size++;
                return new A(str);
            }
        }
    }
    new A('123'); // 报错
    let a0 = A.getNewA('123') // 成功
    ```
* readonly 必须要初始化
* static 只能通过类名来调用,不能用实例来访问,可以被子类继承
* abstract 
    * 抽象类,只能被继承,不能实例化
    * 抽象方法,必须被子类实现

类与接口：
* 类可以实现接口
```typescript
interface IA {
    a: number;
    b(): void;
}

class A implements IA {
    a: number;

    constructor() {
        this.a = 1;
    }

    b() {
        console.log(this)
    }
}
```


**抽象类更注重类别的抽象,接口注重功能的抽象**