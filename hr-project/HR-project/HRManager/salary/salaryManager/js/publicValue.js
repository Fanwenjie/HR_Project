/// <reference path="../../../ext-3.4.0/vswd-ext_2.0.2.js" />
//表单高度
var formHeight=600;

//审核状态试图数组
var store_AuditStateView = new Ext.data.SimpleStore({
			    fields: ['type', 'value'],
			    data : [['显示所有','0'],['仅显示未提交','1'],['仅显示未审核','2'],['仅显示已通过','3'],['仅显示未通过','4'],
			            ['仅显示已发放','5'],['仅显示未发放','6']]
		    });

//审核状态数组
var store_AuditState = new Ext.data.SimpleStore({
			    fields: ['state', 'value'],
			    data : [['未审核','0'],['未通过','1'],['已通过','2']]
		    });
		    
//表单宽度
var formWidth=766;

//日期格式字符串，年-月-日型
var strDateFormat='y年m月d日';

//每页记录数
var _limit=20;

//计算符号数组
var store_Sign=new Ext.data.SimpleStore({
			fields: ['sign','value'],
			data : [['加上（+）','+'],['减去（-）','-'],['乘以（X）','*'],['除以（÷）','/']]
		});