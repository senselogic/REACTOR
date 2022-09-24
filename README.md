![](https://github.com/senselogic/REACTOR/blob/master/LOGO/reactor.png)

# Reactor

Functional component preprocessor for React and Solid.

## Features

Provides a common Svelte-like syntax for :

*   state declarations
*   state assignments
*   conditional statements
*   iterative statements

## Sample

```js
function Counter()
{
    let $count = 0;

    function increment()
    {
        $count = $count + 1;
    }

    return (
        <button type="button" onClick={increment}>
            {$count}
        </button>
        );
}

function FrameworkList()
{
    let frameworkArray = [
        { name: 'React', url: 'https://reactjs.org' },
        { name: 'Solid', url: 'https://solidjs.com' },
        { name: 'Svelte', url: 'https://svelte.dev' },
        { name: 'Vue', url: 'https://vuejs.org' }
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

## Installation

**package.json**
```
{
  "devDependencies": {
    "senselogic-reactor": "^0.1.7"
  },
}
```

**webpack.config.js**

```
const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: path.resolve(__dirname, './src/index.js'),
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'senselogic-reactor'],
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

``

## Version

0.1

## Author

Eric Pelzer (ecstatic.coder@gmail.com).

## License

This project is licensed under the GNU Lesser General Public License version 3.

See the [LICENSE.md](LICENSE.md) file for details.
