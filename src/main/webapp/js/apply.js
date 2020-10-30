function nzc_apply() {
    this.init()
    this.form = undefined;
    this.laydate = undefined;
}
//初始化
nzc_apply.prototype.init = function () {
    layui.use(['form'], () => {
        this.form = layui.form
    })
    $("#apply-btn-confirm").on("click", (this.confirm.bind(this)));
    $("#apply-btn-reset").on("click", (this.reset.bind(this)));
}
//确定按钮事件
nzc_apply.prototype.confirm = function () {
    var data = this.form.val('apply-form');
 //  window.open('result-table.html', '_blank')
    console.log(data);
}
//重置按钮事件
nzc_apply.prototype.reset = function () {
    window.close()
}