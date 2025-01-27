(function() {
    //  动态加载 CSS 样式
    const galStyle = document.getElementById('gal_style');
    if (!galStyle) {
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
            #overlay{height:100%;position:fixed;width:100%;left:0;top:0;background:url() repeat scroll 0 0 rgba(0,0,0,.5);display:none;z-index:998;}
        `;
        document.head.appendChild(styleElement);
        if (!document.getElementById('gal_style')) {
            console.error('⚙️GalMenu: Failed to load GalMenu style!');
        }
    }

    var galMenu = {
        defaults:{
            menu:"galRing",
            click_to_close:true,
            stay_open:false,
            audio_play:false,
            audio_url:"https://cdn.illusionlie.com/js/key_style_right_click_menu/audio.mp3",
            font_size:"20px",
            ring1_text:"Place1",
            ring1_link:"#",
            ring1_pic:"https://cdn.illusionlie.com/img/girls/chieri_thumb.webp",
            ring2_text:"Place2",
            ring2_link:"#",
            ring2_pic:"https://cdn.illusionlie.com/img/girls/kaguya_thumb.webp",
            ring3_text:"Place3",
            ring3_link:"#",
            ring3_pic:"https://cdn.illusionlie.com/img/girls/ren_thumb.webp",
            ring4_text:"Place4",
            ring4_link:"#",
            ring4_pic:"https://cdn.illusionlie.com/img/girls/yurugi_thumb.webp",
            ring5_text:"Place5",
            ring5_link:"#",
            ring5_pic:"https://cdn.illusionlie.com/img/girls/neri_thumb.webp",
            ring6_text:"Place6",
            ring6_link:"#",
            ring6_pic:"https://cdn.illusionlie.com/img/girls/ayane_thumb.webp"
        },
        init:function(options) {
            var o = options,
                elements = document.querySelectorAll(this);

            //  创建和获取 overlay
            let galOverlay = document.getElementById('overlay');
            if (!galOverlay) {
                galOverlay = document.createElement('div');
                galOverlay.id = 'overlay';
                galOverlay.style.display = 'none';
                document.body.appendChild(galOverlay);
            }
            
            elements.forEach(function(el) {
                var settings = Object.assign({}, galMenu.defaults, o),
                    menu = document.createElement('div');
                menu.className = "galMenu " + settings.menu;
                el.appendChild(menu);

                var circle = document.createElement('div');
                circle.className = "circle";
                circle.id = "gal";
                menu.appendChild(circle);

                var ring = document.createElement('div');
                ring.className = "ring";
                circle.appendChild(ring);

                // 动态创建 menu items
                for (let i = 1; i <= 6; i++) {
                    var menuItem = document.createElement('a');
                    menuItem.className = "menuItem";
                    menuItem.href = settings[`ring${i}_link`];
                    menuItem.title = settings[`ring${i}_text`];
                    menuItem.textContent = settings[`ring${i}_text`];
                    ring.appendChild(menuItem);
                }

                //  动态设置 menu item 位置
                var items = ring.querySelectorAll(".menuItem");
                for (var i = 0, l = items.length; i < l; i++) {
                    items[i].style.left = (50 - 35 * Math.cos(-.5 * Math.PI - 2 * (1 / l) * i * Math.PI)).toFixed(4) + "%";
                    items[i].style.top = (50 + 35 * Math.sin(-.5 * Math.PI - 2 * (1 / l) * i * Math.PI)).toFixed(4) + "%";
                }

                // 动态创建 <audio> 元素
                let audio = document.createElement('audio');
                audio.id = 'galAudio';
                circle.appendChild(audio);

                // 应用配置到 CSS 变量
                menu.style.setProperty('--ring1-pic', `url('${settings.ring1_pic}')`);
                menu.style.setProperty('--ring2-pic', `url('${settings.ring2_pic}')`);
                menu.style.setProperty('--ring3-pic', `url('${settings.ring3_pic}')`);
                menu.style.setProperty('--ring4-pic', `url('${settings.ring4_pic}')`);
                menu.style.setProperty('--ring5-pic', `url('${settings.ring5_pic}')`);
                menu.style.setProperty('--ring6-pic', `url('${settings.ring6_pic}')`);
                menu.style.setProperty('--font-size', `${settings.font_size}`);

                function galOpen(e) {
                    galMenu.getCoords(e);
                    var top = Coords.clientY - 150,
                        left = document.body === e.target ? Coords.clickX - 150 : Coords.clientX - 150;
                    var bodyHe = document.documentElement.clientHeight;
                    var bodyWi = document.documentElement.clientWidth;
                    if (top < 0) {
                        top = 0;
                    }
                    if (bodyHe - Coords.clientY < 150) {
                        top = bodyHe - 300;
                    }
                    if (left < 0) {
                        left = 0;
                    }
                    if (document.body === e.target) {
                        if (bodyWi - Coords.clickX < 150) {
                            left = bodyWi - 300;
                        }
                    } else {
                        if (bodyWi - Coords.clientX < 150) {
                            left = bodyWi - 300;
                        }
                    }
                    menu.style.top = top + "px";
                    menu.style.left = left + "px";
                    menu.style.display = "block";

                    // 强制浏览器读取样式，触发重绘
                    window.getComputedStyle(menu).opacity;
                    menu.style.transition = 'opacity 0.1s ease-out';
                    menu.style.opacity = 1;


                    var circle = menu.querySelector(".circle");
                    circle.classList.add("open");
                    galOverlay.style.display = "block"; // 显示 overlay
                    menu.style.display = "block";
                    
                    // 设置 audio src 和 控制播放
                    audio.src = settings.audio_url;
                    if (settings.audio_play) {
                        audio.play();
                    }

                }

                function galClose() {
                    var circle = menu.querySelector(".circle");
                    circle.classList.remove("open");
                    galOverlay.style.display = "none";
                    // 使用setTimeout和transition实现动画效果
                    menu.style.opacity = 1;
                    menu.style.transition = 'opacity 0.4s ease-out';
                    menu.style.opacity = 0;
                    setTimeout(function() {
                        menu.style.display = "none";
                        menu.style.transition = ''; // 移除transition属性，避免影响下次显示
                    }, 400);


                    audio.pause();
                    audio.currentTime = 0;
                }

                if (!settings.stay_open) {
                    var menuItems = ring.querySelectorAll("a.menuItem"); // 从 ring 中查询 menuItem
                    menuItems.forEach(function(a) {
                        a.addEventListener("click", function(e) {
                            galClose(e);
                        });
                    });
                }

                el.addEventListener("mousedown", function(e) {
                    if (e.which !== 3 && !galMenu.closest(e.target, ".galMenu") && settings.click_to_close) {
                        galClose(e);
                    }
                });

                el.addEventListener("contextmenu", function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    if (circle.classList.contains("open")) {
                        galClose(e);
                    } else {
                        galOpen(e);
                    }
                });

                el.addEventListener("keyup", function(e) {
                    if (e.keyCode == 27) {
                        if (circle.classList.contains("open")) {
                            galClose(e);
                        }
                    }
                });
            });
        },
        getCoords:function(e) {
            var evt = e ? e :window.event;
            var clickX = 0, clickY = 0;
            if ((evt.clientX || evt.clientY) && document.body && document.body.scrollLeft != null) {
                clickX = evt.clientX + document.body.scrollLeft;
                clickY = evt.clientY + document.body.scrollTop;
            }
            if ((evt.clientX || evt.clientY) && document.compatMode == "CSS1Compat" && document.documentElement && document.documentElement.scrollLeft != null) {
                clickX = evt.clientX + document.documentElement.scrollLeft;
                clickY = evt.clientY + document.documentElement.scrollTop;
            }
            if (evt.pageX || evt.pageY) {
                clickX = evt.pageX;
                clickY = evt.pageY;
            }
            Coords = {
                clickX:clickX,
                clickY:clickY,
                clientX:evt.clientX,
                clientY:evt.clientY,
                screenX:evt.screenX,
                screenY:evt.screenY
            };
            return Coords;
        },
        closest: function(element, selector) {
            if (Element.prototype.closest) {
                return element.closest(selector);
            }
            var el = element;
            while (el) {
                if (el.matches && el.matches(selector)) {
                    return el;
                }
                el = el.parentNode;
            }
            return null;
        }
    };


    window.galMenu = function(selector, method, options) {
        if (galMenu[method]) {
            return galMenu[method].apply(selector, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return galMenu.init.apply(selector, [method || options]);
        } else {
            console.error("⚙️GalMenu: Method " + method + " does not exist");
        }
    };
})();