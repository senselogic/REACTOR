import { getProcessedCode } from './src/processor.js';

let code = document.getElementById( 'code' ).textContent;
let processedCode = getProcessedCode( code );
document.getElementById( 'processed-code' ).textContent = processedCode;
