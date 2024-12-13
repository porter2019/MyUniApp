## ## 启动页

    启动页是：pages/index/index，原来的launch废弃了，因为不好启用微信的分享功能

## 微信小程序的运行与发布

- 开发阶段，点击菜单上的【运行】到微信开发者工具

- 发布阶段，点击菜单上的【发行】到小程序-微信

如果发布时不使用发行模式，`process.env.NODE_ENV`会一直是`development`，config.js中接口地址判断就会有问题，发行模式下项目体积也会减少

> 如果发行一直错，无法自动打开微信开发者工具，那就手动运行微信开发者工具，打开`unpackage/dist/build/mp-weixin` 目录

## 目录说明

```
common    > 公共变量之类的

    config.js    > 接口URL配置

    const.js    >常量，常用正则之类的

    format.js    >时间日期格式化的方法

    func.js    >公共方法

    math.js    >数学+-x÷

    mixin.js    >uview封装全局注入页面分享功能所需

    tabbar.js    >tabbar的菜单配置，不同角色配置不同的菜单

components    >公共组件

    tab-bar.vue    >tabbar相关

pages    >主包目录页面

pagesA    >分包A

router    > 模仿vue建的路由目录

    index.js    >这个是vue.config.js在每次编译自动根据pages.js生成的，用于权限判断

static    >静态目录

store    >vuex存储

util    >工具目录

vue.config.js    >将pages.json转成route js文件，在pages.json中，每个路由页面都可以配置alias和auth属性，一个是别名，一个是访问这个页面所需的权限名称
```

```

```

## 分包功能配置说明

- 之后建分包名称这样搞：pages、pagesA、pagesB，pagesX作为功能演示页面，项目上线前可以删掉目录

- 组件的名称规范components/my-paging/my-paging.vue，即文件名和目录名一致

- 分包如何引用公共包的my-paging？
  
  pagesA/receiving/index.vue中引用到了components/my-paging/my-paging.vue，在index.vue中，正常import
  
  ```js
  import myPaging from '@/components/my-paging/my-paging.vue'
  export default {
          components:{
              myPaging, //正常注册组件
          },
          data(){
          //其他代码
          }
  }
  ```
  
  如果运行在微信小程序中，必须配置componentPlaceholder，h5中不需要

## 微信小程序获取公众号的openid ，用于推送模板消息

小程序内使用web-view组件打开服务器上的网页，这个网页再跳转到微信js sdk授权地址，等待js sdk授权完携带code回到这个网页，拿到code和state再请求后台接口，后台根据code换取openid，进行绑定操作。前端请求完毕后可以打开一篇公众号文章，文章只放一个公众号名片，提示用户关注就行了

> 小程序后台管理需要配置业务域名，【开发与服务】》【开发管理】》下拉找到【业务域名】，将网页地址的域名填进去，不然web-view无法打开服务器上的网页
