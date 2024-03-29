﻿/// <reference path="../../../../ext-3.4.0/vswd-ext_2.0.2.js" />


/**********************************************************************************************************************
** 作者： fanwenjie
** 变更时间： 2011-12-18
** 作用：工资造表对话框
**********************************************************************************************************************/ 
function createTable(){
   var store = new Ext.data.SimpleStore({//定义组合框中显示的数据源，实验用
			fields: ['province', 'post'],
			data : [['北京','100000'],['通县','101100'],['昌平','102200'],
			        ['大兴','102600'],['密云','101500'],['延庆','102100'],
			        ['顺义','101300'],['怀柔','101400']]
		});//需修改
   var win=new Ext.Window({
      title:'工资造表',
      animCollapse:true,
      animateTarget:'btn_salaryTable',
      buttonAlign:'center',
      closable:true,
      width:350,
      frame:true,
      closeAction:'close',
      items:[
         new Ext.form.FormPanel({
	          labelSeparator :'：',//分隔符
	          header:false,
	          labelAlign:'right',
	          bodyStyle:'padding:5 5 5 5',//表单边距
	          frame:true,	          
	          items:[
	                 {
                       fieldLabel:'工资账套',
                       store:store,
                       mode:'local',
                       forceSelection:true,
                       triggerAction:'all',
                       mode:'local',
                       xtype:'combo',
                       width:160,
                       displayField:'province',//需修改
                       valueField:'post',//需修改
                       value:'100000'
                   },
                   {
                          fieldLabel:'工资年月',
                          xtype:'datefield',
                          hideLabel:false,
                          id:'txt_selectDate',
                          width:160,
                          format:'Y年m月',
                          value:'1999-01-01'
                    },
                    {
                       fieldLabel:'工资表名称',
                       xtype:'textfield',
                       width:160,
                       emptyText:'请输入表名...'
                   }
	          ]
         })
      ],
      buttons:[
         {
            text:'创建',id:'btn_createTable',
            handler:function(){
               location.href='creteTableDetail.aspx';
            }
         },
         { 
            text:'取消',id:'btn_cancel',handler:function(){win.close();}
         }
      ]
   });
   return win;

};



/**********************************************************************************************************************
** 作者： fanwenjie
** 变更时间： 2011-12-18
** 作用：薪酬造表初始化函数
**********************************************************************************************************************/ 

