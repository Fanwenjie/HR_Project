/// <reference path="../../../../ext-3.4.0/vswd-ext_2.0.2.js" />

/**********************************************************************************************************************
** 作者： fanwenjie
** 变更时间： 2011-12-18
** 作用：薪酬录入初始化函数
**********************************************************************************************************************/ 
function initInputPanel(){
   
   var store = new Ext.data.SimpleStore({//定义组合框中显示的数据源，实验用
			fields: ['province', 'post'],
			data : [['北京','100000'],['通县','101100'],['昌平','102200'],
			        ['大兴','102600'],['密云','101500'],['延庆','102100'],
			        ['顺义','101300'],['怀柔','101400']]
		});//需修改

/**********************************************************************************************************************
** 作者： fanwenjie
** 变更时间： 2011-12-18
** 作用：工具栏，定义多行工具栏！
**********************************************************************************************************************/  
   var tbar = new Ext.Toolbar({
              items: [
                  {xtype: 'tbspacer'},
                  '条件：',
                  {
                      xtype:'textfield',
                      hideLabel:false,
                      id:'txt_search',
                      width:150,
                      emptyText: '请输入搜索条件...'
                  },
                  '账套：',
                  {
                     id:'cmb_accDisplay',
                     xtype:'combo',
                     triggerAction:'all',
                     mode:'local',
                     displayField:'province',//需修改
                     valueField:'post',//需修改
                     store:store,//需修改
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
                     id:'btn_save',
                     xtype:'button',
                     text:'保存',
                     disabled:true
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
                     id:'btn_excelInput',
                     xtype:'button',
                     text:'导入EXCEL'
                  },
                  '-',
                  '-',
                  {
                     id:'btn_excelOutput',
                     xtype:'button',
                     text:'导出EXCEL'
                  },
                  '-'                 
                 
              ]
        });      
   var tbar2 = new Ext.Toolbar({
                     items : [
                        '-',
                       {xtype: 'tbspacer'},
                        '批量设置：',
                        {
                             id:'cmb_accDomoin',
                             xtype:'combo',
                             triggerAction:'all',
                             mode:'local',
                             displayField:'province',//需修改
                             valueField:'post',//需修改
                             store:store,//需修改
                             value:'102600',//需修改
                             forceSelection:true,
                             handleHeight:10,
                             typeAhead:true
                        },
                        {xtype: 'tbspacer'},
                        '=',
                        {xtype: 'tbspacer'},
                        {
                              xtype:'textfield',
                              hideLabel:false,
                              fieldLabel:'::',
                              labelWidth:5,
                              id:'txt_value',
                              width:150,
                              emptyText: '请输入值...'
                        },
                        '-',
                       {
                          id:'btn_sureToSet',
                          xtype:'button',
                          text:'确定'
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

/**********************************************************************************************************************
** 作者： fanwenjie
** 变更时间： 2011-12-18
** 作用：引用了动态表创建函数
**********************************************************************************************************************/  
   var form = new Ext.FormPanel({
      header:false,
      labelSeparator:':',
      footer:true,
      height:formHeight,
      layout:'fit',
      items:[createGrid('','范文杰,大家,feege,刘国平,',tbar,tbar2)]
   });

   return form;
};


//计算公式解析函数
function acc_proxy(){



};


//页面ready函数
Ext.onReady(function(){
   var panel = initInputPanel();
   panel.render('mainForm');
});

