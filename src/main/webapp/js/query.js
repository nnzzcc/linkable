function nzc_query() {
    this.init()
    this.form = undefined;
    this.laydate = undefined;
}
//初始化
nzc_query.prototype.init = function () {
    layui.use(['form'], () => {
        this.form = layui.form
    })
    $("#query-btn-confirm").on("click", (this.confirm.bind(this)));
    $("#query-btn-reset").on("click", (this.reset.bind(this)));
    layui.use('laydate', () => {
        this.laydate = layui.laydate;
        //执行一个laydate实例
        this.laydate.render({
            elem: '#nzc-end_date' //指定元素
        });
        this.laydate.render({
            elem: '#nzc-start_date' //指定元素
        });
    });
}
//确定按钮事件
nzc_query.prototype.confirm = function () {
    var data = this.form.val('query-form');
    window.open('result-table.html'+"? param1=value1&param2=value2", '_blank')
    console.log(data);
}
//重置按钮事件
nzc_query.prototype.reset = function () {
    $('#query-form')[0].reset();
    window.nzc_head.clear_radio();
}