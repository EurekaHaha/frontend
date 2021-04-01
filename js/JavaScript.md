## js的实现
---
js的实现包含如下几部分
* 核心(ECMAScript)
* 文档对象模型(DOM)
* 浏览器对象模型(BOM)

### ECMAScript
---
[ES标准](https://262.ecma-international.org/11.0/)  
ES不局限于WEB浏览器中，可以寄宿在各种宿主中如node、浏览器。宿主提供ECMA的基准实现和与环境自身交互必须的扩展。  
ES在基本层面定义了如下部分
* 语法
* 类型
* 语句
* 关键字
* 保留字
* 操作符
* 全局对象

### 文档对象模型(Document Object Model)
---
DOM是一个应用编程接口，用于在HTML中使用扩展的XML。DOM通过创建表示文档的树，让开发者可以随心所欲地控制网页的内容和结构。  
[详细](./dom.md)

### 浏览器对象模型(Browser Object Model)
---
BOM是用来支持访问和操作浏览器的窗口的API。  
比如