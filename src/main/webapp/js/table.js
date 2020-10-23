function nzc_table() {
    this.table = undefined;
    this.init()
}
//初始化
nzc_table.prototype.init = function () {
    //初始化分页
    layui.use(['laypage', 'layer'], function () {
        var laypage = layui.laypage
            , layer = layui.layer;
        laypage.render({
            elem: 'demo7'
            , count: 100
            , limit: 50
            , layout: ['count', 'prev', 'page', 'next', 'skip']
            , jump: function (obj) {
                console.log(obj)
            }
        });
    });
    //初始化table
    layui.use('table', function () {
        this.table = layui.table;
        //展示已知数据
        this.table.render({
            elem: '#result-table'
            , cols: [[ //标题栏
                { field: 'id', title: 'ID', width: 80 }
                , { field: 'username', title: '物料分类', width: 80 }
                , { field: 'email', title: '物料组', minWidth: 80 }
                , { field: 'sign', title: '物料描述(中文)', minWidth: 80 }
                , { field: 'sex', title: '材质', width: 80 }
                , { field: 'city', title: '材质(标准)', width: 80 }
                , { field: 'experience', title: '工业标准', width: 80 }
                , { field: '', title: '规格型号', width: 80 }
                , { field: '', title: '附加信息', minWidth: 80 }
                , { field: '', title: '物料描述(中文)', minWidth: 80 }
                , { field: '', title: '历史项目', width: 80 }
                , { field: '', title: '库存', width: 80 }
                , { field: '', title: '星级评定', width: 80 }
                , { field: '', title: '选用次数(搭建BOM选用次数)', width: 80 }
                , { field: '', title: '供应商', width: 80 }
                , { field: '', title: '移动平均价', width: 80 }
                , { field: '', title: '质量特性', width: 80 }
                , { field: '', title: '国内/国外标准', width: 80 }
            ]]
            , data: [{
                "id": "10001"
                , "username": "杜甫"
                , "email": "xianxin@layui.com"
                , "sex": "男"
                , "city": "浙江杭州"
                , "sign": "人生恰似一场修行"
                , "experience": "116"
                , "ip": "192.168.0.8"
                , "logins": "108"
                , "joinTime": "2016-10-14"
            }]
            //,skin: 'line' //表格风格
            , even: true,
            // page: true, //是否显示分页
            height: 'full-320' //高度最大化减去差值
            //,limits: [5, 7, 10]
            //,limit: 5 //每页默认显示的数量
        });
    });
    $("#no-data").on("click", (this.onclick_btn.bind(this)));
}
//点击没有数据按钮
nzc_table.prototype.onclick_btn = function () {
    window.open('apply.html', '_blank')
}