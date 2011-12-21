/// <reference path="vswd-ext_2.0.2.js" />
Ext.onReady(function(){
    Ext.BLANK_IMAGE_URL = 'ext-3.4.0/resources/images/default/s.gif';

    Ext.QuickTips.init();
    
    //隐藏域，用于标识消息的编号
    var new_id = new Ext.form.Hidden({
        id: 'new_id',
        name: 'new_id'
    });
    
    // turn on validation errors beside the field globally
    Ext.form.Field.prototype.msgTarget = 'side';
    //var formGrid = Ext.getBody();
    var _start = 0;
    var _limit = 5;

    //数据集
     store = new Ext.data.JsonStore({
            root: 'data',
            totalProperty: 'totalCount',
            url: 'Handler.ashx?type=DoShow',
            fields: [
                {name: 'sno'},
                {name: 'name'},
                {name: 'sex'},
                {name: 'classes'},
                {name: 'birthday',type: 'auto'}
            ] 
        });
    
    //列名  
    var colModel = new Ext.grid.ColumnModel([
        {id:'student',header: "学号", columnWidth: 0.10, sortable: true, locked:false, dataIndex: 'sno'},
        {header: "姓名", columnWidth: 0.20, sortable: true, dataIndex: 'name'},
        {header: "性别", columnWidth: 0.10, sortable: true, dataIndex: 'sex'},
        {header: "班级", columnWidth: 0.30, sortable: true, dataIndex: 'classes'},
        {header: "出生日期", columnWidth: 0.30, sortable: true, dataIndex: 'birthday',renderer: function(value) {
            if (value instanceof Date) {
                return new Date(value).format("Y-m-d");
            } else {
                return eval("new " + value.substr(1, value.length - 2)).format("Y-m-d");
            }
        }}
    ]);
    
    //性别下拉选择框
    var q = new Ext.form.ComboBox({
                    store: new Ext.data.SimpleStore({fields:['key','value'],
                               data: [['male','男'],['female','女']]
                               }),
                    emptyText: '请选择',
                    name: 'sex',
                    fieldLabel: '性别',
                    mode: 'local',
                    triggerAction: 'all',
                    valueField: 'key',
                    displayField: 'value',
                    editable: false,
                    allBlank: false,
                    value: '男',
                    id: 'sex'
                });
    
    var form =new Ext.form.FormPanel({
             columnWidth: 0.40,
             xtype: 'fieldset',
             labelWidth: 70,
             id:'form',
             title:'student details',
             defaults: {width: 150, border:false},    // Default config options for child items
             defaultType: 'textfield',
             autoHeight: true,
             bodyStyle: Ext.isIE ? 'padding:0 0 5px 15px;' : 'padding:10px 15px;',
             border: false,
             frame:true,
             style: {
                "margin-left": "10px", // when you add custom margin in IE 6...
                "margin-right": Ext.isIE6 ? (Ext.isStrict ? "-10px" : "-13px") : "0"  // you have to adjust for it somewhere else
             },
             items: [{
                fieldLabel: '学号',
                name: 'sno',
                editable: false,
                id: 'sno',
                readOnly: true,
                allowBlank: false,
                blankText: '要新增请点击添加获取下一个学号'
             },{
                fieldLabel: '姓名',
                name: 'name',
                maxLength: 8,
                maxLengthText : '姓名长度不可多于8个字符',
                regex: /^[\u4E00-\u9FA5]+$/,
                regexText: '只能使用汉字姓名',
                allowBlank: false,
                blankText: '姓名不可为空',
                id: 'name'
             }, q
             ,{
                 fieldLabel: '班级',
                 name: 'classes',
                 maxLength: 10,
                 maxLengthText : '班级名不可以多于10个字符',
                 regex: /^[0-9]+$/,
                 regexText: '班级只能为数字',
                 id: 'classes'
             },{
                 xtype: 'datefield',
                 fieldLabel: '出生日期',
                 format:'Y-m-d',
                 name: 'birthday',
                 allowBlank : false,
                 blankText: '出生日期不可为空',
                 editable: false,
                 id: "birthday"
             }],
             buttons:[{
                 text: '添加',
                 handler:function(){
                     Ext.Ajax.request({
                         //waitMsg:'数据传输中...',
                         method : 'get',                                                                                    
                         url : "handler.ashx?type=DoGetNextSno",
                         callback: function(options,success,response){
                             Ext.getCmp("sno").setValue(response.responseText);
                             Ext.getCmp("name").setValue("");
                             Ext.getCmp("classes").setValue("");
                         }
                    })
                }
             },{
                 text: '删除',
                 handler:function(){
                     Ext.getCmp("form").getForm().submit({
                         //waitMsg:'数据传输中...',
                         method : 'post',
                         url : "handler.ashx?type=DoDelete",
                         success: function(form,action){
                             Ext.MessageBox.alert('提示',"成功");
                         },
                         failure: function(){
                            Ext.MessageBox.alert('提示',"失败");
                         }
                    })
                }
             },{
                 text:'保存',
                 handler:function(){
                     Ext.getCmp("form").getForm().submit({
                         //waitMsg:'数据传输中...',
                         method : 'post',
                         url : "handler.ashx?type=DoInsertOrUpdate",
                         success: function(form,action){
                         store.reload();
                             Ext.MessageBox.alert('提示',"成功");
                         },
                         failure: function(){
                            Ext.MessageBox.alert('提示',"失败");
                         }
                    })
                }
           }]
    });
    
    var text = new Ext.form.FormPanel({
        title: '学生信息管理',
        width:728,
        height:350,
        renderTo: 'formGrid',
        layout:'column',
        frame:'true',
        items: [{
             columnWidth: 0.60,
             layout: 'fit',
             items: {
                 xtype: 'grid',
                 ds: store,
                 cm: colModel,
                 id:'grid',
                 sm: new Ext.grid.RowSelectionModel({
                     singleSelect: true,
                     listeners: {
                         rowselect: function(sm, row, rec) {
                             Ext.getCmp("form").getForm().loadRecord(rec);
                             value=rec.data.birthday;
                             kk=eval("new " + value.substr(1, value.length - 2)).format("Y-m-d");
                             Ext.getCmp("birthday").setValue(kk);
                         }
                     }
                 }),
                 height: 350,
                 title:'Company Data',
                 border: true,
                 tbar:new Ext.PagingToolbar({//工具栏
                     pageSize:_limit,
                     store:store,
                     displayInfo:true,
                     displayMsg:'从 {0} 到 {1} 记录,共 {2} 条记录',
                     emptyMsg:"no records"
                 }),
                 viewConfig:{
                     forceFit:true
                 }
             }
         },form  
         ]
    });
    store.load({params:{start:_start,limit:_limit}});//按5条记录分布
    
});
    
    
    