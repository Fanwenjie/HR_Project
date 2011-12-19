/// <reference path="../../../../ext-3.4.0/vswd-ext_2.0.2.js" />


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
   var storeType = new Ext.data.SimpleStore({//定义组合框中显示的数据源
			    fields: ['type', 'value'],
			    data : [['所有','0'],['未提交','1'],['未审核','2'],['已通过','3'],['未通过','4'],
			            ['已发放','5'],['未发放','6']]
		    });//需修改
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
                             displayField:'type',//需修改
                             valueField:'value',//需修改
                             store:storeType,//需修改
                             value:'0',//需修改
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
                                     text:'刷新'
                                  },
                                  '-'
                     ]
                });
   //数据模型
   var data=[['2012年11月薪资报表','2012','11',new Date(),'未审核','范文杰',new Date(),'未发放',new Date(),1]];
	var salaryTable = Ext.data.Record.create([
		{name: 'name',mapping: 0},
		{name: 'year',mapping: 1},
		{name: 'mouth',mapping: 2},
		{name: 'createTime',mapping: 3},
		{name: 'auditState',mapping: 4},
		{name: 'auditer',mapping: 5},
		{name: 'auditTime',mapping: 6},
		{name: 'provideState',mapping: 7},
		{name: 'provideTime',mapping: 8},
		{name:'id',mapping:9}
	]);
   //表格
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
       store:new Ext.data.Store({
          reader: new Ext.data.ArrayReader({id:9},salaryTable),
		  data: data,
		  autoLoad:true
       }),
       columns: [//配置表格列
                new Ext.grid.RowNumberer(),
				{header: '表名',  dataIndex: 'name', sortable: true},
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
    var form = new Ext.Panel({
      header:false,
//      bodyStyle:'font-size: x-large;',
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