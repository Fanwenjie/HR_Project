/// <reference path="../../../../ext-3.4.0/vswd-ext_2.0.2.js" />

/**********************************************************************************************************************
** 作者： fanwenjie
** 变更时间： 2011-12-18
** 作用：打印工资条初始化函数
**********************************************************************************************************************/ 
function initPrint(){
   
   var store = new Ext.data.SimpleStore({//定义组合框中显示的数据源
			fields: ['num'],
			data : [[1],[2],[3],[4],[0]]
		});//需修改
   var tbar = new Ext.Toolbar({
              items: [
                  {xtype: 'tbspacer'},
                  '行间距：',
                  {
                      xtype:'numberfield',
                      hideLabel:false,
                      fieldLabel:'::',
                      labelWidth:5,
                      allowDecimals:false,
                      allowNegative:false,
                      maxValue:100,
                      minText:'行间距不为负数',
                      maxText:'行间距不可大于100',
                      value:0,
                      id:'nxt_space',
                      width:50
                  },
                  '每行显示',
                  {
                     id:'cmb_countOfColumn',
                     xtype:'combo',
                     triggerAction:'all',
                     mode:'local',
                     displayField:'num',//需修改
                     valueField:'num',//需修改
                     store:store,//需修改
                     width:50,
                     value:0,//需修改
                     forceSelection:true,
                     handleHeight:10,
                     typeAhead:true
                  },
                  '列',
                  ' ',
                  {
                     xtype:'checkbox',
                     id:'cbx_noZero',
                     boxLabel:'仅显示非0项'
                  },  
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
                     id:'btn_back',
                     xtype:'button',
                     text:'返回'
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
      height:600,
      footer:true,
      layout:'fit',
      tbar:tbar,
      items:[
         new Ext.FormPanel({
            title:'geege'
         })
      ]
   });

   return form;
};


//计算公式解析函数
function acc_proxy(){



};


//页面ready函数
Ext.onReady(function(){
   var panel = initPrint();
   panel.render('mainForm');
});

