### api返回中丢失属性的处理方法

### [[notion api missing property value]](https://stackoverflow.com/questions/72989189/notion-api-missing-property-value)

notion Api 从2022-06-28版本开始就API不再包含属性，他们发布新版的API。

- 必须使用页面属性端点检索页面属性。
- 父母现在总是直接父母；已将父字段添加到块中。
- 数据库关系的类型为`single_property`和`dual_property`。
- 下面是原文

- Page properties must be retrieved using the page properties endpoint.
- Parents are now always direct parents; a parent field has been added to block.
- Database relations have a type of `single_property` and `dual_property`.

页面ID不再与属性最后一个与属性兼容的版本是**v1.0.4**

通过降级`@notionhq/client` 的版本来解决 `"@notionhq/client": "^0.4.4"`,

```
 npm install @notionhq/client@^0.4.4
```