function initCreateTable(){
   
   var tbar = new Ext.Toolbar({
              items: [
                          {xtype: 'tbspacer'},
                          '关键字：',
                          {
                              xtype:'textfield',
                              hideLabel:false,
                              fieldLabel:'::',
                              labelWidth:5,
                              id:'txt_searchWord',
                              width:150,
                              emptyText: '请输入搜索条件...'
                          },
                          '从',
                          {
                              xtype:'datefield',
                              hideLabel:false,
                              id:'txt_searchTimeBegin',
                              width:120,
                              format:'Y年m月',
                              value:'1999-01-01'
                          },
                          '到',
                          {
                              xtype:'datefield',
                              hideLabel:false,
                              format:'Y年m月',
                              id:'txt_searchTimeEnd',
                              value:new Date(),
                              width:120
                          },
                          '所有',
                          {
                             id:'cmb_tableType',
                             xtype:'combo',
                             triggerAction:'all',
                             mode:'local',
                             width:100,
                             displayField:'state',
                             valueField:'value',
                             store:store_State,
                             value:'0',
                             editable :false,
                             forceSelection:true,
                             handleHeight:10
                          },
                          '-',  
                          {
                              xtype: 'button', // same as 'tbsplitbutton'
                              text: '查询',
                              border:true,
                              id:'btn_search',
                              icon:'../../Main/Image/search.png'
                          },
                          '-'
                      ]
        });      
   var tbar2 = new Ext.Toolbar({
                     items : [
                                   '-', 
                                  {
                                      xtype: 'button', // same as 'tbsplitbutton'
                                      text: '工资造表',
                                      handler:function(){createTable().show();},
                                      border:true,
                                      id:'btn_salaryTable'
                                  },
                                  '-',     
                                  '-', 
                                  {
                                      xtype: 'button', // same as 'tbsplitbutton'
                                      text: '提交审核',
                                      border:true,
                                      id:'btn_submit'
                                  },
                                  '-',
                                  '-',
                                  {
                                     id:'btn_print',
                                     xtype:'button',
                                     text:'打印'
                                  },
                                  '-',  
                                  '-',
                                  {
                                     id:'btn_excelOutput',
                                     xtype:'button',
                                     text:'导出EXCEL'
                                  },
                                  '-',
                                  '-',
                                  {
                                     id:'btn_delete',
                                     xtype:'button',
                                     text:'删除'
                                  },
                                  
                                  '-',
                                  '-',
                                  {
                                     id:'btn_save',
                                     xtype:'button',
                                     text:'保存'
                                  },
                                  '-',
                                  '-',
                                  {
                                     id:'btn_reset',
                                     xtype:'button',
                                     text:'回复初始值'
                                  },
                                  '-',
                                  '->',
                                  '-',
                                  {
                                     id:'btn_refresh',
                                     xtype:'button',
                                     text:'刷新',
                                     handler:function(){salaryStore.relaod();}
                                  },
                                  '-'
                     ]
                });
//sal_id""sal_name""sal_year""sal_month""sal_madetime""sal_isexamine""sal_examiner""sal_examinetime""sal_isgrant""sal_granttime""sresult":[]}//数据格式
//********************************日期转化函数********************************//
   function dateConvert(value){return eval("new " + value.substr(1, value.length - 2)).format(strDateFormat);}
   
   //********************************数据模型********************************//
	var salaryTable = Ext.data.Record.create([
		    {name: 'name',mapping:'sal_name'},
		    {name: 'year',type:'int',mapping:'sal_year'},
		    {name: 'mouth',type:'int',mapping:'sal_month'},
		    {name: 'createTime',mapping: 'sal_madetime',convert:dateConvert},
		    {name: 'auditState',mapping: 'sal_isexamine'},
		    {name: 'auditer',mapping: 'sal_examiner'},
		    {name: 'auditTime',mapping: 'sal_examinetime',convert:dateConvert},
		    {name: 'provideState',mapping: 'sal_isgrant'},
		    {name: 'provideTime',mapping: 'sal_granttime',convert:dateConvert},
		    {name: 'id',mapping:'sal_id',type:'int'}
	        ]);
	var salaryStore=new Ext.data.JsonStore({
	    autoLoad: {params:{start:0,limit:_limit},callback:store_loadCallback},
	    url:'../Ajax/salary.ashx?type=select',
	    successProperty:'success',
        totalProperty:'total',
        fields:[
		    {name: 'name',mapping:'sal_name'},
		    {name: 'year',type:'int',mapping:'sal_year'},
		    {name: 'mouth',type:'int',mapping:'sal_month'},
		    {name: 'createTime',mapping: 'sal_madetime',convert:dateConvert},
		    {name: 'auditState',mapping: 'sal_isexamine'},
		    {name: 'auditer',mapping: 'sal_examiner'},
		    {name: 'auditTime',mapping: 'sal_examinetime',convert:dateConvert},
		    {name: 'provideState',mapping: 'sal_isgrant'},
		    {name: 'provideTime',mapping: 'sal_granttime',convert:dateConvert},
		    {name: 'id',mapping:'sal_id',type:'int'}
	        ],
        root:'data',
        method:'post' 
	});
	function store_loadCallback(r,options,success){
        if(!success) {Ext.Msg.alert('Error',Ext.util.JSON.decode(res.responseText)['error'])}
	}
	
   //********************************表格********************************//
   var grid = new Ext.grid.GridPanel({
      footer:true,
      header:false,
      tbar:tbar,
      autoWidth:true,
      autoScroll:true,
      stripeRows:true,
	  frame:true,	 
      listeners : {  
               'render' : function(){  
                    tbar2.render(this.tbar);      //add one tbar  
                }  
            },
       store:salaryStore,
       columns: [//配置表格列
                new Ext.grid.RowNumberer(),
				{header: '表名',  dataIndex: 'name',width:150, sortable: true},
				{header: '年度',  dataIndex: 'year', sortable: true},
				{header: '月度',  dataIndex: 'mouth', sortable: true},
				{header: '造表时间',  dataIndex: 'createTime', sortable: true},
				{header: '审核状态',  dataIndex: 'auditState', sortable: true},
				{header: '审核人', dataIndex: 'auditer', sortable: true},
				{header: '审核时间', dataIndex: 'auditTime', sortable: true},
				{header: '发放状态', dataIndex: 'provideState', sortable: true},
				{header: '发放时间', dataIndex: 'provideTime', sortable: true}
		],
		loadMask : { 
             msg : '下载中...' 
        }
   });
   
   //********************************窗口主控件********************************//
    var form = new Ext.Panel({
      header:false,
      cls:'big-font',
      labelSeparator:':',
      layout:'fit',
      height:formHeight,
      items:[grid]
   });
   return form;
};


//页面ready函数
Ext.onReady(function(){
   var panel = initCreateTable();
   panel.render('mainForm');
});