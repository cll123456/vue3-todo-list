export default function () {
  return {
    // 入口
    entry: 'index.html',
    // 出口
    outDir: 'docs',
    // 输出的静态资源的文件夹名称
    assetsDir: 'assets',
    base: '/vue3-todo-list/' // 这个用于gitpup部署
  }
}