<%@ WebHandler Language="C#" Class="salary" %>

using System;
using System.Web;
/******************************
** 作者： 范文杰
** 变更时间： 2011-12-19
** 引用程序集
** DAL、Util、ORM
******************************/

/******************************
** 作者：范文杰
** 变更时间： 2011-12-19
** 命名空间
******************************/
using BLL;

public class salary : IHttpHandler {
    HttpContext context;
    public void ProcessRequest (HttpContext context) {
        this.context = context;
        context.Response.ContentType = "text/json";
        try
        {
            switch (context.Request.QueryString["type"].Trim())
            {
                case "select": SelectSalary(); break;
            }
        }
        catch (Exception e)
        {
            string st = @"{success:false,error:""" + e.Message + @"""}";
            context.Response.Write(st);
        }
    }

    /******************************
     ** 作者： 范文杰
    ** 变更时间： 2011-12-19
     **作用：  分页获取薪酬造表信息
     ******************************/
    protected void SelectSalary()
    {
        using (BLLSalary a = new BLLSalary())
        {
            string st = @"{success:true," + a.SelectSalary(int.Parse(context.Request["start"]), int.Parse(context.Request["limit"])) + "}";
            context.Response.Write(st);
        }
    }
    
    public bool IsReusable {
        get {
            return false;
        }
    }

}