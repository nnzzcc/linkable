function nzc_head() {
    this.init()
    this.select_radio = undefined;
    this.select_from = 0;
    this.form = undefined;
}
//初始化
nzc_head.prototype.init = function () {
    //初始化表达事件
    layui.use('form', () => {
        this.form = layui.form;
        //此处即为 radio 的监听事件
        this.form.on('radio(levelM)', this.change_radio.bind(this));
        //初始化下拉窗
        this.form.on('select(select-form-nzc)', this.change_select_form.bind(this))
    });
    //初始化搜索栏按钮
    $("#btn-query").on("click", (this.onclick_btn.bind(this)));
}
//切换单选点事件
nzc_head.prototype.change_radio = function (data) {
    console.log(data.value)
    this.select_radio = data.value;
    if (data.value === 'Standard_parts') {
        //点选标准件
        $('#yuan').show();
    } else if (data.value === 'General_parts') {
        //点选通用件
        $('#yuan').show();
    } else if (data.value === 'raw_materials') {
        //点选原材料
        $('#yuan').hide();
    }
}
//切换下拉框事件
nzc_head.prototype.change_select_form = function (data) {
    console.log(data.value)
    this.select_from = data.value;
    $('#query-page').hide();
    $('#page').show();
    this.showallfrom()
    switch (data.value) {
        case '1':
            $('#mat_number').hide();
            break;
        case '2':
            $('#mat_number').hide();
            break;
        case '3':
            break;
        case '4':
            $('#mat_number').hide();
            $('#end_date').hide();
            $('#start_date').hide();
            break;
        case '5':
            $('#mat_number').hide();
            break;
        case '6':
            break;
        default:
            return
    }
}
//点击搜索按钮事件
nzc_head.prototype.onclick_btn = function () {
    $("#query-input").val()
}
//重置单选框
nzc_head.prototype.clear_radio = function () {
    this.select_radio = undefined;
    $('input[type=radio][name="level"]:checked').prop("checked", false);
    this.form.render('radio');
}
//显示全部表单
nzc_head.prototype.showallfrom = function () {
    $('#wuliaohao').show();
    $('#end_date').show();
    $('#start_date').show();
}