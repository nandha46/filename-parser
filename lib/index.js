import { cwd } from "node:process";

import fs from "node:fs";
import { stat as statPromise } from "node:fs/promises";
import formatBytes from "./byteConverter.js";

const fgGreen = "\x1b[32m";
const fgYellow = "\x1b[33m";
const fgBlue = "\x1b[34m";
const fgMagenta = "\x1b[35m";

const dateFormat = new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  });

/**
 * Displays the text given as arguement
 *
 * @param {args} String arguement passed from the commmand line
 * @returns
 */ 0;
var main = async function (args) {
  const currentDirectory = cwd();
  let filenames = fs
    .readdirSync(currentDirectory, { withFileTypes: true })
    .map((dirents) => {
      return dirents.name;
    });

    let response = [];
  response.push({
    "fileType":"",
    mode: "Mode",
    lastWriteTime: "LastWriteTime",
    creationTime: "Creation Time",
    size: "Length",
    filename: "Name",
  });
  response.push({
    "fileType":"",
    mode: "----",
    lastWriteTime: "-------------",
    creationTime: "-------------",
    size: "------",
    filename: "----",
  });

    let temp = await getStats(filenames, response);

  /**
   * Calling the function to display output on console
   */
  displayOutput(temp);

};

let getPermissionData = (mode) => {
    let result = '';
    result += mode & fs.constants.S_IFDIR?'d':'-';
    result += mode & fs.constants.S_IRUSR?'r':'-';
    result += mode & fs.constants.S_IWUSR?'w':'-';
    result += mode & fs.constants.S_IXUSR?'x':'-';
  return result;
};

/**
 * function to display output
 * 
 * @param {*} filestat 
 */
let displayOutput = (output) => {
    let spacing1 = [];
    let spacing2 = [];
    let spacing3 = [];

    output.forEach (f => {
        spacing1.push(f.lastWriteTime.length);
        spacing2.push(f.creationTime.length);
        spacing3.push(f.size.length);
    });

   let max1 = Math.max.apply(null, spacing1);
   let max2 = Math.max.apply(null, spacing2);
   let max3 = Math.max.apply(null, spacing3);
   output.forEach(f => {
        console.log(f.fileType, f.mode +"    "+ f.lastWriteTime.padEnd(max1,' ') +"   "+ f.creationTime.padEnd(max2,' ') +"   "+ f.size.padEnd(max3,' ') +"    "+ f.filename);   
  })
}

let checkFileType = (mode) => {
    if (mode.isDirectory()) return fgBlue; // Directory
    if (mode.isSocket()) return fgYellow; // Socket
    if (mode.isSymbolicLink()) return fgGreen; // symbolic link
    if (mode.isFile()) return fgMagenta; // regular file 
    if (mode.isBlockDevice()) return fgYellow; // block device
    if (mode.isCharacterDevice()) return fgYellow; // character device
    if (mode.isFIFO()) return fgYellow; // FIFO
    else return fgYellow;
}

let getStats = async (filenames, response) => {

    for (let file of filenames) {
        let stats = await statPromise(file);
        let filestat = {
            mode: getPermissionData(stats.mode),
            lastWriteTime: dateFormat.format(stats.ctime),
            creationTime: dateFormat.format(stats.birthtime),
            size: formatBytes(stats.size),
            filename: file,
            fileType:checkFileType(stats)
          };
          response.push(filestat);
    };
    
      return response;

}

export default main;
