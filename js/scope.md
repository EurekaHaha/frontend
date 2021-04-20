## 执行上下文
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