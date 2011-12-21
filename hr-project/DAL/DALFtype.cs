using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

/******************************
** 作者： LiuGuanPing
** 变更时间： 2011-10-8
** 引用程序集
** ORM
******************************/

/******************************
** 作者： 
** 变更时间： 
** 命名空间
******************************/
using ORM;
namespace DAL
{
    public class DALFtype : IDisposable 
    {
        /// <summary>
        /// 数据库连接
        /// </summary>
        protected hrDataContext db = new hrDataContext();

        public int count = 0;

        /******************************
        ** 作者： LiuGuanPing
        ** 变更时间： 2011-12-20
        ******************************/
        #region ###返回因子类型所有信息
        public object Select_Ftype(int start, int limit)
        {
            var q = from b in db.ftype 
                    select new { b.fty_id, b.fty_name, b.fty_describe,b.fty_maker,b.fty_madetime,b.fty_changetime };
            count = q.Count();
            count = count > 1000 ? 1000 : count;
            q = q.Skip(start).Take(limit);  //当前页记录
            return q;
        }
        #endregion

        /******************************
        ** 作者： LiuGuanPing
        ** 变更时间： 2011-12-20
        ******************************/
        #region ###新增因子类型
        public void Insert_Ftype(string name,string describe,string maker)
        {
            ftype fty = new ftype();
            fty.fty_name = name;
            fty.fty_describe = describe;
            fty.fty_maker = maker;
            DateTime da = new DateTime();
            fty.fty_madetime = da;
            fty.fty_changetime = da;
            db.ftype.InsertOnSubmit(fty);
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
        ~DALFtype()
        {
            this.Dispose();
        }
        #endregion
    }
}
