/// <reference path="../../../../ext-3.4.0/vswd-ext_2.0.2.js" />

/**********************************************************************************************************************
** 作者： fanwenjie
** 变更时间： 2011-12-18
** 作用：薪酬发放初始化函数
**********************************************************************************************************************/ 
function initSalaryExtend(){
   
   var store = new Ext.data.SimpleStore({//定义组合框中显示的数据源
			fields: ['province', 'post'],
			data : [['北京','100000'],['通县','101100'],['昌平','102200'],
			        ['大兴','102600'],['密云','101500'],['延庆','102100'],
			        ['顺义','101300'],['怀柔','101400']]
		});//需修改
   var store_view = new Ext.data.SimpleStore({//定义组合框中显示的数据源
			fields: ['view', 'value'],
			data : [['显示全部',0],['仅显示未发放',1],['仅显示已发放'],2]
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
                      id:'txt_search',
                      width:150,
                      emptyText: '请输入搜索条件...'
                  },
                  '报表：',
                  {
                     id:'cmb_salaryTable',
                     xtype:'combo',
                     triggerAction:'all',
                     width:200,
                     mode:'local',
                     displayField:'province',//需修改
                     valueField:'post',//需修改
                     store:store,//需修改
                     value:'102600',//需修改
                     forceSelection:true,
                     handleHeight:10,
                     typeAhead:true
                  },
                  '工号：',
                  {
                     id:'cmb_humanIndex',
                     xtype:'combo',
                     triggerAction:'all',
                     width:150,
                     mode:'local',
                     displayField:'province',//需修改
                     valueField:'post',//需修改
                     store:store,//需修改
                     value:'102600',//需修改
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
                  '-'
              ]
        });
   var tbar2=new Ext.Toolbar({
      items:[
                  '-',
                  {
                     id:'cmb_view',
                     xtype:'combo',
                     triggerAction:'all',
                     width:150,
                     mode:'local',
                     displayField:'view',//需修改
                     valueField:'value',//需修改
                     store:store_view,//需修改
                     value:0,//需修改
                     forceSelection:true,
                     handleHeight:10,
                     typeAhead:true
                  },
                  '-',
                  {
                     id:'btn_batchExtend',
                     xtype:'button',
                     text:'批量发放'
                  },
                  '-',
                  '-',
                  {
                     id:'btn_save',
                     xtype:'button',
                     text:'确定'
                  },
                  '-',    
                  '-',
                  {
                     id:'btn_print',
                     xtype:'button',
                     text:'打印'
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
   var form = new Ext.FormPanel({
      header:false,
      labelSeparator:':',
      footer:true,
      layout:'border',
      tbar:tbar,
      listeners : {  
               'render' : function(){  
                    tbar2.render(this.tbar);      //add one tbar  
                }  
            }  
   });

   return form;
};


//计算公式解析函数
function acc_proxy(){



};


//页面ready函数
Ext.onReady(function(){
   var panel = initSalaryExtend();
   panel.render('mainForm');
});

