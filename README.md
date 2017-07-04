# markdown_index

markdown_index是一个可以为你的markdown标题添加序号的插件。

假设原文如下所示：

    # a
    foolbar

    ## a-b
    foolbar

    ## a-c
    foolbar
    foolbar

    ### a-c-d
    foolbar

    ## a-e
    foolbar

    # f
    foolbar

安装markdown_index，运行 `> markdown add index`，即可自动添加序号，如下所示：

    # 1. a
    foolbar

    ## 1.1. a-b
    foolbar

    ## 1.2. a-c
    foolbar
    foolbar

    ### 1.2.1. a-c-d
    foolbar

    ## 1.3. a-e
    foolbar

    # 2. f
    foolbar

注：重复运行命令可以自动更新序号。
注：仅对“#”标记的标题等级有效。

github: [https://github.com/legendmohe/markdown_index](https://github.com/legendmohe/markdown_index)
email: legendmohe@foxmail.com