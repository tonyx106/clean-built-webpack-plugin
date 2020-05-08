# clean-dist-webpack-plugin

A webpack plugin to clean your built directory before compiling.

It is a better alternative to `clean-webpack-plugin`, because it supports files
ignoring.

## Getting started

To begin, you need install it.

```console
npm i -D clean-dist-webpack-plugin
```

Next, add plugin to your config, ex.:

```js
// webpack.config.js
const CleanPlugin = require('clean-dist-webpack-plugin');

const config = {
  plugins: [
    new CleanPlugin()
  ]
}

module.exports = config;
```

## Configuring

|Name|Type|Default|Description|
|:--:|:--:|:-----:|:----------|
|**`ignore`**|`string[]`|`[]`|The array of files to ignore (see [supported paterrns](https://github.com/sindresorhus/globby#globbing-patterns))|
|**`verbose`**|`boolean`|`false`|If `true`, writes logs to console (always enabled if `dry` or `force` is `true`)|
|**`dry`**|`boolean`|`false`|If `true`, simulates the removing and see what would be deleted|
|**`force`**|`boolean`|`false`|If `true`, allows deleting files outside current working directory|
