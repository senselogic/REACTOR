![](https://github.com/senselogic/REACTOR/blob/master/LOGO/reactor.png)

# Reactor

Functional component preprocessor for React, Preact and Solid.

## Features

Allows to use a Svelte-like syntax for :

*   state variable declarations, assignments and evaluations;
*   conditions and array iterations in JSX code.

## Loaders

*   Webpack
*   Vite

## Sample

```js
function Counter()
{
    let $count = 0;
    let $doubleCount := $count * 2;

    function increment()
    {
        $count = $count + 1;
    }

    return (
        <button type="button" onClick={increment}>
            {$count} / {$doubleCount}
        </button>
        );
}

function FrameworkList()
{
    let frameworkArray = [
        { name: 'React', url: 'https://reactjs.org' },
        { name: 'Preact', url: 'https://preactjs.com' },
        { name: 'Solid', url: 'https://solidjs.com' },
        { name: 'Svelte', url: 'https://svelte.dev' }
        ];
    let frameworkCount = frameworkArray.length;

    return (
        <>
            {#if frameworkCount > 0}
                <p>Framework count : {frameworkCount}.</p>
            {/if}

            {#if frameworkCount == 1}
                <p>{frameworkCount} framework.</p>
            {:else}
                <p>{frameworkCount} frameworks.</p>
            {/if}

            {#if frameworkCount == 0}
                <p>No framework.</p>
            {:else}
                {#if frameworkCount == 1}
                    <p>One framework.</p>
                {:else}
                    {#if frameworkCount == 2}
                        <p>Two frameworks.</p>
                    {:else}
                        <p>Many frameworks.</p>
                    {/if}
                {/if}
            {/if}

            {#if frameworkCount == 0}
                <p>No framework.</p>
            {:else if frameworkCount == 1}
                <p>One framework.</p>
            {:else if frameworkCount == 2}
                <p>Two frameworks.</p>
            {:else}
                <p>Many frameworks.</p>
            {/if}

            <ul>
                {#for {name, url}, index of frameworkArray}
                    <li key={index}>
                        <a target="_blank" href={url}>
                            {index + 1} : {name}
                        </a>
                    </li>
                {/for}
            </ul>
        </>
        );
}
```

## Webpack loader

### Options

```js
{
    framework: 'react'    // or 'preact' or 'solid'
}
```

### Installation

**package.json**
```js
{
  "devDependencies": {
    "senselogic-reactor": "^0.1.12"
  },
}
```

### Configuration

**webpack.config.js**

```js
const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: path.resolve(__dirname, './src/index.js'),
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader', { loader: 'senselogic-reactor', options: { framework: 'react' } }],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  devServer: {
    static: path.resolve(__dirname, './dist'),
    hot: true,
  },
};
```

## Vite loader

### Options

```js
{
    framework: 'react'    // or 'preact' or 'solid'
    include: './src/**/*.jsx'
}
```

### Installation

**package.json**
```js
{
  "devDependencies": {
    "senselogic-reactor": "^0.1.12",
    "senselogic-reactor-vite": "^0.1.7"
  },
}
```

### Configuration

**vite.config.js**

```js
import { defineConfig } from 'vite';
import reactor from 'senselogic-reactor-vite';
import preact from '@preact/preset-vite';

export default defineConfig({
    plugins: [
        reactor( { framework: 'preact', include: './src/**/*.jsx' } ),
        preact()
        ]
    });
```

## Limitations

*   Reactor statements are translated without grammatical checking.
*   State variables must be declared before using them.
*   Computed values are only available for Preact and Solid.

## Version

0.1

## Author

Eric Pelzer (ecstatic.coder@gmail.com).

## License

This project is licensed under the GNU Lesser General Public License version 3.

See the [LICENSE.md](LICENSE.md) file for details.
