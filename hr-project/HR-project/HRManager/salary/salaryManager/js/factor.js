/// <reference path="../ext-3.4.0/vswd-ext_2.0.2.js" />

Ext.onReady(function(){
    //******************************************************************************************************//
    //*******************************公共初始化块***********************************************************//
    //*****************************************************************************************************//
    Ext.QuickTips.init();
    
    //根据值改变颜色示例
    function fac_renderSex(value){
        if (value == '1'){
            return "<span style='color:red;font-weight:bold;'>"+value+"</span>";
        }
        else{
            return "<span style='color:green;font-weight:bold;'>"+value+"</span>";
        }
    }
    
    

    
    //表格列
    var fac_cm = new Ext.grid.ColumnModel([
        new Ext.grid.RowNumberer(),
        {header:'<div style="text-align:center">因子名称</div>',dataIndex:'fname',width:150,sortable:true,align:'center'},
        {header:'<div style="text-align:center">类型</div>',dataIndex:'ftype',width:100,sortable:true,align:'center'}
    ]);
    
    //表格原始数据
    var fac_data = [
        ['1','1','档案信息','XX工序一的价格','1','顾名思义','张三','2011-12-14','2011-12-14','1'], 
        ['2','1','档案信息','XX工序一的价格','1','顾名思义','张三','2011-12-14','2011-12-14','1'], 
        ['3','1','档案信息','XX工序一的价格','1','顾名思义','张三','2011-12-14','2011-12-14','1'], 
        ['4','1','档案信息','XX工序一的价格','1','顾名思义','张三','2011-12-14','2011-12-14','1'], 
        ['5','1','档案信息','XX工序一的价格','1','顾名思义','张三','2011-12-14','2011-12-14','1']
    ];
    
    //表格数据源
    var fac_store = new Ext.data.Store({
        proxy: new Ext.data.MemoryProxy(fac_data),
        reader: new Ext.data.ArrayReader({},[
            {name:'fname',mapping:3},
            {name:'ftype',mapping:2}
        ])
    });
    
    /*store = new Ext.data.JsonStore({
            root: 'data',
            totalProperty: 'totalCount',
            url: '../Ajax/CMSNews.ashx?type=select_Title',
            fields: [
            {name:'new_id'},
                {name: 'new_time',type: 'auto'},
                {name: 'new_title'},
                {name:'new_content'}
            ] 
        });*/
    fac_store.load();
    
    //因子类型ComboBox的内容
    var fty_combox = new Ext.form.ComboBox({
        store: new Ext.data.SimpleStore({fields:['key','value'],
            data: [['base','档案信息'],['else','其他']]
        }),
        name: 'ttype',
        fieldLabel: '所属类型',
        mode: 'local',
        triggerAction: 'all',
        valueField: 'key',
        displayField: 'value',
        editable: false,
        allBlank: false,
        value: '其他',
        id: 'ftype'
    });
    
    
    //主
    var text = new Ext.form.FormPanel({
        width:formWidth-5,
        height:formHeight-5,
        title: '因子管理',
        renderTo: 'model',
        layout:'column',
        items: [{
            columnWidth: 0.415,      //左边grid部分
            layout: 'fit',
            style: {
                "margin-left": "10px",
                "margin-right": Ext.isIE6 ? (Ext.isStrict ? "-10px" : "-13px") : "0",
                "margin-top": "10px"
            },
            items: {
                xtype: 'grid',
                ds: fac_store,
                cm: fac_cm,
                id:'grid',
                height: 290
            }
        },{
            columnWidth: 0.57,      //右边部分      
            labelWidth: 70,
            height: 290,
            xtype: 'fieldset',
            buttonAlign: 'center',
            style: {
                "margin-left": "10px",
                "margin-right": Ext.isIE6 ? (Ext.isStrict ? "-10px" : "-13px") : "0",
                "margin-top": "10px",
                "padding": "10px 0 0 10px"

            },
            items: [{
                fieldLabel: '名称',
                anchor: '95%',
                xtype: 'textfield',
                name: 'fac_name',
                maxLength: 20,
            },fty_combox,{
                fieldLabel: '描述',
                anchor: '95%',
                xtype: 'textarea',
                name: 'fac_describe',
                maxLength: 200,
                height: 100
            },{
                fieldLabel: '状态',
                boxLabel: '默认值（选择了该项后月末不会清除因子的值）',
                anchor: '95%',
                xtype: 'checkbox',
                name: 'fac_isdefault'
            },{
                fieldLabel: '制作人',
                anchor: '95%',
                xtype: 'label',
                name: 'fac_maker'
            },{
                fieldLabel: '制作时间',
                anchor: '95%',
                xtype: 'label',
                name: 'fac_madetime'
            },{
                fieldLabel: '修改时间',
                anchor: '95%',
                xtype: 'label',
                name: 'fac_changetime'
            }],
            buttons: [{
                text: '新增'
            },{
                text: '保存'
            },{
                text: '删除'
            }]
        }]
    });
    
    

});