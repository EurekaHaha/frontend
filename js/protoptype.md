## 原型和原型链

![原型和原型链](../imgs/prototype.png)

### prototype
---
* 几乎所有的对象都是Object的实例，prototype属性表示该对象的原型对象，即
    * 每个函数都有一个prototype属性。
    * prototype指向一个对象。
    * 函数创建对象是以prototype创建的。

### __proto__
---
* 每个js对象都会有一个__proto__的属性(null除外)
* 这个属性指向对象的原型