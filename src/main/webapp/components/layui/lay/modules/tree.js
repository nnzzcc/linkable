/** layui-v2.5.5 MIT License By https://www.layui.com */
var last = false;
; layui.define("form", function (e) {
    "use strict";
    var i = layui.$, a = layui.form, n = layui.layer, t = "tree", r = {
        config: {}, index: layui[t] ? layui[t].index + 1e4 : 0, set: function (e) {
            var a = this;
            return a.config = i.extend({}, a.config, e), a
        }, on: function (e, i) {
            return layui.onevent.call(this, t, e, i)
        }
    }, l = function () {
        var e = this, i = e.config, a = i.id || e.index;
        return l.that[a] = e, l.config[a] = i, {
            config: i, reload: function (i) {
                e.reload.call(e, i)
            }, getChecked: function () {
                return e.getChecked.call(e)
            }, setChecked: function (i) {
                return e.setChecked.call(e, i)
            }
        }
    }, c = "layui-hide", d = "layui-disabled", s = "layui-tree-set", o = "layui-tree-iconClick",
        h = "layui-icon-addition", u = "layui-icon-subtraction", p = "layui-tree-entry", f = "layui-tree-main",
        y = "nzc", v = "layui-tree-pack", C = "layui-tree-spread", k = "layui-tree-setLineShort",
        m = "layui-tree-showLine", x = "layui-tree-lineExtend", aa = "layui-tree-active", bb = "layui-tree-iconArrow",
        b = function (e) {
            var a = this;
            a.index = ++r.index, a.config = i.extend({}, a.config, r.config, e), a.render()
        };
    b.prototype.config = {
        data: [],
        showCheckbox: !1,
        showLine: !0,
        accordion: !1,
        onlyIconControl: !1,
        isJump: !1,
        edit: !1,
        text: { defaultNodeName: "未命名", none: "无数据" }
    }, b.prototype.reload = function (e) {
        var a = this;
        layui.each(e, function (e, i) {
            i.constructor === Array && delete a.config[e]
        }), a.config = i.extend(!0, {}, a.config, e), a.render()
    }, b.prototype.render = function () {
        var e = this, a = e.config;
        e.checkids = [];
        var n = i('<div class="layui-tree' + (a.showCheckbox ? " layui-form" : "") + (a.showLine ? " layui-tree-line" : "") + '" lay-filter="LAY-tree-' + e.index + '"></div>');
        e.tree(n);
        var t = a.elem = i(a.elem);
        if (t[0]) {
            if (e.key = a.id || e.index, e.elem = n, e.elemNone = i('<div class="layui-tree-emptyText">' + a.text.none + "</div>"), t.html(e.elem), 0 == e.elem.find(".layui-tree-set").length) return e.elem.append(e.elemNone);
            a.showCheckbox && e.renderForm("checkbox"), e.elem.find(".layui-tree-set").each(function () {
                var e = i(this);
                e.parent(".layui-tree-pack")[0] || e.addClass("layui-tree-setHide"), !e.next()[0] && e.parents(".layui-tree-pack").eq(1).hasClass("layui-tree-lineExtend") && e.addClass(k), e.next()[0] || e.parents(".layui-tree-set").eq(0).next()[0] || e.addClass(k)
            }), e.events()
        }
    }, b.prototype.renderForm = function (e) {
        a.render(e, "LAY-tree-" + this.index)
    }, b.prototype.children = function (n1, n2) { //一如既往2019-9-20
        var e = this;
        last = false;
        e.setchildrendata(e.config.data, n1, n2);
    }, b.prototype.setchildrendata = function (n0, n1, n2) { //一如既往2019-9-20
        /**
         * n0-原始树结构对象
         * n1-当前选中的部门
         * n2-当前部门的子部门
         *
         * 局部加载思路：
         * 递归整个树结构，找到与当前操作的树节点一致的数据（根据id判断） 更新当前树自己的数据及子节点的数据
         */
        var e = this;
        var c = i('#' + e.config.id);
        layui.each(n0, (a, r) => {
            var b = c.find('div[data-id=' + r.id + ']').hasClass(C);
            r.spread = b;
            if (e.config.accordion === !0) { //手风琴模式
                r.spread = !1;
                var cs = c.find('div[data-id=' + n1 + ']').parents('.layui-tree-set');
                cs.each(function () {
                    if (r.id === i(this).attr('data-id')) {
                        r.spread = !0;
                    }
                });
            }
            // 判断树结构数据和当前操作的节点是否相同 相同就执行新操作过的逻辑 否则走递归方法
            if (r.id === n1) {
                r.spread = !0;

                if (!r.children) {
                    r.children = [];
                }
                if (n2.length === 0) {
                    delete r.children;
                } else {
                    r.children = n2;
                }

                // 替换当前节点的原始值 （目前只替换了title 后续可拓展其他）
                if (n1.title) {
                    r.title = n1.title;
                }
                // 重新加载树结构数据
                //e.reload(e.config.id, e.config.data);
                // 当前符合条件的节点已经渲染完成 直接跳出整个循环
                return false;
            } else {
                // 若有子节点 则继续递归子节点
                if (r.children && r.children.length >= 1 && r.id<1000) {
                    e.setchildrendata(r.children, n1, n2);
                }
            }
            if (last && c.find('div[data-id=' + r.id + ']').hasClass('layui-tree-setLineShort')) {
                e.reload(e.config.id, e.config.data);
            }
            last = c.find('div[data-id=' + r.id + ']').hasClass('layui-tree-setLineShort');

        });
    }, b.prototype.tree = function (e, a) {
        var n = this, t = n.config, r = a || t.data;
        layui.each(r, function (a, r) {
            //          var l = r.children && r.children.length > 0,
            var l = r.children,
                o = i('<div class="layui-tree-pack" ' + (r.spread ? 'style="display: block;"' : "") + '"></div>'),
                h = i(['<div data-id="' + r.id + '" data-parent-id="' + r.parentId + '" class="layui-tree-set' + (r.spread ? " layui-tree-spread" : "") + (r.checked ? " layui-tree-checkedFirst" : "") + '">', '<div class="layui-tree-entry ' + (l ? "taller" : "") + '" >', '<div class="layui-tree-main">', function () {
                    // return t.showLine ? l ? '<span class="layui-tree-iconClick layui-tree-icon"><i class="layui-icon ' + (r.spread ? "layui-icon-subtraction" : "layui-icon-addition") + '"></i></span>' : '<span class="layui-tree-iconClick layui-tree-icon"><i class="layui-icon layui-icon-file"></i></span>' : '<span class="layui-tree-iconClick"><i class="layui-icon ' + ( r.spread ? "layui-tree-active" : "layui-tree-iconArrow") + (l ? "" : c)+' "></i></span>'
                    return t.showLine ? l ? '<span class="layui-tree-iconClick layui-tree-icon"><i class="layui-icon ' + (r.spread ? "layui-icon-subtraction" : "layui-icon-addition") + '"></i></span>' : '<span class=""><i class=""></i></span>' : '<span class="layui-tree-iconClick"><i class="layui-icon ' + (r.spread ? "layui-tree-active" : "layui-tree-iconArrow") + (l ? "" : c) + ' "></i></span>'

                }(), function () {
                    // 修改复选框设置：如果全局配置则采用全局，否则采用数据项中的配置   (r.showCheckbox && l.showCheckbox)
                    //return t.showCheckbox ? '<input type="checkbox" name="' + (r.field || "layuiTreeCheck_" + r.id) + '" same="layuiTreeCheck" lay-skin="primary" ' + (r.disabled ? "disabled" : "") + ' value="' + r.id + '">' : ""
                    return r.showCheckbox ? '<input type="checkbox" name="' + (r.field || "layuiTreeCheck_" + r.id) + '" same="layuiTreeCheck" lay-skin="primary" ' + (r.disabled ? "disabled" : "") + ' value="' + r.id + '">' : ""
                }(), function () {
                    //修改源码 显示title
                    return t.isJump && r.href ? '<a href="' + r.href + '" target="_blank" class="' + y + '">' + (r.title || r.label || t.text.defaultNodeName) + "</a>" : '<span  class="' + y + (r.disabled ? " " + d : "") + '">' + (r.title || r.label || t.text.defaultNodeName) + "</span>"
                    //return t.isJump && r.href ? '<a title="' + (r.title || r.label || t.text.defaultNodeName) + '"  href="' + r.href + '" target="_blank"' + '">' + (r.title || r.label || t.text.defaultNodeName) + "</a>" : '<span title="' + (r.title || r.label || t.text.defaultNodeName) +(r.disabled ? " " + d : "") + '" >' + (r.title || r.label || t.text.defaultNodeName) + "</span>"

                }(), "</div>", function () {
                    // 节点操作按钮修改为：config配置了edit，同时节点自身也配置edit属性，
                    // 在配置的edit属性的节点放置对应操作按钮
                    /*if (!t.edit) return "";
                    var e = {
                        add: '<i class="layui-icon layui-icon-add-1"  data-type="add"></i>',
                        update: '<i class="layui-icon layui-icon-edit" data-type="update"></i>',
                        del: '<i class="layui-icon layui-icon-delete" data-type="del"></i>'
                    }, i = ['<div class="layui-btn-group layui-tree-btnGroup">'];
                    return t.edit === !0 && (t.edit = ["update", "del"]), "object" == typeof t.edit ? (layui.each(t.edit, function (a, n) {
                        i.push(e[n] || "")
                    }), i.join("") + "</div>") : void 0*/
                    if (!r.edit) return "";
                    var e = {
                        add: '<i class="layui-icon layui-icon-add-1"  data-type="add"></i>',
                        update: '<i class="layui-icon layui-icon-edit" data-type="update"></i>',
                        del: '<i class="layui-icon layui-icon-delete" data-type="del"></i>'
                    }, i = ['<div class="layui-btn-group layui-tree-btnGroup">'];
                    return r.edit === !0 && (r.edit = ["update", "del"]), "object" == typeof r.edit ? (layui.each(r.edit, function (a, n) {
                        i.push(e[n] || "")
                    }), i.join("") + "</div>") : void 0

                }(), "</div></div>"].join(""));
            l && (h.append(o), n.tree(o, r.children)), e.append(h), h.prev("." + s)[0] && h.prev().children(".layui-tree-pack").addClass("layui-tree-showLine"), l || h.parent(".layui-tree-pack").addClass("layui-tree-lineExtend"), n.spread(h, r), t.showCheckbox && (r.checked && n.checkids.push(r.id), n.checkClick(h, r)), t.edit && n.operate(h, r)
        })
    }, b.prototype.spread = function (e, a) {
        var n = this, t = n.config, r = e.children("." + p), l = r.children("." + f), c = r.find("." + o)
           /* k = r.find("." + y)*/, m = t.onlyIconControl ? c : l, x = "";
        m.on("click", function (i) {
            var ax = e.children("." + v),//a冲突 改成ax
                // n = m.children(".layui-icon")[0] ? m.children(".layui-icon") : m.find(".layui-tree-icon").children(".layui-icon");
                n = m.children(".layui-icon")[0] ? m.find(".layui-tree-iconClick").children(".layui-icon") : m.find(".layui-tree-icon").children(".layui-icon");
            if (ax[0]) {//
                //展开节点 2019-11-5
                if (!e.hasClass(c) && !e.hasClass(C)) {
                    t.spread && t.spread({
                        elem: e,
                        state: a.children.length > 0,
                        data: a
                    })
                }
                //end

                // 修改源码，调整为点击节点文字，节点不收缩
                /*if (e.hasClass(C)) e.removeClass(C), a.slideUp(200), n.removeClass(u).addClass(h); else if (e.addClass(C), a.slideDown(200), n.addClass(u).removeClass(h), t.accordion) {
                    var r = e.siblings("." + s);
                    r.removeClass(C), r.children("." + v).slideUp(200), r.find(".layui-tree-icon").children(".layui-icon").removeClass(u).addClass(h)
                }*/

                if (e.hasClass(C) && !$(i.target).hasClass("layui-tree-txt")) {
                    e.removeClass(C), ax.slideUp(200)
                    //修改源码，调整无实线状态时三角图标有动画
                    if (!t.showLine) {

                        m.find('span .layui-icon').removeClass(aa).addClass(bb)
                    } else {
                        n.removeClass(u).addClass(h)
                    }

                } else if (e.addClass(C), ax.slideDown(200), n.addClass(u).removeClass(h), t.accordion) {
                    var r = e.siblings("." + s);
                    r.removeClass(C), r.children("." + v).slideUp(200), r.find(".layui-tree-icon").children(".layui-icon").removeClass(u).addClass(h)
                } else if (!t.showLine) {
                    m.find('span .layui-icon').removeClass(bb).addClass(aa)
                }

            } else {
                x = "normal"
            }
        })/*, k.on("click", function () {
            // 单击选中节点高亮显示，动态添加.layui-table-click样式  一如既往20191104
            e.parents('.layui-tree').find('.layui-table-click').removeClass('layui-table-click');

            var n = i(this);
            r.addClass('layui-table-click')
            n.hasClass(d) || (x = e.hasClass(C) ? t.onlyIconControl ? "open" : "close" : t.onlyIconControl ? "close" : "open", t.click && t.click({
                elem: e,
                state: x,
                data: a
            }))
        })*/
    }, b.prototype.setCheckbox = function (e, i, a) {
        var n = this, t = (n.config, a.prop("checked"));
        if (!a.prop("disabled")) {
            // 此处注释掉了源码 如果不注释掉，setChechk()时子节点不能回显
            /*if ("object" == typeof i.children || e.find("." + v)[0]) {
                var r = e.find("." + v).find('input[same="layuiTreeCheck"]');
                r.each(function () {
                    this.disabled || (this.checked = t)
                })
            }*/
            var l = function (e) {
                if (e.parents("." + s)[0]) {
                    var i, a = e.parent("." + v), n = a.parent(), r = a.prev().find('input[same="layuiTreeCheck"]');
                    t ? r.prop("checked", t) : (a.find('input[same="layuiTreeCheck"]').each(function () {
                        this.checked && (i = !0)
                    }), i || r.prop("checked", !1)), l(n)
                }
            };
            // 此处注释掉了源码  l(e)向上遍历选中根节点  n.renderForm("checkbox")向下遍历选中所有子节点
            //l(e), n.renderForm("checkbox")
        }
    }, b.prototype.checkClick = function (e, a) {
        var n = this, t = n.config, r = e.children("." + p), l = r.children("." + f);
        l.on("click", 'input[same="layuiTreeCheck"]+', function (r) {
            layui.stope(r);
            var l = i(this).prev(), c = l.prop("checked");
            l.prop("disabled") || (n.setCheckbox(e, a, l), t.oncheck && t.oncheck({ elem: e, checked: c, data: a }))
        })
    }, b.prototype.operate = function (e, a) {
        var t = this, r = t.config, l = e.children("." + p), d = l.children("." + f);
        l.children(".layui-tree-btnGroup").on("click", ".layui-icon", function (l) {
            layui.stope(l);
            var f = i(this).data("type"), b = e.children("." + v), g = { data: a, type: f, elem: e };
            if ("add" == f) {
                // 屏蔽添加操作，交由回调函数处理
                /*b[0] ||
                (r.showLine
                        ? (d.find("." + o).addClass("layui-tree-icon"),
                            d.find("." + o).children(".layui-icon").addClass(h).removeClass("layui-icon-file"))
                        : d.find(".layui-tree-iconArrow").removeClass(c),
                        e.append('<div class="layui-tree-pack"></div>')
                );
                var w = r.operate && r.operate(g),
                    N = {};
                if (N.title = r.text.defaultNodeName, N.id = w, t.tree(e.children("." + v), [N]), r.showLine)
                    if (b[0]) b.hasClass(x) || b.addClass(x),
                        e.find("." + v).each(function () {
                            i(this).children("." + s).last().addClass(k)
                        }),
                        b.children("." + s).last().prev().hasClass(k)
                            ? b.children("." + s).last().prev().removeClass(k)
                            : b.children("." + s).last().removeClass(k), !e.parent("." + v)[0] && e.next()[0] && b.children("." + s).last().removeClass(k);
                    else {
                        var T = e.siblings("." + s), L = 1, A = e.parent("." + v);
                        layui.each(T, function (e, a) {
                            i(a).children("." + v)[0] || (L = 0)
                        }), 1 == L ? (T.children("." + v).addClass(m), T.children("." + v).children("." + s).removeClass(k), e.children("." + v).addClass(m), A.removeClass(x), A.children("." + s).last().children("." + v).children("." + s).last().addClass(k)) : e.children("." + v).children("." + s).addClass(k)
                    }
                if (!r.showCheckbox) return;
                if (d.find('input[same="layuiTreeCheck"]')[0].checked) {
                    var I = e.children("." + v).children("." + s).last();
                    I.find('input[same="layuiTreeCheck"]')[0].checked = !0
                }
                t.renderForm("checkbox")*/

                r.operate && r.operate(g)
            } else if ("update" == f) {
                // 屏蔽修改操作，交由回调函数处理
                /* var F = d.children("." + y).html();
                 d.children("." + y).html(""), d.append('<input type="text" class="layui-tree-editInput">'), d.children(".layui-tree-editInput").val(F).focus();
                 var j = function (e) {
                     var i = e.val().trim();
                     i = i ? i : r.text.defaultNodeName, e.remove(), d.children("." + y).html(i), g.data.title = i, r.operate && r.operate(g)
                 };
                 d.children(".layui-tree-editInput").blur(function () {
                     j(i(this))
                 }), d.children(".layui-tree-editInput").on("keydown", function (e) {
                     13 === e.keyCode && (e.preventDefault(), j(i(this)))
                 })*/

                r.operate && r.operate(g)
            } else {
                /*n.confirm('确认删除该节点 "<span style="color: #999;">' + (a.title || "") + '</span>" 吗？', function (a) {
                    if (r.operate && r.operate(g), g.status = "remove", n.close(a), !e.prev("." + s)[0] && !e.next("." + s)[0] && !e.parent("." + v)[0])
                        return e.remove(), void t.elem.append(t.elemNone);
                    if (e.siblings("." + s).children("." + p)[0]) {
                        if (r.showCheckbox) {
                            var l = function (e) {
                                if (e.parents("." + s)[0]) {
                                    var a = e.siblings("." + s).children("." + p), n = e.parent("." + v).prev(),
                                        r = n.find('input[same="layuiTreeCheck"]')[0], c = 1, d = 0;
                                    0 == r.checked && (a.each(function (e, a) {
                                        var n = i(a).find('input[same="layuiTreeCheck"]')[0];
                                        0 != n.checked || n.disabled || (c = 0), n.disabled || (d = 1)
                                    }), 1 == c && 1 == d && (r.checked = !0, t.renderForm("checkbox"), l(n.parent("." + s))))
                                }
                            };
                            l(e)
                        }
                        if (r.showLine) {
                            var d = e.siblings("." + s), h = 1, f = e.parent("." + v);
                            layui.each(d, function (e, a) {
                                i(a).children("." + v)[0] || (h = 0)
                            }), 1 == h ? (b[0] || (f.removeClass(x), d.children("." + v).addClass(m), d.children("." + v).children("." + s).removeClass(k)), e.next()[0] ? f.children("." + s).last().children("." + v).children("." + s).last().addClass(k) : e.prev().children("." + v).children("." + s).last().addClass(k), e.next()[0] || e.parents("." + s)[1] || e.parents("." + s).eq(0).next()[0] || e.prev("." + s).addClass(k)) : !e.next()[0] && e.hasClass(k) && e.prev().addClass(k)
                        }
                    } else {
                        var y = e.parent("." + v).prev();
                        if (r.showLine) {
                            y.find("." + o).removeClass("layui-tree-icon"), y.find("." + o).children(".layui-icon").removeClass(u).addClass("layui-icon-file");
                            var w = y.parents("." + v).eq(0);
                            w.addClass(x), w.children("." + s).each(function () {
                                i(this).children("." + v).children("." + s).last().addClass(k)
                            })
                        } else y.find(".layui-tree-iconArrow").addClass(c);
                        e.parents("." + s).eq(0).removeClass(C), e.parent("." + v).remove()
                    }
                    e.remove()
                })*/

                r.operate && r.operate(g)
            }
        })
    }, b.prototype.events = function () {
        var e = this, a = e.config;
        e.elem.find(".layui-tree-checkedFirst");
        e.setChecked(e.checkids), e.elem.find(".layui-tree-search").on("keyup", function () {
            var n = i(this), t = n.val(), r = n.nextAll(), l = [];

            r.find("." + y).each(function () {
                var e = i(this).parents("." + p);
                if (i(this).html().indexOf(t) != -1) {
                    l.push(i(this).parent());
                    var a = function (e) {
                        e.addClass("layui-tree-searchShow"), e.parent("." + v)[0] && a(e.parent("." + v).parent("." + s))
                    };
                    a(e.parent("." + s))
                }
            }), r.find("." + p).each(function () {
                var e = i(this).parent("." + s);
                e.hasClass("layui-tree-searchShow") || e.addClass(c)
            }), 0 == r.find(".layui-tree-searchShow").length && e.elem.append(e.elemNone), a.onsearch && a.onsearch({ elem: l })
        }), e.elem.find(".layui-tree-search").on("keydown", function () {
            i(this).nextAll().find("." + p).each(function () {
                var e = i(this).parent("." + s);
                e.removeClass("layui-tree-searchShow " + c)
            }), i(".layui-tree-emptyText")[0] && i(".layui-tree-emptyText").remove()
        })
    }, b.prototype.getChecked = function () {
        var e = this, a = e.config, n = [], t = [];
        e.elem.find(".layui-form-checked").each(function () {
            n.push(i(this).prev()[0].value)
        });
        var r = function (e, a) {
            layui.each(e, function (e, t) {
                layui.each(n, function (e, n) {
                    if (t.id == n) {
                        var l = i.extend({}, t);
                        return delete l.children, a.push(l), t.children && (l.children = [], r(t.children, l.children)), !0
                    }
                })
            })
        };
        return r(i.extend({}, a.data), t), t
    }, b.prototype.setChecked = function (e) {
        var a = this;
        a.config;
        a.elem.find("." + s).each(function (a, n) {

            var t = i(this).data("id"), r = i(n).children("." + p).find('input[same="layuiTreeCheck"]'), l = r.next();

            if ("number" == typeof e) {
                if (t == e) return r[0].checked || l.click(), !1
            } else "object" == typeof e && layui.each(e, function (e, i) {
                if (i == t && !r[0].checked) return l.click(), !0
            })
        })
    }, l.that = {}, l.config = {}, r.reload = function (e, i) {
        var a = l.that[e];
        return a.reload(i), l.call(a)
    }, r.children = function (e, i, d) { //一如既往2019-9-19
        var a = l.that[e];
        return a.children(i, d)
    }, r.getChecked = function (e) {
        var i = l.that[e];
        return i.getChecked()
    }, r.setChecked = function (e, i) {
        var a = l.that[e];
        return a.setChecked(i)
    }, r.render = function (e) {
        var i = new b(e);
        return l.call(i)
    }, e(t, r)
});