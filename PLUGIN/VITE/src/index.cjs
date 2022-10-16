// -- IMPORTS

const fs = require( 'fs' ).promises;
const createFilter = require( '@rollup/pluginutils' ).createFilter;
const getProcessedCode = require( 'senselogic-reactor' );

// -- FUNCTIONS

function reactorViteLoader(
    { framework = 'react', include = './src/*.jsx', exclude } = {}
    )
{
    let filter = createFilter( include, exclude );

    return {
        name: 'senselogic-reactor-vite',
        enforce: 'pre',

        async load(
            path
            )
        {
            var
                code;

            if ( filter( path ) )
            {
                try
                {
                    code = await fs.readFile( path, 'utf-8' );
                }
                catch ( exception )
                {
                    console.warn( `${path} can't be loaded by senselogic-reactor-vite-loader` );

                    return;
                }

                code = getProcessedCode( code, { framework } );

                return code;
            }
        }
        };
}

// -- EXPORTS

module.exports = reactorViteLoader;
