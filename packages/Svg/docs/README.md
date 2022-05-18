<!-- 加载 demo 组件 start -->
<script setup>
import demo from './demo.vue'
</script>
<!-- 加载 demo 组件 end -->

<!-- 正文开始 -->

# Svg

Web动画三大类
- CSS3 动画
- javascript 动画(canvas)
- html 动画(SVG)

下面学习一下SVG在项目中的应用

SVG是可缩放矢量图形,是W3C XML的分支语言。

### 关于SVG的标签介绍

- version: 表示 svg 的版本,可选值(1.0/1.1)
- xmlns:http://www.w3.org/2000/svg (固定值)
- xmlns:xlink http://www.w3.org/1999/xlink (固定值)
- xml:space preserve (固定值)
- calss 
- width
- height
- viewbox  定义了画布上可以显示的区域，当 viewBox 的大小和 svg 不同时，viewBox 在屏幕上的显示会缩放至 svg 同等大小（暂时可以不用理解）

以上创建了 svg标签后,可以在内部添加svg 图形

[关于SVG实现复杂线动画](https://www.cnblogs.com/coco1s/p/6230165.html)




## 基础用法
<Preview comp-name="Svg" demo-name="demo">
  <demo />
</Preview>




