function nzc_login() {
    this.init()

}
//初始化登录
nzc_login.prototype.init = function () {
    layui.use('element', function () {
        var element = layui.element; //导航的hover效果、二级菜单等功能，需要依赖element模块
        //监听导航点击
        element.on('nav(login)', (elem) => {
            if (elem.text() == '修改表头') {
                window.open('set-table.html', '_blank')
            } else {
                layer.msg(elem.text());
            }
            //console.log(elem)
            //  
        });
    });

}
//确定按钮事件
/*nzc_login.prototype.confirm = function () {

}
//重置按钮事件
nzc_login.prototype.reset = function () {

}*/