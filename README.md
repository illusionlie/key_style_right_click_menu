# GalMenu.js 右键环形菜单

## 与原项目的区别

原项目来自 [这里](https://github.com/LanlingKira/key_style_right_click_menu) , 感谢原作者的辛苦工作！

- 原项目使用了 jQuery 依赖，本项目仅使用原生 JavaScript 实现
- ~~将 `GalMenu.css` 样式和 `overlay` 元素写入 `GalMenu.js` 中动态加载~~
- ~~无需在页面中添加 `<div class="galMenu galRing">` 以及其子元素 (包括`galAudio`)~~
- **完美实现 `All in one`, 无需添加额外的 HTML 元素和引入文件。使用配置参数动态设置**
- 使用 AI 辅助编写

## 使用方法

### 引入文件

在页面中引入 GalMenu.js 或 GalMenu.min.js 文件

``` html
<script type="text/javascript" src="./GalMenu.min.js"></script>
```

或使用 JsDelivr CDN

```html
<script type="text/javascript" src="https://gcore.jsdelivr.net/gh/illusionlie/key_style_right_click_menu/GalMenu.min.js"></script>
```

### HTML 结构

无需再添加任何 HTML 元素

### 初始化插件

在页面 DOM 元素加载完毕之后，通过 galMenu() 方法来初始化该右键菜单插件

``` html
<script type="text/javascript">
  let counter = 0;
  const maxCounter = 10;
  document.addEventListener('DOMContentLoaded', function(initgalMenu) {
    if (typeof galMenu !== 'function') {if (counter > maxCounter) {console.error("⚙️GalMenu: Retry limit reached!");return;} else {counter++;console.warn("⚙️GalMenu: Js hasn't finished loading yet, retrying...");setTimeout(initgalMenu, 1000);}}else {counter++;setTimeout(initgalMenu, 1000);};
    galMenu('body', {
      menu:"galRing",
      click_to_close:true,
      stay_open:false,
      audio_play:true,
      audio_url:"https://cdn.illusionlie.com/js/key_style_right_click_menu/audio.mp3",
      font_size:"18px",
      ring1_text:"Home",
      ring1_link:"https://github.com/illusionlie/key_style_right_click_menu",
      ring1_pic:"https://cdn.illusionlie.com/img/girls/ayane_thumb.webp",
      ring2_text:"Blog",
      ring2_link:"https://blog.thkira.com/",
      ring2_pic:"https://cdn.illusionlie.com/img/girls/neri_thumb.webp",
      ring3_text:"About",
      ring3_link:"#about",
      ring3_pic:"https://cdn.illusionlie.com/img/girls/yurugi_thumb.webp",
      ring4_text:"Contact",
      ring4_link:"#contact",
      ring4_pic:"https://cdn.illusionlie.com/img/girls/ren_thumb.webp",
      ring5_text:"Social",
      ring5_link:"#social",
      ring5_pic:"https://cdn.illusionlie.com/img/girls/kaguya_thumb.webp",
      ring6_text:"Other",
      ring6_link:"#other",
      ring6_pic:"https://cdn.illusionlie.com/img/girls/chieri_thumb.webp"
    });
  });
</script>
```

### 配置参数

为了避免 JS 加载缓慢导致提前执行 galMenu() 方法, 添加了一个重试计数器, 每次重试间隔 1 秒

- `maxCounter`: 最大重试次数, 默认为 10

GalMenu.js 有多个需要配置的配置参数

- `click_to_close`：是否在点击遮罩层时关闭右键菜单，默认为 true
- `stay_open`：是否在点击菜单项后一直显示右键菜单，默认为 false
- `audio_play`：是否在点击菜单项时播放音频，默认为 true
- `audio_url`：音频文件的 URL，默认为 "./audio.mp3"
- `font_size`：菜单项的字体大小，默认为 "18px"
- `ring*_text`：第*个菜单项的文本内容, 默认为 "Place*" (*代表数字, 范围在1至6)
- `ring*_link`：第*个菜单项的链接, 默认为 "#" (*代表数字, 范围在1至6)
- `ring*_pic`：第*个菜单项的图片链接, 默认请查看 js 文件中的默认设置 (*代表数字, 范围在1至6)

### 关闭菜单

3 个方式

- 再次右键
- 左键点击遮罩层
- ESC 关闭

## 注意事项

GalMenu修改了全局样式 `body`和`html`的`height`属性为`100%`(硬性要求)
如果你引入GalMenu后出现样式异常, 请优先检查

## 演示地址

1. 完整下载项目所有文件后打开`index.html`
2. ~~[https://thkira.com/key.html](http://thkira.com/key.html "仿Key游戏风格jQuery右键菜单")~~ (已失效)
3. [https://demo.illusionlie.com/key_style_right_click_menu/](https://demo.illusionlie.com/key_style_right_click_menu/) (该项目)
4. [https://demo.illusionlie.com/key_style_right_click_menu/origin](https://demo.illusionlie.com/key_style_right_click_menu/origin) (原项目)

## LICENSE

[MIT @ LanlingKira](./LICENSE)
