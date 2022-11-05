import { render } from "solid-js/web";
import { createSignal, createComputed } from "solid-js";

function Counter()
{
    const [count, setCount] = createSignal(0);

    function increment()
    {
        setCount(count() + 1);
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

function Person(
    props
    )
{
    const [name, setName] = createSignal(`${props.firstName} ${props.lastName}`);

    return (
        <p>
            {name()}
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
    () => <App/>,
    document.getElementById( 'app' )
    );
