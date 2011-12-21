/// <reference path="../../../ext-3.4.0/vswd-ext_2.0.2.js" />
function createLeftMenu(){
		//创建根节点
		var root = new Ext.tree.TreeNode({
			text : '薪酬管理'
		});
		
		//因子管理
		var factorNode=new Ext.tree.TreeNode({
			text : '因子管理',
			singleClickExpand:true
		});
		factorNode.appendChild(new Ext.tree.TreeNode({
		   text:'因子类型管理',
		   href:'salaryManager/ftype.aspx',
		   hrefTarget:'content'
		}));
		factorNode.appendChild(new Ext.tree.TreeNode({
		   text:'因子管理',
		   href:'salaryManager/factor.aspx',
		   hrefTarget:'content'
		}));
		factorNode.appendChild(new Ext.tree.TreeNode({
		   text:'人员因子值设置',
		   href:'salaryManager/fvalue.aspx',
		   hrefTarget:'content'
		}));
		root.appendChild(factorNode);
		
		//账套管理
		var acc_Node=new Ext.tree.TreeNode({
			text : '账套管理',
			singleClickExpand:true
		});
		acc_Node.appendChild(new Ext.tree.TreeNode({
		   text:'账套管理',
		   href:'salaryManager/accEdit.aspx',
		   hrefTarget:'content'
		}));
		acc_Node.appendChild(new Ext.tree.TreeNode({
		   text:'人员账套配置',
		   href:'salaryManager/accset.aspx',
		   hrefTarget:'content'
		}));
		root.appendChild(acc_Node);
		
		//工资管理
		var salary_Node=new Ext.tree.TreeNode({
			text : '工资管理',
			singleClickExpand:true
		});
		salary_Node.appendChild(new Ext.tree.TreeNode({
		   text:'工资因子值录入',
		   id:'inputSalary',
		   href:'salaryManager/input.aspx',
		   hrefTarget:'content'	  
		}));
		salary_Node.appendChild(new Ext.tree.TreeNode({
		   text:'工资造表',
		   href:'salaryManager/createTable.aspx',
		   hrefTarget:'content'
		}));
		salary_Node.appendChild(new Ext.tree.TreeNode({
		   text:'工资审核',
		   href:'salaryManager/salaryAudit.aspx',
		   hrefTarget:'content'
		}));
		salary_Node.appendChild(new Ext.tree.TreeNode({
		   text:'工资发放',
		   href:'salaryManager/salaryExtend.aspx',
		   hrefTarget:'content'
		}));
		salary_Node.appendChild(new Ext.tree.TreeNode({
		   text:'打印工资条',
		   href:'salaryManager/salaryPrint.aspx',
		   hrefTarget:'content'
		}));
		root.appendChild(salary_Node);
		
		//月末处理
		var mouth_Node=new Ext.tree.TreeNode({
			text : '月末处理',
			singleClickExpand:true
		});
		mouth_Node.appendChild(new Ext.tree.TreeNode({
		   text:'当月账套工资汇总',
		   href:'salaryManager/acc_currentSum.aspx',
		   hrefTarget:'content'
		}));
		mouth_Node.appendChild(new Ext.tree.TreeNode({
		   text:'历史工资汇总',
		   href:'salaryManager/acc_previouSum.aspx',
		   hrefTarget:'content'
		}));
		root.appendChild(mouth_Node);
		
		//统计报表
		var report_Node=new Ext.tree.TreeNode({
		   text:'统计报表',
			singleClickExpand:true
		});
		report_Node.appendChild(new Ext.tree.TreeNode({
		   text:'帐套工资汇总表'
		}));
		report_Node.appendChild(new Ext.tree.TreeNode({
		   text:'部门工资年报',
		   href:'salaryManager/bumenreport.aspx',
		   hrefTarget:'content'
		}));
		report_Node.appendChild(new Ext.tree.TreeNode({
		   text:'员工收入汇总表',
		   href:'salaryManager/gerenreport.aspx',
		   hrefTarget:'content'
		}));
		report_Node.appendChild(new Ext.tree.TreeNode({
		   text:'工资结构分析'
		}));
		report_Node.appendChild(new Ext.tree.TreeNode({
		   text:'自定义报表'
		}));
		root.appendChild(report_Node);

		//创建Tree面板组件
		var tree = new Ext.tree.TreePanel({
			title : '简单的树面板示例',
			width : 176,
			height : 600,
			el:'leftMenu',
			lines:false,
			rootVisible:false,
			border:false,
		    header:false,
			singleExpand:true,
			root : root
		})
		return tree;
	};