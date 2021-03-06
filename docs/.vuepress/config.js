module.exports = {
  theme: 'reco',
  themeConfig: {
    logo: '/logo.png',
    nav: [
      {
        text: '基础',
        items: [
          { text: 'HTML', link: '/HTML/' },
          { text: 'CSS', link: '/CSS/' },
          { text: 'JavaScript', link: '/JavaScript/' },
          { text: 'TypeScript', link: '/TypeScript/' },
        ],
      },
      {
        text: 'CS通识',
        items: [
          { text: '算法', link: '/算法/' },
          { text: '网络', link: '/网络/' },
          { text: '浏览器', link: '/浏览器/' },
          { text: '操作系统', link: '/操作系统/' },
        ],
      },
      {
        text: '前端框架',
        items: [
          { text: 'Vue', link: '/Vue/' },
          { text: 'React', link: '/React/' },
        ],
      },
      {
        text: '后台',
        items: [
          { text: 'NodeJS', link: '/NodeJS/' },
          { text: 'express', link: '/express/' },
          { text: 'koa', link: '/koa/' },
        ],
      },
      {
        text: '进阶',
        items: [
          { text: '数据库', link: '/数据库/' },
          { text: '优化', link: '/优化/' },
          { text: '安全', link: '/安全/' },
          { text: '图形', link: '/图形/' },
        ],
      },
      {
        text: '工具',
        items: [
          { text: 'webpack', link: '/webpack/' },
          { text: 'git', link: '/git/' },
        ],
      },
      {
        text: '项目',
        items: [
          { text: 'vue-mimall', link: '/mimall/' },
          { text: 'koa2-weibo', link: '/weibo/' },
        ],
      },
      { text: 'GitHub', link: 'https://github.com/JeffreyZhang96' },
    ],
    sidebar: 'auto',
  },
};
