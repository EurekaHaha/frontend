# js题目

## 0.1 + 0.2 != 0.3 ?

### 原因

> js数字是双精度版本,计算时需要转化为二进制,浮点数用二进制表示会出现无线循环小数,计算无限长度数字会出现精度缺失现象

### 解决方案

> 使用 `Number.EPSILON` 即 `0.1 + 0.2 - 0.3 < Number.EPSILON`

---

## 深拷贝

### 为什么需要
> 对象拷贝使用的普通的方法为指针的拷贝 并没有复制实际的数据

### 解决方案
```javascript
function deepClone(obj) {
    if (typeof obj !== 'object') {
        return obj;
    }
    let result = {};
    for (let prototypeName in obj) {
        result[prototypeName] = deepClone(result[prototypeName]);
    };
    return result;
}
```

---

## JS中数据存放的位置

存放的位置
* 原始类型：栈存储
* 引用类型：指针为栈存储 值为堆存储

---

## 以下代码输出什么

```javascript
try {
    (async function() { a().b().c() })()
} catch (e) {
    console.log(`执行出错：${e.message}`)
}
```

### 结论
> Uncaught (in promise) ReferenceError: a is not defined  

### 考点

1. try catch 捕获不到异步的错误

---

## 以下代码输出什么

```javascript
try {
    let a = 0
    ;(async function() {
        a += 1
        console.log('inner', a)
        throw new Error('123')
        // a()
    })()
    console.log('outer', a)
} catch(e) {
    console.warn('Error', e)
}   
```

### 结论

> inner 1  
> outer 1  
> (node:1128) UnhandledPromiseRejectionWarning: Error: 123

