/**
 * ******************************************************************************************
 * 1：基本信息：
 * 开源协议：https://github.com/xucongli1989/XShowHideOption/blob/master/LICENSE
 * 项目地址：https://github.com/xucongli1989/XShowHideOption
 * 电子邮件：80213876@qq.com
 ********************************************************************************************
 * 2：使用说明：
 *       var obj=new XShowHideOption("id");
 *       obj.init();
 *      不依赖其它任何插件，兼容ie6+/firefox/chrome等
 ********************************************************************************************
 * 当前版本：v1.0.0
 * 更新时间：2016-02-09
 */
; (function (window, document, undefined) {
    "use strict";

    var ua = navigator.userAgent;

    /**
     * 是否为ie浏览器
     */
    var isIE = (function () {
        return (!-[1, ]) || /msie/i.test(ua);
    })();

    /**
     * 是否为临时节点（仅便于ie下面对option进行包裹，以便于隐藏或显示该Option）
     * 目前本插件使用的是一个临时的select包裹
     * （仅ie下使用）
     */
    var isTempNode = function (obj) {
        if (!obj) {
            return false;
        }
        return obj.nodeType == 1 && obj.nodeName == "SELECT";
    };
    
    /**
     * 是否为string类型
     */
    var isString = function (v) {
        return typeof (v) === "string";
    };

    /**
     * 用临时节点包裹元素（仅ie下使用）
     */
    var wrapTempNode = function (obj) {
        if (!obj) {
            return null;
        }
        var s = document.createElement("select");
        obj.parentNode.replaceChild(s, obj);
        var newOp = new Option();

        var allAttrs = obj.attributes;
        if (allAttrs && allAttrs.length > 0) {
            for (var i = 0; i < allAttrs.length; i++) {
                newOp.setAttribute(allAttrs[i].name, allAttrs[i].value);
            }
        }

        newOp.value = obj.value;
        newOp.text = obj.text;

        s.add(newOp);
        return s;
    };

    /**
     * 解开临时节点的包裹，还原元素（仅ie下使用）
     */
    var unwrapTempNode = function (obj) {
        if (!isTempNode(obj)) {
            return obj;
        }
        if (!obj.children || obj.children.length === 0) {
            return obj;
        }
        var c = obj.children[0];
        obj.parentNode.replaceChild(c, obj);
        return c;
    };


    /**
     * 显示或隐藏指定的option对象(this为当前实例)
     */
    var showHideOption = function (obj, isShow) {
        obj = unwrapTempNode(obj);

        if (isShow) {
            obj.removeAttribute(this.attr);
        } else {
            obj.setAttribute(this.attr, isShow.toString());
        }

        if (isIE && !isShow) {
            obj = wrapTempNode(obj);
        };

        obj.style.display = isShow ? "" : "none";
        obj.disabled = isShow ? false : true;

    };

    /**
     * 获取option的value值
     */
    var getOptionValue = function (op) {
        if (!op) {
            return null;
        }
        if (isTempNode(op)) {
            if (!op.options || op.options.length === 0) {
                return null;
            }
            op = op.options[0];
        }
        return op.value;
    };
    
    /**
     * 本插件的构造函数
     */
    function showHide(target) {
        /**
         * 要操作的对象，一般为select的id或select的js对象
         */
        this.target = isString(target) ? document.getElementById(target) : target;
        /**
         * 显示或隐藏时自定义的option属性名，若该属性值为true，则代表该option需要显示；否则，则需要隐藏。
         */
        this.attr = "XShowHideOption-isShow";
    }
    
    
    /**
     * 根据每一个option的attr属性的状态来初始化显示或隐藏该option
     */
    showHide.prototype.init = function () {
        var selOps = this.target.children, currentOption = null, attrIsShow = null;
        if (!selOps || selOps.length === 0) {
            return;
        }
        for (var i = 0; i < selOps.length; i++) {
            currentOption = unwrapTempNode(selOps[i]);
            attrIsShow = currentOption.getAttribute(this.attr);
            if (typeof (attrIsShow) == "undefined" || attrIsShow == null) {
                continue;
            }
            showHideOption.call(this, currentOption, attrIsShow == "true");
        }
    };
    
    
    /**
     * 根据指定值来设置option是否显示或隐藏
     * @param {array} values 要显示或隐藏的值数组（如果为字符串，则会自动以逗号分隔转为数组）
     * @param {boolean} isShow 是否显示
     */
    showHide.prototype.setOption = function (values, isShow) {
        if (!this.target) {
            throw new Error("the 'target' must be valid.");
        }

        if (this.beforeSetOption) {
            this.beforeSetOption();
        }

        var selOps = this.target.children, currentOption = null;

        if (!selOps || selOps.length === 0) {
            return;
        }

        if (isString(values)) {
            values = values.split(',');
        }

        for (var i = 0; i < selOps.length; i++) {
            currentOption = selOps[i]

            //如果没有指定对应操作的值，则对所有option进行相应的显示或隐藏
            if (!values || values.length === 0) {
                showHideOption.call(this, currentOption, isShow);
                continue;
            }

            //对指定的值对应的option进行显示或隐藏
            for (var j = 0; j < values.length; j++) {
                if (getOptionValue(currentOption) == values[j]) {
                    showHideOption.call(this, currentOption, isShow);
                }
            }
        }


        if (this.afterSetOption) {
            this.afterSetOption();
        }

    };
    
    
    /**
     * 设置指定value显示或隐藏option前的回调函数，如果返回false，则不执行显示或隐藏option操作
     */
    showHide.prototype.beforeSetOption = function () {

    };
    
    /**
     * 设置指定value显示或隐藏option后的回调函数
     */
    showHide.prototype.afterSetOption = function () {

    };
    
    
    /**
     * 公开全局对象
     */
    window.XShowHideOption = window.XShowHideOption || showHide;

}).call(this, window, document);