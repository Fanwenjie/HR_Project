using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

/******************************
** 作者： 范文杰
** 变更时间： 2011-12-19
** 引用程序集
** ORM、Syste.Data.Linq
******************************/

/******************************
** 作者：范文杰
** 变更时间： 2011-12-19
** 命名空间
******************************/
using ORM;
namespace DAL
{
    public class DALSalary
    {
        /// <summary>
        /// 数据库连接
        /// </summary>
        protected static hrDataContext db = new hrDataContext();
        /// <summary>
        /// 总数
        /// </summary>
        public static int count = 0;

        /******************************
        ** 作者： 范文杰
        ** 变更时间： 2011-12-19
        ******************************/
        #region###根据传输的SAL_ID选择相应工资表
        public static IQueryable SelectByID(int sal_id)
        {
            var q = from b in db.salary
                    where b.sal_id == sal_id
                    select new salary();
            return q;
        }
        #endregion

        /******************************
        ** 作者： 范文杰
        ** 变更时间： 2011-12-19
        ******************************/
        #region###分页查询薪酬造表信息
        public static object SelectSalary(int start, int limit)
        {
            var q = from b in db.salary
                    select b;
            count = q.Count();
            q = q.Skip(start).Take(limit);
            return q;
        }
        #endregion
    }
}
