import {cwd} from 'node:process';

import {readdirSync} from 'node:fs';
import {stat as statPromise} from 'node:fs/promises';
import formatBytes from './byteConverter.js';

/**
 * Displays the text given as arguement
 * 
 * @param {args} String arguement passed from the commmand line 
 * @returns 
 */0
var main = function (args) {
    let currentDirectory = cwd();
    console.log("Current Directory: "+currentDirectory);
    let files = readdirSync(cwd(), {withFileTypes:true}).map(dirents => { 
        return dirents.name;
    });
    console.log("Mode  | LastWriteTiem | Creation Time | Length | Name");
    console.log("----  | ------------- | ------------- | ------ | ----");
    const dateFormat = new Intl.DateTimeFormat('en', {dateStyle:'medium', timeStyle:'short'});
    files.map(file => {
        statPromise(file).then(stats => {
            console.log(" -a--" + "  |  " + dateFormat.format(stats.ctime) + "  |  " + dateFormat.format(stats.birthtime) + "  | " + formatBytes(stats.size) + "  | " + file);
        }).catch(err => {
            console.error(err);
        });
    })
}

export default main;