function nzc_basic() {
    this.init()
    this.form = undefined;
    this.laydate = undefined;
}
//初始化
nzc_basic.prototype.init = function () {
    layui.use(['form'], () => {
        this.form = layui.form
    })
    $("#btn-confirm").on("click", (this.confirm.bind(this)));
    $("#btn-reset").on("click", (this.reset.bind(this)));
    $("#btn-back").on("click", (this.back.bind(this)));
   
}
//确定按钮事件
nzc_basic.prototype.confirm = function () {
    var data = this.form.val('basic-form');
    window.open('result-table.html', '_blank')
    console.log(data);
}
//重置按钮事件
nzc_basic.prototype.reset = function () {
    //请客清空
    $('#basic-form')[0].reset();
    window.nzc_head.clear_radio();
}
//返回按钮事件
nzc_basic.prototype.back = function () {
    //返回查询
    $('#query-page').show();
    $('#page').hide();
}