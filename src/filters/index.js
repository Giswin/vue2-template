// Vue 过滤器的定义
/**
 * 保留小数
 * @param {Number} value
 * @param {int} num 小数位数
 */
export function decimal(value, num) {
    if (num === undefined || num == null){
        num = 2
    }
    return (isNaN(value) ? 0.00 : parseFloat(value).toFixed(num))
}

/**
 * 大数转为分隔千分符显示
 * 10000 => "10,000"
 * @param {Number} value
 * @param {int} num 小数位数
 */
export function toThousand(value, num) {
    value = decimal(value, num)
    
    //return (+value || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
    
    let valueArray = value.toString().split(".");
    //let intPart = valueArray[0] // 获取整数部分
    let intPartFormat = valueArray[0].toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') // 将整数部分逢三一断
    if(num > 0)
    	return value = 0 ? '' : intPartFormat + '.' + valueArray[1];
    else
    	return value = 0 ? '' : intPartFormat;
}

function _dateFormat(value, fmt) {
    
    if(!value) return null;
    
    if (!fmt) fmt = 'yyyy-MM-dd';
    let date = new Date(value);
    let ret;
    const opt = {
        "y+": date.getFullYear().toString(), // 年
        "M+": (date.getMonth() + 1).toString(), // 月
        "d+": date.getDate().toString(), // 日
        "h+": date.getHours().toString(), // 时
        "m+": date.getMinutes().toString(), // 分
        "s+": date.getSeconds().toString() // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
            fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
        };
    };
    return fmt;
}

/**
 * 日期显示格式
 * dateFormat("yyyy-MM-dd hh:mm", date)  =>  2019-06-06 19:45
 * @param {date} value
 * @param {string} fmt
 */
export function formatDate(value, fmt) {
    if (!fmt) fmt = 'yyyy-MM-dd';
    fmt = _dateFormat(value, fmt)
    return fmt;
}

/**
 * 日期+时间显示格式
 * dateFormat("yyyy-MM-dd hh:mm", date)  =>  2019-06-06 19:45
 * @param {datetime} value
 * @param {string} fmt
 */
export function formatDatetime(value, fmt) {
    if (!fmt) fmt = 'yyyy-MM-dd hh:mm';
    fmt = _dateFormat(value, fmt)
    return fmt;
}

/**
 * 将日期时间显示为多久前
 * @param {string} date
 */
export function timeAgo(date) {
  if(!date) return '';
  let time = new Date(date.substring(0,19).replace(/-/g,'/')).getTime();

  const between = (Date.now() - Number(time) )/ 1000
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute') + ' ago'
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour') + ' ago'
  } else if (between < 2592000) {
    return pluralize(~~(between / 86400), ' day') + ' ago'
  } else {
    return pluralize(~~(between / 2592000), ' month') + ' ago'
  }
}

/**
 * Show plural label if time is plural number
 * @param {number} time
 * @param {string} label
 * @return {string}
 */
function pluralize(time, label) {
  if (time === 1) {
    return time + label
  }
  return time + label + 's'
}
