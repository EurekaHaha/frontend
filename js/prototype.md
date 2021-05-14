## 原型和原型链

![原型和原型链](../imgs/prototype.png)

### prototype
---
* 几乎所有的对象都是Object的实例，prototype属性表示该对象的原型对象，即
    * *每个函数都有一个prototype属性。*
    * prototype指向一个对象。
    * 函数创建对象是以prototype创建的。

### \_\_proto\_\_
---
* 每个js对象都会有一个\_\_proto\_\_的属性(null除外)。
* 这个属性指向对象的构造函数的原型。

## new
---

new做了什么

1. 新建一个空的Object A。
2. 将需要构造函数的prototype赋值给 A.\_\_proto\_\_。
3. 将A做为constructor执行的this来执行constructor。
4. constructor返回若为object，则return该object，否则返回A。

实现一个new方法

```javascript
function newV2() {
    let obj = Object.create(null);
    let constructor = Array.prototype.shift.call(arguments);
    obj.__proto__ = constructor.prototype;
    let ret = constructor.apply(ret, arguments);
    return typeof ret === 'object' ? ret : obj;
}
```

## 继承
---

1. 组合继承：综合原型链，盗用构造函数。
```js
function superType(name) {
    this.name = name;
    this.colors = ['red', 'blues'];
}

superType.prototype.getName = function() {
    console.log(this.name);
}

function subType(name, age) {
    // 盗用构造函数
    superType.call(this, name);
    this.age = age;
}

// 继承方法
subType.prototype = new superType();

subType.prototype.getAge() = function() {
    console.log(this.age);
}
```

2. 原型式继承：根据一个对象来创建一个新对象时使用
```js
function object(o) {
    function F() {};
    F.prototype = o;
    return new F();
}

let person = {
    name: 'zs',
    age: 15
}

let anotherPerson = object(person);
anotherPerson.name = 'ls';
anotherPerson.age = 13;
```
`object()`函数与`Object.create()`相类似。  
这种继承方式子代共享父代的属性。

3. 寄生继承：
```js
function object(o) {
    function F() {};
    F.prototype = o;
    return new F();
}

function createAnother(original) {
    let clone = object(original);
    clone.sayHi = function() {
        console.log('hi');
    }
    return clone;
}
```
函数难以重用

4. 寄生式组合继承
```js
function object(o) {
    function F() {};
    F.prototype = o;
    return new F();
}

function inheritPrototype(subType, superType) {
    // 创建对象
    let prototype = object(superType.prototype);
    // 增强对象
    prototype.contructor = subType;
    // 赋值对象
    subType.prototype = prototype;
}
```

## new的实现
---

new 运算符创建一个用户定义的对象类型的实例或具有构造函数的内置对象类型之一。

实现：
```js
function myNew() {
    // 创建空对象
    let obj = Object.create(null);
    // 获取函数
    let constructor = [].shift().apply(arguments);
    // 将空对像的__proto__指向函数的prototype
    obj.__proto__ = Object.create(constructor.prototype );
    // 以空为this执行函数
    let ret = constructor.apply(obj, arguments);
    // 判断返回哪个对象
    typeof ret === 'object' ? ret : obj;
}
```