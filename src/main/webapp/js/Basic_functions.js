function nzc_basic() {
    this.init()
    this.form = undefined;
}
//初始化
nzc_basic.prototype.init = function () {
    layui.use(['form'], () => {
        this.form = layui.form
    })
    $("#btn-confirm").on("click", (this.confirm.bind(this)));
    $("#btn-reset").on("click", (this.reset.bind(this)));
}
//确定按钮事件
nzc_basic.prototype.confirm = function () {
    var data = this.form.val('query-form');
    window.open('result-table.html', '_blank')
    console.log(data);
}
//重置按钮事件
nzc_basic.prototype.reset = function () {
    //请客清空
    $('#basic-form')[0].reset();
    window.nzc_head.clear_radio();
}