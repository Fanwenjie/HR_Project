/// <reference path="../../../ext-3.4.0/vswd-ext_2.0.2.js" />
//表单高度
var formHeight=600;

//状态数组
var store_State = new Ext.data.SimpleStore({//定义组合框中显示的数据源
			    fields: ['state', 'value'],
			    data : [['所有','0'],['未提交','1'],['未审核','2'],['已通过','3'],['未通过','4'],
			            ['已发放','5'],['未发放','6']]
		    });//需修改
		    
//状态视图数组
var store_AuditStateView = new Ext.data.SimpleStore({
			    fields: ['type', 'value'],
			    data : [['显示所有','0'],['仅显示未提交','1'],['仅显示未审核','2'],['仅显示已通过','3'],['仅显示未通过','4'],
			            ['仅显示已发放','5'],['仅显示未发放','6']]
		    });

//审核状态数组
var store_AuditState = new Ext.data.SimpleStore({
			    fields: ['state', 'value'],
			    data : [['未提交','0'],['未审核','1'],['未通过','2'],['已通过','3']]
		    });
		    
//发放状态数组
var store_ProvideState = new Ext.data.SimpleStore({
			    fields: ['state', 'value'],
			    data : [['未发放','0'],['已发放','1']]
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
	
//数据加载的回调函数，主要用于store类型
function store_loadCallback(r,options,success){
        if(!success) {Ext.Msg.alert('Error',Ext.util.JSON.decode(res.responseText)['error'])}
	}