(function () {
    // 默认配置项
    const defaults = {
      menu: "galRing",
      click_to_close: true,
      stay_open: false,
      audio_play: false,
      audio_url: "https://cdn.illusionlie.com/js/key_style_right_click_menu/audio.mp3",
      font_size: "20px",
      ring1_text: "Place1",
      ring1_link: "#",
      ring1_pic: "https://cdn.illusionlie.com/img/girls/chieri_thumb.webp",
      ring2_text: "Place2",
      ring2_link: "#",
      ring2_pic: "https://cdn.illusionlie.com/img/girls/kaguya_thumb.webp",
      ring3_text: "Place3",
      ring3_link: "#",
      ring3_pic: "https://cdn.illusionlie.com/img/girls/ren_thumb.webp",
      ring4_text: "Place4",
      ring4_link: "#",
      ring4_pic: "https://cdn.illusionlie.com/img/girls/yurugi_thumb.webp",
      ring5_text: "Place5",
      ring5_link: "#",
      ring5_pic: "https://cdn.illusionlie.com/img/girls/neri_thumb.webp",
      ring6_text: "Place6",
      ring6_link: "#",
      ring6_pic: "https://cdn.illusionlie.com/img/girls/ayane_thumb.webp"
    };
  
    // 动态加载 CSS
    function loadStyles() {
      const galStyle = document.getElementById('gal_style');
      if (galStyle) return;
  
      const styleElement = document.createElement('style');
      styleElement.id = 'gal_style';
      styleElement.innerHTML = `
        @charset "utf-8";
        html,body{height:100%;}
        .galMenu{margin:0;padding:0;display:none;position:fixed;z-index:999}
        .galMenu .circle,.galMenu .ring{height:300px;position:relative;width:300px}
        .galMenu .circle{margin:0 auto}
        .galMenu .ring{border-radius:50%;opacity:0;transform-origin:50% 50%;transform:scale(.1) rotate(-270deg);transition:all .4s ease-out;}
        .galMenu .open .ring{opacity:1;transform:scale(1) rotate(0)}
        .galMenu .open{border-color:#aaa}
        .galMenu .menuItem{border-radius:50%;color:#eee;display:block;height:80px;line-height:80px;margin-left:-41px;margin-top:-41px;position:absolute;text-align:center;width:80px;background-size:80px;border:2px #b59494 solid;box-shadow:0 0 15px #fff;}
        .galMenu .menuItem:hover{box-shadow:inset 0 0 80px #fff;-webkit-box-shadow:inset 0 0 80px #fff;-moz-box-shadow:inset 0 0 80px #fff;}
        .galMenu .ring a:nth-of-type(1){background-image: var(--ring1-pic)}
        .galMenu .ring a:nth-of-type(2){background-image: var(--ring2-pic)}
        .galMenu .ring a:nth-of-type(3){background-image: var(--ring3-pic)}
        .galMenu .ring a:nth-of-type(4){background-image: var(--ring4-pic)}
        .galMenu .ring a:nth-of-type(5){background-image: var(--ring5-pic)}
        .galMenu .ring a:nth-of-type(6){background-image: var(--ring6-pic)}
        .galMenu .ring a{font-family:cursive,sans-serif;font-size:var(--font-size);display:inline-block;color:#fff;text-shadow:#DC965A 1px 0 0,#DC965A 0 1px 0,#DC965A -1px 0 0,#DC965A 0 -1px 0;}
        .galMenu .ring a:hover{text-shadow:#6CF 1px 0 0,#6CF 0 1px 0,#6CF -1px 0 0,#6CF 0 -1px 0;}
        #overlay{height:100%;position:fixed;width:100%;left:0;top:0;background:rgba(0,0,0,.5);display:none;z-index:998;}
      `;
      document.head.appendChild(styleElement);
  
      if (!document.getElementById('gal_style')) {
        console.error('⚙️GalMenu: Failed to load GalMenu style!');
      }
    }
  
    // 初始化菜单
    function initMenu(selector, options) {
      const settings = { ...defaults, ...options };
      const elements = document.querySelectorAll(selector);
  
      // 创建并获取 overlay
      let galOverlay = document.getElementById('overlay');
      if (!galOverlay) {
        galOverlay = document.createElement('div');
        galOverlay.id = 'overlay';
        document.body.appendChild(galOverlay);
      }
  
      elements.forEach(el => {
        // 创建菜单元素
        const menu = document.createElement('div');
        menu.className = `galMenu ${settings.menu}`;
        el.appendChild(menu);
  
        const circle = document.createElement('div');
        circle.className = 'circle';
        circle.id = 'gal';
        menu.appendChild(circle);
  
        const ring = document.createElement('div');
        ring.className = 'ring';
        circle.appendChild(ring);
  
        // 动态创建 menu items
        for (let i = 1; i <= 6; i++) {
          const menuItem = document.createElement('a');
          menuItem.className = 'menuItem';
          menuItem.href = settings[`ring${i}_link`];
          menuItem.title = settings[`ring${i}_text`];
          menuItem.textContent = settings[`ring${i}_text`];
          ring.appendChild(menuItem);
        }
  
        // 设置 menu item 位置
        const items = ring.querySelectorAll('.menuItem');
        items.forEach((item, i) => {
          const angle = -0.5 * Math.PI - 2 * (1 / items.length) * i * Math.PI;
          item.style.left = `${(50 - 35 * Math.cos(angle)).toFixed(4)}%`;
          item.style.top = `${(50 + 35 * Math.sin(angle)).toFixed(4)}%`;
        });
  
        // 创建 audio 元素
        const audio = document.createElement('audio');
        audio.id = 'galAudio';
        circle.appendChild(audio);
  
        // 应用配置到 CSS 变量
        for (let i = 1; i <= 6; i++) {
          menu.style.setProperty(`--ring${i}-pic`, `url('${settings[`ring${i}_pic`]}')`);
        }
        menu.style.setProperty('--font-size', settings.font_size);
  
        // 打开菜单
        const openMenu = (e) => {
          const coords = getCoords(e);
          let top = coords.clientY - 150;
          let left = (document.body === e.target ? coords.clickX : coords.clientX) - 150;
          const bodyHeight = document.documentElement.clientHeight;
          const bodyWidth = document.documentElement.clientWidth;
  
          top = Math.max(0, Math.min(top, bodyHeight - 300));
          left = Math.max(0, (document.body === e.target) ? Math.min(left, bodyWidth - 300) : Math.min(left, bodyWidth - 300));
  
          menu.style.top = `${top}px`;
          menu.style.left = `${left}px`;
          menu.style.display = 'block';
  
          // 强制重绘，应用过渡效果
          window.getComputedStyle(menu).opacity;
          menu.style.transition = 'opacity 0.1s ease-out';
          menu.style.opacity = 1;
  
          circle.classList.add('open');
          galOverlay.style.display = 'block';
  
          // 设置 audio src 并播放
          audio.src = settings.audio_url;
          if (settings.audio_play) {
            audio.play();
          }
        };
  
        // 关闭菜单
        const closeMenu = () => {
          circle.classList.remove('open');
          galOverlay.style.display = 'none';
  
          menu.style.opacity = 1;
          menu.style.transition = 'opacity 0.4s ease-out';
          menu.style.opacity = 0;
          setTimeout(() => {
            menu.style.display = 'none';
            menu.style.transition = '';
          }, 400);
  
          audio.pause();
          audio.currentTime = 0;
        };
  
        // 添加事件监听
        if (!settings.stay_open) {
          ring.querySelectorAll('a.menuItem').forEach(item => {
            item.addEventListener('click', closeMenu);
          });
        }
  
        el.addEventListener('mousedown', (e) => {
          if (e.button !== 2 && !e.target.closest('.galMenu') && settings.click_to_close) {
            closeMenu();
          }
        });
  
        el.addEventListener('contextmenu', (e) => {
          e.preventDefault();
          e.stopPropagation();
          if (circle.classList.contains('open')) {
            closeMenu();
          } else {
            openMenu(e);
          }
        });
  
        el.addEventListener('keyup', (e) => {
          if (e.key === 'Escape' && circle.classList.contains('open')) {
            closeMenu();
          }
        });
      });
    }
  
    // 获取坐标
    function getCoords(e) {
      const evt = e || window.event;
      let clickX = 0;
      let clickY = 0;
  
      if ((evt.clientX || evt.clientY) && document.body) {
        clickX = evt.clientX + document.body.scrollLeft;
        clickY = evt.clientY + document.body.scrollTop;
      }
  
      if ((evt.clientX || evt.clientY) && document.compatMode === 'CSS1Compat' && document.documentElement) {
        clickX = evt.clientX + document.documentElement.scrollLeft;
        clickY = evt.clientY + document.documentElement.scrollTop;
      }
  
      if (evt.pageX || evt.pageY) {
        clickX = evt.pageX;
        clickY = evt.pageY;
      }
  
      return {
        clickX,
        clickY,
        clientX: evt.clientX,
        clientY: evt.clientY,
        screenX: evt.screenX,
        screenY: evt.screenY
      };
    }
  
    // 暴露给全局的 galMenu 函数
    window.galMenu = (selector, method, options) => {
      loadStyles();
      if (typeof method === 'object' || !method) {
        return initMenu(selector, method || options);
      } else {
        console.error(`⚙️GalMenu: Method ${method} does not exist`);
      }
    };
  })();