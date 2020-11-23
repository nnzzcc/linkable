function nzc_tree(containerId) {
    this.initialize_data = undefined;
    this.divid = containerId;
    this.inst1 = undefined;
    this.tree = undefined;
    this.init();
}
//初始化树
nzc_tree.prototype.init = function () {
    //初始化树时先添加好的节点
    this.initialize_data = [{
        title: '<i class="layui-icon layui-icon-template-1"></i>目录',
        spread: true,
        id: 1,
        children: [{
            title: '<i class="layui-icon layui-icon-template-1"></i>标准件',
            id: 11,
            children: [{
                title: '<i class="layui-icon layui-icon-template-1"></i>IBB螺栓、螺柱',
                children: [],
                id: 111
            }]
        }, {
            title: '<i class="layui-icon layui-icon-template-1"></i>通用件',
            id: 12,
            children: [{
                title: '<i class="layui-icon layui-icon-template-1"></i>IBB螺栓、螺柱',
                id: 121,
                children: []
            }]
        }, {
            title: '<i class="layui-icon layui-icon-template-1"></i>原材料',
            id: 13,
            children: [{
                title: '<i class="layui-icon layui-icon-template-1"></i>IBB螺栓、螺柱',
                children: [],
                id: 131,
            }]
        }]
    }]
    //初始化图层树
    layui.use(['layer', 'form', 'tree'], () => {
        this.tree = layui.tree;
        this.inst1 = this.tree.render({
            id: 'tree-menu',
            elem: '#' + this.divid,  //绑定元素
            data: this.initialize_data,
            spread: (obj) => {
                if (obj.data.id > 100) {
                    this.add(obj.data.id);
                }
            }
        });
    });
}
//添加构建到树中(模拟懒加载)
nzc_tree.prototype.add = function (id) {
    //生成假数据
    var data_child = []
    for (var i = 0; i < 100; i++) {
        data_child.push({
            title: '<i class="layui-icon layui-icon-component"></i>gb_t5728.prj',
            id: 10 + i
        })
    }
    //添加到树中
    this.tree.children('tree-menu', id, data_child)
}