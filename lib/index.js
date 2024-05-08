import {cwd} from 'node:process';

import fs from 'fs';

/**
 * Displays the text given as arguement
 * 
 * @param {inputText} String string to repeat in the console 
 * @returns 
 */
var testRepeat = function (inputText) {
    console.log("Current directory: "+ cwd());
    let files = fs.readdirSync(cwd(), {withFileTypes:true}).map(dirents => { 
        return dirents.name; 
    });
    console.log(files);
    return console.log("!! "+inputText+" !!");
}

export default testRepeat;