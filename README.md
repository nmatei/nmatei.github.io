# Matei's CV

My personal CV made with `HTML`, `CSS` and `JS`.

## 🎞 Live Preview

[![Live](https://img.shields.io/badge/live-nmatei.github.io-brightgreen?style=for-the-badge)](https://nmatei.github.io/)

- [nmatei.github.io/links](https://nmatei.github.io/links)
- [https://nmatei.github.io/examples/layout](https://nmatei.github.io/examples/layout.html)
- [https://nmatei.github.io/examples/layout-scroll](https://nmatei.github.io/examples/layout-scroll.html)

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

### ‍💻 My course on Udemy

A simple way to **support my work** and to **improve** your programming skills:

- [x] [Become a WEB Developer from Scratch, step by step Guide](https://nmatei.github.io/web) - by [Nicolae Matei](https://nmatei.github.io/)

## 🎟 Udemy coupons page

The course pages are **generated**, do not edit them manually:

- [web.html](web.html) (EN) → [nmatei.github.io/web](https://nmatei.github.io/web)
- [ro/web.html](ro/web.html) (RO) → [nmatei.github.io/ro/web](https://nmatei.github.io/ro/web)

Sources:

- [js/web-page.js](js/web-page.js) - page template (html, SEO meta, JSON-LD)
- [course/i18n/en.json](course/i18n/en.json), [course/i18n/ro.json](course/i18n/ro.json) - texts
- [course/course.json](course/course.json) - course info (badge, rating, ratings count, students...)
- [course/coupons.json](course/coupons.json) - coupons (updated by `yarn coupon`)

### Add coupon

Create the coupon on Udemy, then add it (pages are regenerated, formatted, committed and pushed):

| Udemy coupon type  | Price           | Redemptions | Validity | Command                     |
| ------------------ | --------------- | ----------- | -------- | --------------------------- |
| Current best price | €9.99           | unlimited   | 5 days   | `yarn coupon best CODE`     |
| Custom price       | €12.99 - €19.99 | unlimited   | 31 days  | `yarn coupon custom CODE`   |
| Free: Open         | free            | 10          | 5 days   | `yarn coupon open CODE`     |
| Free: Targeted     | free            | 100         | 31 days  | `yarn coupon targeted CODE` |

- `yarn coupon <type> CODE EXISTING_CODE` - also extends `EXISTING_CODE`: users opening an expired link are sent to the new `CODE`
- free coupons (open / targeted) are half hidden on the page, share them with `?c=CODE`:
  `https://nmatei.github.io/web?c=CODE` or `https://nmatei.github.io/ro/web?c=CODE`
  (auto redirect to Udemy only happens when the link has a valid coupon)

### Build / run

```sh
npm run build # regenerate web.html + ro/web.html (after editing texts, template or course.json)
npm start     # local server, pages work without .html (like GitHub Pages): /web, /ro/web
```

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
