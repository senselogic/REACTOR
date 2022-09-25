// -- IMPORTS

const fs = require( 'fs' );
const http = require( 'http' );
const getProcessedCode = require( '../src/index.js' );

// -- FUNCTIONS

function compareCode(
    targetCode,
    processedCode
    )
{
    let targetLineArray = targetCode.split( '\n' );
    let processedLineArray = processedCode.split( '\n' );

    targetLineArray.forEach(
        function ( targetLine, lineIndex )
        {
            let processedLine = '';

            if ( lineIndex < processedLineArray.length )
            {
                processedLine = processedLineArray[ lineIndex ];
            }

            if ( processedLine.trimEnd() !== targetLine.trimEnd() )
            {
                console.log( '[' + lineIndex + '] : `' + targetLine + '`' );
                console.warn( '[' + lineIndex + '] : `' + processedLine + '`' );
            }
        }
        );
}

// ~~

function compileCode(
    framework
    )
{
    console.log( `Compiling ${framework} code...` );

    let folderName = framework.toUpperCase();
    let sourceCode = fs.readFileSync( `${folderName}/sourceCode.js`, { encoding: 'utf8', flag: 'r' } );
    let targetCode = fs.readFileSync( `${folderName}/targetCode.js`, { encoding: 'utf8', flag: 'r' } );
    let processedCode = getProcessedCode( sourceCode, framework );
    fs.writeFileSync( `${folderName}/processedCode.js`, processedCode );

    compareCode( targetCode, processedCode );

    return [ sourceCode, targetCode, processedCode ];
}

// -- STATEMENTS

let [ reactSourceCode, reactTargetCode, reactProcessedCode ] = compileCode( 'react' );
let [ preactSourceCode, preactTargetCode, preactProcessedCode ] = compileCode( 'preact' );
let [ solidSourceCode, solidTargetCode, solidProcessedCode ] = compileCode( 'solid' );

let server = http.createServer(
    function ( request, result )
    {
        result.writeHead( 200 );
        result.end(
            `<!DOCTYPE html>
            <html>
                <body>
                    <style>
                        body
                        {
                            font-size: 0.8rem;
                        }

                        body,
                        body *
                        {
                            margin: 0;
                            padding: 0;
                        }

                        xmp
                        {
                            border: 0.2rem solid gray;
                            padding: 0.5rem;
                            flex: 1;
                        }
                    </style>
                    <div style="display: flex">
                        <xmp>${reactSourceCode}</xmp>
                        <xmp>${reactTargetCode}</xmp>
                        <xmp>${reactProcessedCode}</xmp>
                    </div>
                    <div style="display: flex">
                        <xmp>${preactSourceCode}</xmp>
                        <xmp>${preactTargetCode}</xmp>
                        <xmp>${preactProcessedCode}</xmp>
                    </div>
                    <div style="display: flex">
                        <xmp>${solidSourceCode}</xmp>
                        <xmp>${solidTargetCode}</xmp>
                        <xmp>${solidProcessedCode}</xmp>
                    </div>
                </body>
            </html>`
            );
    }
    );

console.log( 'Visit localhost:8080' );
server.listen( 8080 );
