# 文档对象模型(DOM)

## 节点层级
---
```html
<html>
    <head>
        <title>title</title>
    </head>
    <body>
        <p>body p</p>
    <body>
</html>
```
如上的html可以表示为:  
* document
    * element-html
        * element-head
            * element-title
                * text
        * element-body
            * element-p
                * text  

其中document节点表示每个文档的根节点，根节点具有唯一的子节点html,html节点又叫文档节点(documentElement)。  

DOM中有12种节点类型，这些类型都继承一种基本类型(Node)

### Node类型
---
*在除了IE之外的浏览器种可以直接访问这个类型，在JS中所有节点类型都继承自这个类型，因此所有类型都共享相同的基本属性和方法*
* nodeType：每个节点都有nodeType这个属性用于表示节点的类型，有12个数值常量，可以直接在F12中查看`Node.prototype`
    * 浏览器并不一定支持所有节点类型。常用的为文本节点(TEXT_NODE)和元素节点(ELEMENT_NODE)
* nodeName和nodeValue保存了关于节点的信息，nodeName始终等于元素的标签名，nodeValue始终等于`null`
* 节点关系
    * childNodes：所有节点都有一个childNodes属性，其中包含一个NodeList的实例，NodeList是一个类数组来保存节点。
    * 获取节点的方法
        * previousSibling
        * nextSibling
        * paraentNode
        * firstChild
        * lastChild
        * childNodes
* 操作节点
    * appendChild
    * insertBefore
    * replaceChild
    * removeChild
    * cloneNode
        * `cloneNode()`会返回调用它的节点一模一样的节点，cloneNode()方法会接收一个布尔参数，表示是否深复制
            * 如过传入true，会复制该节点和整个DOM子树。
            * 如果传入false则只会复制调用该方法的节点。
            * 复制的节点属于document，但未指定父节点。
            * 复制的节点不会添加js属性，如事件处理程序。

### Document类型
---
*Document类型是JS中表示文档节点的类型，表示整个HTML页面，是HTMLDocument的实例*
* 文档子节点：DOM规定document的子节点可以是DocumentType,Element,Processiong-Instruction,Comment。
    * 访问子节点的快捷方式：`document.documentElement`。
    ```javascript
    let html = document.documentElement;
    html === document.childNodes[0]; // true
    html === document.firstChild; // true
    a.nodeName === 'html'; // true
    /**
     *  document的documentElement,firstChild,childNodes[0]都指向<html>
     */
    ```
    * 定位元素
        * `document.getElementById()`参数ID必须跟元素id属性值完全匹配，包括大小写。如果有多个ID相同的元素，只返回第一个。
        * `document.getElementsByTagName()`返回一个HTMLCollection对象，该对象和NodeList相近似。是实时的。
            * HTMLCollection对象有一个额外的方法`namedItem()`,可以通过标签的name获取某一项的引用

### Element类型
---
*Element类型是web开发中常见的类型，表示XML或者HTML元素，对外暴露出访问元素的标签名，子节点和属性的能力*
* HTML元素：所有HTML元素都可以通过HTMLElement类型表示，HTMLElement直接继承了Element并增加了一些属性。他们是所有HTML元素上都有的标准属性
    * id
    * title
    * lang
    * dir
    * className
* 获取属性：每个元素都有0到多个属性，通常用于为元素或其它内容附加更多的信息，与其相关的DOM方法总共有3个
    * `getAttribute()`
    * `setAttribute()`
    * `removeAttribute()`
* attributes属性：Element是唯一一个使用attributes属性的DOM节点类型，attributes属性包含了一个NamedNodeMap实例，是一个类似NodeList的实时集合。包含如下方法
    * `getNamedItem(name)` 返回nodeName属性等于name的节点
    * `removeNamedItem(name)` 删除nodeName属性等于name的节点
    * `setNamedItem(node)` 向列表中添加node节点，以其nodeName为索引
    * `item(pos)` 返回索引位置pos处的节点

## [MutationObserver](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver)  
---
MutationObserver接口提供了监视对DOM树所做更改的能力。它被设计为旧的Mutation Events功能的替代品，该功能是DOM3 Events规范的一部分。  
MutationObserver的实例需要通过调用MutationObserver构造函数并传入一个回调函数来创建
```javascript
    let observer = new MutationObserver(() => console.log('new observer'));
```

1. `observe()`方法
    * `MutationObserver`实例不会关联DOM。是通过`observe()`方法关联的。
    * DOM标准但是是注册在微任务上。
    * 绑定这个方法的元素上发生任何变化都会被实例发现，后代修改或者非属性修改不会触发。
    * 该方法接收两个参数
        1. 要观察变化的节点
        2. `MutationObserverInit`对象
2. 回调与MutationRecord
    * 多次修改后执行回调会接收到MutationRecord的数组
3. `disconnect()`方法
    * 默认情况下，只要被观察的元素没有被垃圾回收，回调就会响应DOM变化事件