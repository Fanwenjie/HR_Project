using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
/******************************
** 作者： ruby_matlab
** 变更时间： 2011-6-23
** 引用程序集
** System.Web
******************************/
namespace Util
{
    /// <summary>
    /// 消息框
    /// </summary>
    public static class MessageBox
    {
        /******************************
        ** 作者： ruby_matlab
        ** 变更时间： 2011-6-23
        ******************************/
        #region###提示消息
        public static void ShowMessage(string strMsg)
        {
            string str = String.Format("<script language='javascript'>window.alert('{0}');</script>", JsonHelper.Jso_ToJSON(strMsg));
            System.Web.HttpContext.Current.Response.Write(str);
        }
        #endregion

        /******************************
        ** 作者： ruby_matlab
        ** 变更时间： 2011-6-23
        ******************************/
        #region###显示信息
        public static void ShowMessage(System.Web.UI.Page page, string strMsg)
        {
            string str = String.Format("<script language='javascript'>window.alert('{0}');</script>", JsonHelper.Jso_ToJSON(strMsg));
            page.Response.Write(str);
        }
        #endregion

        /******************************
        ** 作者： ruby_matlab
        ** 变更时间： 2011-6-23
        ******************************/
        #region###显示信息并跳转Url
        public static void ShowMessage(string strMsg, string Url)
        {
            string str = String.Format("<script language='javascript'>window.alert('{0}');window.location.href ='{1}'</script>", JsonHelper.Jso_ToJSON(strMsg), JsonHelper.Jso_ToJSON(Url));
            System.Web.HttpContext.Current.Response.Write(str);
        }
        #endregion

        /******************************
        ** 作者： ruby_matlab
        ** 变更时间： 2011-6-23
        ******************************/
        #region###显示信息并跳转Url
        public static void ShowMessage(System.Web.UI.Page page, string strMsg, string Url)
        {
            string str = String.Format("<script type=\"text/javascript\">window.alert('{0}');window.location.href ='{1}';</script>", JsonHelper.Jso_ToJSON(strMsg), JsonHelper.Jso_ToJSON(Url));
            page.Response.Write(str);
        }
        #endregion

        /******************************
        ** 作者： ruby_matlab
        ** 变更时间： 2011-6-23
        ******************************/
        #region###确定信息
        public static void ShowConfirm(string strMsg, string strUrl_Yes, string strUrl_No)
        {
            string str = String.Format("<script language='javascript'> if(window.confirm('{0}')) { window.location.href='{1}' } else { window.location.href='{1}' };</script>",
                JsonHelper.Jso_ToJSON(strMsg), JsonHelper.Jso_ToJSON(strUrl_Yes), JsonHelper.Jso_ToJSON(strUrl_No));
            System.Web.HttpContext.Current.Response.Write(str);
        }
        #endregion
    }
}
