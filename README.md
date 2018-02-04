# markdown_index

UPDATE 2018/2/4: 
- Fix the issue [#2](https://github.com/legendmohe/markdown_index/issues/2).
- Add the configuration for index base.

## 1. Introduction(English Version)

markdown_index is an extension that can add serial numbers to your markdown title.

### 1.1. Feature

Suppose the original text is as follows:

```
# a
foolbar

## a-b
foolbar

## a-c
foolbar

### a-c-d
foolbar

## a-e
foolbar

# f
foolbar
```

Install markdown_index, run `> markdown add index`, you can automatically add the serial number, as follows:

```
# a
foolbar

## a-b
foolbar

## a-c
foolbar

### a-c-d
foolbar

## a-e
foolbar

# f
foolbar
```

### 1.2. Configuration

If you want the serial number to start at `##` instead of `#`, edit the configuration as follows:
    
    markdownIndex.indexBase = '##'

### 1.3. Note

Note: Run command again can automatically update the serial number.

Note: Only the title level of the "#" tag is valid.

github: [https://github.com/legendmohe/markdown_index](https://github.com/legendmohe/markdown_index)

email: legendmohe@foxmail.com

### 1.4. Contributor

- [legendmohe](https://github.com/legendmohe)
- [sherlockbear](https://github.com/sherlockbear)
- [firejq](https://github.com/firejq)

## 2. 简介（简体中文版）

markdown_index 是一个可以为你的 markdown 标题添加序号的插件。

### 2.1. 功能

假设原文如下所示：
```
# a
foolbar

## a-b
foolbar

## a-c
foolbar

### a-c-d
foolbar

## a-e
foolbar

# f
foolbar
```
安装 markdown_index，运行 `> markdown add index`，即可自动添加序号，如下所示：
```
# a
foolbar

## a-b
foolbar

## a-c
foolbar

### a-c-d
foolbar

## a-e
foolbar

# f
foolbar
```

### 2.2. 配置

如果你希望添加序号时从 `##` 而不是 `#` 开始，只需要修改用户设置：
    
    markdownIndex.indexBase = '##'

### 2.3. 注意

注：重复运行命令可以自动更新序号。

注：仅对“#”标记的标题等级有效。

github: [https://github.com/legendmohe/markdown_index](https://github.com/legendmohe/markdown_index)

email: legendmohe@foxmail.com

### 2.4. 贡献者

- [legendmohe](https://github.com/legendmohe)
- [sherlockbear](https://github.com/sherlockbear)
- [firejq](https://github.com/firejq)