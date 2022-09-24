// -- TYPES

class Context
{
    // -- CONSTRUCTORS

    constructor(
        braceCount = 0,
        isInterpolated = false,
        isQuoted = false,
        quoteCharacter = 0
        )
    {
        this.braceCount = braceCount;
        this.isInterpolated = isInterpolated;
        this.isQuoted = isQuoted;
        this.quoteCharacter = quoteCharacter;
    }
}

class Command
{
    // -- CONSTRUCTORS

    constructor(
        name
        )
    {
        this.name = name;
        this.elseCount = 0;
    }
}

// ~~

class Processor
{
    // -- CONSTRUCTORS

    constructor(
        framework = 'react'
        )
    {
        this.framework = framework;
        this.commandArray = [];
    }

    // -- INQUIRIES

    isCommand(
        name
        )
    {
        return (
            this.commandArray.length > 0
            && this.commandArray[ this.commandArray.length - 1 ].name === name
            );
    }

    // ~~

    getCommand(
        )
    {
        return this.commandArray[ this.commandArray.length - 1 ];
    }

    // -- OPERATIONS

    pushContext(
        context
        )
    {
        this.contextArray.push( new Context( context ) ) ;
    }

    // ~~

    popContext(
        )
    {
        return this.contextArray.pop();
    }

    // ~~

    pushCommand(
        name
        )
    {
        this.commandArray.push( new Command( name ) ) ;
    }

    // ~~

    popCommand(
        )
    {
        return this.commandArray.pop();
    }

    // ~~

