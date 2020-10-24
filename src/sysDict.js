/**
 * 服务器
 */
export const SYS_DICT_SERVER = {
  // 描述:设备类型; key_type:se_unittype;杨素敏
  se_unittype: {
    1: "通用服务器",
    2: "节点服务器",
  },
  // 描述:服务器用途; key_type:server_useage;杨素敏
  server_useage: {
    1: "服务器",
    2: "防火墙",
  },
};

/**
 * 服务器固件
 */
export const SYS_DICT_SERVERPART = {
  // 描述:内存规格; key_type:mem_spec;杨素敏
  mem_spec: {
    1: "HM",
    2: "FM",
    3: "UNKNOWN",
  },
  // 描述:内存类型; key_type:memory_type;杨素敏
  memory_type: {
    1: "DDR3",
    2: "DDR4",
    3: "UNKNOWN",
  },
  // 描述:内存校验; key_type:mem_verify;杨素敏
  mem_verify: {
    1: "ECC",
    2: "RECC",
    3: "UNKNOWN",
  },
  // 描述:硬盘接口类型; key_type:disk_interface_type;杨素敏
  disk_interface_type: {
    0: "SATA",
    1: "SAS",
    2: "UNKNOWN",
  },
  // 描述:硬盘类型简称; key_type:disk_short;杨素敏
  disk_short: {
    0: "HDD",
    1: "SSD",
    2: "UNKNOWN",
  },
  // 描述:硬盘类型; key_type:disk_type;杨素敏
  disk_type: {
    0: "机械硬盘",
    1: "固态硬盘",
    2: "未知",
  },
  // 描述:硬盘用途; key_type:use_type;陈浪
  use_type: {
    1: "桌面级",
    2: "企业级",
  },
  // 描述:硬盘规格; key_type:server_disk_spec;陈浪
  server_disk_spec: {
    1: "2.5",
    2: "3.5",
    3: "UNKNOWN",
  },
  // 描述:Raid卡类型; key_type:raid_type;杨素敏
  raid_type: {
    1: "独立",
    2: "集成",
  },
  // 描述:配件模块的发布状态; key_type:releaseStatus;陈浪
  releaseStatus: {
    0: "已发布",
    1: "未发布",
  },
  // 描述:配件模块的来源; key_type:source;陈浪
  source: {
    1: "采购",
    2: "拆机",
    3: "客户",
  },
  // 描述:配件模块的资源归属; key_type:resource_attribution;陈浪
  resource_attribution: {
    1: "公用",
    2: "专用",
  },
  // 描述:配件模块的显示类型; key_type:show_type;陈浪
  show_type: {
    0: "外显",
    1: "内显",
  },
  // 描述:配件模块的显示类型; key_type:parts_res_status;陈浪
  parts_res_status: {
    0: {
      text: "未使用",
      color: '#87d068'
    },
    1: {
      text: "已使用",
      color: '#108ee9'
    },
    2: {
      text: "故障",
      color: '#f50'
    },
    3: {
      text: "异常待检测",
      color: '#2db7f5'
    },
  },
};
/**
 * 产品模块系统
 */
export const SYS_DICT_HOUSES = {

    /**
     * 描述:管理的产品类别; key_type:product_category_type;
     */
    product_category_type: {
      1: "资源类",
      2: "服务类",
      3: "解决方案类",
    },
  
    /**
     * 描述:付费模式; key_type:pay_model;
     */
    pay_model: {
      1: "一次性付费",
      2: "包年包月",
      3: "按流量计费",
    },
  
    /**
     * 描述:客户付费类型; key_type:customer_pay_type;
     */
    customer_pay_type: {
      1: "预付费",
      2: "后付费",
    },
  
    /**
     * 描述:最小资源配置; key_type:product_resource_config;
     */
    product_resource_config: {
      1: "机箱",
      2: "CPU",
      3: "内存",
      4: "硬盘",
      5: "IP",
      6: "Raid卡",
    },
    // 针对最小资源进行分类
    product_resource_config_classify: [
      {
        title: '硬件资源',
        value: 'hardware',
        children: [
          {
            title: '机箱',
            value: '1',
          },
          {
            title: 'CPU',
            value: '2',
          },
          {
            title: '内存',
            value: '3',
          },
          {
            title: '硬盘',
            value: '4',
          },
          {
            title: 'Raid卡',
            value: '6',
          },
        ],
      },
      {
        title: '网络资源',
        value: 'network',
        children: [
          {
            title: 'IP',
            value: '5',
          },
        ],
      },
    ],
    // 机箱的价格表类型; key_type:product_crate_price_type;
    product_crate_price_type: {
      1: "服务器类型",
      2: "内存扩展",
      3: "硬盘扩展",
      4: "raid卡支持",
      5: "网卡"
    },
    // 产品状态; key_type:product_master_status;
    product_master_status: {
      0: "待审核",
      1: "审核中",
      2: "审核完成",
      3: "审核挂起",
      4: "审核未通过",
      5: "上架",
      6: "下架",
    }
  };