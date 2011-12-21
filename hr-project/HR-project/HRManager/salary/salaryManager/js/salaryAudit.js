/// <reference path="../../../../ext-3.4.0/vswd-ext_2.0.2.js" />

/**********************************************************************************************************************
** 作者： fanwenjie
** 变更时间： 2011-12-18
** 作用：薪酬审核界面初始化函数
**********************************************************************************************************************/  
function initSalaryAudit(){
   var str_id='id';
   var storeType = new Ext.data.SimpleStore({//定义组合框中显示的数据源，实验用   
			    fields: ['tableName', 'auditer',str_id,'auditState'],
			    data : [['所有','0',0,1],['未提交','1',1,2],['未审核','2',2,3],['已通过','3',3],['未通过','4',4],
			            ['已发放','5',5],['未发放','6',6]]
		    });
/**********************************************************************************************************************
** 作者： fanwenjie
** 变更时间： 2011-12-18
** 作用：定义tbar
**********************************************************************************************************************/  
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
                           ' ',
                          {
                             id:'cmb_stateChooser',
                             xtype:'combo',
                             triggerAction:'all',
                             width:150,
                             mode:'local',
                             displayField:'type',//需修改
                             valueField:'value',//需修改
                             store:store_AuditStateView,//需修改
                             value:'0',//需修改
                             forceSelection:true,
                             handleHeight:10,
                             typeAhead:true
                          },
                          '-', 
                          {
                              xtype: 'button', // same as 'tbsplitbutton'
                              text: '查询',
                              border:true,
                              id:'btn_search',
                              icon:'../../Main/Image/search.png'
                          },
                          '-',
                          '-',  
                          {
                              xtype: 'button', // same as 'tbsplitbutton'
                              text: '批量退回',
                              border:true,
                              id:'btn_batchReject'
                          },
                          '-',  
                          {
                              xtype: 'button', // same as 'tbsplitbutton'
                              text: '批量通过',
                              border:true,
                              id:'btn_batchPass'
                          },
                          '-',
                          '->',
                          '-',  
                          {
                              xtype: 'button', // same as 'tbsplitbutton'
                              text: '刷新',
                              border:true,
                              id:'btn_refresh'
                          },
                          '-',
                          {
                              xtype: 'button', // same as 'tbsplitbutton'实验用
                              text: '辅助',
                              border:true,
                              id:'btn_another',
                              handler:function(){
                                 location.href='salaryAuditDetail.aspx';
                              }
                          }
                      ]
        });      
/**********************************************************************************************************************
** 作者： fanwenjie
** 变更时间： 2011-12-18
** 作用：定义grid
**********************************************************************************************************************/  
   var sm=new Ext.grid.CheckboxSelectionModel();
   var grid = new Ext.grid.GridPanel({
      header:false,
      bodyCls:'font-size:x-large;',
      footer:true,
      tbar:tbar,
      bbar : new Ext.PagingToolbar({              
                    store:storeType,
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
      sm:sm,
      listeners : {  
               'celldblclick' : function(grid,row){  
                    location.href='salaryAuditDetail.aspx?id='+grid.getStore().getAt(row).get(str_id);}
                },
      viewConfig:{forceFit: true},
      forceFit:true,
      store:storeType,
	  columns: [//配置表格列
	        sm,
	        new Ext.grid.RowNumberer(),
	    	{header: '表名',width:40, dataIndex: 'tableName', sortable: true},
		    {header: '造表时间', width:20, dataIndex: 'createTime', sortable: true},
		    {header: '审核人', width:20, dataIndex: 'auditer', sortable: true},
		    {header: '审核时间', width:20, dataIndex: 'auditTime', sortable: true},
		    {header: '审核状态', width:20, dataIndex: 'auditState', sortable: true,
		         renderer:function(v){
		              var flag=false;
		              var viewer='';
		              store_AuditState.each(function(dt){
		                  if(dt[1]==v) {flag=true;viewer=dt[0];return false;}
		              });
		              if(!flag) viewer='未知状态';
		              return viewer;
		         }		    
		    }
	   ]
   });
/**********************************************************************************************************************
** 作者： fanwenjie
** 变更时间： 2011-12-18
** 作用：主面板
**********************************************************************************************************************/  
   var form = new Ext.FormPanel({
      header:false,
      labelSeparator:':',
      height:formHeight,
      layout:'fit',
      items:[grid]
   });

   return form;
}


//页面ready函数
Ext.onReady(function(){
   var panel = initSalaryAudit();
   panel.render('mainForm');
});