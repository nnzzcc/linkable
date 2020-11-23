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
    //绑定input模仿
    $("#materialName_Q").bind('input propertychange', function() {
        var a = $("#materialName_Q")
        console.log(a)
       // $(".box2").val(a);
    })
}
//确定按钮事件
nzc_query.prototype.confirm = function () {
    var data = this.form.val('query-form');
    window.open('result-table.html', '_blank');
    window.localStorage.data = JSON.stringify(data);
    window.localStorage.type = 1;
    console.log(data);
}
//重置按钮事件
nzc_query.prototype.reset = function () {
    $('#query-form')[0].reset();
    window.nzc_head.clear_radio();
}