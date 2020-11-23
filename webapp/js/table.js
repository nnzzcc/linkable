function nzc_table(table_data, type) {
    this.table = undefined;
    this.type = type;
    this.table_data = table_data
    this.layer = undefined;
    this.laypage = undefined;
    this.init()
}
//初始化
nzc_table.prototype.init = function () {
    //初始化分页
    layui.use(['laypage', 'layer'], () => {
        this.laypage = layui.laypage;
        this.layer = layui.layer;
        this.laypage.render({
            elem: 'demo7'
            , count: 20
            , limit: 50
            , layout: ['count', 'prev', 'page', 'next', 'skip']
            , jump: function (obj) {
                console.log(obj)
            }
        });
    });
    //根据不同功能切换表头
    var cols = this.setTable(type);

    //初始化table
    layui.use('table', () => {
        this.table = layui.table;
        //展示已知数据
        this.table.render({
            elem: '#result-table'
            , cols: cols
            , data: this.table_data
            //,skin: 'line' //表格风格
            , even: true
            // page: true, //是否显示分页
            , height: 'full-320' //高度最大化减去差值
            //,limits: [5, 7, 10]
            , limit: this.table_data.length //每页默认显示的数量
        });
        this.table.on('rowDouble(result-table)', this.DoubleClickTable.bind(this))
    });
    $("#no-data").on("click", (this.onclick_btn.bind(this)));
}
//点击没有数据按钮
nzc_table.prototype.onclick_btn = function () {
    window.open('apply.html', '_blank')
}
//双击表格数据事件
nzc_table.prototype.DoubleClickTable = function (obj) {
    var data = obj.data;

    this.layer.alert(JSON.stringify(data), {
        title: '当前行数据：'
    });

    //标注选中样式
    obj.tr.addClass('layui-table-click').siblings().removeClass('layui-table-click');
}
nzc_table.prototype.setTable = function (mod) {
    if (mod == 3) {
        return [[ //标题栏
            { field: 'pastProject', title: '项目号', width: 90, fixed: 'left' }
            , { field: 'description', title: '项目描述', width: 90 }
            , { field: 'componentClass', title: '物料类型', width: 90 }
            , { field: 'component', title: '物料组', width: 120 }
            , { field: 'storage', title: '同通件库入库物料数', width: 120 }
            , { field: 'componentAcount', title: '项目使用总物料数', width: 150 }
            , { field: 'usageRate', title: '使用率', width: 150 }
        ]]
    } else if (mod == 2 || mod == 5) {
        return [[ //标题栏
            { field: 'matName', title: '物料号', width: 160, fixed: 'left' }
            , { field: 'componentDescription', title: '物料描述', width: 90 }
            , { field: 'industryStandard', title: '工业标准', width: 150 }
            , { field: 'surface', title: '表面处理', width: 90 }
            , { field: 'materialName', title: '材质', width: 80 }
            , { field: 'materialStandard', title: '材质(标准)', width: 150 }
            , { field: 'projectCreateDate', title: '项目创建日期', width: 150 }
            , { field: 'pastProject', title: '项目号', width: 80 }
            , { field: 'description', title: '项目描述', width: 90 }
            , { field: 'projectAmount', title: '项目使用数量', width: 120 }
            , { field: 'queueNumber', title: '项目使用列数', width: 120 }
            , { field: 'frequencySum', title: '合并频次', width: 120 }
            , { field: 'projectFrequency', title: '项目使用频次', width: 120 }
        ]]
    } else {
        return [[ //标题栏
            { field: 'matName', title: '物料号', width: 160, fixed: 'left' }
            , { field: 'componentClass', title: '物料分类', width: 90 }
            , { field: 'component', title: '物料组', minWidth: 140 }
            , { field: 'componentDescription', title: '物料描述(中文)', minWidth: 160 }
            , { field: 'materialName', title: '材质', width: 80 }
            , { field: 'materialStandard', title: '材质(标准)', width: 150 }
            , { field: 'industryStandard', title: '工业标准', width: 150 }
            , { field: 'specification', title: '规格型号', width: 90 }
            , { field: 'additionalInfo', title: '附加信息', minWidth: 90 }
            , { field: 'standardNumber', title: '标准代号', minWidth: 90 }
            , { field: 'craft', title: '工艺属性', minWidth: 90 }
            , { field: 'part', title: '部位', minWidth: 80 }
            , { field: 'pastProject', title: '历史项目', width: 90 }
            , { field: 'inventory', title: '库存', width: 80 }
            , { field: 'star', title: '星级评定', width: 90 }
            , { field: 'frequency', title: '选用次数(搭建BOM选用次数)', width: 150 }
            , { field: 'supplier', title: '供应商', width: 80 }
            , { field: 'movingAveragePrice', title: '移动平均价', width: 110 }
            , { field: 'purchaseCycle', title: '采购平均周期', minWidth: 130 }
            , { field: 'purchaseQuantityPerYear', title: '年采购量', minWidth: 90 }
            , { field: 'consumptionPerYear', title: '年用量', minWidth: 80 }
            , { field: 'idt', title: '等同标准', minWidth: 90 }
            , { field: 'eqv', title: '等效标准', minWidth: 90 }
            , { field: 'internationalStandard', title: '国内/国外标准', width: 120 }
            , { field: 'permissionState', title: '许用状态', width: 90 }
            , { field: 'feature', title: '质量特性', width: 90 }
            , { field: 'modifyDate', title: '修改时间', width: 170 }
        ]]

    }

}
