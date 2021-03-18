## 分析和渲染

在获得render tree后，浏览器知道了元素的不同结构、样式、几何关系。将这些信息转化为显示器中的像素，这个过程叫做*光栅化*。

主线程会遍历render tree获取到层次树(layer tree)用于区分不同层级。

当layer tree创建完毕后，合成器线程将对每一层进行光栅化，并将光栅化的结果保存到GPU进程中

由于每一层的高度可能大于页面的高度，所以合成器线程会把一个layer分成若干个tile，把每一个tile发送给光栅化线程。光栅化线程会把这些tile光栅化并且存储到GPU的内存中。

当图层上面的tile都被光栅化后，合成器线程会收集tile的信息(`draw quads`)用来合成一个*合成帧*(`composter frame`)
* draw quads: 存储了tile的内存位置与考虑所有情况下tile的绘制位置等信息。
* composter frame：一帧中的所有内容