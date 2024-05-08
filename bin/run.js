#!/usr/bin/env node

import main from '../lib/index.js';

// Delete the 0 and 1 argument (node and script.js)
var args = process.argv.splice(process.execArgv.length + 2);

// pass the arguments to function
main(args);