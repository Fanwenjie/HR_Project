using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

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
using DAL;
using Util;
using ORM;

namespace BLL
{
    public class BLLSalary : IDisposable
    {
        /// <summary>
        /// 返回错误信息
        /// </summary>
        public string error = string.Empty;

        /******************************
        ** 作者： 范文杰
        ** 变更时间： 2011-12-19
        ******************************/
        #region###根据传输的SAL_ID选择相应产品
        public IQueryable SelectByID(int sal_id)
        {
            return DALSalary.SelectByID(sal_id);
        }
        #endregion

        /******************************
        ** 作者： 范文杰
        ** 变更时间： 2011-12-19
        ******************************/
        #region###分页获取薪酬造表信息
        public string SelectSalary(int start, int limit)
        {
            string str = DAL.DALSalary.SelectSalary(start, limit).Jso_ToJSON();
            return @"data:" + str + @",""total"":""" + DAL.DALSalary.count + @""""; ;
        }
        #endregion

        /******************************
        ** 作者： 范文杰
        ** 变更时间： 2011-12-19
        ******************************/
        #region###释放资源
        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
        #endregion

        /******************************
        ** 作者： 范文杰
        ** 变更时间： 2011-12-19
        ******************************/
        #region###析构函数
        ~BLLSalary()
        {
            this.Dispose();
        }
        #endregion
    }
}
