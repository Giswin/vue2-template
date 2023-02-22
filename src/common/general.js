import config from "@/config/config.js";
import md5 from "js-md5";
import b64hamcsha1 from "@/common/hash.js";
import axios from "axios";
import store from "@/store/index.js";
import XEUtils from "xe-utils";
/**
 * 文档说明：自定义封装的一些通用功能方法
 */

const general = {
  /**
   * 使用又拍云上传文件时，需要提交的data生成方法
   */
  upyunParams: function() {
    let expiration = ((Date.now() / 1000) >>> 0) + 30 * 60;

    let policy = btoa(
      JSON.stringify({
        bucket: config.upyun.bucket,
        "save-key": config.appCode + "/" + config.upyun.key,
        expiration: expiration,
        "content-length-range": "0,104857600",
      })
    );

    let signature = b64hamcsha1(
      md5(config.upyun.secret),
      "POST&/" + config.upyun.bucket + "&" + policy
    );

    return {
      policy: policy,
      authorization: "UPYUN " + config.upyun.operator + ":" + signature,
    };
  },

  /**
   * 又拍云删除文件调用接口方法
   * @param {Object} file_name 文件URI
   *  例如文件地址为：http://gthsip.test.upcdn.net/GTHS-EIP/1fdd808d4e9e395ee4ded743a7fa00d1drcdiftzwsgmsght.jpg
   *  那么file_name = GTHS-EIP/1fdd808d4e9e395ee4ded743a7fa00d1drcdiftzwsgmsght.jpg
   */
  delete_upyunfile: function(file_name) {
    let nowDate = new Date().toGMTString();
    let signature = b64hamcsha1(
      md5(config.upyun.secret),
      "DELETE&/" + config.upyun.bucket + "/" + file_name + "&" + nowDate
    );

    axios({
      method: "delete",
      url: config.upyun.upyunUrl + "/" + file_name,
      data: {},
      headers: {
        Authorization: "UPYUN " + config.upyun.operator + ":" + signature,
        "X-Date": nowDate,
        "X-CORS": 1, // 这个标识表示跨域，在https请求拦截方法里会判断并处理跨域header
      },
    })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  },

  // 将多个对象的属性合成一个对象
  extend: function() {
    var length = arguments.length;
    var target = arguments[0] || {};
    if (typeof target != "object" && typeof target != "function") {
      target = {};
    }
    if (length == 1) {
      target = this;
      i--;
    }
    for (var i = 1; i < length; i++) {
      var source = arguments[i];
      for (var key in source) {
        // 使用for in会遍历数组所有的可枚举属性，包括原型。
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  },

  //深度克隆
  deepClone: function(obj) {
    var result,
      oClass = this.isClass(obj);
    //确定result的类型
    if (oClass === "Object") {
      result = {};
    } else if (oClass === "Array") {
      result = [];
    } else {
      return obj;
    }
    for (let key in obj) {
      var copy = obj[key];
      if (this.isClass(copy) == "Object") {
        result[key] = this.deepClone(copy); //递归调用
      } else if (this.isClass(copy) == "Array") {
        result[key] = this.deepClone(copy);
      } else {
        result[key] = obj[key];
      }
    }
    return result;
  },

  //返回传递给他的任意对象的类
  isClass: function(o) {
    if (o === null) return "Null";
    if (o === undefined) return "Undefined";
    return Object.prototype.toString.call(o).slice(8, -1);
  },

  /**
   * 将时间戳转为正常的日期时间
   * @param {timestamp} nS
   */
  timestamp: function(nS) {
    return new Date(parseInt(nS) * 1000)
      .toLocaleString()
      .replace(/:\d{1,2}$/, " ");
  },

  /**
   * 重新设置标签数组对象结构中的键名
   * @param {Object} dicData
   */
  resetLabelData(dicData) {
    let labels_dataset = [];
    let optionItem = {};
    for (let i = 0; i < dicData.children.length; i++) {
      optionItem.label = dicData.children[i].dic_name;
      optionItem.multiple = dicData.children[i].is_multi == 0 ? false : true;
      optionItem.options = [];
      for (let j = 0; j < dicData.children[i].children.length; j++) {
        optionItem.options.push({
          label: dicData.children[i].children[j].dic_name,
        });
      }
      labels_dataset.push(optionItem);
    }
    return labels_dataset;
  },

  /**
   * 获取当前日期的年月日
   * @returns {{month: number, year: number, day: number}}
   */
  getYearMonth() {
    let date = new Date();
    let rtn = {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
    };
    return rtn;
  },

  /**
   * 获取当前日期
   * @returns {{month: number, year: number, day: number}}
   */
  getNowDate() {
    let date = this.getYearMonth();
    let datestr = `${date.year}-`;
    datestr += date.month > 9 ? `${date.month}-` : `0${date.month}-`;
    datestr += date.day > 9 ? `${date.day}` : `0${date.day}`;
    return datestr;
  },

  /**
   * 获取当前日期+时间
   * @returns {{month: number, year: number, day: number}}
   */
  getNowDateTime() {
    var date = new Date();
    var sign1 = "-";
    var sign2 = ":";
    var year = date.getFullYear(); // 年
    var month = date.getMonth() + 1; // 月
    var day = date.getDate(); // 日
    var hour = date.getHours(); // 时
    var minutes = date.getMinutes(); // 分
    var seconds = date.getSeconds(); //秒
    //var weekArr = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天'];
    //var week = weekArr[date.getDay()];
    // 给一位数数据前面加 “0”
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (day >= 0 && day <= 9) {
      day = "0" + day;
    }
    if (hour >= 0 && hour <= 9) {
      hour = "0" + hour;
    }
    if (minutes >= 0 && minutes <= 9) {
      minutes = "0" + minutes;
    }
    if (seconds >= 0 && seconds <= 9) {
      seconds = "0" + seconds;
    }
    var currentdate =
      year +
      sign1 +
      month +
      sign1 +
      day +
      " " +
      hour +
      sign2 +
      minutes +
      sign2 +
      seconds;
    return currentdate;
  },

  /**
   * 将一维数组的JSON字符串，变成用拼接符拼接成的字符串显示
   * @param {JSON String} JsonString 一维数组的JSON字符串
   * @param {String} delimiter 数组元素拼接符
   */
  getSingleArrayStr(JsonString, delimiter) {
    if (!delimiter) {
      delimiter = "-";
    }
    if (JsonString != undefined) {
      let temp_arr = JSON.parse(JsonString) || [];
      return temp_arr.join(delimiter);
    } else return null;
  },

  /**
   * 转换千分符号
   */
  transform(num, fixed = 2) {
    if (fixed > 0) {
      num = parseFloat(num).toFixed(fixed);
    }
    let number = "";
    let valueArray = num.toString().split(".");
    let intPart = valueArray[0]; // 获取整数部分
    let intPartFormat = intPart
      .toString()
      .replace(/(\d)(?=(?:\d{3})+$)/g, "$1,"); // 将整数部分逢三一断
    if (fixed > 0) number = num = 0 ? "" : intPartFormat + "." + valueArray[1];
    else number = num = 0 ? "" : intPartFormat;
    return number;
  },

  /**
   * 对象数组提取键值当键名
   */
  objectKeyBy(arr, param) {
    if (arr == undefined) return {};
    let arrTmp = [];
    for (let i = 0; i < arr.length; i++) {
      arrTmp[`${arr[i][param]}`] = arr[i];
    }
    return Object.assign({}, arrTmp);
  },

  /**
   * 滚轮阻止方法
   */
  stopScrollFun(evt) {
    evt = evt || window.event;
    event.preventDefault();
    return false;
  },

  /**
   * VXE输入框焦点选中
   */
  vxeFocusActionAfter({ $event }) {
    event.target.select();
  },

  /**
   * 遮罩层
   */
  shadow(action = "show") {
    if (action == "show")
      store.commit("SET_TMP_VALUE", {
        name: "loadingBar",
        value: true,
      });
    else
      store.commit("SET_TMP_VALUE", {
        name: "loadingBar",
        value: false,
      });
  },

  /**
   * 循环替换 undefined
   */
  replaceUndefined(arr) {
    for (var key in arr) {
      if (arr[key] === undefined) {
        arr[key] = null;
      }
    }
    return arr;
  },

  /**
   * 格式化数值
   */
  formatAmount({ cellValue }, digits = 2) {
    return XEUtils.commafy(XEUtils.toNumber(cellValue), {
      digits,
    });
  },

  /**
   * 数字转中文大写
   */
  /**
   * 数字转中文大写
   */
  toCNMoney(n) {
    var fraction = ["角", "分"];
    var digit = ["零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"];
    var unit = [["元", "万", "亿"], ["", "拾", "佰", "仟"]];
    var head = n < 0 ? "欠" : "";
    n = Math.abs(n);
    var s = "";
    for (var i = 0; i < fraction.length; i++) {
      s += (
        digit[Math.floor(this.accMul(n, 10) * Math.pow(10, i)) % 10] +
        fraction[i]
      ).replace(/零./, "");
    }
    s = s || "整";
    n = Math.floor(n);
    for (var i = 0; i < unit[0].length && n > 0; i++) {
      var p = "";
      for (var j = 0; j < unit[1].length && n > 0; j++) {
        p = digit[n % 10] + unit[1][j] + p;
        n = Math.floor(n / 10);
      }
      s = p.replace(/(零.)*零$/, "").replace(/^$/, "零") + unit[0][i] + s;
    }
    return (
      head +
      s
        .replace(/(零.)*零元/, "元")
        .replace(/(零.)+/g, "零")
        .replace(/^整$/, "零元整")
    );
  },

  accMul(num1, num2) {
    var m = 0,
      s1 = num1.toString(),
      s2 = num2.toString();
    try {
      m += s1.split(".")[1].length;
    } catch (e) {}
    try {
      m += s2.split(".")[1].length;
    } catch (e) {}
    return (
      (Number(s1.replace(".", "")) * Number(s2.replace(".", ""))) /
      Math.pow(10, m)
    );
  },

  trim(str) {
    //删除左右两端的空格
    return str.replace(/(^\s*)|(\s*$)/g, "");
  },
  ltrim(str) {
    //删除左边的空格
    return str.replace(/(^\s*)/g, "");
  },
  rtrim(str) {
    //删除右边的空格
    return str.replace(/(\s*$)/g, "");
  },

  // 判断一个变量是否为array
  isArray(o) {
    return Object.prototype.toString.call(o) == "[object Array]";
  },

  /* 
        将对象数组中的指定属性值提取出到一维数组中
        比如有一个客户列表数组中，将客户ID提取到一个数组中：getArrayObjectPropValues(cusList,'cusId')
        参数:
            array: 要从中提取数据的对象数组
            propNames: 要取出对象的属性名称， 支持使用数组 。例：将getArrayObjectPropValues(cusList,['cusId','cusName'], ',')
            splicer: 当要提取多个属性时，设置多个属性的值使用拼接字符，如果不传，默认使用英文逗号
    */
  getArrayObjectPropValues(array, propNames, splicer) {
    if (array == undefined || array == null) return [];
    let vals = [];
    let tempVal = "";
    let spr = !splicer ? "," : splicer;
    for (var i = 0; i < array.length; i++) {
      tempVal = "";
      if (this.isArray(propNames)) {
        // 如果传入多个属性，用拼接符拼接属性值
        for (let j = 0; j < propNames.length; j++) {
          tempVal += array[i][propNames[j]] + spr;
        }
        tempVal = tempVal.substring(0, tempVal.length - 1);
        vals.push(tempVal);
      } else {
        vals.push(array[i][propNames]);
      }
    }
    return vals;
  },

  // 判断数组(一维数组)中是否有元素值重复,对于对象数组，可以先使用getArrayObjectPropValues将要判断的对象属性提取到一维数组
  hasRepeatValue(array) {
    if (array == undefined || array == null) return "";

    let nary = array.sort();

    for (var i = 0; i < array.length; i++) {
      if (nary[i] == nary[i + 1]) {
        return "有重复项：" + nary[i];
      }
    }
    return "";
  },
  //浮点数保留两位小数
  //2.强制保留2位小数，如：2，会在2后面补上00.即2.00
  toDecimal2(x) {
    var f = parseFloat(x);
    if (isNaN(f)) {
      return false;
    }
    var f = Math.round(x * 100) / 100;
    var s = f.toString();
    var rs = s.indexOf(".");
    if (rs < 0) {
      rs = s.length;
      s += ".";
    }
    while (s.length <= rs + 2) {
      s += "0";
    }
    return s;
  },

  /**
   * 合并单元格(如果结束行传0代表合并所有行)
   * @param table1    表格的ID
   * @param startRow  起始行
   * @param endRow    结束行
   * @param col   合并的列号，对第几列进行合并(从0开始)。第一行从0开始
   */
  mergeCell(table1, startRow, endRow, col) {
    var tb = document.getElementById(table1);
    if (!tb || !tb.rows || tb.rows.length <= 0) {
      return;
    }
    if (col >= tb.rows[0].cells.length || (startRow >= endRow && endRow != 0)) {
      return;
    }
    if (endRow == 0) {
      endRow = tb.rows.length - 1;
    }
    for (var i = startRow; i < endRow; i++) {
      if (
        tb.rows[startRow].cells[col].innerHTML ==
        tb.rows[i + 1].cells[col].innerHTML
      ) {
        //如果相等就合并单元格,合并之后跳过下一行
        tb.rows[i + 1].removeChild(tb.rows[i + 1].cells[col]);
        tb.rows[startRow].cells[col].rowSpan =
          tb.rows[startRow].cells[col].rowSpan + 1;
      } else {
        this.mergeCell(table1, i + 1, endRow, col);
        break;
      }
    }
  },

  /**
   * 获取字符串第N次出现位置
   * @param {Object} str
   * @param {Object} cha
   * @param {Object} num
   */
  findStrIndex(str, cha, num) {
    let x = str.indexOf(cha);
    for (let i = 0; i < num; i++) {
      x = str.indexOf(cha, x + 1);
    }
    return x;
  },

  /**
   * 根据给定数组以及汇总字段、和分组字段，分组汇总返回新数据
   * @param array 数组
   * @param sum_Field 汇总字段字符 'count,money'
   * @param group_Field 分组字段字符  'bom,color,size'
   * @param new_Field 返回新字段字符 'sumCount,sumMoney'
   */
  getGroupSumList(arr, sum_Field, group_Field, new_Field) {
    if (!this.isArray(arr)) return false;

    let newField = new_Field.split(",");
    let sumField = sum_Field.split(",");
    let groupField = group_Field.split(",");
    let groupFieldHeader = [
      /* {
                value: ['物料名称','heise','XL'],
                sumValue: [100, 200]
            }, */
    ]; //

    // 查找到的分组头数组下标
    let searchIndex = 0;

    for (let i = 0; i < arr.length; i++) {
      searchIndex = -1;

      // 查找分组头
      for (let n = 0; n < groupFieldHeader.length; n++) {
        let searched = 1;
        for (let j = 0; j < groupField.length; j++) {
          if (groupFieldHeader[n]["value"][j] !== arr[i][groupField[j]]) {
            searched = 0;
          }
        }
        if (searched == 1) {
          searchIndex = n;
          break;
        }
      }

      if (searchIndex == -1) {
        let tempArr = {
          value: [],
          sumValue: [],
        };
        for (let j = 0; j < groupField.length; j++) {
          tempArr.value.push(arr[i][groupField[j]]);
        }
        for (let j = 0; j < sumField.length; j++) {
          tempArr.sumValue.push(arr[i][sumField[j]]);
        }
        groupFieldHeader.push(tempArr);
      }
      // 分组头中已有该分组的，把数值累加进去
      else {
        for (let j = 0; j < sumField.length; j++) {
          groupFieldHeader[searchIndex].sumValue[j] =
            parseFloat(groupFieldHeader[searchIndex].sumValue[j]) +
            parseFloat(arr[i][sumField[j]]);
        }
      }
    }

    for (let i = 0; i < arr.length; i++) {
      for (let n = 0; n < groupFieldHeader.length; n++) {
        let searched = 1;
        for (let j = 0; j < groupField.length; j++) {
          if (groupFieldHeader[n]["value"][j] !== arr[i][groupField[j]]) {
            searched = 0;
          }
        }
        if (searched == 1) {
          for (let k = 0; k < newField.length; k++) {
            arr[i][newField[k]] = groupFieldHeader[n]["sumValue"][k];
          }
          break;
        }
      }
    }

    return arr;
  },

  // 分组group下拉菜单
  groupBy: function(list, groupName) {
    let arr = [];
    list.forEach((item) => {
      let value = item[groupName];
      if (value) {
        if (arr.indexOf(value) == -1 && value.trim() !== "") {
          arr.push(value);
        }
      }
    });
    return arr.sort();
  },

  // groupby分组合计
  toArraySumGroup: function(list, options) {
    let groupProps = options.groupProps;
    let sumProps = options.sumProps;
    if (groupProps.length == 0) {
      let resArr = [];
      let sumObj = {};
      sumProps.forEach((key) => {
        if (!sumObj[key]) {
          sumObj[key] = 0;
        }
      });
      list.forEach((data) => {
        sumProps.forEach((key) => {
          sumObj[key] += Number(data[key]);
        });
      });
      resArr.push(sumObj);
      return resArr;
    }

    let map = {};
    list.forEach((data) => {
      var keyArr = [];
      groupProps.forEach((key) => {
        keyArr.push(data[key]);
      });
      let keyStr = JSON.stringify(keyArr);
      if (!map[keyStr]) {
        map[keyStr] = [];
      }
      map[keyStr].push(data);
    });
    let resArr = [];
    for (let k in map) {
      let arr = map[k];
      let sumObj = {};
      groupProps.forEach((key) => {
        if (!sumObj[key]) {
          sumObj[key] = "";
        }
      });
      sumProps.forEach((key) => {
        if (!sumObj[key]) {
          sumObj[key] = 0;
        }
      });
      arr.forEach((item) => {
        sumProps.forEach((key) => {
          sumObj[key] += Number(item[key]);
        });
        groupProps.forEach((key) => {
          sumObj[key] = item[key];
        });
      });
      resArr.push(sumObj);
    }
    return resArr;
  },

  // 筛选过滤
  filterArray: function(list, conditions) {
    conditions.forEach((item) => {
      list = list.filter(function(n) {
        if (item.compare === "=") {
          return n[item.prop] === item.value;
        } else if (item.compare === "!=") {
          return n[item.prop] !== item.value;
        } else if (item.compare === ">") {
          return n[item.prop] > item.value;
        } else if (item.compare === "<") {
          return n[item.prop] < item.value;
        } else if (item.compare === "in") {
          return item.value.indexOf(n[item.prop]) > -1;
        } else if (item.compare === "like") {
          return n[item.prop].indexOf(item.value) > -1;
        }
      });
    });
    return list;
  },
  // vxe-table筛选按钮
  filterChange: function(thisPoint, tableName) {
    thisPoint.$nextTick(() => {
      var _this = thisPoint;
      var filterBtns = document.getElementsByClassName("vxe-cell--filter");

      for (let j = 0; j < filterBtns.length; j++) {
        filterBtns[j].addEventListener("mouseup", function() {
          _this.$refs[tableName].closeFilter();
        });
      }
    });
  },
  //空格换行字符转富文本格式
  getFormatCode(strValue) {
    return strValue
      .replace(/\r\n/g, "<br/>")
      .replace(/\n/g, "<br/>")
      .replace(/\s/g, "&nbsp;");
  },

  getFormatCodeTo (strValue){
    if(!strValue)
      return '';
      return strValue.replace(/!@!/g, '').replace(/!#!/g, '');
    },

    getFormatCodeForm (strValue){
      if(!strValue)
        return '';
      return strValue.replaceAll("<br><br>", "<br>");
    },
};

export default general;
