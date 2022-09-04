// -- TYPES

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
        )
    {
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

    initialize(
        )
    {
        this.commandArray = [];
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

    getProcessedCode(
        code
        )
    {
        this.initialize();

        let codeCharacterArray = code.split( '' );
        let codeCharacterCount = codeCharacterArray.length;
        let processedCode = '';

        for ( let codeCharacterIndex = 0;
              codeCharacterIndex < codeCharacterCount;
              ++codeCharacterIndex )
        {
            let codeCharacter = codeCharacterArray[ codeCharacterIndex ];

            if ( codeCharacterIndex + 4 < codeCharacterCount )
            {
                let nextCodeCharacter = codeCharacterArray[ codeCharacterIndex + 1 ];

                if ( codeCharacter == '{'
                     && ( nextCodeCharacter == '#'
                          || nextCodeCharacter == ':'
                          || nextCodeCharacter == '/' ) )
                {
                    let command = code.slice( codeCharacterIndex );
                    let commandCharacterArray = command.split( '' );
                    let commandCharacterCount = commandCharacterArray.length;
                    let braceCount = 0;

                    for ( let commandCharacterIndex = 0;
                          commandCharacterIndex < commandCharacterCount;
                          ++commandCharacterIndex )
                    {
                        let commandCharacter = commandCharacterArray[ commandCharacterIndex ];

                        if ( commandCharacter === '{' )
                        {
                            ++braceCount;
                        }
                        else if ( commandCharacter === '}' )
                        {
                            --braceCount;

                            if ( braceCount === 0 )
                            {
                                command = command.slice( 0, commandCharacterIndex + 1 );

                                break;
                            }
                        }
                    }
                    console.log( command );

                    commandCharacterCount = command.length;
                    let processedCommand = command;

                    if ( command.endsWith( '}' ) )
                    {
                        if ( command.startsWith( '{#if ' ) )
                        {
                            processedCommand = '(' + command.slice( 5, -1 ) + ')?(';

                            this.pushCommand( 'if' );
                        }
                        else if ( command.startsWith( '{:else if ' ) )
                        {
                            if ( this.isCommand( 'if' ) )
                            {
                                processedCommand = '):((' + command.slice( 5, -1 ) + ')?(';

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
                                    processedCommand = '):null';
                                }
                                else
                                {
                                    processedCommand = ')'.repeat( elseCount );
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
                            let asCharacterIndex = command.lastIndexOf( ' of ' );

                            if ( asCharacterIndex > 0 )
                            {
                                processedCommand
                                    = '('
                                      + command.slice( asCharacterIndex + 4, -1 )
                                      + ').map(('
                                      + command.slice( 6, asCharacterIndex )
                                      + ')=>{';

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
                                processedCommand = '})';

                                this.popCommand();
                            }
                            else
                            {
                                console.warn( 'Unmatched /for command : ' + command );
                            }
                        }
                    }

                    processedCode += processedCommand;
                    codeCharacterIndex = codeCharacterIndex + command.length - 1;
                }
                else
                {
                    processedCode += codeCharacter;
                }
            }
        }

        return processedCode;
    }

}

// -- FUNCTIONS

export function getProcessedCode(
    code
    )
{
    let processor = new Processor();

    return processor.getProcessedCode( code );
}
