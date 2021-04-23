# 事件

当用户触发了事件时，最先知道用户动作的是浏览器进程(browser process)。但是浏览器只知道事件发生的位置，因为tab内的内容是由渲染器进程(renderer process)处理的，所以浏览器进程(browser process)将事件类型以及坐标发送至渲染器进程(renderer process)。渲染器进程(renderer process)找到事件监听器来处理事件。

non-fast scrollable region：  
> 当整个页面已经被合成之后，合成器线程(compositor thread)会找到绑定了事件的部分，并标记为"non-fast scrollable region"。有了这个信息，合成器线程(compositor thread)会把发生到这个部分的事件传递给主线程(main thread)。如果事件没有发生在这个区域，合成器线程(compositor thread)就不需要等待主线程(main thread)的参与而直接进行合成新的合成帧。

在web应用程序中普遍的事件是通过事件委托来实现的。

如何找到事件目标  
> 当合成器线程(compositor thread)把事件发送给主线程后(main thread)，主线程首先会利用绘制过程的绘制记录来进行一次命中测试，以找到事件发生的点坐标下的内容。

