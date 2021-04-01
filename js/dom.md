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