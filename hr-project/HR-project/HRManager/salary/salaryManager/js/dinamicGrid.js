/// <reference path="../../../../ext-3.4.0/vswd-ext_2.0.2.js" />
//
/**********************************************************************************************************************
** 作者： fanwenjie
** 变更时间： 2011-12-18
** 作用：动态表头函数 url为grid加载路径，head为表头字符串，以“,”分割开，注意最后也要加个“,”，tbar1为grid的头部工具栏
         tbar2为双行工具栏，预留1、2行为工号和姓名之用
**********************************************************************************************************************/  
function createGrid(url,head,tbar1,tbar2)
{
    var a=head.split(',');
    var headA='[new Ext.grid.RowNumberer(),';
    var fieldNames='[';
    var numEditor='new Ext.form.NumberField({allowNegative:false,disableKeyFilter:true,emptyText:"暂无数据"})';
    for(var i in a){
           if(i==a.length-1) break;
           if(i<2) headA+='{header:\"'+a[i]+'\",dataIndex:\"'+a[i]+'\",sortable: true,align:"center"},';
           else headA+='{header:\"'+a[i]+'\",dataIndex:\"'+a[i]+'\",sortable: true,editor:'+numEditor+'},';
           fieldNames+='{name:\"'+a[i]+'\",mapping:'+i+'},';
    }                
    fieldNames = fieldNames.substring(0, fieldNames.length - 1)+']';
    headA=headA.substring(0,headA.length-1)+']';
/**********************************************************************************************************************
** 作者： fanwenjie
** 变更时间： 2011-12-18
** 作用：汇总函数
**********************************************************************************************************************/ 
    function summery(store,record,option)
    {                
        var sumRecord='{';
        store.fields.each(function(item,index){//取其值域
            var name=item.name;
            var value='null';
            if(index==0) value='"<strong>合计：<\strong>"';
            if(index!=0 && index!=1) value='"<strong>'+store.sum(name).toString()+'<\strong>"';
            sumRecord+=name+':'+value+',';
        });
        sumRecord = sumRecord.substring(0, sumRecord.length - 1)+'}';
        var tt=new store.recordType(new Ext.util.JSON.decode(sumRecord));
        store.add(tt);
    }
/**********************************************************************************************************************
** 作者： fanwenjie
** 变更时间： 2011-12-18
** 作用：定义grid
**********************************************************************************************************************/ 
     
    var cm = new Ext.grid.ColumnModel({
        columns: new Ext.util.JSON.decode(headA)
    });
    //store对象
    var ds = new Ext.data.JsonStore({
        data: [[1,2,3,4],[2,3,4,5]],
        listeners:{
			    'load':summery
			},
//        url:url,
//        root:'data',//将来要添加上的代码
//		totalProperty:'total',
        fields: new Ext.util.JSON.decode(fieldNames)
    });
    ds.on('update',function(){var btn_save=Ext.getCmp('btn_save');if(btn_save!=null) btn_save.enable();});
    
    var grid = new Ext.grid.EditorGridPanel({
        border: true,        
        autoWidth:true,
        autoScroll:true,
        stripeRows:true,
	    frame:true,
	    loadMask : { 
             msg : '数据加载中...' 
        },
        itemId:'dinamicGrid',
        store: ds,
        sm:new Ext.grid.RowSelectionModel(),
        cm: cm,
        listeners : {  
               'render' : function(){  
                    if(tbar2!=null) tbar2.render(this.tbar);}
//                    ds.on('update',function(){Ext.getCmp('btn_save').enable();});	 }     //add one tbar  
                }, 
        bbar : new Ext.PagingToolbar({              
                    store:ds,
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
        tbar:tbar1
    });
    return grid;
}
//渲染后操作
function afterRender(url,ds)
{
}
//翻页函数
function turnPage(url,start,limit)
{
}