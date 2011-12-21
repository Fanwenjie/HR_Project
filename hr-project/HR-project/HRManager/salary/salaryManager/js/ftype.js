/// <reference path="../../../../ext-3.4.0/vswd-ext_2.0.2.js" />

Ext.onReady(function(){
    //******************************************************************************************************//
    //*******************************公共初始化块***********************************************************//
    //*****************************************************************************************************//
    Ext.QuickTips.init();
    
    var _start = 0;
    var _limit = 1000;
    
    //根据值改变颜色示例
    function fty_renderSex(value){
        if (value == '1'){
            return "<span style='color:red;font-weight:bold;'>"+value+"</span>";
        }
        else{
            return "<span style='color:green;font-weight:bold;'>"+value+"</span>";
        }
    }
    
    
    //获得因子类型数据
    fty_store = new Ext.data.JsonStore({
        root: 'data',
        totalProperty: 'totalCount',
        url: '../Ajax/ftype.ashx?type=Select',
        fields: [
            {name:'fty_id'},
            {name: 'fty_name'},
            {name: 'fty_describe'},
            {name: 'fty_maker'},
            {name: 'fty_madetime'},
            {name: 'fty_changetime'}
        ] 
    });
    
    
    //表格列
    var fty_cm = new Ext.grid.ColumnModel([
        new Ext.grid.RowNumberer(),
        {header:'<div style="text-align:center">类型名称</div>',dataIndex:'fty_name',width:130,sortable:true,align:'center'},
        {header:'<div style="text-align:center">制件时间</div>',dataIndex:'fty_madetime',width:80,sortable:true,align:'center',renderer: function(value) {
            if (value instanceof Date) {
                return new Date(value).format("Y-m-d");
            } else {
                return eval("new " + value.substr(1, value.length - 2)).format("Y-m-d");
            }
        }}
    ]);
    
    fty_store.load({params:{start:_start,limit:_limit}});//按1000条记录分布
    
    var tform = new Ext.form.FormPanel({
        id: 'tform',
        columnWidth: 0.65,             
        labelWidth: 70,
        xtype: 'fieldset',
        buttonAlign: 'center',
        labelAlign: 'right',
        defaults: {
            style: {"margin": "0px 0px 10px 0px"},
            msgTarget: 'side'
        },
        style: {
            "margin-left": "10px",
            "margin-right": Ext.isIE6 ? (Ext.isStrict ? "-10px" : "-13px") : "0",
            //"margin-top": "10px",
            "padding": "10px 0 0 10px"
        },
        items: [{
            xtype: 'textfield',
            id: 'fty_id',
            hidden: true
        },{
            fieldLabel: '名称',
            anchor: '95%',
            xtype: 'textfield',
            id: 'fty_name',
            maxLength: 20,
            allBlank: false
        },{
            fieldLabel: '描述',
            anchor: '95%',
            xtype: 'textarea',
            id: 'fty_describe',
            height: 130,
            maxLength: 200
        },{
            fieldLabel: '制作人',
            anchor: '40%',
            xtype: 'textfield',
            id: 'fty_maker',
            readOnly: true
        },{
            fieldLabel: '制作时间',
            anchor: '40%',
            xtype: 'textfield',
            id: 'fty_madetime',
            readOnly: true
        },{
            fieldLabel: '修改时间',
            anchor: '40%',
            xtype: 'textfield',
            id: 'fty_changetime',
            readOnly: true
        }],
        buttons: [{
            text: '新增',
            handler:function(){
                Ext.getCmp("fty_name").setValue(""); 
                Ext.getCmp("fty_describe").setValue(""); 
                Ext.getCmp("fty_maker").setValue("");  //当能登陆时改用当前用户名
                Ext.getCmp("fty_madetime").setValue(new Date().format("Y-m-d")); 
                Ext.getCmp("fty_changetime").setValue(new Date().format("Y-m-d")); 
                Ext.getCmp("fty_id").setValue("0");     //0为新增
            }
        },{
            text: '保存',
            handler:function(){
                Ext.getCmp("tform").getForm().submit({
                    waitMsg:'数据传输中...',
                    method : 'post',
                    url : "ftype.ashx?type=InsertOrUpdate",
                    success: function(form,action){
                        store.reload();
                        Ext.MessageBox.alert('提示',"成功");
                    },
                    failure: function(){
                         Ext.MessageBox.alert('提示',"失败");
                    }
                })
            }
        },{
            text: '删除',
            handler:function(){
                Ext.getCmp("tform").getForm().submit({
                    method : 'post',
                    url : "handler.ashx?type=Delete",
                    success: function(form,action){
                        Ext.MessageBox.alert('提示',"成功");
                    },
                    failure: function(){
                       Ext.MessageBox.alert('提示',"失败");
                    }
                })
            }
        }]
    });
    
    var text = new Ext.Panel({
        width:formWidth-5,
        height:formHeight-10,
        title: '因子类型管理',
        renderTo: 'model',
        layout:'column',
        items: [{
            columnWidth: 0.33,
            layout: 'fit',
            style: {
                "margin-left": "10px",
                "margin-right": Ext.isIE6 ? (Ext.isStrict ? "-10px" : "-13px") : "0",
                "margin-top": "10px"
            },
            items: {
                xtype: 'grid',
                ds: fty_store,
                cm: fty_cm,
                id:'grid',
                height: 290,
                sm: new Ext.grid.RowSelectionModel({
                    singleSelect: true,
                    listeners:{
                        rowselect: function(sm, row, rec) {
                            Ext.getCmp("tform").getForm().loadRecord(rec);
                            value1=rec.data.fty_madetime;
                            kk=eval("new " + value1.substr(1, value1.length - 2)).format("Y-m-d");
                            Ext.getCmp("fty_madetime").setValue(kk); 
                            value2=rec.data.fty_changetime;
                            kk2=eval("new " + value2.substr(1, value2.length - 2)).format("Y-m-d");
                            Ext.getCmp("fty_changetime").setValue(kk2);
                            Ext.getCmp("fty_id").setValue(rec.data.fty_id);     //设置隐藏区域的值
                        }
                    }
                })
            }
        },tform]
    });
    
    

});