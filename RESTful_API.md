## XXX系统对外API接口文档

### 1.1 版本历史
| 日期         | 版本号 | 作者      | 备注 |
| ------------ | ------ | --------- | ---- |
| 2020年6月4日 | v1     | Harry Hao | -    |

#### 1.2 接口配置
| 字段           | 介绍           |
| -------------- | -------------- |
| 接口地址       | localhost:3000 |
| 根地址         | /v1/           |
| 学生相关接口   | /v1/stu        |
| 管理员相关接口 | /v1/admin      |

#### 1.3 接口统一返回格式
- 正常返回
```xml
{
  "code": 200,
  "message": "操作成功",
  "result": 某种类型的数据，如：字符串、数字、布尔值、集合等
}
```
- 校验参数错误返回
```xml
{
  "code": 100,
  "message": "参数非法 + 具体错误信息说"
}
```
- 错误返回
```xml
{
  "code": 500,
  "message": "错误信息"
}
```
#### 1.4 全局状态码说明
| 状态码 | 说明 |
| :----- | :--- |
| -      | -    |
| -      | -    |

* * *



### (1) 公共接口

#### 接口说明：登录接口

- **URL：**
> /login

- **支持格式：**
> JSON

- **Method：** 
> POST

- **Request：**
<code>ObjectName</code>

| 请求参数 | 参数类型 | 参数名称     |
| :------- | :------- | :----------- |
| username | string   | 用户名       |
| userpwd  | string   | 密码         |
| role     | string   | 角色（可选） |

- **Response：**

```json
{
    "code": 1,
    "message": "登录成功",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjAyMDAyLCJ1c2VybmFtZSI6IuW8oOS4iSIsInJvbGUiOiJzdHVkZW50IiwiaWF0IjoxNTkxMjY2MzE5LCJleHAiOjE1OTEzNTI3MTl9.ykitGzjjJ4eGFqx79SXWZwooeQwANZHU6z8wZLUaUlQ"
}
```

