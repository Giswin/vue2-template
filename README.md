# default

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

GBS加了两个全局自定义指令[v-permission, v-has-permission]，用来配置权限用, 可以对页面元素或子组件显示控制
v-permission配置的是角色(或账户组)，当前用户的角色是存在store.state.roles里,
v-has-permission配置的是权限操作项编码，当前用户的角色是存在store.state.rights里 
配置参考示例：
v-permission="['管理员','业务员']"    
v-has-permission="['Y_MU0102_SAMPLLING_FEE']"
