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
                , { field: 'compClass', title: '物料分类', width: 80 }
                , { field: 'component', title: '物料组', minWidth: 80 }
                , { field: 'compDesc', title: '物料描述(中文)', minWidth: 80 }
                , { field: 'matName', title: '材质', width: 80 }
                , { field: 'matStandard', title: '材质(标准)', width: 80 }
                , { field: 'indStandard', title: '工业标准', width: 80 }
                , { field: 'specMod', title: '规格型号', width: 80 }
                , { field: 'addInfo', title: '附加信息', minWidth: 80 }
                , { field: 'location', title: '部位', minWidth: 80 }
                , { field: 'hxProj', title: '历史项目', width: 80 }
                , { field: 'inventory', title: '库存', width: 80 }
                , { field: 'star', title: '星级评定', width: 80 }
                , { field: 'frequency', title: '选用次数(搭建BOM选用次数)', width: 80 }
                , { field: 'supplier', title: '供应商', width: 80 }
                , { field: 'purCycle', title: '移动平均价', width: 80 }
                , { field: 'eqv', title: '质量特性', width: 80 }
                , { field: 'intStandard', title: '国内/国外标准', width: 80 }
            ]]
            , data: [{
                "id": "10001"
                , "compClass": "杜甫"
                , "component": "xianxin@layui.com"
                , "compDesc": "男"
                , "matStandard": "浙江杭州"
                , "indStandard": "人生恰似一场修行"
                , "addInfo": "116"
                , "star": "192.168.0.8"
                , "purCycle": "108"
                , "intStandard": "2016-10-14"
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