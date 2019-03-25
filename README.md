# Vuepress Plugin Tabs

Tabs Container for Vuepress

Expose [vue-tabs-component](https://github.com/spatie/vue-tabs-component) as custom markdown container

Used with version >= 1.x.x of Vuepress. For version 0.x use [vuepress-tabs](https://github.com/pskordilakis/vuepress-tabs)

## Installation

``` bash
yarn add vuepress-plugin-tabs vue-tabs-component
```

or

``` bash
npm install vuepress-plugin-tabs vue-tabs-component
```

Enable plugin in .vuepress/config.js

``` js
module.exports = {
  plugins: [ 'tabs' ]
}
```

import theme in .vuepress/styles/index.styl

``` stylus
@require '~vuepress-plugin-tabs/dist/themes/default.styl'
```

## Usage

~~~ md
:::: tabs

::: tab title
__markdown content__
:::


::: tab javascript
``` javascript
() => {
  console.log('Javascript code example')
}
```
:::

::::

~~~

### Tabs attributes

Everything after tabs will be passed to tabs component as attributes.

~~~ md
:::: tabs cache-lifetime="10" :options="{ useUrlFragment: false }"

::: tab "Tab Title" id="first-tab"
__markdown content__
:::


::: tab javascript id="second-tab"
``` javascript
() => {
  console.log('JavaScript code example')
}
```
:::

::::

~~~


### Tab attributes

Everything after tab will be passed to tab component as attributes.
Any value that does not have a name will be passed as the name attribute. Multiword names must be enclosed in quotes.
Only one such value is valid.

~~~ md
:::: tabs

::: tab "Tab Title" id="first-tab"
__markdown content__
:::


::: tab javascript id="second-tab"
``` javascript
() => {
  console.log('JavaScript code example')
}
```
:::

::::

~~~
