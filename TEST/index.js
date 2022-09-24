// -- IMPORTS

const fs = require( 'fs' );
const http = require( 'http' );
const reactor = require( '../src/index.js' );

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
            let processedLine = processedLineArray[ lineIndex ];

            if ( processedLine.trimEnd() !== targetLine.trimEnd() )
            {
                console.log( '[' + lineIndex + '] : `' + targetLine + '`' );
                console.warn( '[' + lineIndex + '] : `' + processedLine + '`' );
            }
        }
        );
}

// -- STATEMENTS

let reactSourceCode = fs.readFileSync( 'REACT/sourceCode.js', { encoding: 'utf8', flag: 'r' } );
let reactTargetCode = fs.readFileSync( 'REACT/targetCode.js', { encoding: 'utf8', flag: 'r' } );
let reactProcessedCode = reactor( reactSourceCode, 'react' );

compareCode( reactTargetCode, reactProcessedCode );
fs.writeFileSync( 'REACT/processedCode.js', reactProcessedCode );

let solidSourceCode = fs.readFileSync( 'SOLID/sourceCode.js', { encoding: 'utf8', flag: 'r' } );
let solidTargetCode = fs.readFileSync( 'SOLID/targetCode.js', { encoding: 'utf8', flag: 'r' } );
let solidProcessedCode = reactor( solidSourceCode, 'solid' );

compareCode( solidTargetCode, solidProcessedCode );
fs.writeFileSync( 'SOLID/processedCode.js', solidProcessedCode );

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
                        <xmp>
                            ${reactSourceCode}
                        </xmp>
                        <xmp>
                            ${reactTargetCode}
                        </xmp>
                        <xmp>
                            ${reactProcessedCode}
                        </xmp>
                    </div>
                    <div style="display: flex">
                        <xmp>
                            ${solidSourceCode}
                        </xmp>
                        <xmp>
                            ${solidTargetCode}
                        </xmp>
                        <xmp>
                            ${solidProcessedCode}
                        </xmp>
                    </div>
                </body>
            </html>`
            );
    }
    );

server.listen( 8080 );
