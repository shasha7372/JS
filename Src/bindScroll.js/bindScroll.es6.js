let eventData = [];
let t, onscrollEvent;
// 滚动条在Y轴上的滚动距离

let getScrollTop = () => {
    let scrollTop = 0;
    let bodyScrollTop = 0;
    let documentScrollTop = 0;
    if (document.body) {
        bodyScrollTop = document.body.scrollTop;
    }
    if (document.documentElement) {
        documentScrollTop = document.documentElement.scrollTop;
    }
    scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
    return scrollTop;
};

// 文档的总高度

let getScrollHeight = () => {
    let scrollHeight = 0;
    let bodyScrollHeight = 0;
    let documentScrollHeight = 0;
    if (document.body) {
        bodyScrollHeight = document.body.scrollHeight;
    }
    if (document.documentElement) {
        documentScrollHeight = document.documentElement.scrollHeight;
    }
    scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
    return scrollHeight;
};

// 浏览器视口的高度

let getWindowHeight = () => {
    var windowHeight = 0;
    if (document.compatMode === 'CSS1Compat') {
        windowHeight = document.documentElement.clientHeight;
    } else {
        windowHeight = document.body.clientHeight;
    }
    return windowHeight;
};

let checkBottom = () => {
    // TODO 可以考虑这里加一些预留的参数底
    if (getScrollTop() + getWindowHeight() >= getScrollHeight() - 50) {
        eventData.forEach(p=> {
            p();
        });
        return true;
    }
    return false;
};

// TODO 滚动条自动加载
export default {
    bind () {
        onscrollEvent = window.onscroll;
        window.onscroll = () => {
            console.log('onscroll');
            onscrollEvent();
            clearTimeout(t);
            t = setTimeout(function () {
                checkBottom();
            }, 300);
        };
        console.log('bind');
    },
    push (event) {
        eventData.push(event);
    },
    clear () {
        eventData.length = 0;
        window.onscroll = onscrollEvent;
    }
};
