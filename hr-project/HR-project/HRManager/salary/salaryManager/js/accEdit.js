/// <reference path="../ext-3.4.0/vswd-ext_2.0.2.js" />

function initInputPanel(){
    //***********************************************************
    //添加账套(显示)
    function addAccWinShow(){
    
        //帐套基本信息选项卡
        var accForminf = new Ext.form.FormPanel({
            frame: false,
            height: 420,
            labelWidth: 100,
            labelAlign: 'right',
            buttonAlign: 'center',
            items: [{
                xtype: 'textfield',
                fieldLabel: '帐套名称',
                anchor: '50%'
            },{
                xtype: 'textarea',
                fieldLabel: '描述',
                anchor: '95%',
                height: 200
            },{
                xtype: 'fieldset',
                defaultType: 'radio',
                hideLabels: true,
                autoHeight: true,
                fieldLabel: '扣税方式',
                anchor: '95%',
                items: [
                    {boxLabel: '按国家标准扣税',name: 'radio',inputValue:'1',checked: true},
                    {boxLabel: '按区间扣税',name: 'radio',inputValue:'2'}
                ]
            },{
                xtype: 'textfield',
                fieldLabel: '个人税起征点(元)',
                anchor: '50%'
            }],
            buttons:[{
                text: '保存',
                handler:function(){
                    
                }
            },{
                text: '取消',
                handler:function(){
                    addAccWin.close();
                }
            }]
        });
        
        //因子类型下拉框
        var fty_combox = new Ext.form.ComboBox({
            store: new Ext.data.SimpleStore({fields:['key','value'],
                data: [['base','档案信息'],['else','其他']]
            }),
            fieldLabel: '因子类型',
            name: 'ttype',
            mode: 'local',
            triggerAction: 'all',
            valueField: 'key',
            displayField: 'value',
            editable: false,
            allBlank: false,
            value: '其他',
            id: 'ftype'
        });
        
        //帐套公式选项卡
        var accFormgong = new Ext.form.FormPanel({
            //layout: 'fit',
            frame: false,
            labelWidth: 70,
            buttonAlign: 'center',
            items: [{
                fieldLabel: '帐套公式',
                id: 'ztgs',
                xtype: 'textarea',
                anchor: '95%',
                height: 105
            },fty_combox
            ,{
                layout:'column',
                items:[{
                    columnWidth:.5,
                    html://测试数据
                        '<select size=10 id="typeList" style="width:324px;height:261px;" onChange="document.bgColor = tableSelect.value"> '+
                            '<option value="red">红色</option> '+
                            '<option value="blue">蓝色</option> '+
                            '<option value="green">绿色</option> '+
                            '<option value="yellow">黄色</option> '+
                            '<option >白色</option> '+
                            '<option value="red">红色</option> '+
                            '<option value="blue">蓝色</option> '+
                            '<option value="green">绿色</option> '+
                            '<option value="yellow">黄色</option> '+
                            '<option >白色</option> '+'<option value="red">红色</option> '+
                            '<option value="blue">蓝色</option> '+
                            '<option value="green">绿色</option> '+
                            '<option value="yellow">黄色</option> '+
                            '<option >白色</option> '+
                            '<option value="yellow">黄色</option> '+
                            '<option >白色</option> '+'<option value="red">红色</option> '+
                            '<option value="blue">蓝色</option> '+
                            '<option value="green">绿色</option> '+
                            '<option value="yellow">黄色</option> '+
                            '<option >白色</option> '+
                        '</select>'
                },{
                    columnWidth:.5,
                    height: 260,
                    html://计算器
                        '<div id="jisuan">'+
                        '<span style="left:45px;top:30px;padding: 12px 43px 12px 43px;">(</span>'+
                        '<span style="left:55px;top:30px;padding: 12px 43px 12px 43px;">)</span><br />'+
                        '<span style="left:45px;top:65px;">7</span>'+
                        '<span style="left:58px;top:65px;">8</span>'+
                        '<span style="left:69px;top:65px;">9</span>'+
                        '<span style="left:81px;top:65px;">+</span><br />'+
                        '<span style="left:45px;top:100px;">4</span>'+
                        '<span style="left:58px;top:100px;">5</span>'+
                        '<span style="left:69px;top:100px;">6</span>'+
                        '<span style="left:81px;top:100px;padding: 12px 17px 12px 17px;">-</span><br />'+
                        '<span style="left:45px;top:135px;">1</span>'+
                        '<span style="left:58px;top:135px;">2</span>'+
                        '<span style="left:69px;top:135px;">3</span>'+
                        '<span style="left:81px;top:135px;">*</span><br />'+
                        '<span style="left:45px;top:170px;padding: 12px 42px 12px 42px;">0</span>'+
                        '<span style="left:55px;top:170px;padding: 12px 17px 12px 17px;">.</span>'+
                        '<span style="left:67px;top:170px;">/</span>'+
                    '</div>'
                }]
            }],
            buttons:[{
                text: '退格',
                handler:function(){
                    
                }
            },{
                text: '清空',
                handler:function(){
                    Ext.getCmp("ztgs").setValue("").focus();
                }
            },{
                text: '保存',
                handler:function(){
                    
                }
            },{
                text: '取消',
                handler:function(){
                    addAccWin.close();
                }
            }]
        });
        
        //帐套选项卡
        var tabaccm = new Ext.TabPanel({
            width:650,
            activeTab: 0,
            frame:true,
            defaults:{autoHeight: true},
            items:[
                {title: '基本信息',items:[accForminf]},
                { title: '帐套公式',items:[accFormgong]}
            ]
        });
        
        
        
        //添加账套的窗口
        var addAccWin = new Ext.Window({
            title: '添加帐套',
            //layout: 'fit',
            width: 650,
            height: 500,
            constrainHeader: true,
            items: [tabaccm]
        });
        addAccWin.show();
    }
    //**************************************************************
    
    
    
    //**************************************************************/
    //扣税方式下拉框
    var kousui_combo = new Ext.form.ComboBox({
        store: new Ext.data.SimpleStore({fields:['key','value'],
            data: [['qj','区间扣税'],['gj','国家扣税']]
        }),
        name: 'acc_kousui',
        emptyText: '所有',
        mode: 'local',
        triggerAction: 'all',
        valueField: 'key',
        displayField: 'value',
        editable: false,
        allBlank: false,
        id: 'acc_kousui',
        width:100
    }); 
    
    //工具栏一
    var tbar = new Ext.Toolbar({
        items: ['-','扣税方式：',kousui_combo,'-',{
            id: 'btn_addacc',
            xtype: 'button',
            text: '添加帐套',
            handler: function(){
                addAccWinShow();
            }
        },'-',{
            id: 'btn_delacc',
            xtype: 'button',
            text: '删除'
        }]
    });      
    
    var aedit_sm = new Ext.grid.CheckboxSelectionModel();
    //表格列
    var aedit_cm = new Ext.grid.ColumnModel([
        new Ext.grid.RowNumberer(),
        {header:'<div style="text-align:center">帐套名称</div>',dataIndex:'acc_name',width:100,sortable:true,align:'center'},
        {header:'<div style="text-align:center">描述</div>',dataIndex:'acc_dir',width:200,sortable:true,align:'center'},
        {header:'<div style="text-align:center">扣税方式</div>',dataIndex:'acc_deductionsway',width:100,sortable:true,align:'center'},
        {header:'<div style="text-align:center">修改时间</div>',dataIndex:'acc_changetime',width:100,sortable:true,align:'center'}
    ]);
    
    //表格原始数据
    var aedit_data = [
        ['1','帐套一','区间扣税','针对生产部的帐套','2011-12-16'], 
        ['2','帐套一','区间扣税','针对生产部的帐套','2011-12-16'], 
        ['3','帐套一','区间扣税','针对生产部的帐套','2011-12-16'],  
        ['4','帐套一','区间扣税','针对生产部的帐套','2011-12-16'],
        ['5','帐套一','区间扣税','针对生产部的帐套','2011-12-16']
    ];
    
    //表格数据源
    var aedit_store = new Ext.data.Store({
        proxy: new Ext.data.MemoryProxy(aedit_data),
        reader: new Ext.data.ArrayReader({},[
            {name:'acc_name',mapping:1},
            {name:'acc_dir',mapping:3},
            {name:'acc_deductionsway',mapping:2},
            {name:'acc_changetime',mapping:4}
        ])
    });
    
    aedit_store.load();

    var aeditform = new Ext.FormPanel({
        header:false,
        labelSeparator:':',
        footer:true,
        layout: 'fit',
        tbar:tbar,
        height:formHeight,
        items:[{
            model: 'local',
            xtype: 'grid',
            cm:aedit_cm,
            ds:aedit_store,
            sm:aedit_sm,
            bbar : new Ext.PagingToolbar({              
                store:aedit_store,
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
        
    return aeditform;
};





//页面ready函数
Ext.onReady(function(){
    var panel = initInputPanel();
    panel.render('model');
});

