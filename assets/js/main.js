function lightbox(e) {
    document.querySelectorAll(e).forEach(function (e) {
        e.addEventListener("click", function (e) {
            var t = e;
            t.preventDefault();
            for (var n, o = [], i = 0, r = t.target.closest(".kg-card").previousElementSibling; r && (r.classList.contains("kg-image-card") || r.classList.contains("kg-gallery-card")); ) {
                var a = [];
                r.querySelectorAll("img").forEach(function (e) {
                    a.push({ src: e.getAttribute("src"), msrc: e.getAttribute("src"), w: e.getAttribute("width"), h: e.getAttribute("height"), el: e }), (i += 1);
                }),
                    (r = r.previousElementSibling),
                    (o = a.concat(o));
            }
            t.target.classList.contains("kg-image")
                ? o.push({ src: t.target.getAttribute("src"), msrc: t.target.getAttribute("src"), w: t.target.getAttribute("width"), h: t.target.getAttribute("height"), el: t.target })
                : ((n = !1),
                  t.target
                      .closest(".kg-gallery-card")
                      .querySelectorAll("img")
                      .forEach(function (e) {
                          o.push({ src: e.getAttribute("src"), msrc: e.getAttribute("src"), w: e.getAttribute("width"), h: e.getAttribute("height"), el: e }), n || e === t.target ? (n = !0) : (i += 1);
                      }));
            for (var l = t.target.closest(".kg-card").nextElementSibling; l && (l.classList.contains("kg-image-card") || l.classList.contains("kg-gallery-card")); )
                l.querySelectorAll("img").forEach(function (e) {
                    o.push({ src: e.getAttribute("src"), msrc: e.getAttribute("src"), w: e.getAttribute("width"), h: e.getAttribute("height"), el: e });
                }),
                    (l = l.nextElementSibling);
            e = document.querySelectorAll(".pswp")[0];
            new PhotoSwipe(e, PhotoSwipeUI_Default, o, {
                bgOpacity: 0.9,
                closeOnScroll: !0,
                fullscreenEl: !1,
                history: !1,
                index: i,
                shareEl: !1,
                zoomEl: !1,
                getThumbBoundsFn: function (e) {
                    var e = o[e].el,
                        t = window.pageYOffset || document.documentElement.scrollTop,
                        e = e.getBoundingClientRect();
                    return { x: e.left, y: e.top + t, w: e.width };
                },
            }).init();
        });
    });
}
function pagination(u) {
    var d,
        m,
        t,
        n,
        o,
        i,
        r,
        a = document.querySelector(".gh-loadmore"),
        l = document.querySelector("link[rel=next]");
    function p() {
        if (404 === this.status) return window.removeEventListener("scroll", s), window.removeEventListener("resize", c), void a.remove();
        this.response.querySelectorAll(".gh-feed:not(.gh-featured):not(.gh-related) .gh-card").forEach(function (e) {
            d.appendChild(document.importNode(e, !0));
        });
        var e = this.response.querySelector("link[rel=next]");
        e ? (l.href = e.href) : (window.removeEventListener("scroll", s), window.removeEventListener("resize", c), a.remove()), (r = document.documentElement.scrollHeight), (n = t = !1);
    }
    function f() {
        var e;
        n || (u && o + i <= r - m ? (t = !1) : ((n = !0), ((e = new window.XMLHttpRequest()).responseType = "document"), e.addEventListener("load", p), e.open("GET", l.href), e.send(null)));
    }
    function e() {
        t || window.requestAnimationFrame(f), (t = !0);
    }
    function s() {
        (o = window.scrollY), e();
    }
    function c() {
        (i = window.innerHeight), (r = document.documentElement.scrollHeight), e();
    }
    l || !a
        ? (d = document.querySelector(".gh-feed:not(.gh-featured):not(.gh-related)")) &&
          ((n = t = !(m = 300)),
          (o = window.scrollY),
          (i = window.innerHeight),
          (r = document.documentElement.scrollHeight),
          u ? (window.addEventListener("scroll", s, { passive: !0 }), window.addEventListener("resize", c), e()) : a.addEventListener("click", e))
        : a.remove();
}
!(function (e, t) {
    "function" == typeof define && define.amd ? define(t) : "object" == typeof exports ? (module.exports = t()) : (e.PhotoSwipeUI_Default = t());
})(this, function () {
    "use strict";
    return function (o, l) {
        function d(e) {
            if (_) return !0;
            (e = e || window.event), c.timeToIdle && c.mouseUsed && !T && g();
            for (var t, n, o = (e.target || e.srcElement).getAttribute("class") || "", i = 0; i < z.length; i++) (t = z[i]).onTap && -1 < o.indexOf("pswp__" + t.name) && (t.onTap(), (n = !0));
            n &&
                (e.stopPropagation && e.stopPropagation(),
                (_ = !0),
                (e = l.features.isOldAndroid ? 600 : 30),
                setTimeout(function () {
                    _ = !1;
                }, e));
        }
        function m() {
            var e = 1 === c.getNumItemsFn();
            e !== k && (R(s, "ui--one-slide", e), (k = e));
        }
        function p() {
            R(a, "share-modal--hidden", u);
        }
        function f() {
            if (
                ((u = !u)
                    ? (l.removeClass(a, "pswp__share-modal--fade-in"),
                      setTimeout(function () {
                          u && p();
                      }, 300))
                    : (p(),
                      setTimeout(function () {
                          u || l.addClass(a, "pswp__share-modal--fade-in");
                      }, 30)),
                !u)
            ) {
                for (var e, t, n, o, i = "", r = 0; r < c.shareButtons.length; r++)
                    (e = c.shareButtons[r]),
                        (t = c.getImageURLForShare(e)),
                        (n = c.getPageURLForShare(e)),
                        (o = c.getTextForShare(e)),
                        (i +=
                            '<a href="' +
                            e.url.replace("{{url}}", encodeURIComponent(n)).replace("{{image_url}}", encodeURIComponent(t)).replace("{{raw_image_url}}", t).replace("{{text}}", encodeURIComponent(o)) +
                            '" target="_blank" class="pswp__share--' +
                            e.id +
                            '"' +
                            (e.download ? "download" : "") +
                            ">" +
                            e.label +
                            "</a>"),
                        c.parseShareButtonOut && (i = c.parseShareButtonOut(e, i));
                (a.children[0].innerHTML = i), (a.children[0].onclick = P);
            }
        }
        function h(e) {
            for (var t = 0; t < c.closeElClasses.length; t++) if (l.hasClass(e, "pswp__" + c.closeElClasses[t])) return !0;
        }
        function g() {
            clearTimeout(O), (Z = 0), T && i.setIdle(!1);
        }
        function v(e) {
            ((e = (e = e || window.event).relatedTarget || e.toElement) && "HTML" !== e.nodeName) ||
                (clearTimeout(O),
                (O = setTimeout(function () {
                    i.setIdle(!0);
                }, c.timeToIdleOutside)));
        }
        function w(e) {
            A !== e && (R(S, "preloader--active", !e), (A = e));
        }
        function y(e) {
            var t,
                n = e.vGap;
            !o.likelyTouchDevice || c.mouseUsed || screen.width > c.fitControlsWidth
                ? ((t = c.barsSize),
                  c.captionEl && "auto" === t.bottom
                      ? (C || ((C = l.createEl("pswp__caption pswp__caption--fake")).appendChild(l.createEl("pswp__caption__center")), s.insertBefore(C, b), l.addClass(s, "pswp__ui--fit")),
                        c.addCaptionHTMLFn(e, C, !0) ? ((e = C.clientHeight), (n.bottom = parseInt(e, 10) || 44)) : (n.bottom = t.top))
                      : (n.bottom = "auto" === t.bottom ? 0 : t.bottom),
                  (n.top = t.top))
                : (n.top = n.bottom = 0);
        }
        function x() {
            function e(e) {
                if (e)
                    for (var t = e.length, n = 0; n < t; n++) {
                        (i = e[n]), (r = i.className);
                        for (var o = 0; o < z.length; o++) (a = z[o]), -1 < r.indexOf("pswp__" + a.name) && (c[a.option] ? (l.removeClass(i, "pswp__element--disabled"), a.onInit && a.onInit(i)) : l.addClass(i, "pswp__element--disabled"));
                    }
            }
            e(s.children);
            var i,
                r,
                a,
                t = l.getChildByClass(s, "pswp__top-bar");
            t && e(t.children);
        }
        var n,
            s,
            b,
            C,
            t,
            I,
            a,
            E,
            T,
            e,
            S,
            A,
            D,
            k,
            c,
            _,
            M,
            O,
            i = this,
            F = !1,
            r = !0,
            u = !0,
            L = {
                barsSize: { top: 44, bottom: "auto" },
                closeElClasses: ["item", "caption", "zoom-wrap", "ui", "top-bar"],
                timeToIdle: 4e3,
                timeToIdleOutside: 1e3,
                loadingIndicatorDelay: 1e3,
                addCaptionHTMLFn: function (e, t) {
                    return e.title ? ((t.children[0].innerHTML = e.title), !0) : ((t.children[0].innerHTML = ""), !1);
                },
                closeEl: !0,
                captionEl: !0,
                fullscreenEl: !0,
                zoomEl: !0,
                shareEl: !0,
                counterEl: !0,
                arrowEl: !0,
                preloaderEl: !0,
                tapToClose: !1,
                tapToToggleControls: !0,
                clickToCloseNonZoomable: !0,
                shareButtons: [
                    { id: "facebook", label: "Share on Facebook", url: "https://www.facebook.com/sharer/sharer.php?u={{url}}" },
                    { id: "twitter", label: "Tweet", url: "https://twitter.com/intent/tweet?text={{text}}&url={{url}}" },
                    { id: "pinterest", label: "Pin it", url: "http://www.pinterest.com/pin/create/button/?url={{url}}&media={{image_url}}&description={{text}}" },
                    { id: "download", label: "Download image", url: "{{raw_image_url}}", download: !0 },
                ],
                getImageURLForShare: function () {
                    return o.currItem.src || "";
                },
                getPageURLForShare: function () {
                    return window.location.href;
                },
                getTextForShare: function () {
                    return o.currItem.title || "";
                },
                indexIndicatorSep: " / ",
                fitControlsWidth: 1200,
            },
            R = function (e, t, n) {
                l[(n ? "add" : "remove") + "Class"](e, "pswp__" + t);
            },
            P = function (e) {
                var t = (e = e || window.event).target || e.srcElement;
                return (
                    o.shout("shareLinkClick", e, t),
                    !(
                        !t.href ||
                        (!t.hasAttribute("download") &&
                            (window.open(t.href, "pswp_share", "scrollbars=yes,resizable=yes,toolbar=no,location=yes,width=550,height=420,top=100,left=" + (window.screen ? Math.round(screen.width / 2 - 275) : 100)), u || f(), 1))
                    )
                );
            },
            Z = 0,
            z = [
                {
                    name: "caption",
                    option: "captionEl",
                    onInit: function (e) {
                        b = e;
                    },
                },
                {
                    name: "share-modal",
                    option: "shareEl",
                    onInit: function (e) {
                        a = e;
                    },
                    onTap: function () {
                        f();
                    },
                },
                {
                    name: "button--share",
                    option: "shareEl",
                    onInit: function (e) {
                        I = e;
                    },
                    onTap: function () {
                        f();
                    },
                },
                { name: "button--zoom", option: "zoomEl", onTap: o.toggleDesktopZoom },
                {
                    name: "counter",
                    option: "counterEl",
                    onInit: function (e) {
                        t = e;
                    },
                },
                { name: "button--close", option: "closeEl", onTap: o.close },
                { name: "button--arrow--left", option: "arrowEl", onTap: o.prev },
                { name: "button--arrow--right", option: "arrowEl", onTap: o.next },
                {
                    name: "button--fs",
                    option: "fullscreenEl",
                    onTap: function () {
                        n.isFullscreen() ? n.exit() : n.enter();
                    },
                },
                {
                    name: "preloader",
                    option: "preloaderEl",
                    onInit: function (e) {
                        S = e;
                    },
                },
            ];
        (i.init = function () {
            var t;
            l.extend(o.options, L, !0),
                (c = o.options),
                (s = l.getChildByClass(o.scrollWrap, "pswp__ui")),
                (e = o.listen)("onVerticalDrag", function (e) {
                    r && e < 0.95 ? i.hideControls() : !r && 0.95 <= e && i.showControls();
                }),
                e("onPinchClose", function (e) {
                    r && e < 0.9 ? (i.hideControls(), (t = !0)) : t && !r && 0.9 < e && i.showControls();
                }),
                e("zoomGestureEnded", function () {
                    (t = !1) && !r && i.showControls();
                }),
                e("beforeChange", i.update),
                e("doubleTap", function (e) {
                    var t = o.currItem.initialZoomLevel;
                    o.getZoomLevel() !== t ? o.zoomTo(t, e, 333) : o.zoomTo(c.getDoubleTapZoom(!1, o.currItem), e, 333);
                }),
                e("preventDragEvent", function (e, t, n) {
                    var o = e.target || e.srcElement;
                    o && o.getAttribute("class") && -1 < e.type.indexOf("mouse") && (0 < o.getAttribute("class").indexOf("__caption") || /(SMALL|STRONG|EM)/i.test(o.tagName)) && (n.prevent = !1);
                }),
                e("bindEvents", function () {
                    l.bind(s, "pswpTap click", d), l.bind(o.scrollWrap, "pswpTap", i.onGlobalTap), o.likelyTouchDevice || l.bind(o.scrollWrap, "mouseover", i.onMouseOver);
                }),
                e("unbindEvents", function () {
                    u || f(),
                        M && clearInterval(M),
                        l.unbind(document, "mouseout", v),
                        l.unbind(document, "mousemove", g),
                        l.unbind(s, "pswpTap click", d),
                        l.unbind(o.scrollWrap, "pswpTap", i.onGlobalTap),
                        l.unbind(o.scrollWrap, "mouseover", i.onMouseOver),
                        n && (l.unbind(document, n.eventK, i.updateFullscreen), n.isFullscreen() && ((c.hideAnimationDuration = 0), n.exit()), (n = null));
                }),
                e("destroy", function () {
                    c.captionEl && (C && s.removeChild(C), l.removeClass(b, "pswp__caption--empty")), a && (a.children[0].onclick = null), l.removeClass(s, "pswp__ui--over-close"), l.addClass(s, "pswp__ui--hidden"), i.setIdle(!1);
                }),
                c.showAnimationDuration || l.removeClass(s, "pswp__ui--hidden"),
                e("initialZoomIn", function () {
                    c.showAnimationDuration && l.removeClass(s, "pswp__ui--hidden");
                }),
                e("initialZoomOut", function () {
                    l.addClass(s, "pswp__ui--hidden");
                }),
                e("parseVerticalMargin", y),
                x(),
                c.shareEl && I && a && (u = !0),
                m(),
                c.timeToIdle &&
                    e("mouseUsed", function () {
                        l.bind(document, "mousemove", g),
                            l.bind(document, "mouseout", v),
                            (M = setInterval(function () {
                                2 === ++Z && i.setIdle(!0);
                            }, c.timeToIdle / 2));
                    }),
                c.fullscreenEl &&
                    !l.features.isOldAndroid &&
                    ((n = n || i.getFullscreenAPI()) ? (l.bind(document, n.eventK, i.updateFullscreen), i.updateFullscreen(), l.addClass(o.template, "pswp--supports-fs")) : l.removeClass(o.template, "pswp--supports-fs")),
                c.preloaderEl &&
                    (w(!0),
                    e("beforeChange", function () {
                        clearTimeout(D),
                            (D = setTimeout(function () {
                                o.currItem && o.currItem.loading ? (o.allowProgressiveImg() && (!o.currItem.img || o.currItem.img.naturalWidth)) || w(!1) : w(!0);
                            }, c.loadingIndicatorDelay));
                    }),
                    e("imageLoadComplete", function (e, t) {
                        o.currItem === t && w(!0);
                    }));
        }),
            (i.setIdle = function (e) {
                R(s, "ui--idle", (T = e));
            }),
            (i.update = function () {
                (F = !(!r || !o.currItem) && (i.updateIndexIndicator(), c.captionEl && (c.addCaptionHTMLFn(o.currItem, b), R(b, "caption--empty", !o.currItem.title)), !0)), u || f(), m();
            }),
            (i.updateFullscreen = function (e) {
                e &&
                    setTimeout(function () {
                        o.setScrollOffset(0, l.getScrollY());
                    }, 50),
                    l[(n.isFullscreen() ? "add" : "remove") + "Class"](o.template, "pswp--fs");
            }),
            (i.updateIndexIndicator = function () {
                c.counterEl && (t.innerHTML = o.getCurrentIndex() + 1 + c.indexIndicatorSep + c.getNumItemsFn());
            }),
            (i.onGlobalTap = function (e) {
                var t = (e = e || window.event).target || e.srcElement;
                if (!_)
                    if (e.detail && "mouse" === e.detail.pointerType)
                        h(t) ? o.close() : l.hasClass(t, "pswp__img") && (1 === o.getZoomLevel() && o.getZoomLevel() <= o.currItem.fitRatio ? c.clickToCloseNonZoomable && o.close() : o.toggleDesktopZoom(e.detail.releasePoint));
                    else if ((c.tapToToggleControls && (r ? i.hideControls() : i.showControls()), c.tapToClose && (l.hasClass(t, "pswp__img") || h(t)))) return void o.close();
            }),
            (i.onMouseOver = function (e) {
                e = (e = e || window.event).target || e.srcElement;
                R(s, "ui--over-close", h(e));
            }),
            (i.hideControls = function () {
                l.addClass(s, "pswp__ui--hidden"), (r = !1);
            }),
            (i.showControls = function () {
                (r = !0), F || i.update(), l.removeClass(s, "pswp__ui--hidden");
            }),
            (i.supportsFullscreen = function () {
                var e = document;
                return !!(e.exitFullscreen || e.mozCancelFullScreen || e.webkitExitFullscreen || e.msExitFullscreen);
            }),
            (i.getFullscreenAPI = function () {
                var e,
                    t = document.documentElement,
                    n = "fullscreenchange";
                return (
                    t.requestFullscreen
                        ? (e = { enterK: "requestFullscreen", exitK: "exitFullscreen", elementK: "fullscreenElement", eventK: n })
                        : t.mozRequestFullScreen
                        ? (e = { enterK: "mozRequestFullScreen", exitK: "mozCancelFullScreen", elementK: "mozFullScreenElement", eventK: "moz" + n })
                        : t.webkitRequestFullscreen
                        ? (e = { enterK: "webkitRequestFullscreen", exitK: "webkitExitFullscreen", elementK: "webkitFullscreenElement", eventK: "webkit" + n })
                        : t.msRequestFullscreen && (e = { enterK: "msRequestFullscreen", exitK: "msExitFullscreen", elementK: "msFullscreenElement", eventK: "MSFullscreenChange" }),
                    e &&
                        ((e.enter = function () {
                            return (E = c.closeOnScroll), (c.closeOnScroll = !1), "webkitRequestFullscreen" !== this.enterK ? o.template[this.enterK]() : void o.template[this.enterK](Element.ALLOW_KEYBOARD_INPUT);
                        }),
                        (e.exit = function () {
                            return (c.closeOnScroll = E), document[this.exitK]();
                        }),
                        (e.isFullscreen = function () {
                            return document[this.elementK];
                        })),
                    e
                );
            });
    };
}),
    (function (e, t) {
        "function" == typeof define && define.amd ? define(t) : "object" == typeof exports ? (module.exports = t()) : (e.PhotoSwipe = t());
    })(this, function () {
        "use strict";
        return function (m, n, e, t) {
            var p = {
                    features: null,
                    bind: function (e, t, n, o) {
                        var i = (o ? "remove" : "add") + "EventListener";
                        t = t.split(" ");
                        for (var r = 0; r < t.length; r++) t[r] && e[i](t[r], n, !1);
                    },
                    isArray: function (e) {
                        return e instanceof Array;
                    },
                    createEl: function (e, t) {
                        t = document.createElement(t || "div");
                        return e && (t.className = e), t;
                    },
                    getScrollY: function () {
                        var e = window.pageYOffset;
                        return void 0 !== e ? e : document.documentElement.scrollTop;
                    },
                    unbind: function (e, t, n) {
                        p.bind(e, t, n, !0);
                    },
                    removeClass: function (e, t) {
                        t = new RegExp("(\\s|^)" + t + "(\\s|$)");
                        e.className = e.className
                            .replace(t, " ")
                            .replace(/^\s\s*/, "")
                            .replace(/\s\s*$/, "");
                    },
                    addClass: function (e, t) {
                        p.hasClass(e, t) || (e.className += (e.className ? " " : "") + t);
                    },
                    hasClass: function (e, t) {
                        return e.className && new RegExp("(^|\\s)" + t + "(\\s|$)").test(e.className);
                    },
                    getChildByClass: function (e, t) {
                        for (var n = e.firstChild; n; ) {
                            if (p.hasClass(n, t)) return n;
                            n = n.nextSibling;
                        }
                    },
                    arraySearch: function (e, t, n) {
                        for (var o = e.length; o--; ) if (e[o][n] === t) return o;
                        return -1;
                    },
                    extend: function (e, t, n) {
                        for (var o in t)
                            if (t.hasOwnProperty(o)) {
                                if (n && e.hasOwnProperty(o)) continue;
                                e[o] = t[o];
                            }
                    },
                    easing: {
                        sine: {
                            out: function (e) {
                                return Math.sin(e * (Math.PI / 2));
                            },
                            inOut: function (e) {
                                return -(Math.cos(Math.PI * e) - 1) / 2;
                            },
                        },
                        cubic: {
                            out: function (e) {
                                return --e * e * e + 1;
                            },
                        },
                    },
                    detectFeatures: function () {
                        if (p.features) return p.features;
                        var e,
                            t,
                            n = p.createEl().style,
                            o = "",
                            i = {};
                        (i.oldIE = document.all && !document.addEventListener),
                            (i.touch = "ontouchstart" in window),
                            window.requestAnimationFrame && ((i.raf = window.requestAnimationFrame), (i.caf = window.cancelAnimationFrame)),
                            (i.pointerEvent = !!window.PointerEvent || navigator.msPointerEnabled),
                            i.pointerEvent ||
                                ((e = navigator.userAgent),
                                !/iP(hone|od)/.test(navigator.platform) || ((t = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/)) && 0 < t.length && 1 <= (t = parseInt(t[1], 10)) && t < 8 && (i.isOldIOSPhone = !0)),
                                (t = (t = e.match(/Android\s([0-9\.]*)/)) ? t[1] : 0),
                                1 <= (t = parseFloat(t)) && (t < 4.4 && (i.isOldAndroid = !0), (i.androidVersion = t)),
                                (i.isMobileOpera = /opera mini|opera mobi/i.test(e)));
                        for (var r, a, l, u = ["transform", "perspective", "animationName"], d = ["", "webkit", "Moz", "ms", "O"], s = 0; s < 4; s++) {
                            for (var o = d[s], c = 0; c < 3; c++) (r = u[c]), (a = o + (o ? r.charAt(0).toUpperCase() + r.slice(1) : r)), !i[r] && a in n && (i[r] = a);
                            o && !i.raf && ((o = o.toLowerCase()), (i.raf = window[o + "RequestAnimationFrame"]), i.raf && (i.caf = window[o + "CancelAnimationFrame"] || window[o + "CancelRequestAnimationFrame"]));
                        }
                        return (
                            i.raf ||
                                ((l = 0),
                                (i.raf = function (e) {
                                    var t = new Date().getTime(),
                                        n = Math.max(0, 16 - (t - l)),
                                        o = window.setTimeout(function () {
                                            e(t + n);
                                        }, n);
                                    return (l = t + n), o;
                                }),
                                (i.caf = function (e) {
                                    clearTimeout(e);
                                })),
                            (i.svg = !!document.createElementNS && !!document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect),
                            (p.features = i)
                        );
                    },
                },
                f =
                    (p.detectFeatures(),
                    p.features.oldIE &&
                        (p.bind = function (e, t, n, o) {
                            t = t.split(" ");
                            for (
                                var i,
                                    r = (o ? "detach" : "attach") + "Event",
                                    a = function () {
                                        n.handleEvent.call(n);
                                    },
                                    l = 0;
                                l < t.length;
                                l++
                            )
                                if ((i = t[l]))
                                    if ("object" == typeof n && n.handleEvent) {
                                        if (o) {
                                            if (!n["oldIE" + i]) return !1;
                                        } else n["oldIE" + i] = a;
                                        e[r]("on" + i, n["oldIE" + i]);
                                    } else e[r]("on" + i, n);
                        }),
                    this),
                r = 25,
                h = {
                    allowPanToNext: !0,
                    spacing: 0.12,
                    bgOpacity: 1,
                    mouseUsed: !1,
                    loop: !0,
                    pinchToClose: !0,
                    closeOnScroll: !0,
                    closeOnVerticalDrag: !0,
                    verticalDragRange: 0.75,
                    hideAnimationDuration: 333,
                    showAnimationDuration: 333,
                    showHideOpacity: !1,
                    focus: !0,
                    escKey: !0,
                    arrowKeys: !0,
                    mainScrollEndFriction: 0.35,
                    panEndFriction: 0.35,
                    isClickableElement: function (e) {
                        return "A" === e.tagName;
                    },
                    getDoubleTapZoom: function (e, t) {
                        return e || t.initialZoomLevel < 0.7 ? 1 : 1.33;
                    },
                    maxSpreadZoom: 1.33,
                    modal: !0,
                    scaleMode: "fit",
                };
            p.extend(h, t);
            function o() {
                return { x: 0, y: 0 };
            }
            function i(e, t) {
                p.extend(f, t.publicMethods), Me.push(e);
            }
            function l(e) {
                var t = jt();
                return t - 1 < e ? e - t : e < 0 ? t + e : e;
            }
            function s(e, t) {
                return Le[e] || (Le[e] = []), Le[e].push(t);
            }
            function c(e, t, n, o) {
                return o === f.currItem.initialZoomLevel ? ((n[e] = f.currItem.initialPosition[e]), !0) : ((n[e] = Ke(e, o)), n[e] > t.min[e] ? ((n[e] = t.min[e]), !0) : n[e] < t.max[e] && ((n[e] = t.max[e]), !0));
            }
            function d(e) {
                var t = "";
                h.escKey && 27 === e.keyCode ? (t = "close") : h.arrowKeys && (37 === e.keyCode ? (t = "prev") : 39 === e.keyCode && (t = "next")),
                    t && (e.ctrlKey || e.altKey || e.shiftKey || e.metaKey || (e.preventDefault ? e.preventDefault() : (e.returnValue = !1), f[t]()));
            }
            function x(e) {
                e && (ce || se || ge || ie) && (e.preventDefault(), e.stopPropagation());
            }
            function b() {
                f.setScrollOffset(0, p.getScrollY());
            }
            function C(e) {
                var t;
                ("mousedown" === e.type && 0 < e.button) ||
                    (Vt
                        ? e.preventDefault()
                        : (re && "mousedown" === e.type) ||
                          (St(e, !0) && e.preventDefault(),
                          y("pointerDown"),
                          W && ((t = p.arraySearch(ct, e.pointerId, "id")) < 0 && (t = ct.length), (ct[t] = { x: e.pageX, y: e.pageY, id: e.pointerId })),
                          (e = (t = Lt(e)).length),
                          (me = null),
                          et(),
                          (ae && 1 !== e) ||
                              ((ae = we = !0),
                              p.bind(window, _, f),
                              (oe = be = ye = ie = de = ce = le = se = !1),
                              (ve = null),
                              y("firstTouchStart", t),
                              qe(Ee, w),
                              (Ie.x = Ie.y = 0),
                              qe(lt, t[0]),
                              qe(st, lt),
                              (ut.x = De.x * Se),
                              (dt = [{ x: lt.x, y: lt.y }]),
                              (te = ee = Re()),
                              Ge(v, !0),
                              bt(),
                              Ct()),
                          !pe &&
                              1 < e &&
                              !ge &&
                              !de &&
                              ((F = v), (pe = le = !(se = !1)), (Ie.y = Ie.x = 0), qe(Ee, w), qe(it, t[0]), qe(rt, t[1]), Dt(it, rt, wt), (vt.x = Math.abs(wt.x) - w.x), (vt.y = Math.abs(wt.y) - w.y), (fe = xt(it, rt)))));
            }
            function I(e) {
                var t;
                e.preventDefault(),
                    W && -1 < (t = p.arraySearch(ct, e.pointerId, "id")) && (((t = ct[t]).x = e.pageX), (t.y = e.pageY)),
                    ae && ((t = Lt(e)), ve || ce || pe ? (me = t) : gt.x !== De.x * Se ? (ve = "h") : ((e = Math.abs(t[0].x - lt.x) - Math.abs(t[0].y - lt.y)), Math.abs(e) >= ot && ((ve = 0 < e ? "h" : "v"), (me = t))));
            }
            function E(e) {
                if (a.isOldAndroid) {
                    if (re && "mouseup" === e.type) return;
                    -1 < e.type.indexOf("touch") &&
                        (clearTimeout(re),
                        (re = setTimeout(function () {
                            re = 0;
                        }, 600)));
                }
                var t;
                y("pointerUp"),
                    St(e, !1) && e.preventDefault(),
                    !W ||
                        (-1 < (r = p.arraySearch(ct, e.pointerId, "id")) &&
                            ((t = ct.splice(r, 1)[0]), navigator.msPointerEnabled ? ((t.type = { 4: "mouse", 2: "touch", 3: "pen" }[e.pointerType]), t.type || (t.type = e.pointerType || "mouse")) : (t.type = e.pointerType || "mouse")));
                var n = (r = Lt(e)).length;
                if (2 === (n = "mouseup" === e.type ? 0 : n)) return !(me = null);
                1 === n && qe(st, r[0]),
                    0 !== n ||
                        ve ||
                        ge ||
                        (t || ("mouseup" === e.type ? (t = { x: e.pageX, y: e.pageY, type: "mouse" }) : e.changedTouches && e.changedTouches[0] && (t = { x: e.changedTouches[0].pageX, y: e.changedTouches[0].pageY, type: "touch" })),
                        y("touchRelease", e, t));
                var o,
                    i,
                    r = -1;
                if (
                    (0 === n && ((ae = !1), p.unbind(window, _, f), bt(), pe ? (r = 0) : -1 !== ht && (r = Re() - ht)),
                    (ht = 1 === n ? Re() : -1),
                    (e = -1 !== r && r < 150 ? "zoom" : "swipe"),
                    pe && n < 2 && ((pe = !1), 1 === n && (e = "zoomPointerUp"), y("zoomGestureEnded")),
                    (me = null),
                    ce || se || ge || ie)
                )
                    if ((et(), (ne = ne || Zt()).calculateSwipeSpeed("x"), ie))
                        _t() < h.verticalDragRange
                            ? f.close()
                            : ((o = w.y),
                              (i = xe),
                              tt("verticalDrag", 0, 1, 300, p.easing.cubic.out, function (e) {
                                  (w.y = (f.currItem.initialPosition.y - o) * e + o), Pe((1 - i) * e + i), ze();
                              }),
                              y("onVerticalDrag", 1));
                    else {
                        if ((de || ge) && 0 === n) {
                            if (Nt(e, ne)) return;
                            e = "zoomPointerUp";
                        }
                        if (!ge) return "swipe" !== e ? void Ht() : void (!de && v > f.currItem.fitRatio && zt(ne));
                    }
            }
            var T,
                S,
                A,
                g,
                D,
                k,
                _,
                M,
                O,
                v,
                F,
                L,
                R,
                P,
                Z,
                z,
                N,
                U,
                H,
                K,
                q,
                B,
                W,
                Y,
                G,
                V,
                X,
                j,
                $,
                J,
                a,
                Q,
                ee,
                te,
                ne,
                oe,
                ie,
                re,
                ae,
                le,
                se,
                ce,
                ue,
                de,
                me,
                pe,
                fe,
                u,
                he,
                ge,
                ve,
                we,
                ye,
                xe,
                be,
                Ce,
                Ie = o(),
                Ee = o(),
                w = o(),
                Te = {},
                Se = 0,
                Ae = {},
                De = o(),
                ke = 0,
                _e = !0,
                Me = [],
                Oe = {},
                Fe = !1,
                Le = {},
                y = function (e) {
                    var t = Le[e];
                    if (t) {
                        var n = Array.prototype.slice.call(arguments);
                        n.shift();
                        for (var o = 0; o < t.length; o++) t[o].apply(f, n);
                    }
                },
                Re = function () {
                    return new Date().getTime();
                },
                Pe = function (e) {
                    (xe = e), (f.bg.style.opacity = e * h.bgOpacity);
                },
                Ze = function (e, t, n, o, i) {
                    (!Fe || (i && i !== f.currItem)) && (o /= (i || f.currItem).fitRatio), (e[B] = L + t + "px, " + n + "px" + R + " scale(" + o + ")");
                },
                ze = function (e) {
                    he && (e && (v > f.currItem.fitRatio ? Fe || (an(f.currItem, !1, !0), (Fe = !0)) : Fe && (an(f.currItem), (Fe = !1))), Ze(he, w.x, w.y, v));
                },
                Ne = function (e) {
                    e.container && Ze(e.container.style, e.initialPosition.x, e.initialPosition.y, e.initialZoomLevel, e);
                },
                Ue = function (e, t) {
                    t[B] = L + e + "px, 0px" + R;
                },
                He = function (e, t) {
                    var n;
                    !h.loop && t && ((t = g + (De.x * Se - e) / De.x), (n = Math.round(e - gt.x)), ((t < 0 && 0 < n) || (t >= jt() - 1 && n < 0)) && (e = gt.x + n * h.mainScrollEndFriction)), (gt.x = e), Ue(e, D);
                },
                Ke = function (e, t) {
                    var n = vt[e] - Ae[e];
                    return Ee[e] + Ie[e] + n - (t / F) * n;
                },
                qe = function (e, t) {
                    (e.x = t.x), (e.y = t.y), t.id && (e.id = t.id);
                },
                Be = function (e) {
                    (e.x = Math.round(e.x)), (e.y = Math.round(e.y));
                },
                We = null,
                Ye = function () {
                    We && (p.unbind(document, "mousemove", Ye), p.addClass(m, "pswp--has_mouse"), (h.mouseUsed = !0), y("mouseUsed")),
                        (We = setTimeout(function () {
                            We = null;
                        }, 100));
                },
                Ge = function (e, t) {
                    e = on(f.currItem, Te, e);
                    return t && (u = e), e;
                },
                Ve = function (e) {
                    return (e = e || f.currItem).initialZoomLevel;
                },
                Xe = function (e) {
                    return 0 < (e = e || f.currItem).w ? h.maxSpreadZoom : 1;
                },
                je = {},
                $e = 0,
                Je = function (e) {
                    je[e] && (je[e].raf && V(je[e].raf), $e--, delete je[e]);
                },
                Qe = function (e) {
                    je[e] && Je(e), je[e] || ($e++, (je[e] = {}));
                },
                et = function () {
                    for (var e in je) je.hasOwnProperty(e) && Je(e);
                },
                tt = function (e, t, n, o, i, r, a) {
                    function l() {
                        if (je[e]) {
                            if (((s = Re() - c), o <= s)) return Je(e), r(n), void (a && a());
                            r((n - t) * i(s / o) + t), (je[e].raf = G(l));
                        }
                    }
                    var s,
                        c = Re();
                    Qe(e);
                    l();
                },
                t = {
                    shout: y,
                    listen: s,
                    viewportSize: Te,
                    options: h,
                    isMainScrollAnimating: function () {
                        return ge;
                    },
                    getZoomLevel: function () {
                        return v;
                    },
                    getCurrentIndex: function () {
                        return g;
                    },
                    isDragging: function () {
                        return ae;
                    },
                    isZooming: function () {
                        return pe;
                    },
                    setScrollOffset: function (e, t) {
                        (Ae.x = e), (J = Ae.y = t), y("updateScrollOffset", Ae);
                    },
                    applyZoomPan: function (e, t, n, o) {
                        (w.x = t), (w.y = n), (v = e), ze(o);
                    },
                    init: function () {
                        if (!T && !S) {
                            (f.framework = p),
                                (f.template = m),
                                (f.bg = p.getChildByClass(m, "pswp__bg")),
                                (X = m.className),
                                (T = !0),
                                (a = p.detectFeatures()),
                                (G = a.raf),
                                (V = a.caf),
                                (B = a.transform),
                                ($ = a.oldIE),
                                (f.scrollWrap = p.getChildByClass(m, "pswp__scroll-wrap")),
                                (f.container = p.getChildByClass(f.scrollWrap, "pswp__container")),
                                (D = f.container.style),
                                (f.itemHolders = z = [
                                    { el: f.container.children[0], wrap: 0, index: -1 },
                                    { el: f.container.children[1], wrap: 0, index: -1 },
                                    { el: f.container.children[2], wrap: 0, index: -1 },
                                ]),
                                (z[0].el.style.display = z[2].el.style.display = "none"),
                                (function () {
                                    var e;
                                    if (B) return (e = a.perspective && !Y), (L = "translate" + (e ? "3d(" : "(")), (R = a.perspective ? ", 0px)" : ")");
                                    (B = "left"),
                                        p.addClass(m, "pswp--ie"),
                                        (Ue = function (e, t) {
                                            t.left = e + "px";
                                        }),
                                        (Ne = function (e) {
                                            var t = 1 < e.fitRatio ? 1 : e.fitRatio,
                                                n = e.container.style,
                                                o = t * e.w,
                                                t = t * e.h;
                                            (n.width = o + "px"), (n.height = t + "px"), (n.left = e.initialPosition.x + "px"), (n.top = e.initialPosition.y + "px");
                                        }),
                                        (ze = function () {
                                            var e, t, n, o;
                                            he && ((e = he), (n = (o = 1 < (t = f.currItem).fitRatio ? 1 : t.fitRatio) * t.w), (o = o * t.h), (e.width = n + "px"), (e.height = o + "px"), (e.left = w.x + "px"), (e.top = w.y + "px"));
                                        });
                                })(),
                                (O = {
                                    resize: f.updateSize,
                                    orientationchange: function () {
                                        clearTimeout(Q),
                                            (Q = setTimeout(function () {
                                                Te.x !== f.scrollWrap.clientWidth && f.updateSize();
                                            }, 500));
                                    },
                                    scroll: b,
                                    keydown: d,
                                    click: x,
                                });
                            var e,
                                t = a.isOldIOSPhone || a.isOldAndroid || a.isMobileOpera;
                            for ((a.animationName && a.transform && !t) || (h.showAnimationDuration = h.hideAnimationDuration = 0), e = 0; e < Me.length; e++) f["init" + Me[e]]();
                            n && (f.ui = new n(f, p)).init(),
                                y("firstUpdate"),
                                (g = g || h.index || 0),
                                (isNaN(g) || g < 0 || g >= jt()) && (g = 0),
                                (f.currItem = Xt(g)),
                                (a.isOldIOSPhone || a.isOldAndroid) && (_e = !1),
                                m.setAttribute("aria-hidden", "false"),
                                h.modal && (_e ? (m.style.position = "fixed") : ((m.style.position = "absolute"), (m.style.top = p.getScrollY() + "px"))),
                                void 0 === J && (y("initialLayout"), (J = j = p.getScrollY()));
                            t = "pswp--open ";
                            for (
                                h.mainClass && (t += h.mainClass + " "),
                                    h.showHideOpacity && (t += "pswp--animate_opacity "),
                                    t = (t = (t += Y ? "pswp--touch" : "pswp--notouch") + (a.animationName ? " pswp--css_animation" : "")) + (a.svg ? " pswp--svg" : ""),
                                    p.addClass(m, t),
                                    f.updateSize(),
                                    k = -1,
                                    ke = null,
                                    e = 0;
                                e < 3;
                                e++
                            )
                                Ue((e + k) * De.x, z[e].el.style);
                            $ || p.bind(f.scrollWrap, M, f),
                                s("initialZoomInEnd", function () {
                                    f.setContent(z[0], g - 1),
                                        f.setContent(z[2], g + 1),
                                        (z[0].el.style.display = z[2].el.style.display = "block"),
                                        h.focus && m.focus(),
                                        p.bind(document, "keydown", f),
                                        a.transform && p.bind(f.scrollWrap, "click", f),
                                        h.mouseUsed || p.bind(document, "mousemove", Ye),
                                        p.bind(window, "resize scroll orientationchange", f),
                                        y("bindEvents");
                                }),
                                f.setContent(z[1], g),
                                f.updateCurrItem(),
                                y("afterInit"),
                                _e ||
                                    (P = setInterval(function () {
                                        $e || ae || pe || v !== f.currItem.initialZoomLevel || f.updateSize();
                                    }, 1e3)),
                                p.addClass(m, "pswp--visible");
                        }
                    },
                    close: function () {
                        T &&
                            ((S = !(T = !1)),
                            y("close"),
                            p.unbind(window, "resize scroll orientationchange", f),
                            p.unbind(window, "scroll", O.scroll),
                            p.unbind(document, "keydown", f),
                            p.unbind(document, "mousemove", Ye),
                            a.transform && p.unbind(f.scrollWrap, "click", f),
                            ae && p.unbind(window, _, f),
                            clearTimeout(Q),
                            y("unbindEvents"),
                            $t(f.currItem, null, !0, f.destroy));
                    },
                    destroy: function () {
                        y("destroy"), Wt && clearTimeout(Wt), m.setAttribute("aria-hidden", "true"), (m.className = X), P && clearInterval(P), p.unbind(f.scrollWrap, M, f), p.unbind(window, "scroll", f), bt(), et(), (Le = null);
                    },
                    panTo: function (e, t, n) {
                        n || (e > u.min.x ? (e = u.min.x) : e < u.max.x && (e = u.max.x), t > u.min.y ? (t = u.min.y) : t < u.max.y && (t = u.max.y)), (w.x = e), (w.y = t), ze();
                    },
                    handleEvent: function (e) {
                        (e = e || window.event), O[e.type] && O[e.type](e);
                    },
                    goTo: function (e) {
                        var t = (e = l(e)) - g;
                        (ke = t), (g = e), (f.currItem = Xt(g)), (Se -= t), He(De.x * Se), et(), (ge = !1), f.updateCurrItem();
                    },
                    next: function () {
                        f.goTo(g + 1);
                    },
                    prev: function () {
                        f.goTo(g - 1);
                    },
                    updateCurrZoomItem: function (e) {
                        var t;
                        e && y("beforeChange", 0),
                            (he = z[1].el.children.length ? ((t = z[1].el.children[0]), p.hasClass(t, "pswp__zoom-wrap") ? t.style : null) : null),
                            (u = f.currItem.bounds),
                            (F = v = f.currItem.initialZoomLevel),
                            (w.x = u.center.x),
                            (w.y = u.center.y),
                            e && y("afterChange");
                    },
                    invalidateCurrItems: function () {
                        Z = !0;
                        for (var e = 0; e < 3; e++) z[e].item && (z[e].item.needsUpdate = !0);
                    },
                    updateCurrItem: function (e) {
                        if (0 !== ke) {
                            var t,
                                n = Math.abs(ke);
                            if (!(e && n < 2)) {
                                (f.currItem = Xt(g)), (Fe = !1), y("beforeChange", ke), 3 <= n && ((k += ke + (0 < ke ? -3 : 3)), (n = 3));
                                for (var o = 0; o < n; o++)
                                    0 < ke
                                        ? ((t = z.shift()), (z[2] = t), Ue((++k + 2) * De.x, t.el.style), f.setContent(t, g - n + o + 1 + 1))
                                        : ((t = z.pop()), z.unshift(t), Ue(--k * De.x, t.el.style), f.setContent(t, g + n - o - 1 - 1));
                                !he || 1 !== Math.abs(ke) || ((e = Xt(N)).initialZoomLevel !== v && (on(e, Te), an(e), Ne(e))), (ke = 0), f.updateCurrZoomItem(), (N = g), y("afterChange");
                            }
                        }
                    },
                    updateSize: function (e) {
                        if (!_e && h.modal) {
                            var t = p.getScrollY();
                            if ((J !== t && ((m.style.top = t + "px"), (J = t)), !e && Oe.x === window.innerWidth && Oe.y === window.innerHeight)) return;
                            (Oe.x = window.innerWidth), (Oe.y = window.innerHeight), (m.style.height = Oe.y + "px");
                        }
                        if (((Te.x = f.scrollWrap.clientWidth), (Te.y = f.scrollWrap.clientHeight), b(), (De.x = Te.x + Math.round(Te.x * h.spacing)), (De.y = Te.y), He(De.x * Se), y("beforeResize"), void 0 !== k)) {
                            for (var n, o, i, r = 0; r < 3; r++)
                                (n = z[r]),
                                    Ue((r + k) * De.x, n.el.style),
                                    (i = g + r - 1),
                                    h.loop && 2 < jt() && (i = l(i)),
                                    (o = Xt(i)) && (Z || o.needsUpdate || !o.bounds)
                                        ? (f.cleanSlide(o), f.setContent(n, i), 1 === r && ((f.currItem = o), f.updateCurrZoomItem(!0)), (o.needsUpdate = !1))
                                        : -1 === n.index && 0 <= i && f.setContent(n, i),
                                    o && o.container && (on(o, Te), an(o), Ne(o));
                            Z = !1;
                        }
                        (F = v = f.currItem.initialZoomLevel), (u = f.currItem.bounds) && ((w.x = u.center.x), (w.y = u.center.y), ze(!0)), y("resize");
                    },
                    zoomTo: function (t, e, n, o, i) {
                        e && ((F = v), (vt.x = Math.abs(e.x) - w.x), (vt.y = Math.abs(e.y) - w.y), qe(Ee, w));
                        function r(e) {
                            1 === e ? ((v = t), (w.x = a.x), (w.y = a.y)) : ((v = (t - l) * e + l), (w.x = (a.x - s.x) * e + s.x), (w.y = (a.y - s.y) * e + s.y)), i && i(e), ze(1 === e);
                        }
                        var e = Ge(t, !1),
                            a = {},
                            l = (c("x", e, a, t), c("y", e, a, t), v),
                            s = { x: w.x, y: w.y };
                        Be(a);
                        n ? tt("customZoomTo", 0, 1, n, o || p.easing.sine.inOut, r) : r(1);
                    },
                },
                nt = 30,
                ot = 10,
                it = {},
                rt = {},
                at = {},
                lt = {},
                st = {},
                ct = [],
                ut = {},
                dt = [],
                mt = {},
                pt = 0,
                ft = o(),
                ht = 0,
                gt = o(),
                vt = o(),
                wt = o(),
                yt = function (e, t) {
                    return e.x === t.x && e.y === t.y;
                },
                xt = function (e, t) {
                    return (mt.x = Math.abs(e.x - t.x)), (mt.y = Math.abs(e.y - t.y)), Math.sqrt(mt.x * mt.x + mt.y * mt.y);
                },
                bt = function () {
                    ue && (V(ue), (ue = null));
                },
                Ct = function () {
                    ae && ((ue = G(Ct)), Pt());
                },
                It = function () {
                    return !("fit" === h.scaleMode && v === f.currItem.initialZoomLevel);
                },
                Et = function (e, t) {
                    return !(!e || e === document) && !(e.getAttribute("class") && -1 < e.getAttribute("class").indexOf("pswp__scroll-wrap")) && (t(e) ? e : Et(e.parentNode, t));
                },
                Tt = {},
                St = function (e, t) {
                    return (Tt.prevent = !Et(e.target, h.isClickableElement)), y("preventDragEvent", e, t, Tt), Tt.prevent;
                },
                At = function (e, t) {
                    return (t.x = e.pageX), (t.y = e.pageY), (t.id = e.identifier), t;
                },
                Dt = function (e, t, n) {
                    (n.x = 0.5 * (e.x + t.x)), (n.y = 0.5 * (e.y + t.y));
                },
                kt = function (e, t, n) {
                    var o;
                    50 < e - te && (((o = 2 < dt.length ? dt.shift() : {}).x = t), (o.y = n), dt.push(o), (te = e));
                },
                _t = function () {
                    var e = w.y - f.currItem.initialPosition.y;
                    return 1 - Math.abs(e / (Te.y / 2));
                },
                Mt = {},
                Ot = {},
                Ft = [],
                Lt = function (e) {
                    for (; 0 < Ft.length; ) Ft.pop();
                    return (
                        W
                            ? ((Ce = 0),
                              ct.forEach(function (e) {
                                  0 === Ce ? (Ft[0] = e) : 1 === Ce && (Ft[1] = e), Ce++;
                              }))
                            : -1 < e.type.indexOf("touch")
                            ? e.touches && 0 < e.touches.length && ((Ft[0] = At(e.touches[0], Mt)), 1 < e.touches.length && (Ft[1] = At(e.touches[1], Ot)))
                            : ((Mt.x = e.pageX), (Mt.y = e.pageY), (Mt.id = ""), (Ft[0] = Mt)),
                        Ft
                    );
                },
                Rt = function (e, t) {
                    var n,
                        o,
                        i,
                        r = w[e] + t[e],
                        a = 0 < t[e],
                        l = gt.x + t.x,
                        s = gt.x - ut.x,
                        c = r > u.min[e] || r < u.max[e] ? h.panEndFriction : 1,
                        r = w[e] + t[e] * c;
                    return (!h.allowPanToNext && v !== f.currItem.initialZoomLevel) ||
                        (he
                            ? "h" !== ve ||
                              "x" !== e ||
                              se ||
                              (a
                                  ? (r > u.min[e] && ((c = h.panEndFriction), u.min[e], (n = u.min[e] - Ee[e])), (n <= 0 || s < 0) && 1 < jt() ? ((i = l), s < 0 && l > ut.x && (i = ut.x)) : u.min.x !== u.max.x && (o = r))
                                  : (r < u.max[e] && ((c = h.panEndFriction), u.max[e], (n = Ee[e] - u.max[e])), (n <= 0 || 0 < s) && 1 < jt() ? ((i = l), 0 < s && l < ut.x && (i = ut.x)) : u.min.x !== u.max.x && (o = r)))
                            : (i = l),
                        "x" !== e)
                        ? void (ge || de || (v > f.currItem.fitRatio && (w[e] += t[e] * c)))
                        : (void 0 !== i && (He(i, !0), (de = i !== ut.x)), u.min.x !== u.max.x && (void 0 !== o ? (w.x = o) : de || (w.x += t.x * c)), void 0 !== i);
                },
                Pt = function () {
                    if (me) {
                        var e,
                            t,
                            n,
                            o,
                            i,
                            r = me.length;
                        if (0 !== r)
                            if ((qe(it, me[0]), (at.x = it.x - lt.x), (at.y = it.y - lt.y), pe && 1 < r))
                                (lt.x = it.x),
                                    (lt.y = it.y),
                                    (!at.x && !at.y && yt(me[1], rt)) ||
                                        (qe(rt, me[1]),
                                        se || ((se = !0), y("zoomGestureStarted")),
                                        (r = xt(it, rt)),
                                        (e = Ut(r)) > f.currItem.initialZoomLevel + f.currItem.initialZoomLevel / 15 && (be = !0),
                                        (t = 1),
                                        (n = Ve()),
                                        (o = Xe()),
                                        e < n
                                            ? h.pinchToClose && !be && F <= f.currItem.initialZoomLevel
                                                ? (Pe((i = 1 - (n - e) / (n / 1.2))), y("onPinchClose", i), (ye = !0))
                                                : (e = n - (t = 1 < (t = (n - e) / n) ? 1 : t) * (n / 3))
                                            : o < e && (e = o + (t = 1 < (t = (e - o) / (6 * n)) ? 1 : t) * n),
                                        t < 0 && (t = 0),
                                        Dt(it, rt, ft),
                                        (Ie.x += ft.x - wt.x),
                                        (Ie.y += ft.y - wt.y),
                                        qe(wt, ft),
                                        (w.x = Ke("x", e)),
                                        (w.y = Ke("y", e)),
                                        (oe = v < e),
                                        (v = e),
                                        ze());
                            else if (ve && (we && ((we = !1), Math.abs(at.x) >= ot && (at.x -= me[0].x - st.x), Math.abs(at.y) >= ot && (at.y -= me[0].y - st.y)), (lt.x = it.x), (lt.y = it.y), 0 !== at.x || 0 !== at.y)) {
                                if ("v" === ve && h.closeOnVerticalDrag && !It()) return (Ie.y += at.y), (w.y += at.y), (i = _t()), (ie = !0), y("onVerticalDrag", i), Pe(i), void ze();
                                kt(Re(), it.x, it.y), (ce = !0), (u = f.currItem.bounds), Rt("x", at) || (Rt("y", at), Be(w), ze());
                            }
                    }
                },
                Zt = function () {
                    var t,
                        n,
                        o = {
                            lastFlickOffset: {},
                            lastFlickDist: {},
                            lastFlickSpeed: {},
                            slowDownRatio: {},
                            slowDownRatioReverse: {},
                            speedDecelerationRatio: {},
                            speedDecelerationRatioAbs: {},
                            distanceOffset: {},
                            backAnimDestination: {},
                            backAnimStarted: {},
                            calculateSwipeSpeed: function (e) {
                                (n = 1 < dt.length ? ((t = Re() - te + 50), dt[dt.length - 2][e]) : ((t = Re() - ee), st[e])),
                                    (o.lastFlickOffset[e] = lt[e] - n),
                                    (o.lastFlickDist[e] = Math.abs(o.lastFlickOffset[e])),
                                    20 < o.lastFlickDist[e] ? (o.lastFlickSpeed[e] = o.lastFlickOffset[e] / t) : (o.lastFlickSpeed[e] = 0),
                                    Math.abs(o.lastFlickSpeed[e]) < 0.1 && (o.lastFlickSpeed[e] = 0),
                                    (o.slowDownRatio[e] = 0.95),
                                    (o.slowDownRatioReverse[e] = 1 - o.slowDownRatio[e]),
                                    (o.speedDecelerationRatio[e] = 1);
                            },
                            calculateOverBoundsAnimOffset: function (t, e) {
                                o.backAnimStarted[t] ||
                                    (w[t] > u.min[t] ? (o.backAnimDestination[t] = u.min[t]) : w[t] < u.max[t] && (o.backAnimDestination[t] = u.max[t]),
                                    void 0 !== o.backAnimDestination[t] &&
                                        ((o.slowDownRatio[t] = 0.7),
                                        (o.slowDownRatioReverse[t] = 1 - o.slowDownRatio[t]),
                                        o.speedDecelerationRatioAbs[t] < 0.05 &&
                                            ((o.lastFlickSpeed[t] = 0),
                                            (o.backAnimStarted[t] = !0),
                                            tt("bounceZoomPan" + t, w[t], o.backAnimDestination[t], e || 300, p.easing.sine.out, function (e) {
                                                (w[t] = e), ze();
                                            }))));
                            },
                            calculateAnimOffset: function (e) {
                                o.backAnimStarted[e] ||
                                    ((o.speedDecelerationRatio[e] = o.speedDecelerationRatio[e] * (o.slowDownRatio[e] + o.slowDownRatioReverse[e] - (o.slowDownRatioReverse[e] * o.timeDiff) / 10)),
                                    (o.speedDecelerationRatioAbs[e] = Math.abs(o.lastFlickSpeed[e] * o.speedDecelerationRatio[e])),
                                    (o.distanceOffset[e] = o.lastFlickSpeed[e] * o.speedDecelerationRatio[e] * o.timeDiff),
                                    (w[e] += o.distanceOffset[e]));
                            },
                            panAnimLoop: function () {
                                if (
                                    je.zoomPan &&
                                    ((je.zoomPan.raf = G(o.panAnimLoop)),
                                    (o.now = Re()),
                                    (o.timeDiff = o.now - o.lastNow),
                                    (o.lastNow = o.now),
                                    o.calculateAnimOffset("x"),
                                    o.calculateAnimOffset("y"),
                                    ze(),
                                    o.calculateOverBoundsAnimOffset("x"),
                                    o.calculateOverBoundsAnimOffset("y"),
                                    o.speedDecelerationRatioAbs.x < 0.05 && o.speedDecelerationRatioAbs.y < 0.05)
                                )
                                    return (w.x = Math.round(w.x)), (w.y = Math.round(w.y)), ze(), void Je("zoomPan");
                            },
                        };
                    return o;
                },
                zt = function (e) {
                    return (
                        e.calculateSwipeSpeed("y"),
                        (u = f.currItem.bounds),
                        (e.backAnimDestination = {}),
                        (e.backAnimStarted = {}),
                        Math.abs(e.lastFlickSpeed.x) <= 0.05 && Math.abs(e.lastFlickSpeed.y) <= 0.05
                            ? ((e.speedDecelerationRatioAbs.x = e.speedDecelerationRatioAbs.y = 0), e.calculateOverBoundsAnimOffset("x"), e.calculateOverBoundsAnimOffset("y"), !0)
                            : (Qe("zoomPan"), (e.lastNow = Re()), void e.panAnimLoop())
                    );
                },
                Nt = function (e, t) {
                    var n, o, i;
                    ge || (pt = g),
                        "swipe" === e && ((e = lt.x - st.x), (r = t.lastFlickDist.x < 10), nt < e && (r || 20 < t.lastFlickOffset.x) ? (o = -1) : e < -nt && (r || t.lastFlickOffset.x < -20) && (o = 1)),
                        o && ((g += o) < 0 ? ((g = h.loop ? jt() - 1 : 0), (i = !0)) : g >= jt() && ((g = h.loop ? 0 : jt() - 1), (i = !0)), (i && !h.loop) || ((ke += o), (Se -= o), (n = !0)));
                    var e = De.x * Se,
                        r = Math.abs(e - gt.x),
                        a = n || e > gt.x == 0 < t.lastFlickSpeed.x ? ((a = 0 < Math.abs(t.lastFlickSpeed.x) ? r / Math.abs(t.lastFlickSpeed.x) : 333), (a = Math.min(a, 400)), Math.max(a, 250)) : 333;
                    return (
                        pt === g && (n = !1),
                        (ge = !0),
                        y("mainScrollAnimStart"),
                        tt("mainScroll", gt.x, e, a, p.easing.cubic.out, He, function () {
                            et(), (ge = !1), (pt = -1), (!n && pt === g) || f.updateCurrItem(), y("mainScrollAnimComplete");
                        }),
                        n && f.updateCurrItem(!0),
                        n
                    );
                },
                Ut = function (e) {
                    return (1 / fe) * e * F;
                },
                Ht = function () {
                    var e = v,
                        t = Ve(),
                        n = Xe();
                    v < t ? (e = t) : n < v && (e = n);
                    var o,
                        i = xe;
                    return (
                        ye && !oe && !be && v < t
                            ? f.close()
                            : (ye &&
                                  (o = function (e) {
                                      Pe((1 - i) * e + i);
                                  }),
                              f.zoomTo(e, 0, 200, p.easing.cubic.out, o)),
                        !0
                    );
                };
            i("Gestures", {
                publicMethods: {
                    initGestures: function () {
                        function e(e, t, n, o, i) {
                            (U = e + t), (H = e + n), (K = e + o), (q = i ? e + i : "");
                        }
                        (W = a.pointerEvent) && a.touch && (a.touch = !1),
                            W
                                ? navigator.msPointerEnabled
                                    ? e("MSPointer", "Down", "Move", "Up", "Cancel")
                                    : e("pointer", "down", "move", "up", "cancel")
                                : a.touch
                                ? (e("touch", "start", "move", "end", "cancel"), (Y = !0))
                                : e("mouse", "down", "move", "up"),
                            (_ = H + " " + K + " " + q),
                            (M = U),
                            W && !Y && (Y = 1 < navigator.maxTouchPoints || 1 < navigator.msMaxTouchPoints),
                            (f.likelyTouchDevice = Y),
                            (O[U] = C),
                            (O[H] = I),
                            (O[K] = E),
                            q && (O[q] = O[K]),
                            a.touch && ((M += " mousedown"), (_ += " mousemove mouseup"), (O.mousedown = O[U]), (O.mousemove = O[H]), (O.mouseup = O[K])),
                            Y || (h.allowPanToNext = !1);
                    },
                },
            });
            function Kt(e) {
                function t() {
                    (e.loading = !1), (e.loaded = !0), e.loadComplete ? e.loadComplete(e) : (e.img = null), (n.onload = n.onerror = null), (n = null);
                }
                (e.loading = !0), (e.loaded = !1);
                var n = (e.img = p.createEl("pswp__img", "img"));
                return (
                    (n.onload = t),
                    (n.onerror = function () {
                        (e.loadError = !0), t();
                    }),
                    (n.src = e.src),
                    n
                );
            }
            function qt(e, t) {
                return e.src && e.loadError && e.container && (t && (e.container.innerHTML = ""), (e.container.innerHTML = h.errorMsg.replace("%url%", e.src)), 1);
            }
            function Bt() {
                if (Qt.length) {
                    for (var e, t = 0; t < Qt.length; t++) (e = Qt[t]).holder.index === e.index && rn(e.index, e.item, e.baseDiv, e.img, !1, e.clearPlaceholder);
                    Qt = [];
                }
            }
            var Wt,
                Yt,
                Gt,
                Vt,
                Xt,
                jt,
                $t = function (r, e, a, t) {
                    function l() {
                        Je("initialZoom"),
                            a ? (f.template.removeAttribute("style"), f.bg.removeAttribute("style")) : (Pe(1), e && (e.style.display = "block"), p.addClass(m, "pswp--animated-in"), y("initialZoom" + (a ? "OutEnd" : "InEnd"))),
                            t && t(),
                            (Vt = !1);
                    }
                    Wt && clearTimeout(Wt), (Gt = Vt = !0), r.initialLayout ? ((s = r.initialLayout), (r.initialLayout = null)) : (s = h.getThumbBoundsFn && h.getThumbBoundsFn(g));
                    var s,
                        c = a ? h.hideAnimationDuration : h.showAnimationDuration;
                    if (!c || !s || void 0 === s.x)
                        return (
                            y("initialZoom" + (a ? "Out" : "In")),
                            (v = r.initialZoomLevel),
                            qe(w, r.initialPosition),
                            ze(),
                            (m.style.opacity = a ? 0 : 1),
                            Pe(1),
                            void (c
                                ? setTimeout(function () {
                                      l();
                                  }, c)
                                : l())
                        );
                    var u, d;
                    (u = A),
                        (d = !f.currItem.src || f.currItem.loadError || h.showHideOpacity),
                        r.miniImg && (r.miniImg.style.webkitBackfaceVisibility = "hidden"),
                        a || ((v = s.w / r.w), (w.x = s.x), (w.y = s.y - j), (f[d ? "template" : "bg"].style.opacity = 0.001), ze()),
                        Qe("initialZoom"),
                        a && !u && p.removeClass(m, "pswp--animated-in"),
                        d &&
                            (a
                                ? p[(u ? "remove" : "add") + "Class"](m, "pswp--animate_opacity")
                                : setTimeout(function () {
                                      p.addClass(m, "pswp--animate_opacity");
                                  }, 30)),
                        (Wt = setTimeout(
                            function () {
                                var t, n, o, i, e;
                                y("initialZoom" + (a ? "Out" : "In")),
                                    a
                                        ? ((t = s.w / r.w),
                                          (n = { x: w.x, y: w.y }),
                                          (o = v),
                                          (i = xe),
                                          (e = function (e) {
                                              1 === e ? ((v = t), (w.x = s.x), (w.y = s.y - J)) : ((v = (t - o) * e + o), (w.x = (s.x - n.x) * e + n.x), (w.y = (s.y - J - n.y) * e + n.y)),
                                                  ze(),
                                                  d ? (m.style.opacity = 1 - e) : Pe(i - e * i);
                                          }),
                                          u ? tt("initialZoom", 0, 1, c, p.easing.cubic.out, e, l) : (e(1), (Wt = setTimeout(l, c + 20))))
                                        : ((v = r.initialZoomLevel), qe(w, r.initialPosition), ze(), Pe(1), d ? (m.style.opacity = 1) : Pe(1), (Wt = setTimeout(l, c + 20)));
                            },
                            a ? 25 : 90
                        ));
                },
                Jt = {},
                Qt = [],
                en = {
                    index: 0,
                    errorMsg: '<div class="pswp__error-msg"><a href="%url%" target="_blank">The image</a> could not be loaded.</div>',
                    forceProgressiveLoading: !1,
                    preload: [1, 1],
                    getNumItemsFn: function () {
                        return Yt.length;
                    },
                },
                tn = function () {
                    return { center: { x: 0, y: 0 }, max: { x: 0, y: 0 }, min: { x: 0, y: 0 } };
                },
                nn = function (e, t, n) {
                    var o = e.bounds;
                    (o.center.x = Math.round((Jt.x - t) / 2)),
                        (o.center.y = Math.round((Jt.y - n) / 2) + e.vGap.top),
                        (o.max.x = t > Jt.x ? Math.round(Jt.x - t) : o.center.x),
                        (o.max.y = n > Jt.y ? Math.round(Jt.y - n) + e.vGap.top : o.center.y),
                        (o.min.x = t > Jt.x ? 0 : o.center.x),
                        (o.min.y = n > Jt.y ? e.vGap.top : o.center.y);
                },
                on = function (e, t, n) {
                    var o, i;
                    return e.src && !e.loadError
                        ? ((o = !n) && (e.vGap || (e.vGap = { top: 0, bottom: 0 }), y("parseVerticalMargin", e)),
                          (Jt.x = t.x),
                          (Jt.y = t.y - e.vGap.top - e.vGap.bottom),
                          o &&
                              ((t = Jt.x / e.w),
                              (i = Jt.y / e.h),
                              (e.fitRatio = t < i ? t : i),
                              "orig" === (t = h.scaleMode) ? (n = 1) : "fit" === t && (n = e.fitRatio),
                              (e.initialZoomLevel = n = 1 < n ? 1 : n),
                              e.bounds || (e.bounds = tn())),
                          n ? (nn(e, e.w * n, e.h * n), o && n === e.initialZoomLevel && (e.initialPosition = e.bounds.center), e.bounds) : void 0)
                        : ((e.w = e.h = 0), (e.initialZoomLevel = e.fitRatio = 1), (e.bounds = tn()), (e.initialPosition = e.bounds.center), e.bounds);
                },
                rn = function (e, t, n, o, i, r) {
                    t.loadError ||
                        (o &&
                            ((t.imageAppended = !0),
                            an(t, o, t === f.currItem && Fe),
                            n.appendChild(o),
                            r &&
                                setTimeout(function () {
                                    t && t.loaded && t.placeholder && ((t.placeholder.style.display = "none"), (t.placeholder = null));
                                }, 500)));
                },
                an = function (e, t, n) {
                    var o;
                    e.src &&
                        ((t = t || e.container.lastChild),
                        (o = n ? e.w : Math.round(e.w * e.fitRatio)),
                        (n = n ? e.h : Math.round(e.h * e.fitRatio)),
                        e.placeholder && !e.loaded && ((e.placeholder.style.width = o + "px"), (e.placeholder.style.height = n + "px")),
                        (t.style.width = o + "px"),
                        (t.style.height = n + "px"));
                };
            i("Controller", {
                publicMethods: {
                    lazyLoadItem: function (e) {
                        e = l(e);
                        var t = Xt(e);
                        t && ((!t.loaded && !t.loading) || Z) && (y("gettingData", e, t), t.src && Kt(t));
                    },
                    initController: function () {
                        p.extend(h, en, !0),
                            (f.items = Yt = e),
                            (Xt = f.getItemAt),
                            (jt = h.getNumItemsFn),
                            h.loop,
                            jt() < 3 && (h.loop = !1),
                            s("beforeChange", function (e) {
                                for (var t = h.preload, n = null === e || 0 <= e, o = Math.min(t[0], jt()), i = Math.min(t[1], jt()), r = 1; r <= (n ? i : o); r++) f.lazyLoadItem(g + r);
                                for (r = 1; r <= (n ? o : i); r++) f.lazyLoadItem(g - r);
                            }),
                            s("initialLayout", function () {
                                f.currItem.initialLayout = h.getThumbBoundsFn && h.getThumbBoundsFn(g);
                            }),
                            s("mainScrollAnimComplete", Bt),
                            s("initialZoomInEnd", Bt),
                            s("destroy", function () {
                                for (var e, t = 0; t < Yt.length; t++)
                                    (e = Yt[t]).container && (e.container = null), e.placeholder && (e.placeholder = null), e.img && (e.img = null), e.preloader && (e.preloader = null), e.loadError && (e.loaded = e.loadError = !1);
                                Qt = null;
                            });
                    },
                    getItemAt: function (e) {
                        return 0 <= e && void 0 !== Yt[e] && Yt[e];
                    },
                    allowProgressiveImg: function () {
                        return h.forceProgressiveLoading || !Y || h.mouseUsed || 1200 < screen.width;
                    },
                    setContent: function (t, n) {
                        h.loop && (n = l(n));
                        var e = f.getItemAt(t.index);
                        e && (e.container = null);
                        var o,
                            i,
                            r,
                            e = f.getItemAt(n);
                        e
                            ? (y("gettingData", n, e),
                              (t.index = n),
                              (i = (t.item = e).container = p.createEl("pswp__zoom-wrap")),
                              !e.src && e.html && (e.html.tagName ? i.appendChild(e.html) : (i.innerHTML = e.html)),
                              qt(e),
                              on(e, Te),
                              !e.src || e.loadError || e.loaded
                                  ? e.src && !e.loadError && (((o = p.createEl("pswp__img", "img")).style.opacity = 1), (o.src = e.src), an(e, o), rn(n, e, i, o, !0))
                                  : ((e.loadComplete = function (e) {
                                        if (T) {
                                            if (t && t.index === n) {
                                                if (qt(e, !0)) return (e.loadComplete = e.img = null), on(e, Te), Ne(e), void (t.index === g && f.updateCurrZoomItem());
                                                e.imageAppended
                                                    ? !Vt && e.placeholder && ((e.placeholder.style.display = "none"), (e.placeholder = null))
                                                    : a.transform && (ge || Vt)
                                                    ? Qt.push({ item: e, baseDiv: i, img: e.img, index: n, holder: t, clearPlaceholder: !0 })
                                                    : rn(n, e, i, e.img, ge || Vt, !0);
                                            }
                                            (e.loadComplete = null), (e.img = null), y("imageLoadComplete", n, e);
                                        }
                                    }),
                                    p.features.transform &&
                                        ((r = "pswp__img pswp__img--placeholder"),
                                        (r += e.msrc ? "" : " pswp__img--placeholder--blank"),
                                        (r = p.createEl(r, e.msrc ? "img" : "")),
                                        e.msrc && (r.src = e.msrc),
                                        an(e, r),
                                        i.appendChild(r),
                                        (e.placeholder = r)),
                                    e.loading || Kt(e),
                                    f.allowProgressiveImg() && (!Gt && a.transform ? Qt.push({ item: e, baseDiv: i, img: e.img, index: n, holder: t }) : rn(n, e, i, e.img, !0, !0))),
                              Gt || n !== g ? Ne(e) : ((he = i.style), $t(e, o || e.img)),
                              (t.el.innerHTML = ""),
                              t.el.appendChild(i))
                            : (t.el.innerHTML = "");
                    },
                    cleanSlide: function (e) {
                        e.img && (e.img.onload = e.img.onerror = null), (e.loaded = e.loading = e.img = e.imageAppended = !1);
                    },
                },
            });
            function ln(e, t, n) {
                var o = document.createEvent("CustomEvent"),
                    t = { origEvent: e, target: e.target, releasePoint: t, pointerType: n || "touch" };
                o.initCustomEvent("pswpTap", !0, !0, t), e.target.dispatchEvent(o);
            }
            var sn,
                cn,
                un = {};
            i("Tap", {
                publicMethods: {
                    initTap: function () {
                        s("firstTouchStart", f.onTapStart),
                            s("touchRelease", f.onTapRelease),
                            s("destroy", function () {
                                (un = {}), (sn = null);
                            });
                    },
                    onTapStart: function (e) {
                        1 < e.length && (clearTimeout(sn), (sn = null));
                    },
                    onTapRelease: function (e, t) {
                        var n, o, i;
                        !t ||
                            ce ||
                            le ||
                            $e ||
                            ((n = t),
                            sn && (clearTimeout(sn), (sn = null), (o = n), (i = un), Math.abs(o.x - i.x) < r && Math.abs(o.y - i.y) < r)
                                ? y("doubleTap", n)
                                : "mouse" !== t.type
                                ? "BUTTON" === e.target.tagName.toUpperCase() || p.hasClass(e.target, "pswp__single-tap")
                                    ? ln(e, t)
                                    : (qe(un, n),
                                      (sn = setTimeout(function () {
                                          ln(e, t), (sn = null);
                                      }, 300)))
                                : ln(e, t, "mouse"));
                    },
                },
            }),
                i("DesktopZoom", {
                    publicMethods: {
                        initDesktopZoom: function () {
                            $ ||
                                (Y
                                    ? s("mouseUsed", function () {
                                          f.setupDesktopZoom();
                                      })
                                    : f.setupDesktopZoom(!0));
                        },
                        setupDesktopZoom: function (e) {
                            cn = {};
                            var t = "wheel mousewheel DOMMouseScroll";
                            s("bindEvents", function () {
                                p.bind(m, t, f.handleMouseWheel);
                            }),
                                s("unbindEvents", function () {
                                    cn && p.unbind(m, t, f.handleMouseWheel);
                                }),
                                (f.mouseZoomedIn = !1);
                            function n() {
                                f.mouseZoomedIn && (p.removeClass(m, "pswp--zoomed-in"), (f.mouseZoomedIn = !1)), v < 1 ? p.addClass(m, "pswp--zoom-allowed") : p.removeClass(m, "pswp--zoom-allowed"), i();
                            }
                            var o,
                                i = function () {
                                    o && (p.removeClass(m, "pswp--dragging"), (o = !1));
                                };
                            s("resize", n),
                                s("afterChange", n),
                                s("pointerDown", function () {
                                    f.mouseZoomedIn && ((o = !0), p.addClass(m, "pswp--dragging"));
                                }),
                                s("pointerUp", i),
                                e || n();
                        },
                        handleMouseWheel: function (e) {
                            if (v <= f.currItem.fitRatio) return h.modal && (!h.closeOnScroll || $e || ae ? e.preventDefault() : B && 2 < Math.abs(e.deltaY) && ((A = !0), f.close())), !0;
                            if ((e.stopPropagation(), (cn.x = 0), "deltaX" in e)) 1 === e.deltaMode ? ((cn.x = 18 * e.deltaX), (cn.y = 18 * e.deltaY)) : ((cn.x = e.deltaX), (cn.y = e.deltaY));
                            else if ("wheelDelta" in e) e.wheelDeltaX && (cn.x = -0.16 * e.wheelDeltaX), e.wheelDeltaY ? (cn.y = -0.16 * e.wheelDeltaY) : (cn.y = -0.16 * e.wheelDelta);
                            else {
                                if (!("detail" in e)) return;
                                cn.y = e.detail;
                            }
                            Ge(v, !0);
                            var t = w.x - cn.x,
                                n = w.y - cn.y;
                            (h.modal || (t <= u.min.x && t >= u.max.x && n <= u.min.y && n >= u.max.y)) && e.preventDefault(), f.panTo(t, n);
                        },
                        toggleDesktopZoom: function (e) {
                            e = e || { x: Te.x / 2 + Ae.x, y: Te.y / 2 + Ae.y };
                            var t = h.getDoubleTapZoom(!0, f.currItem),
                                n = v === t;
                            (f.mouseZoomedIn = !n), f.zoomTo(n ? f.currItem.initialZoomLevel : t, e, 333), p[(n ? "remove" : "add") + "Class"](m, "pswp--zoomed-in");
                        },
                    },
                });
            function dn() {
                pn && clearTimeout(pn), hn && clearTimeout(hn);
            }
            function mn() {
                var e = Sn(),
                    t = {};
                if (e.length < 5) return t;
                var n,
                    o = e.split("&");
                for (r = 0; r < o.length; r++) o[r] && ((n = o[r].split("=")).length < 2 || (t[n[0]] = n[1]));
                if (h.galleryPIDs) {
                    for (var i = t.pid, r = (t.pid = 0); r < Yt.length; r++)
                        if (Yt[r].pid === i) {
                            t.pid = r;
                            break;
                        }
                } else t.pid = parseInt(t.pid, 10) - 1;
                return t.pid < 0 && (t.pid = 0), t;
            }
            var pn,
                fn,
                hn,
                gn,
                vn,
                wn,
                yn,
                xn,
                bn,
                Cn,
                In,
                En,
                Tn = { history: !0, galleryUID: 1 },
                Sn = function () {
                    return In.hash.substring(1);
                },
                An = function () {
                    var e, t;
                    hn && clearTimeout(hn),
                        $e || ae
                            ? (hn = setTimeout(An, 500))
                            : (gn ? clearTimeout(fn) : (gn = !0),
                              (t = g + 1),
                              (e = Xt(g)).hasOwnProperty("pid") && (t = e.pid),
                              (e = yn + "&gid=" + h.galleryUID + "&pid=" + t),
                              xn || (-1 === In.hash.indexOf(e) && (Cn = !0)),
                              (t = In.href.split("#")[0] + "#" + e),
                              En ? "#" + e !== window.location.hash && history[xn ? "replaceState" : "pushState"]("", document.title, t) : xn ? In.replace(t) : (In.hash = e),
                              (xn = !0),
                              (fn = setTimeout(function () {
                                  gn = !1;
                              }, 60)));
                };
            i("History", {
                publicMethods: {
                    initHistory: function () {
                        var e, t;
                        p.extend(h, Tn, !0),
                            h.history &&
                                ((In = window.location),
                                (xn = bn = Cn = !1),
                                (yn = Sn()),
                                (En = "pushState" in history),
                                -1 < yn.indexOf("gid=") && (yn = (yn = yn.split("&gid=")[0]).split("?gid=")[0]),
                                s("afterChange", f.updateURL),
                                s("unbindEvents", function () {
                                    p.unbind(window, "hashchange", f.onHashChange);
                                }),
                                (e = function () {
                                    (wn = !0), bn || (Cn ? history.back() : yn ? (In.hash = yn) : En ? history.pushState("", document.title, In.pathname + In.search) : (In.hash = "")), dn();
                                }),
                                s("unbindEvents", function () {
                                    A && e();
                                }),
                                s("destroy", function () {
                                    wn || e();
                                }),
                                s("firstUpdate", function () {
                                    g = mn().pid;
                                }),
                                -1 < (t = yn.indexOf("pid=")) && "&" === (yn = yn.substring(0, t)).slice(-1) && (yn = yn.slice(0, -1)),
                                setTimeout(function () {
                                    T && p.bind(window, "hashchange", f.onHashChange);
                                }, 40));
                    },
                    onHashChange: function () {
                        return Sn() === yn ? ((bn = !0), void f.close()) : void (gn || ((vn = !0), f.goTo(mn().pid), (vn = !1)));
                    },
                    updateURL: function () {
                        dn(), vn || (xn ? (pn = setTimeout(An, 800)) : An());
                    },
                },
            }),
                p.extend(f, t);
        };
    }),
    (function (e, t) {
        "object" == typeof exports && "undefined" != typeof module ? (module.exports = t()) : "function" == typeof define && define.amd ? define(t) : ((e = "undefined" != typeof globalThis ? globalThis : e || self).reframe = t());
    })(this, function () {
        "use strict";
        function t() {
            for (var e = 0, t = 0, n = arguments.length; t < n; t++) e += arguments[t].length;
            for (var o = Array(e), i = 0, t = 0; t < n; t++) for (var r = arguments[t], a = 0, l = r.length; a < l; a++, i++) o[i] = r[a];
            return o;
        }
        return function (e, i) {
            return (
                void 0 === i && (i = "js-reframe"),
                ("string" == typeof e ? t(document.querySelectorAll(e)) : "length" in e ? t(e) : [e]).forEach(function (e) {
                    var t, n, o;
                    -1 !== e.className.split(" ").indexOf(i) ||
                        -1 < e.style.width.indexOf("%") ||
                        ((t = e.getAttribute("height") || e.offsetHeight),
                        (n = e.getAttribute("width") || e.offsetWidth),
                        (t = (("string" == typeof t ? parseInt(t) : t) / ("string" == typeof n ? parseInt(n) : n)) * 100),
                        ((n = document.createElement("div")).className = i),
                        ((o = n.style).position = "relative"),
                        (o.width = "100%"),
                        (o.paddingTop = t + "%"),
                        ((o = e.style).position = "absolute"),
                        (o.width = "100%"),
                        (o.height = "100%"),
                        (o.left = "0"),
                        (o.top = "0"),
                        null !== (t = e.parentNode) && void 0 !== t && t.insertBefore(n, e),
                        null !== (o = e.parentNode) && void 0 !== o && o.removeChild(e),
                        n.appendChild(e));
                })
            );
        };
    }),
    (function () {
        var e = document.querySelector(".gh-burger");
        e &&
            e.addEventListener("click", function () {
                document.body.classList.contains("is-head-open") ? document.body.classList.remove("is-head-open") : document.body.classList.add("is-head-open");
            });
    })(),
    lightbox(".kg-image-card > .kg-image[width][height], .kg-gallery-image img"),
    reframe(
        document.querySelectorAll(
            [
                '.gh-content iframe[src*="youtube.com"]',
                '.gh-content iframe[src*="youtube-nocookie.com"]',
                '.gh-content iframe[src*="player.vimeo.com"]',
                '.gh-content iframe[src*="kickstarter.com"][src*="video.html"]',
                ".gh-content object",
                ".gh-content embed",
            ].join(",")
        )
    ),
    pagination(!1);
//# sourceMappingURL=main.min.js.map
