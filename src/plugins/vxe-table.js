import XEUtils from "xe-utils";
import VXETable from "vxe-table";
VXETable.setup({
  zIndex: 30,
});
import VXETablePluginElement from "vxe-table-plugin-element";
import "vxe-table-plugin-element/dist/style.css";
VXETable.use(VXETablePluginElement);

// 自定义全局的格式化处理函数
VXETable.formats.mixin({
  // 格式化性别
  formatSex({ cellValue }) {
    return cellValue ? (cellValue === "1" ? "男" : "女") : "";
  },
  // 格式化下拉选项
  formatSelect({ cellValue }, list) {
    const item = list.find((item) => item.value === cellValue);
    return item ? item.label : "";
  },
  // 格式化日期，默认 yyyy-MM-dd HH:mm:ss
  formatDate({ cellValue }, format) {
    return XEUtils.toDateString(cellValue, format || "yyyy-MM-dd HH:mm:ss");
  },
  // 四舍五入金额，每隔3位逗号分隔，默认2位数
  formatAmount({ cellValue }, digits = 2) {
    return XEUtils.commafy(XEUtils.toNumber(cellValue), { digits });
  },
  // 四舍五入数量，每隔3位逗号分隔，默认0位数
  formatNumber({ cellValue }, digits = 0) {
    return XEUtils.commafy(XEUtils.toNumber(cellValue), { digits });
  },
  // 格式化银行卡，默认每4位空格隔开
  formatBankcard({ cellValue }) {
    return XEUtils.commafy(XEUtils.toValueString(cellValue), {
      spaceNumber: 4,
      separator: " ",
    });
  },
  // 四舍五入,默认两位数
  formatFixedNumber({ cellValue }, digits = 2) {
    return XEUtils.toFixed(XEUtils.round(cellValue, digits), digits);
  },
  // 向下舍入,默认两位数
  formatCutNumber({ cellValue }, digits = 2) {
    return XEUtils.toFixed(XEUtils.floor(cellValue, digits), digits);
  },
  // 百分比
  formatPercentNumber({ cellValue }) {
    let percent = (cellValue * 100).toFixed(2).toString() + "%";
    return percent;
  },
});
// 创建一个简单的输入框筛选
VXETable.renderer.add("FilterInput", {
  // 不显示底部按钮，使用自定义的按钮
  isFooter: false,
  // 筛选模板
  renderFilter(h, renderOpts, params) {
    return [<filter-input params={params} />];
  },
  // 重置数据方法
  filterResetMethod({ options }) {
    options.forEach((option) => {
      option.data = "";
    });
  },
  // 重置筛选复原方法（当未点击确认时，该选项将被恢复为默认值）
  filterRecoverMethod({ option }) {
    option.data = "";
  },
  // 筛选方法
  filterMethod({ option, row, column }) {
    const { data } = option;
    const cellValue = row[column.property];
    if (cellValue) {
      return cellValue.toUpperCase().indexOf(data.toUpperCase()) > -1;
    }
    return false;
  },
});

// 创建一个数值范围条件筛选
VXETable.renderer.add("FilterRange", {
  // 不显示底部按钮，使用自定义的按钮
  isFooter: false,
  // 筛选模板
  renderFilter(h, renderOpts, params) {
    return [<filter-range params={params} />];
  },
  // 重置数据方法
  filterResetMethod({ options }) {
    options.forEach((option) => {
      option.data = { start: "", end: "" };
    });
  },
  // 筛选数据方法
  filterMethod({ option, row, column }) {
    const cellValue = row[column.property];
    const { start, end } = option.data;
    if (cellValue) {
      if (start && end) {
        return (
          parseFloat(cellValue) >= parseFloat(start) &&
          parseFloat(cellValue) <= parseFloat(end)
        );
      } else if (start) {
        return parseFloat(cellValue) >= parseFloat(start);
      } else if (end) {
        return parseFloat(cellValue) <= parseFloat(end);
      }
    }
    return false;
  },
});

// 创建一个支持列内容的选择筛选
VXETable.renderer.add("FilterSelect", {
  // 不显示底部按钮，使用自定义的按钮
  isFooter: false,
  // 筛选模板
  renderFilter(h, renderOpts, params) {
    return [<filter-select params={params} />];
  },
  // 重置数据方法
  filterResetMethod({ options }) {
    options.forEach((option) => {
      option.data = { vals: [], sVal: "" };
    });
  },
  // 筛选数据方法
  filterMethod({ option, row, column }) {
    const { vals } = option.data;
    const cellValue = row[column.property];

    if (cellValue instanceof Array) {
      for (let i = 0; i < cellValue.length; i++) {
        if (vals.includes(cellValue[i])) {
          return true;
        }
      }
      return false;
    } else {
      return vals.includes(cellValue);
    }
  },
});

// 创建一个日期范围条件筛选
VXETable.renderer.add("FilterDate", {
  // 不显示底部按钮，使用自定义的按钮
  isFooter: false,
  // 筛选模板
  renderFilter(h, renderOpts, params) {
    return [<filter-date params={params} />];
  },
  // 重置数据方法
  filterResetMethod({ options }) {
    options.forEach((option) => {
      option.data = { start: "", end: "" };
    });
  },
  // 筛选数据方法
  filterMethod({ option, row, column }) {
    const cellValue = row[column.property];
    const { start, end } = option.data;
    if (cellValue) {
      let tDate = new Date(cellValue);
      if (start && end) {
        let oDate1 = new Date(start);
        let oDate2 = new Date(end);
        return tDate >= oDate1.getTime() && tDate <= oDate2.getTime();
      } else if (start) {
        let oDate1 = new Date(start);
        return tDate >= oDate1.getTime();
      } else if (end) {
        let oDate2 = new Date(end);
        return tDate <= oDate2.getTime();
      }
    }
    return false;
  },
});

export default VXETable;
