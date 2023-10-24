## How to start
1. install [nodejs](https://nodejs.org/en/download/)
1. open project folder in terminal

## build 4 production
1. run `npm ci`
1. run `npm run build`
1. encrease version of css-file  
  `<link rel="stylesheet" href="src/css/style.min.css?v=4">`

## start devServer
1. run `npm i`
1. run `npm run dev`
1. open http://localhost:5000

## CSS 
css в проекте нативный (без препроцессоров)
при билде транспайлится через [Lightning Css](https://lightningcss.dev/) (fast CSS parser, transformer, bundler, and minifier)

править файлы нужно тут: `/src/style/index.css`
сбилженный css для прода лежит в: `/src/css/style.min.css`

доступные фичи:
- [Custom Media Queries](https://www.w3.org/TR/mediaqueries-5/#custom-mq)
- [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [CSS Nesting Module](https://www.w3.org/TR/css-nesting-1/)