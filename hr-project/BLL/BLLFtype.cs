using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

/******************************
** 作者： LiuGuanPing
** 变更时间： 2011-12-20
** 引用程序集
** DAL、Util、ORM
******************************/

/******************************
** 作者： 
** 变更时间： 
** 命名空间
******************************/
using DAL;
using Util;
using ORM;
namespace BLL
{
    public class BLLFtype : IDisposable 
    {
        /// <summary>
        /// 返回错误信息        
        /// </summary>
        public string error = null;

        /******************************
        ** 作者： LiuGuanPing
        ** 变更时间： 2011-12-20
        ******************************/
        #region ###返回因子类型的所有信息
        public string Select_Ftype(int start, int limit)
        {
            using (DALFtype b = new DALFtype())
            {
                try
                {
                    string JsonSource = JsonHelper.Jso_ToJSON(b.Select_Ftype(start, limit));    //当前页记录转成JSON格式
                    string strJsonSource = "{\"totalCount\":\"" + b.count + "\"";
                    strJsonSource = strJsonSource + ",\"data\":" + JsonSource + "}";  //Grid的分页区显示所有记录数增加totalCount信息
                    return strJsonSource;
                }
                catch (Exception e)
                {
                    error = e.Message;
                    return String.Empty;
                }
            }
        }
        #endregion

        /******************************
        ** 作者： LiuGuanPing
        ** 变更时间： 2011-10-8
        ******************************/
        #region###新增因子类型
        public bool Insert_Ftype(string name, string describe, string maker)
        {
            using (DALFtype a = new DALFtype())
            {
                try
                {
                    a.Insert_Ftype(name,describe,maker);
                    return true;
                }
                catch (Exception e)
                {
                    error = e.Message;
                    return false;
                }
            }
        }
        #endregion

        /******************************
        ** 作者： LiuGuanPing
        ** 变更时间： 2011-12-20
        ******************************/
        #region###释放资源
        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
        #endregion

        /******************************
        ** 作者： LiuGuanPing
        ** 变更时间： 2011-12-20
        ******************************/
        #region###析构函数
        ~BLLFtype()
        {
            this.Dispose();
        }
        #endregion
    }   
}
