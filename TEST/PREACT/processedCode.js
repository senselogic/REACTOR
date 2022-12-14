import { render } from 'preact';
import { useSignal, useComputed } from "@preact/signals";

function Counter()
{
    const count = useSignal(0);
    const doubleCount = useComputed(() => count.value * 2);

    function increment()
    {
        count.value = count.value + 1;
        count.value = count.value + 1;
    }

    return (
        <button type="button" onClick={increment}>
            {count.value} / {doubleCount.value}
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
    const name = useSignal(`${props.firstName} ${props.lastName}`);

    return (
        <p>
            {name.value}
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

render(
    <App/>,
    document.getElementById( 'app' )
    );
