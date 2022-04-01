# 基于 vue2 和 iView 4.x 的PC网站开发模板
vue2 + iView + vue-router + vuex + axios + webpack5 + stylus

#### 安装依赖
```
yarn
```

#### 启动开发服务
```
yarn dev
```

#### 构建代码
```
yarn build
```

#### 使用非现代模式构建
```
yarn build:nomodule
```

#### 修正代码风格
```
yarn lint
```


## 自定义配置
参见[配置参考](https://cli.vuejs.org/config)


## 常见问题
构建时如果提示缺少依赖，请先执行 *yarn* 安装依赖
本地调试报 SCRIPT5022: SecurityError 解决办法：[调整IE浏览器的本地安全设置](https://www.thinbug.com/q/15114279)