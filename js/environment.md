# 环境

## 执行上下文
---

[规范](https://262.ecma-international.org/11.0/#sec-execution-contexts)

执行上下文是一个执行或者评估(?)JS代码的环境的抽象概念 每当代码运行时都会在一个执行上下文中

执行上下文分为3种：
1. 全局执行上下文
2. 函数执行上下文
3. `eval`执行上下文

### 执行栈

> js刚刚运行时会创建一个全局执行上下文并压入执行栈中 每当引擎遇到一个函数调用时就会创建一个新的函数执行上下文也会压入执行栈中 当执行栈顶部的函数执行完成后会把该函数的执行上下文弹出。

#### 尾调用优化

### 执行上下文在不同ES版本中包括了如下部分
* ES3:
    * scope: 作用域 作用域链
    * variable object: 变量对象 用于储存变量的对象
    * this value: this的值
* ES5
    * lexical environment: 词法环境 获取变量时使用
    * variable environment: 变量环境 声明变量时使用
    * this value: this的值
* ES8
    * lexical environment: 词法环境 获取变量时使用 **this值被归入其中**
    * variable environment: 变量环境 声明变量时使用
    * code evaluation state： 用于恢复代码执行位置


### 创建执行上下文
1. 创建**词法环境**组件
2. 创建**变量环境**组件

* 词法环境
    * 词法环境用于根据代码来确定标识与变量和函数的关联绑定
    * > 词法环境与某些语法结构相关联 并且会创建一个新的词法环境
        * 函数声明
        * 块语句
        * try语句中的catch

---
## 作用域
---
## this
---
以下是相关的原文
> 1.Let *expr* be CoveredCallExpression of CoverCallExpressionAndAsyncArrowHead.  
> 2.Let *memberExpr* be the MemberExpression of *expr*.  
> 4.Let *ref* be the result of evaluating *memberExpr*.  

根据上述步骤 *ref* 基本可以认定为()左边的表达式
[具体](https://262.ecma-international.org/11.0/#prod-MemberExpression)

```
 If Type(ref) is Reference, then (注释5)
    If IsPropertyReference(ref) is true, then (注释1)
        Let thisValue be GetThisValue(ref). (注释2)
    Else,
        Assert: the base of ref is an Environment Record.  
        Let refEnv be GetBase(ref).  (注释3)
        Let thisValue be refEnv.WithBaseObject().  (注释4)
 Else,  
    Let thisValue be undefined.
```
### 注释1
* `IsPropertyReference(ref)`
    * `ref`的`base value`是`Object`, 返回true
    * `HasPrimitiveBase(ref)`是true时,返回true
* `HasPrimitiveBase(ref)`
    * 如果`ref`的`base value`是`Boolean`, `String`, `Symbol`, `BigInt`或者`Number`时,返回true
    * 其他情况返回false
### 注释2
* `GetThisValue(ref)`
    * `IsSuperReference(ref)`是true时,返回`ref`的`thisValue`
    * 否则返回`GetBase(ref)`
### 注释3
* `GetBase(ref)`
    * 返回`ref`的`base value`
### 注释4
* `refEnv.WithBaseObject()`
    * 如果`refEnv`是在`with`关键字下,返回`with`的对象
    * 否则返回`undefined`
### 注释5
* `Type(ref)`
    * 普通调用时,`ref`是`Reference`类型
    * 赋值操作不是
    * 逻辑判断不是

