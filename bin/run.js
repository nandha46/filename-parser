#!/usr/bin/env node

import testRepeat from '../lib/index.js';

// Delete the 0 and 1 argument (node and script.js)
var args = process.argv.splice(process.execArgv.length + 2);

// Retrieve the first argument
var input = args[0];

testRepeat(input);