; (function (window, document, undefined) {
    "use strict";

    var ua=navigator.userAgent;

    /**
     * 是否为ie浏览器
     */
    var isIE = (function(){
        return (!-[1, ]) || /msie [6-9]/i.test(ua);
    })();

    /**
     * 是否为div
     */
    var isDiv = function (obj) {
        if (!obj) {
            return false;
        }
        return obj.nodeType == 1 && obj.nodeName == "DIV";
    };
    
    /**
     * 是否为string类型
     */
    var isString = function (v) {
        return typeof (v) === "string";
    };

    /**
     * 用div包裹元素
     */
    var wrapDIV = function (obj) {
        if (!obj) {
            return null;
        }
        var s = document.createElement("div");
        s.innerHTML = obj.outerHTML;
        obj.parentNode.replaceChild(s, obj);
        return s;
    };

    /**
     * 解开div的包裹，还原元素
     */
    var unwrapDIV = function (obj) {
        if (!isDiv(obj)) {
            return obj;
        }
        var c = obj.children[0];
        obj.parentNode.replaceChild(c, obj);
        return c;
    };


    /**
     * 显示或隐藏指定的option对象
     */
    var showHideOption = function (obj, isShow) {
        if (isDiv(obj)) {
            obj = unwrapDIV(obj);
        }

        if (isIE) {
            if (isShow) {
                obj.style.display = "";
            } else {
                wrapDIV(obj).style.display = "none";
            }
            return;
        };

        obj.style.display = isShow ? "" : "none";
    };
    
    /**
     * 显示或隐藏option
     */
    function showHide(target) {
        /**
         * 要操作的对象，一般为select的id或select的js对象
         */
        this.target = target;
        /**
         * 显示或隐藏时自定义的option属性名，若该属性值为true，则代表该option需要显示；否则，则需要隐藏。
         */
        this.attr = "XShowHideOption-isShow";
    }
    
    /**
     * 根据每一个option的attr属性的状态来初始化显示或隐藏该option
     */
    showHide.prototype.init = function () {
        var sel = isString(this.target) ? document.getElementById(this.target) : this.target;
        var selOps = sel.children, currentOption = null, attrIsShow = null;
        if (!selOps || selOps.length === 0) {
            return;
        }
        for (var i = 0; i < selOps.length; i++) {
            currentOption = unwrapDIV(selOps[i]);
            attrIsShow = currentOption.getAttribute(this.attr);
            if (typeof (attrIsShow) == "undefined" || attrIsShow == null) {
                continue;
            }
            showHideOption(currentOption, attrIsShow == "true");
        }
    };
    
    
    /**
     * 初始化
     * @param {array} values 要显示或隐藏的值数组
     * @param {boolean} isShow 是否显示
     */
    showHide.prototype.setInfo = function (values, isShow) {
        if (!this.target) {
            throw new Error("must valid target.");
        }
        var sel = isString(this.target) ? document.getElementById(this.target) : this.target;
        var selOps = sel.children, currentOption = null;

        if (!selOps || selOps.length === 0) {
            return;
        }

        for (var i = 0; i < selOps.length; i++) {
            currentOption = selOps[i];

            //如果没有指定对应操作的值，则对所有option进行相应的显示或隐藏
            if (!values || values.length === 0) {
                showHideOption(currentOption, isShow);
                return;
            }

            //对指定的值对应的option进行显示或隐藏
            for (var j = 0; j < values.length; j++) {
                if (currentOption.value == values[j]) {
                    showHideOption(currentOption, isShow);
                }
            }
        }

    };
    
    
    /**
     * 公开全局对象
     */
    window.XShowHideOption = window.XShowHideOption || showHide;

}).call(this, window, document);