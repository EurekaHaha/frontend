## 浏览器的进程

浏览器可能会由一个进程和多个线程组成，也可能由通过IPC通信的多个进程与少量线程组成。  
(没有创建浏览器的标准)

在chrome中有主要如下4个进程

* 浏览器进程(Browser Process): 负责处理浏览器的tab栏，前进后退，地址栏，书签栏，和处理一些浏览器的底层操作如网络请求和文件访问。
* 渲染进程(Renderer Process)：负责一个tab内的所有内容，即渲染引擎(包括iframe)。  
    * 一个主线程(main thread)
    * 多个工作线程(work thread)
    * 一个合成器线程(compositor thread)
    * 多个光栅化线程(raster thread)
* 插件进程(Plugin Process)：负责插件。
* GPU进程(GPU Process)：GPU会接收来自所有应用程序的GPU任务，并在同一个地方显示他们。

![浏览器进程](../imgs/browser-arch2.png)

为什么chrome使用多进程架构? 
* 优势
    * 当一个tab崩溃时，其他tab不会因为它的崩溃而崩溃。因为是独立的进程。  
    * 安全性限制。  
* 劣势
    * 浪费内存，每个tab需要包含共同的基础设施(类似于V8引擎)，如果是多个进程的话，并不能有效率的共享这些信息。

