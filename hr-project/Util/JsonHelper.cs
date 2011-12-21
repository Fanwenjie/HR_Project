using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

/******************************
** 作者： ruby_matlab
** 变更时间： 2011-6-3
** 引用程序集
** System.Web.Extensions、System.Runtime.Serialization
** .Net Framework3.5版本(.net Framework4.0版本已经存在于System.Runtime.Serialization)还需要加入：
** System.ServiceModel.Web的程序引用集
******************************/

/******************************
** 作者： ruby_matlab
** 变更时间： 2011-6-7
** 命名空间
******************************/
using System.Web.Script.Serialization;
using System.Runtime.Serialization;
using System.Runtime.Serialization.Json;
using System.IO;
namespace Util
{
    /// <summary>
    /// Json序列化的帮助类
    /// </summary>
    public static class JsonHelper
    {
        /*****************************
        ** 作者： ruby_matlab
        ** 变更时间： 2011-6-6
        ******************************/
        #region###将对象序列化为字符串
        public static string Jso_ToJSON(this object tem_obj)
        {
            JavaScriptSerializer tem_serializer = new JavaScriptSerializer();
            return tem_serializer.Serialize(tem_obj);
        }
        #endregion

        /*****************************
        ** 作者： fanwenjie
        ** 变更时间： 2011-9-4
        ******************************/
        #region###将字符串反序列化为LIST<>类型
        public static List<T> Jso_BacDecode<T>(string json)
        {
            JavaScriptSerializer tem_serializer = new JavaScriptSerializer();
            List<T> list = tem_serializer.Deserialize<List<T>>(json);
            return list;
        }
        #endregion

        /*****************************
        ** 作者： ruby_matlab
        ** 变更时间： 2011-6-6
        ******************************/
        #region###将对象序列化为字符串
        public static string Jso_ToJSON(this object tem_obj, int tem_recursionDepth)
        {
            JavaScriptSerializer tem_serializer = new JavaScriptSerializer();
            tem_serializer.RecursionLimit = tem_recursionDepth;
            return tem_serializer.Serialize(tem_obj);
        }
        #endregion

        /*****************************
        ** 作者： ruby_matlab
        ** 变更时间： 2011-6-6
        ******************************/
        #region###将字符串反序列化为对象
        public static object JsonToObject(string jsonString, object obj)
        {
            DataContractJsonSerializer serializer = new DataContractJsonSerializer(obj.GetType());
            MemoryStream mStream = new MemoryStream(Encoding.UTF8.GetBytes(jsonString));
            return serializer.ReadObject(mStream);
        }
        #endregion

        /*****************************
        ** 作者： ruby_matlab
        ** 变更时间： 2011-6-6
        ******************************/
        #region###将字符串反序列化为对象
        public static T Jso_DeJSON<T>(this string json)
        {
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            return serializer.Deserialize<T>(json);
        }
        #endregion
    }
}
