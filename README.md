# Matei's CV

My personal CV made with `HTML`, `CSS` and `JS`.

## 🎞 Live Preview

- [nmatei.github.io](https://nmatei.github.io/)
- [https://nmatei.github.io/layout](https://nmatei.github.io/layout.html)

The repo name must be in the following format: **UserName**.github.io

## 📚 What you could learn

- [x] use `HTML` with `CSS`
- [x] create **layouts**
- [x] understand basics of `JS`
- [x] understand how **dynamic HTML** works
- [x] basic `git` commands and usage
- [x] deploy your site on **github**
- [ ] Theme switch (dark / light) [example1](https://infinite-table.com/docs#what-is-infinite), [example2](https://tpiros.dev/)
- [x] Theme [grayscale](https://www.w3docs.com/snippets/css/how-to-convert-an-image-into-a-grayscale-image-using-html-css.html) - test for color blind people

## 📋 DEV notes

For each Team **create new branch** from scrath (make sure to change name).

```sh
bname=demo

git switch --orphan $bname
touch .gitignore
echo /.vscode >> .gitignore
echo /.idea >> .gitignore
echo /node_modules >> .gitignore
touch README.md
echo "# nmatei.github.io" >> README.md
git add .
git commit -m "Initial commit"
git push origin $bname
git status

```

Switch branches commands

```sh
git checkout master

git checkout demo
```
