import getProcessedCode from './src/index.js';

for ( let framework of [ 'react', 'solid' ] )
{
    let sourcecode = document.getElementById( `source-${framework}-code` ).textContent;
    let expectedCode = document.getElementById( `expected-${framework}-code` ).textContent;
    let generatedCode = getProcessedCode( sourcecode, { framework } );

    document.getElementById( `generated-${framework}-code` ).textContent = generatedCode;

    let expectedLineArray = expectedCode.split( '\n' );
    let generatedLineArray = generatedCode.split( '\n' );

    expectedLineArray.forEach(
        function ( expectedLine, lineIndex )
        {
            let generatedLine = generatedLineArray[ lineIndex ];

            if ( generatedLine.trimEnd() !== expectedLine.trimEnd() )
            {
                console.log( '[' + lineIndex + '] : `' + expectedLine + '`' );
                console.warn( '[' + lineIndex + '] : `' + generatedLine + '`' );
            }
        }
        );
}
