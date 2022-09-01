## Css属性

### 字体进行抗锯齿渲染

**`-webkit-font-smoothing`**，属性值：

- none ------ 对低像素的文本比较好
- subpixel-antialiased------默认值
- antialiased ------抗锯齿很好 (一般使用)

``` css
-webkit-font-smoothing : antialiased;/*chrome,safari */

-moz-font-smoothing : inherit | garyscale;/* firefox*/

-moz-osx-font-smoothing : inherit | garyscale /*Gecko*/
```



### 阻止用户双击选中文字

[**`user-select`**](https://developer.mozilla.org/zh-CN/docs/Web/CSS/user-select) ，属性值：

- none ----- 元素及其子元素的文本不可选中

- auto ------ 默认值

  -  `::before` 和 `::after` ，采用的属性值是 `none`
  - 可编辑元素，则采用的属性值是 `contain`
  - 否则，根据父元素的`user-select`：all | none进行继承
  - 否则，采用`text`

- text------用户可以选择文本

- all------当双击子元素或者上下文时，那么包含该子元素的最顶层元素也会被选中。

- contain------允许在元素内选择；但是，选区将被限制在该元素的边界之内。

  

### 阻止用户拖拽

**`-webkit-user-drag`** ，属性值：

- auto：默认值，使用默认的拖拽行为，这种情况只有图片和链接可以被拖拽。
- element：整个元素（不仅仅只是它的内容）可拖拽。
- none：元素不能被拖动。在通过选中后可拖拽。



### 平滑滚动

**`scroll-behavior`**，属性值：

- auto：默认值，立即滚动。

- smooth：平滑滚动。

  

### 配色方案

允许元素指示它可以轻松呈现的配色方案。

操作系统配色方案的常见选择是“亮”（light）和“暗”（dark）

**`color-scheme`**

- `normal` ：默认值，表示元素未指定任何配色方案，使用浏览器的默认配色方案。
- `light`：表示可以使用操作系统亮色配色方案渲染元素。
- `dark`：表示可以使用操作系统深色配色方案渲染元素。



### `place-item`

相当于`justify-items`和`align-items`



### `text-transform`

指定如何将元素的文本大写，属性值：

- none：默认值，阻止所有字符的大小写被转换。
- capitalize：每个单词的首字母转换为大写，即句首单词。
- uppercase：所有字符被转换为大写。
- lowercase：所有字符被转换为小写。
- lowercase：所有字符被转换为小写。



### 滚动条样式设置

**CSS 滚动条选择器**

你可以使用以下伪元素选择器去修改基于 webkit 的浏览器的滚动条样式：

- `::-webkit-scrollbar`——整个滚动条。
- `::-webkit-scrollbar-button`——滚动条上的按钮（上下箭头）。
- `::-webkit-scrollbar-thumb`——滚动条上的滚动滑块。
- `::-webkit-scrollbar-track`——滚动条轨道。
- `::-webkit-scrollbar-track-piece`——滚动条没有滑块的轨道部分。
- `::-webkit-scrollbar-corner`——当同时有垂直滚动条和水平滚动条时交汇的部分。通常是浏览器窗口的右下角。
- `::-webkit-resizer`——出现在某些元素底角的可拖动调整大小的滑块。





## 开发的技巧

### 移动端适配问题

####  方案一：`px`==>`rem`

具体实现：采用` flexible.js` + `postcss-pxtorem`插件，淘宝采用的就是这种方案

**注意：**:warning:  ` flexible.js`在main的引入要放在`UI`组件库的前面

配置`.postcssre.js`文件

```js
module.exports = {
    plugins:{
        'postcss-pxtorem' :{
            rootValue: 75,//值为设计稿视口宽度的1/10
        }
    }
}
```

`flexible.js`升级版，在源码基础上添加

```js
var metaEl = doc.querySelector('meat[name="virwport"]')

if(meteEl){
    console.wran('将根据已有的meta标签来设置缩放比例')
    var match = metaEl.getAttribute('content').match(/initial\_scale=([\d\.]+)/)
    if(match){
        scale = parseFloat(match[1])
        dpr = parseInt(1/scale)
    }
}
```

主要是解决了`iphone`和安卓的设备像素比不一样的问题



#### 方案二：`px` ==> `vw`

具体实现：采用`postcss-px-to-viewport`插件

```js
const pxtovw = require('postcss-px-to-viewport')

module.export={
    css:{
        loaderOptions:{
            sass:{
                //sass-loader的option
            },
            css:{
                 //css-loader的option
            },
            postcss:{
                //postcss-loader的option
                plugins:[
                    new pxtovw({
                        unitToConvert:'px',//需转换单位，默认px
                        viewportWidth:375,//设计稿宽度
                        unitPrecision:5,//转换结果的保留小数位
                        propList:[*],//需要转换的属性列表，*->所有
                        viewportUnit:"vw",//转换后的视口单位
                        fontViewportUnit:"vw",//转换后的字体使用视口单位
                        selectorBlackList: ['.dome-'],//不进行转换的css选择器
                        minPixelValue:1,//设置最小的转换数值
                        mediaQuery:false,//是否转换媒体查询里面的单位
                        replace:true,//直接更换属性，不添加备用属性
                        exclude：[/node_modules/]//忽略xxx文件夹下的文件
                    })
                ]
            }
        }
    }
}
```











