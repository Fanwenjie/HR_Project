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
    
    //因子类型下拉框
    var fty_combox = new Ext.form.ComboBox({
        store: new Ext.data.SimpleStore({fields:['key','value'],
            data: [['base','档案信息'],['else','其他']]
        }),
        name: 'ttype',
        mode: 'local',
        triggerAction: 'all',
        valueField: 'key',
        displayField: 'value',
        editable: false,
        allBlank: false,
        value: '其他',
        id: 'ftype',
        width:100
    });
    
   
    //因子数据源
    var fva_f_store = new Ext.data.SimpleStore({fields:['key','value'],
            data: [['gongxu01','工序一'],['gongxu01','工序二']]
    });
    
     //当前类型下的因子下拉框
    var fva_factor = new Ext.form.ComboBox({
        store: fva_f_store,
        name: 'factor',
        mode: 'local',
        triggerAction: 'all',
        valueField: 'key',
        displayField: 'value',
        editable: false,
        allBlank: false,
        id: 'factor',
        width:120
    });
    
    //批量设置下的因子下拉框
    var pfva_factor = new Ext.form.ComboBox({
        store: fva_f_store,
        name: 'pfactor',
        mode: 'local',
        triggerAction: 'all',
        valueField: 'key',
        displayField: 'value',
        editable: false,
        allBlank: false,
        id: 'pfactor',
        width:120
    });
    
    //工具栏一
    var tbar = new Ext.Toolbar({
        items: [
            '-',
            '部门：',bum_combo,
            '因子类型：',fty_combox,
            '因子：',fva_factor,
            '-','->','-',
        {
            id:'btn_print',
            xtype:'button',
            text:'打印'
        },'-','-',
        {
            id:'btn_excelInput',
            xtype:'button',
            text:'导入EXCEL'
        },'-','-',
        {
            id:'btn_excelOutput',
            xtype:'button',
            text:'导出EXCEL'
        },'-','-',
        {
            id:'btn_save',
            xtype:'button',
            text:'保存'
        },'-']
    });      
    
    //工具栏二    
    var tbar2 = new Ext.Toolbar({
        items : [
            '-','批量设置：',pfva_factor,
        {xtype: 'tbspacer'},'=',
        {xtype: 'tbspacer'},
        {
             xtype:'textfield',
             hideLabel:false,
             fieldLabel:'::',
             labelWidth:5,
             id:'txt_value',
             width:150,
             emptyText: '请输入值...'
        },'-',
       {
             id:'btn_sureToSet',
             xtype:'button',
             text:'确定'
        },'-','-',
       {
             id:'btn_reset',
             xtype:'button',
             text:'回复初始值'
       }, '-','->','-',
       {
             id:'btn_refresh',
             xtype:'button',
             text:'刷新'
       },'-']
    });
    
   
    
    //var fieldArray = new Array({},[{"aa"},{"bb"}]);
    
    var colM = "company,id,flyline";
    var colMArr = colM.split(",");
    var colLength = colMArr.length;
    var colMArray = new Array();
    for(var i=0; i<colLength; i++) {
        colMArray[i] = "{header:'"+colMArr[i]+"',width: 300,dataIndex:'a'}";
         //此处的fieldArray[i]是fields的数据
    }
    
    function a(){
        return "a";
    }
    
    //然后colMarray数组即是我们要动态构造的那个ColumnModel的参数，此处的动态的意
    //思是colM可以从request中获取,然后用来动态创建header即表头信息，同
    //理dataIndex也是一样的
    var column = new Ext.grid.ColumnModel([
        [colMArray]
    ]);
    //然后GridPanel中的制定cm属性值为column即可


    
    
    
  
    
   
    var form = new Ext.FormPanel({
        header:false,
        labelSeparator:':',
        footer:true,
        layout:'fit',
        tbar:tbar,
        height:formHeight,
        listeners : {  
            'render' : function(){  
                tbar2.render(this.tbar);      //add one tbar  
             }  
        },
        items:[{
            xtype: 'grid',
            cm:column
            
        }]
    });
        
    return form;
};


//计算公式解析函数
function acc_proxy(){



};


//页面ready函数
Ext.onReady(function(){
    var panel = initInputPanel();
    panel.render('model');
});

