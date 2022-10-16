![](https://github.com/senselogic/REACTOR/blob/master/LOGO/reactor.png)

# Reactor

Functional component preprocessor for React, Preact and Solid.

## Features

Allows to use the same Svelte-like syntax in all three frameworks for :

*   state variable declarations, assignments and evaluations;
*   conditions and array iterations in JSX code.

## Sample

**Reactor code**
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

**React code**
```js
function Counter()
{
    const [count, setCount] = useState(0);

    function increment()
    {
        setCount(count + 1);
    }

    return (
        <button type="button" onClick={increment}>
            {count}
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
            {(frameworkCount > 0)?(
                <p>Framework count : {frameworkCount}.</p>
            ):false}

            {(frameworkCount == 1)?(
                <p>{frameworkCount} framework.</p>
            ):(
                <p>{frameworkCount} frameworks.</p>
            )}

            {(frameworkCount == 0)?(
                <p>No framework.</p>
            ):(
                (frameworkCount == 1)?(
                    <p>One framework.</p>
                ):(
                    (frameworkCount == 2)?(
                        <p>Two frameworks.</p>
                    ):(
                        <p>Many frameworks.</p>
                    )
                )
            )}

            {(frameworkCount == 0)?(
                <p>No framework.</p>
            ):((frameworkCount == 1)?(
                <p>One framework.</p>
            ):((frameworkCount == 2)?(
                <p>Two frameworks.</p>
            ):(
                <p>Many frameworks.</p>
            )))}

            <ul>
                {(frameworkArray).map(({name, url}, index)=>
                    <li key={index}>
                        <a target="_blank" href={url}>
                            {index + 1} : {name}
                        </a>
                    </li>
                )}
            </ul>
        </>
        );
}
```

**Preact code**
```js
function Counter()
{
    const count = useSignal(0);

    function increment()
    {
        count.value = count.value + 1;
    }

    return (
        <button type="button" onClick={increment}>
            {count.value}
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
            {(frameworkCount > 0)?(
                <p>Framework count : {frameworkCount}.</p>
            ):false}

            {(frameworkCount == 1)?(
                <p>{frameworkCount} framework.</p>
            ):(
                <p>{frameworkCount} frameworks.</p>
            )}

            {(frameworkCount == 0)?(
                <p>No framework.</p>
            ):(
                (frameworkCount == 1)?(
                    <p>One framework.</p>
                ):(
                    (frameworkCount == 2)?(
                        <p>Two frameworks.</p>
                    ):(
                        <p>Many frameworks.</p>
                    )
                )
            )}

            {(frameworkCount == 0)?(
                <p>No framework.</p>
            ):((frameworkCount == 1)?(
                <p>One framework.</p>
            ):((frameworkCount == 2)?(
                <p>Two frameworks.</p>
            ):(
                <p>Many frameworks.</p>
            )))}

            <ul>
                {(frameworkArray).map(({name, url}, index)=>
                    <li key={index}>
                        <a target="_blank" href={url}>
                            {index + 1} : {name}
                        </a>
                    </li>
                )}
            </ul>
        </>
        );
}
```

**Solid code**
```js
function Counter()
{
    const [count, setCount] = createSignal(0);

    function increment()
    {
        setCount(count() + 1);
    }

    return (
        <button type="button" onClick={increment}>
            {count()}
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
            {(frameworkCount > 0)?(
                <p>Framework count : {frameworkCount}.</p>
            ):false}

            {(frameworkCount == 1)?(
                <p>{frameworkCount} framework.</p>
            ):(
                <p>{frameworkCount} frameworks.</p>
            )}

            {(frameworkCount == 0)?(
                <p>No framework.</p>
            ):(
                (frameworkCount == 1)?(
                    <p>One framework.</p>
                ):(
                    (frameworkCount == 2)?(
                        <p>Two frameworks.</p>
                    ):(
                        <p>Many frameworks.</p>
                    )
                )
            )}

            {(frameworkCount == 0)?(
                <p>No framework.</p>
            ):((frameworkCount == 1)?(
                <p>One framework.</p>
            ):((frameworkCount == 2)?(
                <p>Two frameworks.</p>
            ):(
                <p>Many frameworks.</p>
            )))}

            <ul>
                <For each={frameworkArray}>{({name, url}, index)=>
                    <li>
                        <a target="_blank" href={url}>
                            {index() + 1} : {name}
                        </a>
                    </li>
                }</For>
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
    "senselogic-reactor": "^0.1.11"
  },
}
```

### Sample

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

### Sample

**vite.config.js**

```js
import reactor from 'senselogic-reactor-vite';
import { defineConfig } from 'vite';
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
*   The ternary operator is also used for else-less `if` statements.
*   State variables must be declared in the file which uses them.

## Version

0.1

## Author

Eric Pelzer (ecstatic.coder@gmail.com).

## License

This project is licensed under the GNU Lesser General Public License version 3.

See the [LICENSE.md](LICENSE.md) file for details.
