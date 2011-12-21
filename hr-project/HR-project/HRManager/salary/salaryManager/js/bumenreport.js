/// <reference path="../ext-3.4.0/vswd-ext_2.0.2.js" />

function initInputPanel(){
   
    

    
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
    

    
    
     //年份下拉框
    var year_combo = new Ext.form.ComboBox({
        store: new Ext.data.SimpleStore({fields:['key','value'],
            data: [['2009','2009'],['2008','2008'],['2007','2007'],['2006','2006']] //年份数据要动态给出
        }),
        name: 'year',
        mode: 'local',
        triggerAction: 'all',
        valueField: 'key',
        displayField: 'value',
        editable: false,
        allBlank: false,
        value: '2009',
        id: 'year',
        width:80
    });
    
    
    //工具栏一
    var tbar = new Ext.Toolbar({
        items: [
            '-',
            '部门：',bum_combo,'-',
            '年份：',year_combo,'-',
        {
            id:'btn_outPut',
            xtype:'button',
            text: '导出'
        },{
            id: 'btn_type',
            xtype: 'button',
            text: '打印'
        }]
    });      
    
    var acc_sm = new Ext.grid.CheckboxSelectionModel();
    //表格列
    var acc_cm = new Ext.grid.ColumnModel([
        new Ext.grid.RowNumberer(),
        {header:'<div style="text-align:center">部门</div>',dataIndex:'bumen',width:100,sortable:true,align:'center'},
        {header:'<div style="text-align:center">1月</div>',dataIndex:'jan',width:50,sortable:true,align:'center'},
        {header:'<div style="text-align:center">2月</div>',dataIndex:'feb',width:50,sortable:true,align:'center'},
        {header:'<div style="text-align:center">3月</div>',dataIndex:'mar',width:50,sortable:true,align:'center'},
        {header:'<div style="text-align:center">4月</div>',dataIndex:'apr',width:50,sortable:true,align:'center'},
        {header:'<div style="text-align:center">5月</div>',dataIndex:'may',width:50,sortable:true,align:'center'},
        {header:'<div style="text-align:center">6月</div>',dataIndex:'jun',width:50,sortable:true,align:'center'},
        {header:'<div style="text-align:center">7月</div>',dataIndex:'jul',width:50,sortable:true,align:'center'},
        {header:'<div style="text-align:center">8月</div>',dataIndex:'aug',width:50,sortable:true,align:'center'},
        {header:'<div style="text-align:center">9月</div>',dataIndex:'sept',width:50,sortable:true,align:'center'},
        {header:'<div style="text-align:center">10月</div>',dataIndex:'oct',width:50,sortable:true,align:'center'},
        {header:'<div style="text-align:center">11月</div>',dataIndex:'nov',width:50,sortable:true,align:'center'},
        {header:'<div style="text-align:center">12月</div>',dataIndex:'dec',width:50,sortable:true,align:'center'},
        {header:'<div style="text-align:center">小计</div>',dataIndex:'sum',width:70,sortable:true,align:'center'}
    ]);
    
    //表格原始数据
    var acc_data = [
        ['1','生产部','1','2','3','4','5','6','7','8','9','10','11','12','72'], 
        ['1','生产部','1','2','3','4','5','6','7','8','9','10','11','12','72'],
        ['1','生产部','1','2','3','4','5','6','7','8','9','10','11','12','72'], 
        ['1','生产部','1','2','3','4','5','6','7','8','9','10','11','12','72'], 
        ['1','生产部','1','2','3','4','5','6','7','8','9','10','11','12','72'],
        ['1','合计','5','10','15','20','25','30','35','40','45','50','55','60','360666666999999']
    ];
    
    //表格数据源
    var acc_store = new Ext.data.Store({
        proxy: new Ext.data.MemoryProxy(acc_data),
        reader: new Ext.data.ArrayReader({},[
            {name:'bumen',mapping:1},
            {name:'jan',mapping:2},
            {name:'feb',mapping:3},
            {name:'mar',mapping:4},
            {name:'apr',mapping:5},
            {name:'may',mapping:6},
            {name:'jun',mapping:7},
            {name:'jul',mapping:8},
            {name:'aug',mapping:9},
            {name:'sept',mapping:10},
            {name:'oct',mapping:11},
            {name:'nov',mapping:12},
            {name:'dec',mapping:13},
            {name:'sum',mapping:14}
        ])
    });
    
    acc_store.load();

    var bmrform = new Ext.FormPanel({
        header:false,
        labelSeparator:':',
        footer:true,
        layout:'fit',
        tbar:tbar,
        height:formHeight-7,
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
           })
        }]
    });
        
    return bmrform;
};





//页面ready函数
Ext.onReady(function(){
    var panel = initInputPanel();
    panel.render('model');
});

