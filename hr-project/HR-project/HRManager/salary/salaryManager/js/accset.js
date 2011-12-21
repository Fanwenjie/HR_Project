/// <reference path="../ext-3.4.0/vswd-ext_2.0.2.js" />

function initInputPanel(){
   
    
    zt_data =  [
        ['scbzt','生产部帐套'],
        ['yxbzt','营销部帐套'],
        ['qb','全部']
    ];
    //工具栏帐套下拉框
    var acc_combo = new Ext.form.ComboBox({
        store: new Ext.data.SimpleStore({fields:['key','value'],
            data: zt_data
        }),
        name: 'acc_name',
        emptyText: '所有',
        mode: 'local',
        triggerAction: 'all',
        valueField: 'key',
        displayField: 'value',
        editable: false,
        allBlank: false,
        id: 'acc_name',
        width:100,
        value: '全部'
    });
    
    
    //部门下拉框
    var bum_combo = new Ext.form.ComboBox({
        store: new Ext.data.SimpleStore({fields:['key','value'],
            data: [['xzb','行政部'],['scb','生产部']]
        }),
        name: 'fva_bumen',
        emptyText: '所有',
        mode: 'local',
        triggerAction: 'all',
        valueField: 'key',
        displayField: 'value',
        editable: false,
        allBlank: false,
        id: 'fva_bumen',
        width:100
    });
    
    //查询我条件下拉框
    var con_combox = new Ext.form.ComboBox({
        store: new Ext.data.SimpleStore({fields:['key','value'],
            data: [['nl','年龄'],['xb','性别']]
        }),
        name: 'condition',
        mode: 'local',
        triggerAction: 'all',
        valueField: 'key',
        displayField: 'value',
        editable: false,
        allBlank: false,
        emptyText: '查询条件',
        id: 'condition',
        width:100
    });
    
    
     //逻辑关系下拉框
    var boo_combo = new Ext.form.ComboBox({
        store: new Ext.data.SimpleStore({fields:['key','value'],
            data: [['bh','包含'],['dy','等于'],['bbh','不包含'],['bdy','不等于']]
        }),
        name: 'boocondition',
        mode: 'local',
        triggerAction: 'all',
        valueField: 'key',
        displayField: 'value',
        editable: false,
        allBlank: false,
        emptyText: '逻辑关系',
        id: 'boocondition',
        width:80
    });
    
    
    //工具栏一
    var tbar = new Ext.Toolbar({
        items: [
            '-',
            '帐套：',acc_combo,'-',
            '部门：',bum_combo,'-',
            con_combox,boo_combo,
        {
            id:'txt_condition',
            xtype:'textfield'
        },{
            id: 'btn_select',
            xtype: 'button',
            text: '查询'
        }]
    });      
    
    var acc_sm = new Ext.grid.CheckboxSelectionModel();
    //表格列
    var acc_cm = new Ext.grid.ColumnModel([
        new Ext.grid.RowNumberer(),
        {header:'<div style="text-align:center">工号</div>',dataIndex:'per_sno',width:100,sortable:true,align:'center'},
        {header:'<div style="text-align:center">姓名</div>',dataIndex:'per_name',width:100,sortable:true,align:'center'},
        {header:'<div style="text-align:center">部门</div>',dataIndex:'per_bumen',width:100,sortable:true,align:'center'},
        {header:'<div style="text-align:center">工资帐套</div>',dataIndex:'per_acc',width:100,sortable:true,align:'center'},
        {header:'<div style="text-align:center">配置</div>',dataIndex:'per_set',width:80,align:'center',
            renderer:function(){
                return "<input type='button'value='配置' />";
            }//如果可以，改成下拉框
        }
    ]);
    
    //表格原始数据
    var acc_data = [
        ['scbzt','001','张三','生产部','帐套一'], 
        ['yxbzt','001','张三','生产部','帐套一'], 
        ['scbzt','001','张三','生产部','帐套一'],  
        ['yxbzt','001','张三','生产部','帐套一'],
        ['yxbzt','001','张三','生产部','帐套一']
    ];
    
    //表格数据源
    var acc_store = new Ext.data.Store({
        proxy: new Ext.data.MemoryProxy(acc_data),
        reader: new Ext.data.ArrayReader({},[
            {name:'per_sno',mapping:1},
            {name:'per_name',mapping:2},
            {name:'per_bumen',mapping:3},
            {name:'per_acc',mapping:4}
        ])
    });
    
    acc_store.load();

    var form = new Ext.FormPanel({
        header:false,
        labelSeparator:':',
        footer:true,
        layout:'fit',
        tbar:tbar,
        height:formHeight,
        items:[{
            model: 'local',
            xtype: 'grid',
            cm:acc_cm,
            ds:acc_store,
            sm:acc_sm,
            bbar : new Ext.PagingToolbar({              
                    store:acc_store,
                    buttonAlign:'center',
                    pageSize:_limit,  
                    displayInfo:true,  
                    displayMsg: '从第 {0} 条到 {1} 条记录，共 {2} 条',   
                    emptyMsg: '没有记录',   
                    beforePageText :'第',  
                    afterPageText :'页,共  {0}  页',  
                    firstText  : '首页',  
                    prevText  : '上一页',  
                    nextText  : '下一页',  
                    lastText  : '末页'      	          
            }),
        }]
    });
        
    return form;
};





//页面ready函数
Ext.onReady(function(){
    var panel = initInputPanel();
    panel.render('model');
});

