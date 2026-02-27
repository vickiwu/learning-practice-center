export const learningModules = [
  {
    id: "vertical-calc",
    title: "竖式计算",
    description: "100/1000 以内竖式加减法，支持导出 PNG、PDF 与 A4 打印。",
    status: "ready",
    path: "/vertical-calc",
    tags: ["数学", "计算", "打印练习纸"],
    points: [
      "按范围生成竖式题",
      "一键导出 PNG / PDF",
      "A4 单页打印"
    ]
  },
  {
    id: "literacy",
    title: "识字练习",
    description: "按年级和主题生成识字卡片、描红页与测试页。",
    status: "planned",
    path: "/literacy",
    tags: ["语文", "识字", "卡片"],
    points: [
      "按年级词库筛选",
      "一键导出识字卡",
      "笔顺与听写练习"
    ]
  },
  {
    id: "poetry",
    title: "古诗背诵",
    description: "古诗词分层学习，支持释义、默写与背诵检测。",
    status: "planned",
    path: "/poetry",
    tags: ["语文", "古诗", "默写"],
    points: [
      "按年级与朝代筛选",
      "填空与默写模式",
      "错题与复习节奏"
    ]
  },
  {
    id: "english-words",
    title: "英语单词",
    description: "词汇闯关、拼写训练、听写打印和错词复习。",
    status: "planned",
    path: "/english-words",
    tags: ["英语", "词汇", "听写"],
    points: [
      "单元词库管理",
      "拼写与互译训练",
      "听写练习纸导出"
    ]
  }
];

export function getModuleByPath(pathname) {
  return learningModules.find((item) => item.path === pathname);
}
