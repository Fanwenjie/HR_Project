/// <reference path="../../../../ext-3.4.0/vswd-ext_2.0.2.js" />

/**********************************************************************************************************************
** 作者： fanwenjie
** 变更时间： 2011-12-18
** 作用：历史薪酬汇总初始化函数
**********************************************************************************************************************/ 

function initAcc_previouSum(){
   var store = new Ext.data.SimpleStore({//定义组合框中显示的数据源，实验用
			fields: ['province', 'post'],
			data : [['北京','100000'],['通县','101100'],['昌平','102200'],
			        ['大兴','102600'],['密云','101500'],['延庆','102100'],
			        ['顺义','101300'],['怀柔','101400']]
		});//需修改
/**********************************************************************************************************************
** 作者： fanwenjie
** 变更时间： 2011-12-18
** 作用：引用了动态表创建函数
**********************************************************************************************************************/     var tbar = new Ext.Toolbar({
              items: [
                          {xtype: 'tbspacer'},
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
                             width:120,
                             typeAhead:true
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
                          '->',
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
                             text:'导出'
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
      border:true,
      layout:'fit',
      items:[createGrid('','范文杰,大家,feege,刘国平,',tbar)]
   });
   return form;
};


//页面ready函数
Ext.onReady(function(){
   var panel = initAcc_previouSum();
   panel.render('mainForm');
});