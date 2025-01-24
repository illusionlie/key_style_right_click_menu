(function() {
    //  动态加载 CSS 样式
    const galStyle = document.getElementById('gal_style'); // 修改点1:  检查 <style id="gal_style"> 是否已存在
    if (!galStyle) {
        const styleElement = document.createElement('style');
        styleElement.id = 'gal_style'; // 修改点2: 设置 style 元素的 id 为 gal_style
        styleElement.innerHTML = `
            @charset "utf-8";
            body,html{margin:0;padding:0;width:100%;height:100%}
            body{font-size:1.4rem;background:#494a5f url() no-repeat fixed;background-size:cover;font-family:"Segoe UI","Lucida Grande",Helvetica,Arial,"Microsoft YaHei",FreeSans,Arimo,"Droid Sans","wenquanyi micro hei","Hiragino Sans GB","Hiragino Sans GB W3",FontAwesome,sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}
            a{text-decoration:none;outline:0}
            .galMenu{margin:0;padding:0;display:none;position:fixed;z-index:999}
            .circle,.ring{height:300px;position:relative;width:300px}
            .circle{margin:0 auto}
            .ring{border-radius:50%;opacity:0;-webkit-transform-origin:50% 50%;-moz-transform-origin:50% 50%;-ms-transform-origin:50% 50%;-o-transform-origin:50% 50%;transform-origin:50% 50%;-webkit-transform:scale(.1) rotate(-270deg);-moz-transform:scale(.1) rotate(-270deg);-ms-transform:scale(.1) rotate(-270deg);-o-transform:scale(.1) rotate(-270deg);transform:scale(.1) rotate(-270deg);-webkit-transition:all .4s ease-out;-moz-transition:all .4s ease-out;-ms-transition:all .4s ease-out;-o-transition:all .4s ease-out;transition:all .4s ease-out}
            .open .ring{opacity:1;-webkit-transform:scale(1) rotate(0);-moz-transform:scale(1) rotate(0);-ms-transform:scale(1) rotate(0);-o-transform:scale(1) rotate(0);transform:scale(1) rotate(0)}
            .open{border-color:#aaa}
            .menuItem{border-radius:50%;color:#eee;display:block;height:80px;line-height:80px;margin-left:-41px;margin-top:-41px;position:absolute;text-align:center;width:80px;background-size:80px;border:2px #b59494 solid;box-shadow:0 0 15px #fff;-webkit-box-shadow:0 0 15px #fff;-moz-box-shadow:0 0 15px #fff}
            .menuItem:hover{box-shadow:inset 0 0 80px #fff;-webkit-box-shadow:inset 0 0 80px #fff;-moz-box-shadow:inset 0 0 80px #fff}
            .ring a:nth-of-type(1){background-image:url(https://cdn.illusionlie.com/img/girls/chieri_thumb.webp)}
            .ring a:nth-of-type(2){background-image:url(https://cdn.illusionlie.com/img/girls/kaguya_thumb.webp)}
            .ring a:nth-of-type(3){background-image:url(https://cdn.illusionlie.com/img/girls/ren_thumb.webp)}
            .ring a:nth-of-type(4){background-image:url(https://cdn.illusionlie.com/img/girls/yurugi_thumb.webp)}
            .ring a:nth-of-type(5){background-image:url(https://cdn.illusionlie.com/img/girls/uena_thumb.webp)}
            .ring a:nth-of-type(6){background-image:url(https://cdn.illusionlie.com/img/girls/ayane_thumb.webp)}
            .ring a{display:inline-block;color:#fff;text-shadow:#DC965A 1px 0 0,#DC965A 0 1px 0,#DC965A -1px 0 0,#DC965A 0 -1px 0;-webkit-text-shadow:#DC965A 1px 0 0,#DC965A 0 1px 0,#DC965A -1px 0 0,#DC965A 0 -1px 0;-moz-text-shadow:#DC965A 1px 0 0,#DC965A 0 1px 0,#DC965A -1px 0 0,#DC965A 0 -1px 0}
            .ring a:hover{text-shadow:#6CF 1px 0 0,#6CF 0 1px 0,#6CF -1px 0 0,#6CF 0 -1px 0;-webkit-text-shadow:#6CF 1px 0 0,#6CF 0 1px 0,#6CF -1px 0 0,#6CF 0 -1px 0;-moz-text-shadow:#6CF 1px 0 0,#6CF 0 1px 0,#6CF -1px 0 0,#6CF 0 -1px 0}
            #overlay{height:100%;position:fixed;width:100%;left:0;top:0;background:url() repeat scroll 0 0 rgba(0,0,0,.5);display:none;z-index:998;} /* 修改点3: 为 overlay 添加 z-index */
        `;
        document.head.appendChild(styleElement);
    }


    var galMenu = {
        defaults:{
            menu:"galRing",
            click_to_close:true,
            stay_open:false
        },
        init:function(options) {
            var o = options,
                audio = document.getElementById("galAudio"),
                elements = document.querySelectorAll(this);

            //  创建和获取 overlay
            let galOverlay = document.getElementById('overlay');
            if (!galOverlay) {
                galOverlay = document.createElement('div');
                galOverlay.id = 'overlay';
                galOverlay.style.display = 'none'; // 初始隐藏，样式由 CSS 控制，这里只需控制 display
                document.body.appendChild(galOverlay);
            }


            elements.forEach(function(el) {
                var settings = Object.assign({}, galMenu.defaults, o),
                    menu = document.querySelector("." + settings.menu);


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
                    audio.play();
                }

                function galClose(e) {
                    var circle = menu.querySelector(".circle");
                    circle.classList.remove("open");
                    galOverlay.style.display = "none"; // 隐藏 overlay
                    // 修改点13: 使用setTimeout和transition实现动画效果
                    menu.style.opacity = 1;
                    menu.style.transition = 'opacity 0.4s ease-out'; // 添加transition属性
                    menu.style.opacity = 0;
                    setTimeout(function() {
                        menu.style.display = "none";
                        menu.style.transition = ''; // 移除transition属性，避免影响下次显示
                    }, 400);


                    audio.pause();
                    audio.currentTime = 0;
                }

                if (!settings.stay_open) {
                    var menuItems = el.querySelectorAll("div.ring > a");
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
                    var galElement = document.getElementById("gal");
                    if (galElement.classList.contains("open")) {
                        galClose(e);
                    } else {
                        galOpen(e);
                    }
                });

                el.addEventListener("keyup", function(e) {
                    if (e.keyCode == 27) {
                        var galElement = document.getElementById("gal");
                        if (galElement.classList.contains("open")) {
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
        var elements = document.querySelectorAll(selector);

        if (galMenu[method]) {
            return galMenu[method].apply(selector, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return galMenu.init.apply(selector, [method || options]);
        } else {
            console.error("Method " + method + " does not exist");
        }
    };

    document.addEventListener('DOMContentLoaded', function() {
        var items = document.querySelectorAll(".menuItem");
        for (var i = 0, l = items.length; i < l; i++) {
            items[i].style.left = (50 - 35 * Math.cos(-.5 * Math.PI - 2 * (1 / l) * i * Math.PI)).toFixed(4) + "%";
            items[i].style.top = (50 + 35 * Math.sin(-.5 * Math.PI - 2 * (1 / l) * i * Math.PI)).toFixed(4) + "%";
        }

        galMenu('body', {
          menu:"galRing",
          click_to_close:true,
          stay_open:false
        });
    });
})();

String.prototype.removeWS = function() {
    return this.toString().replace(/\s/g, "");
};

String.prototype.pF = function() {
    return parseFloat(this);
};

Number.prototype.pF = function() {
    return parseFloat(this);
};