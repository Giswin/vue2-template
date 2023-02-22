const config = {
  TENANT_ID: "E9m3mGsII0BlF2c8hhJE",

  appCode: "GTHS-GBS",

  // 常用email后缀，用于邮件名的快捷输入
  emailSuffix: ["@qq.com", "@sina.com", "@163.com", "@gmail.com"],

  // 又拍云配置参数
  upyun: {
    operator: "gths", // 操作员
    secret: "CI1B5KVLcVKqe2Fp8vpePUGHq3NNCcYV", // 操作员密码
    bucket: "gthsip", // 服务名称
    key: "{filemd5}{random}{.suffix}", // 文件保存路径
    upyunUrl: "https://v0.api.upyun.com/gthsip", // 服务上传地址API， 因为是跨域，所以使用反向代理，nginx反向代理路径为"/upload/gthsip" => 'http://v0.api.upyun.com/' + bucket
    //upyunUrl: "/upload/gthsip",
    getyunUrl: "https://oss.gthsip.com/", // 取文件地址目录
  },

  //订单导入地址
  IMPORT_URL: "/import/pdf/parseContentNew",

  //二维码生成地址
  CLOUD_QRCODE: "/ifs/qrcode/erweima.php?data=",

  //增值税率
  COST_ZZSL: 0.13,

  //退税率
  COST_TSL: 0.13,

  ORDER_AUDIT: "G001",

  PRODUCT_AUDIT: "G003",

  PROCESS_AUDIT: "G021",

  AUXPUR_AUDIT: "G022",

  EBS_ORDER_AUDIT: "G006",

  EBS_PRODUCT_AUDIT: "G007",

  EBS_PROCESS_AUDIT: "G008",

  EBS_PROJECT_AUDIT: "G009",
};
export default config;
