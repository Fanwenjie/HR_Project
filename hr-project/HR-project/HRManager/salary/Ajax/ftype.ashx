<%@ WebHandler Language="C#" Class="ftype" %>

using System;
using System.Web;
/******************************
** 作者： LiuGuanPing
** 变更时间： 2011-12-20
** 引用程序集
** BLL
******************************/

/******************************
** 作者： 
** 变更时间： 
** 命名空间
******************************/
using BLL;
public class ftype : IHttpHandler
{

    public void ProcessRequest(HttpContext context)
    {
        context.Response.ContentType = "text/plain";
        int start = (String.IsNullOrEmpty(context.Request["start"])) ? 0 : Convert.ToInt32(context.Request["start"]);
        int limit = (String.IsNullOrEmpty(context.Request["limit"])) ? 0 : Convert.ToInt32(context.Request["limit"]);
        string type = context.Request.QueryString["type"];
        int id = (String.IsNullOrEmpty(context.Request.QueryString["fty_id"])) ? 0 : Convert.ToInt32(context.Request.QueryString["fty_id"]);
        string name = (String.IsNullOrEmpty(context.Request.QueryString["fty_name"])) ? "" : context.Request.QueryString["fty_name"];
        string describe = (String.IsNullOrEmpty(context.Request.QueryString["fty_describe"])) ? "" : context.Request.QueryString["fty_describe"];
        string maker = (String.IsNullOrEmpty(context.Request.QueryString["fty_maker"])) ? "" : context.Request.QueryString["fty_maker"];
        switch (context.Request.QueryString["type"])
        {
            case "Select":
                using (BLLFtype a = new BLLFtype())
                {
                    context.Response.Write(a.Select_Ftype(start, limit));
                }
                break;
            case "InsertOrUpdate":
                using (BLLFtype a = new BLLFtype())
                {
                    if (id == 0){
                        if (a.Insert_Ftype(name, describe, maker))
                        {
                            context.Response.Write("true"); //新增
                        }
                        else {
                            context.Response.Write("false"); //新增
                        }
                    }
                    else {
                        //context.Response.Write(a.Update_Ftype(name, describe)); //更新
                    }
                }
                break;
            case "Delete":
                using (BLLFtype a = new BLLFtype())
                {
                    //context.Response.Write(a.Select_Ftype(start, limit));
                }
                break;
            default:
                break;
        }
    }



    public bool IsReusable
    {
        get
        {
            return false;
        }
    }

}