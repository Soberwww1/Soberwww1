/*
    分支的合并与删除
    需求：把login-bug合并回到 master分支 并删除 login-bug分支

    步骤：
        1、切回到要合入的分支上：git checkout master
        2、合并其他分支过来： git merge lohgin-bug
        3、删除合并后的分支指针： git branch -d login-bug
*/ 