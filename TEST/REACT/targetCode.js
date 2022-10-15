import React from 'react';
import ReactDOM from 'react-dom/client';
import { useState } from 'react';

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

function Person(
    props
    )
{
    const [name, setName] = useState(`${props.firstName} ${props.lastName}`);

    return (
        <p>
            {name}
        </p>
        );
}

function App(
    props
    )
{
    return (
        <>
            <Counter/>
            <FrameworkList/>
            <Person firstName="Jack" lastName="Sparrow"/>
        </>
        );
}

ReactDOM.createRoot(
    document.getElementById( 'app' )
    ).render( <App/> );
