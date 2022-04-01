module.exports = {
  // presets: ['@vue/cli-plugin-babel/preset'],
  presets: [
    ['@vue/cli-plugin-babel/preset', {
      // useBuiltIns: 'usage',
      polyfills: ['es.set'], // 解决 IE10-报错：引入缺少的 polyfills
    }],
  ],
  plugins: [
    '@babel/plugin-proposal-optional-chaining', // 可选链
    '@babel/plugin-proposal-nullish-coalescing-operator', // 双问号
    'lodash', // 按需引用 lodash
    [
      // 按需引用 iview
      'import',
      {
        libraryName: 'view-design',
        libraryDirectory: 'src/components',
      },
    ],
  ],
}