    replaceDirectives(
        code
        )
    {
        if ( code.indexOf( '{#' ) < 0 )
        {
            return code;
        }
        else
        {
            this.commandArray = [];

            let codeCharacterCount = code.length;
            let processedCode = '';

            for ( let codeCharacterIndex = 0;
                  codeCharacterIndex < codeCharacterCount;
                  ++codeCharacterIndex )
            {
                let codeCharacter = code[ codeCharacterIndex ];

                if ( codeCharacter === '{'
                     && codeCharacterIndex + 4 < codeCharacterCount )
                {
                    let secondCharacter = code[ codeCharacterIndex + 1 ];

                    if ( ( ( secondCharacter === '#'
                             || secondCharacter === '/' )
                           && ( ( code[ codeCharacterIndex + 2 ] === 'i'
                                  && code[ codeCharacterIndex + 3 ] === 'f' )
                                || ( code[ codeCharacterIndex + 2 ] === 'f'
                                     && code[ codeCharacterIndex + 3 ] === 'o'
                                     && code[ codeCharacterIndex + 4 ] === 'r' ) ) )
                         || ( secondCharacter === ':'
                              && code[ codeCharacterIndex + 2 ] === 'e'
                              && code[ codeCharacterIndex + 3 ] === 'l'
                              && code[ codeCharacterIndex + 4 ] === 's' ) )
                    {
                        let commandCharacterIndex = codeCharacterIndex;
                        let command = '';
                        let context = new Context();
                        let contextArray = [];
                        let ofCharacterIndex = 0;

                        while ( codeCharacterIndex < codeCharacterCount )
                        {
                            let codeCharacter = code[ codeCharacterIndex ];
                            command += codeCharacter;

                            if ( context.isQuoted )
                            {
                                if ( codeCharacter === context.quoteCharacter )
                                {
                                    context.isQuoted = false;
                                }
                                else if ( codeCharacter === '\\'
                                          && codeCharacterIndex + 1 < codeCharacterCount )
                                {
                                    command += code[ codeCharacterIndex + 1 ];
                                    codeCharacterIndex += 2;

                                    continue;
                                }
                                else if ( codeCharacter === '$'
                                          && codeCharacterIndex + 1 < codeCharacterCount
                                          && code[ codeCharacterIndex + 1 ] === '{' )
                                {
                                    command += code[ codeCharacterIndex + 1 ];
                                    codeCharacterIndex += 2;

                                    contextArray.push( context );
                                    context = new Context();
                                    ++context.braceCount;

                                    continue;
                                }
                            }
                            else if ( codeCharacter === '\''
                                      || codeCharacter === '"'
                                      || codeCharacter === '`' )
                            {
                                context.isQuoted = true;
                                context.quoteCharacter = codeCharacter;
                            }
                            else if ( codeCharacter === '{' )
                            {
                                ++context.braceCount;
                            }
                            else if ( codeCharacter === '}' )
                            {
                                --context.braceCount;

                                if ( context.braceCount === 0 )
                                {
                                    if ( contextArray.length === 0 )
                                    {
                                        break;
                                    }
                                    else
                                    {
                                        context = contextArray.pop();
                                    }
                                }
                            }
                            else if ( context.braceCount === 1
                                      && ofCharacterIndex === 0
                                      && codeCharacter === 'o'
                                      && codeCharacterIndex + 2 < codeCharacterCount
                                      && code[ codeCharacterIndex + 1 ] === 'f'
                                      && isBlankCharacter( code[ codeCharacterIndex - 1 ] )
                                      && isBlankCharacter( code[ codeCharacterIndex + 2 ] ) )
                            {
                                ofCharacterIndex = codeCharacterIndex - commandCharacterIndex;
                            }

                            ++codeCharacterIndex;
                        }

                        let processedCommand = command;

                        if ( command.endsWith( '}' ) )
                        {
                            if ( command.startsWith( '{#if ' ) )
                            {
                                processedCommand
                                    = ( ( this.commandArray.length === 0 ) ? '{' : '' )
                                      + '('
                                      + command.slice( 5, -1 )
                                      + ')?(';

                                this.pushCommand( 'if' );
                            }
                            else if ( command.startsWith( '{:else if ' ) )
                            {
                                if ( this.isCommand( 'if' ) )
                                {
                                    processedCommand
                                        = '):(('
                                          + command.slice( 10, -1 )
                                          + ')?(';

                                    this.getCommand().elseCount++;
                                }
                                else
                                {
                                    console.warn( 'Unmatched :else if command : ' + command );
                                }
                            }
                            else if ( command === '{:else}' )
                            {
                                if ( this.isCommand( 'if' ) )
                                {
                                    processedCommand = '):(';

                                    this.getCommand().elseCount++;
                                }
                                else
                                {
                                    console.warn( 'Unmatched :else command : ' + command );
                                }
                            }
                            else if ( command === '{/if}' )
                            {
                                if ( this.isCommand( 'if' ) )
                                {
                                    let elseCount = this.getCommand().elseCount;

                                    if ( elseCount === 0 )
                                    {
                                        processedCommand
                                            = '):false'
                                              + ( ( this.commandArray.length === 1 ) ? '}' : '' );
                                    }
                                    else
                                    {
                                        processedCommand
                                            = ')'.repeat( elseCount )
                                              + ( ( this.commandArray.length === 1 ) ? '}' : '' );
                                    }

                                    this.popCommand();
                                }
                                else
                                {
                                    console.warn( 'Unmatched /if command : ' + command );
                                }
                            }
                            else if ( command.startsWith( '{#for ' ) )
                            {
                                if ( ofCharacterIndex > 0 )
                                {
                                    if ( this.framework === 'react' )
                                    {
                                        processedCommand
                                            = ( ( this.commandArray.length === 0 ) ? '{' : '' )
                                              + '('
                                              + command.slice( ofCharacterIndex + 3, -1 )
                                              + ').map(('
                                              + command.slice( 6, ofCharacterIndex - 1 )
                                              + ')=>';
                                    }
                                    else
                                    {
                                        processedCommand
                                            = '<For each={'
                                              + command.slice( ofCharacterIndex + 3, -1 )
                                              + '}>{('
                                              + command.slice( 6, ofCharacterIndex - 1 )
                                              + ')=>';
                                    }

                                    this.pushCommand( 'for' );
                                }
                                else
                                {
                                    console.warn( 'Invalid #for command : ' + command );
                                }
                            }
                            else if ( command === '{/for}' )
                            {
                                if ( this.isCommand( 'for' ) )
                                {
                                    if ( this.framework === 'react' )
                                    {
                                        processedCommand
                                            = ')'
                                              + ( ( this.commandArray.length === 1 ) ? '}' : '' );
                                    }
                                    else
                                    {
                                        processedCommand
                                            = '}</For>';
                                    }

                                    this.popCommand();
                                }
                                else
                                {
                                    console.warn( 'Unmatched /for command : ' + command );
                                }
                            }
                            else if ( command.startsWith( '{#for ' ) )
                            {
                                if ( ofCharacterIndex > 0 )
                                {

                                    this.pushCommand( 'for' );
                                }
                                else
                                {
                                    console.warn( 'Invalid #for command : ' + command );
                                }
                            }
                            else if ( command === '{/for}' )
                            {
                                if ( this.isCommand( 'for' ) )
                                {

                                    this.popCommand();
                                }
                                else
                                {
                                    console.warn( 'Unmatched /for command : ' + command );
                                }
                            }
                        }

                        processedCode += processedCommand;
                    }
                    else
                    {
                        processedCode += codeCharacter;
                    }
                }
                else
                {
                    processedCode += codeCharacter;
                }
            }
            return processedCode;
        }
    }

    // ~~

