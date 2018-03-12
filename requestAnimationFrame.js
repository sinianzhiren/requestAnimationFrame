//使用requestAnimationFrame调用动画
(function () {
    var fps = 10;
    var now;
    var then = Date.now();
    var interval = 1000/fps;
    var delta;
    function tick() {
        window.requestAnimationFrame(tick);
        now = Date.now();
        delta = now - then;
        if (delta > interval){
            then = now - (delta % interval);
            timeUpdate();//该函数为需要调用的函数
        }
    }
    tick();
})();
if (!Date.now){
    Date.now = function () {
        return new Date().getTime();
    }
}
//配置不同浏览器下的RequestAnimationFrame，使之统一
(function () {
    "use strict";
    var vendors = ['webkit','moz'];
    for (var i = 0;i<vendors.length && !window.requestAnimationFrame;++i){
        var vp = vendors[i];
        window.requestAnimationFrame = window[vp+'RequestAnimationFrame'];
        window.cancelAnimationFrame = (window[vp+'CancelAnimationFrame'] || window[vp+'CancelRequestAnimationFrame']);
    }
    if (/ip(ad|home|od).*OS 6/.test(window.navigator.userAgent) || !window.requestAnimationFrame || !window.cancelAnimationFrame){
        var lastTime = 0;
        window.requestAnimationFrame = function (callback) {
            var now = Date.now();
            var nextTime = Math.max(lastTime + 16, now);
            return setTimeout(function () {
                callback(lastTime = nextTime)
            }, nextTime - now)
        };
        window.cancelAnimationFrame = clearTimeout;
    }
})();