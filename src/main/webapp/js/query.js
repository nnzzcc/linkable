function nzc_query() {
    this.init()
    this.form = undefined;
}
//初始化
nzc_query.prototype.init = function () {
    layui.use(['form'], () => {
        this.form = layui.form
    })
    $("#query-btn-confirm").on("click", (this.confirm.bind(this)));
    $("#query-btn-reset").on("click", (this.reset.bind(this)));
}
//确定按钮事件
nzc_query.prototype.confirm = function () {
    var data = this.form.val('query-form');
    window.open('result-table.html', '_blank')
    console.log(data);
}
//重置按钮事件
nzc_query.prototype.reset = function () {
    $('#query-form')[0].reset();
    window.nzc_head.clear_radio();
}