    getValue(
        code
        )
    {
        let contextArray = [];
        let context = new Context();

        let value = '';
        let codeCharacterCount = code.length;
        let codeCharacterIndex = 0;

        while ( codeCharacterIndex < codeCharacterCount )
        {
            let codeCharacter = code[ codeCharacterIndex ];

            if ( context.isQuoted )
            {
                if ( codeCharacter === context.quoteCharacter )
                {
                    context.isQuoted = false;
                }
                else if ( codeCharacter === '\\'
                          && codeCharacterIndex + 1 < codeCharacterCount )
                {
                    value += codeCharacter;
                    value += code[ codeCharacterIndex + 1 ];
                    codeCharacterIndex += 2;

                    continue;
                }
                else if ( codeCharacter === '$'
                          && codeCharacterIndex + 1 < codeCharacterCount
                          && code[ codeCharacterIndex + 1 ] === '{' )
                {
                    value += codeCharacter;
                    value += code[ codeCharacterIndex + 1 ];
                    codeCharacterIndex += 2;

                    contextArray.push( context );
                    context = new Context();
                    ++context.braceCount;

                    continue;
                }
            }
            else if ( codeCharacter === '\''
                      || codeCharacter === '"'
                      || codeCharacter === '`' )
            {
                context.isQuoted = true;
                context.quoteCharacter = codeCharacter;
            }
            else if ( codeCharacter === '{'
                      || codeCharacter === '['
                      || codeCharacter === '(' )
            {
                ++context.braceCount;
            }
            else if ( codeCharacter === '}'
                      || codeCharacter === ']'
                      || codeCharacter === ')' )
            {
                --context.braceCount;

                if ( context.braceCount === 0 )
                {
                    if ( contextArray.length === 0 )
                    {
                        break;
                    }
                    else
                    {
                        context = contextArray.pop();
                    }
                }
            }
            else if ( codeCharacter === ';'
                      && !context.isQuoted )
            {
                break;
            }

            value += codeCharacter;
            ++codeCharacterIndex;
        }

        return value;
    }

    // ~~

    replaceVariables(
        code
        )
    {
        var
            codeHasChanged;

        if ( code.indexOf( '$' ) < 0 )
        {
            return code;
        }
        else
        {
            let createStateFunction = ( ( this.framework === 'react' ) ? 'useState' : 'createSignal' );
            let isVariableNameMap = new Map();

            do
            {
                codeHasChanged = false;

                code
                    = code.replace(
                        /(\W)let\s+\$([a-z]\w*)\s*=\s*(.*)/m,
                        (
                            match,
                            prefix,
                            variableName,
                            suffix
                            ) =>
                        {
                            codeHasChanged = true;

                            let variableValue = this.getValue( suffix );
                            suffix = suffix.slice( variableValue.length );

                            isVariableNameMap.set( variableName, true );

                            return (
                                prefix
                                + "const ["
                                + variableName
                                + ", set"
                                + variableName.slice( 0, 1 ).toUpperCase()
                                + variableName.slice( 1 )
                                + '] = '
                                + createStateFunction
                                + '('
                                + variableValue
                                + ')'
                                + suffix
                                );
                        }
                        );
            }
            while ( codeHasChanged );

            if ( isVariableNameMap.size > 0 )
            {
                do
                {
                    codeHasChanged = false;

                    code
                        = code.replace(
                            /([^¨])\$([a-z]\w*)\s*=\s*(.*)/m,
                            (
                                match,
                                prefix,
                                variableName,
                                suffix
                                ) =>
                            {
                                if ( isVariableNameMap.has( variableName ) )
                                {
                                    codeHasChanged = true;

                                    let variableValue = this.getValue( suffix );
                                    suffix = suffix.slice( variableValue.length );

                                    return (
                                        prefix
                                        + "set"
                                        + variableName.slice( 0, 1 ).toUpperCase()
                                        + variableName.slice( 1 )
                                        + '('
                                        + variableValue
                                        + ')'
                                        + suffix
                                        );
                                }
                                else
                                {
                                    return match;
                                }
                            }
                            );
                }
                while ( codeHasChanged );

                let variableSuffix = ( ( this.framework === 'react' ) ? '' : '()' );

                code
                    = code.replace(
                        /(.?)\$([a-z]\w*)/g,
                        (
                            match,
                            prefix,
                            variableName
                            ) =>
                        {
                            if ( prefix === '\\' )
                            {
                                return variableName;
                            }
                            else if ( isVariableNameMap.has( variableName ) )
                            {
                                return (
                                    prefix
                                    + variableName
                                    + variableSuffix
                                    );
                            }
                            else
                            {
                                return match;
                            }
                        }
                        );
            }

            return code;
        }
    }

    // ~~

    getProcessedCode(
        code
        )
    {
        return this.replaceDirectives( this.replaceVariables( code ) );
    }
}

// -- FUNCTIONS

function isBlankCharacter(
    character
    )
{
    return (
        character === ' '
        || character === '\n'
        || character === '\r'
        || character === '\t'
        );
}

// ~~

export default function getProcessedCode(
    code,
    options
    )
{
    if ( options === undefined )
    {
        let options = this.getOptions();
    }

    let processor = new Processor( options.framework );

    return processor.getProcessedCode( code );
}
