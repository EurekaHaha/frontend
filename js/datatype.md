## 数据类型

### 类型
---
ECMA有6种原始的数据类型，`Undefined`,`Null`,`Boolean`,`Number`,`String`,`Symbol`;还有一种复杂的数据类型`Object`;`Fucntion`被看作一种复杂的对象。并非一种类型。

### typeof
---
typeof操作符会返回`undefined`,`boolean`,`number`,`string`,`symbol`,`object`,`function`
* `function`表示值为函数
* `object`表示值为对象(而不是函数)或者null

### Undefined
---
Undefined类型只有一个值，就是undefined。  
undefined在js中是一个变量，所以如果要获取undefined建议使用`void 0`来获取。  
undefined表示一个未定义变量的初始值，或者没有实际参数的形式参数。

### Null
---
Null类型只有一个值，就是null。
null是一个特殊值，逻辑上表示一个空对象指针，所以`typeof null`的值为`object`。
null表示定义了值为空。

### String
---
String表示零个或者多个16位Unicode字符序列(UTF16编码)。  
`charAt`,`charCodeAt`,`length`等方法都是针对于UTF16编码的。  
字符串是不可改变的，即一创建就不能改变它的值了。

### Number
---
Number类型使用IEEE 754格式表示证书喝浮点值(双精度值)。
1. 浮点值
    * `1.`在js中被认为是整数1。
    * js中规定浮点数不可进行比较。
    * js中数字运算需要转化位二进制，浮点数转化二进制不精确。
    ```js
        // false
        console.log(0.1 + 0.2 == 0.3)
        // true
        console.log(Math.abs(0.1 + 0.2 - 0.3) <= Number.EPSILON)
        // Number.EPSILON 最小精度值
    ```
2. 值的范围
    * 最小值保存在`Number.MIN_VALUE`中，最大值保存在`Number.MAX_VALUE`中。
    * 精准整型计算的最大最小值保存在`Number.MIN_SAFE_INTEGER`和`MAX_SAFE_INTEGER`中。
    * 如果值超出了最大值或者最小值，则会转化为`Infinity`和`-Infinity`。
3. NaN
    * NaN(not a number)表示不是一个数值，表示本来要返回数值的操作失败了(还是Number类型)。
    * `0`,`+0`,`-0`相除会返回NaN。如果`5 / 0`则返回`Infinity`,`-5 / 0`则返回`-Infinity`。
    * 涉及NaN的操作返回值皆是NaN。
    * ```js
        // false
        NaN == NaN
        // true
        isNaN(NaN);
        // false
        isNaN(10);
        // true
        isNaN('asd');
        // false
        isNaN(true);
      ```
4. 数值转换
    * 有三种函数可以将非数值转换为数值：`Number()`,`parseInt()`,`parseFloat()`
        1. `Number()`
            * boolean值，`true`转为1，`false`转为0。
            * number值，直接返回。
            * null，返回0。
            * undefined，返回NaN。
            * string
                * 字符串包含数值字符，则会转化为十进制数字。
                * 字符串包含有效十六进制格式，则会转换为与该十六进制相等的十进制整数值。
                * 其他情况转化为NaN。
            * object，调用`valueOf()`方法，并按照上述规则转化返回的值。
        2. `parseInt()`
            * `parseInt`注重于字符串是否包含数值的模式，字符串最前边的空格会被忽略掉，痛第一个非空字符开始转换，如果第一个字符不是加减号，数值字符，会立刻返回NaN。
            * `parseInt`转化空字符串会返回NaN,`Number`转化空字符串会返回0。
            * 转化过程中遇到字符串会停止转化，立刻返回转化的数字。
            * `parseInt`第二个参数是用来指定底数(进制数)。
        3. `parseFloat()`
            * 只解析十进制。

### Symbol
---
* Symbol是原始值，且Symbol实例是唯一、不可变的。
* `Symbol()`不能用new来作为构造函数使用。
* 可以通过Symbol开定义某些关键字和某些方法。
* 符号意义
    * `Symbol.asyncIterator` 定义`fo await of`
    * `Symbol.hasInstance`
    ```js
    class Bar {};
    class MyBar {
        static [Symbol.hasInstance] () {
            return false;
        }
    };

    let a = new Bar();
    let b = new MyBar();
    // true
    console.log(Bar[Symbol.hasInstance](a));
    // true
    console.log(a instanceof Bar);
    // false
    console.log(MyBar[Symbol.hasInstance](b));
    // false
    console.log(b instanceof MyBar);
    ```  
    * `Symbol.inConcatSpreadable` 定义`Array.prototype.concat()`方法是否打平数组
    * `Symbol.iterator` 定义`for of`
    * `Symbol.match` 正则表达式相关
    * `Symbol.replace` 正则表达式相关
    * `Symbol.search` 正则表达式相关
    * `Symbol.spceies`
    * `Symbol.split` 正则表达式相关
    * `Symbol.toPrimitive`该方法将对象转化为相应的原始值，由ToPrimitive抽象操作使用。
    ```js
    class A {};
    let a = new A();

    class B {
        constructor() {
            this[Symbol.toPrimitive] = function(hint) {
                switch (hint) {
                    case 'number':
                        return 3;
                    case 'string':
                        return 'string';
                    case 'default':
                    default:
                        return 'default';
                }
            }
        }
    }
    let b = new B();

    // 3[object, Object], NaN, [object, Object]
    console.log(3 + a, 3 - a, String(a));
    // 3default, 0, string
    console.log(3 + b, 3 - b, String(b));
    ```
    * `Symbol.toStringTag`用于创建对象的默认字符串描述，由内置方法`Object.prototype.toString()`使用。
    ```js
    class B {};
    class C {
        constructor() {
            this[Symbol.toString]
        }
    };

    let a = new Set();
    let b = new B();
    let c = new C();

    // Set(0) {}, [Object, Set], Set
    console.log(a, a.toString(), a[Symbol.toStringTag])
    // B {}, [object, Object], undefined
    console.log(b, b.toString(), b[Symbol.toStringTag])
    // C {}, [object, C], C
    console.log(c, c.toString(), c[Symbol.toStringTag])
    ```
    * `Symbol.unscopables`

### Object
---
* Object就是一组数据和功能的集合
* 每个Object实例都由如下的属性和方法
    * `constructor` 用于创建当前对象的函数。
    * `hasOwnProperty(prototypeName)` 用于判断当前对象实例上是否存在给定的属性。prototypeName必须是字符串或符号(Symbol)。
    * `isPrototypeOf(Object)` 用于判断当前对象是否为另一个对象的原型。
    * `prototypeIsEnumerable(propertyName)` 用于判断给定的属性是否可以使用`for in`语句枚举。
    * `toLocaleString()` 返回对象的字符串表示，返回当前地区的格式。
    * `toString()` 返回对象的字符串表示。
    * `valueOf()` 返回对象对应的字符串、数值或者布尔值。通常与`toString()`相同。
> BOM和DOM对象可能不会继承自Object,因为是由宿主环境提供的。

### 装箱转换和拆箱转换
---
* 装箱转换即把基本类型转化为相应类型的对象。