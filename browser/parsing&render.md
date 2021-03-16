## 浏览器的进程

在chrome中有如下4个进程

* 浏览器进程(Browser Process): 负责处理浏览器的tab栏，前进后退，地址栏，书签栏，和处理一些浏览器的底层操作如网络请求和文件访问。
* 渲染进程(Renderer Process)：负责一个tab的显示的相关工作，即渲染引擎。  
    * 一个主线程(main thread)
    * 多个工作线程(work thread)
    * 一个合成器线程(compositor thread)
    * 多个光栅化线程(raster thread)
* 插件进程(Plugin Process)：负责插件。
* GPU进程(GPU Process)：负责处理整个应用程序的GPU任务。

在获得render tree后，浏览器知道了元素的不同结构、样式、几何关系。将这些信息转化为显示器中的像素，这个过程叫做*光栅化*。

主线程会遍历render tree获取到层次树(layer tree)用于区分不同层级。

当layer tree船舰完毕后，合成器线程将对每一层进行光栅化，并将光栅化的结果保存到GPU进程中

由于每一层的高度可能大于页面的高度，所以合成器线程会把一个layer分成若干个tile，把每一个tile发送给光栅化线程。光栅化线程会把这些tile光栅化并且存储到GPU的内存中。

当图层上面的tile都被光栅化后，合成器线程会收集tile的信息(`draw quads`)用来合成一个*合成帧*(`composter frame`)
* draw quads: 存储了tile的内存位置与考虑所有情况下tile的绘制位置等信息。
* composter frame：一帧中的所有内容