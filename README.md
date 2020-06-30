# 专升本报名系统服务端

软件实训，实操项目。

专升本前端项目：[registration-system](https://github.com/popring/registration-system)

## 采用技术

- express



## 本地开发

```
git clone git@github.com:popring/resgitration-server.git

cd registration-server

// 可以使用 yarn 替代
npm i

// 运行 yarn start
npm run start
```

## SQL 文件

导入数据库 /sql/bmxt.sql

## API文档

[RESTful_API.md](./RESTful_API.md) 只有几个简单的案例，没有写完整。

## 任务

- [x] jwt 鉴权< `student`, `admin` >
- [x] 修改返回数据的 `http` 状态码
- [ ] 使用 `orm` 模式调用数据库
- [ ] API文档

学生端

- [x] 系统主页 报名进度

- [x] 通知公告

- [x] 现在报名

- [x] 成绩查询

- [x] 录取查询

管理端（由于当时时间紧急，采用 jsp 完成（未公开），可能后期不会使用node重写）

- [ ] 系统主页(无请求)

- [ ] 学生管理

- [ ] 审核管理

- [ ] 成绩管理

- [ ] 公告管理

