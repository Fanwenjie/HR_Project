/// <reference path="../../../../ext-3.4.0/vswd-ext_2.0.2.js" />

/**********************************************************************************************************************
** 作者： fanwenjie
** 变更时间： 2011-12-18
** 作用：设置显示列
**********************************************************************************************************************/ 
function setViewOfColumn(){

};

/**********************************************************************************************************************
** 作者： fanwenjie
** 变更时间： 2011-12-18
** 作用：薪酬审核明细初始化函数
**********************************************************************************************************************/ 
function initSalaryAuditDetail(){
   var storeHuman = new Ext.data.SimpleStore({//定义组合框中显示的数据源，实验用
			fields: ['name', 'index'],
			data : [['北京','100000'],['通县','101100'],['昌平','102200'],
			        ['大兴','102600'],['密云','101500'],['延庆','102100'],
			        ['顺义','101300'],['怀柔','101400']]
		});//需修改
   var store = new Ext.data.SimpleStore({//定义组合框中显示的数据源，实验用
			fields: ['province', 'post'],
			data : [['北京','100000'],['通县','101100'],['昌平','102200'],
			        ['大兴','102600'],['密云','101500'],['延庆','102100'],
			        ['顺义','101300'],['怀柔','101400']]
		});//需修改
     
   var store_sign=new Ext.data.SimpleStore({//定义组合框中显示的数据源，实验用
			fields: ['sign','value'],
			data : [['加上（+）','+'],['减去（-）','-'],['乘以（X）','*'],['除以（÷）','/']]
		});
/**********************************************************************************************************************
** 作者： fanwenjie
** 变更时间： 2011-12-18
** 作用：定义头部工具栏
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
                      id:'txt_search',
                      width:150,
                      emptyText: '请输入搜索条件...'
                  },
                  '姓名：',
                  {
                     id:'cmb_name',
                     xtype:'combo',
                     triggerAction:'all',
                     mode:'local',
                     displayField:'name',//需修改
                     valueField:'index',//需修改
                     store:storeHuman,//需修改
                     value:'102600',//需修改
                     forceSelection:true,
                     handleHeight:10,
                     typeAhead:true
                  },
                  {
                      xtype: 'button', // same as 'tbsplitbutton'
                      text: '查询',
                      border:true,
                      id:'btn_search',
                      icon:'../../Main/Image/search.png'
                  },
                  '-',                  
                  '->',
                  '-',
                  {
                     id:'btn_back',
                     xtype:'button',
                     text:'返回'
                  },
                  '-', 
                  '-',
                  {
                     id:'btn_pass',
                     xtype:'button',
                     text:'通过'
                  },
                  '-', 
                  '-',
                  {
                     id:'btn_reject',
                     xtype:'button',
                     text:'退回'
                  },
                  '-', 
                  '-',
                  {
                     id:'btn_setViewOfColumn',
                     xtype:'button',
                     text:'显示列'
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
                    id:'btn_refresh',
                    xtype:'button',
                    text:'刷新'
                 },
                  '-'
              ]
        }); 
/**********************************************************************************************************************
** 作者： fanwenjie
** 变更时间： 2011-12-18
** 作用：定义主面板
**********************************************************************************************************************/ 
   var form = new Ext.FormPanel({
      header:false,
      labelSeparator:':',
      height:formHeight,
      layout:'fit',
      items:[createGrid('','范文杰,大家,feege,刘国平,',tbar,null)]
   });

   return form;
};

//页面ready函数
Ext.onReady(function(){
   var panel = initSalaryAuditDetail();
   panel.render('mainForm');
});

