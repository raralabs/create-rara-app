#!/usr/bin/env node

//Set options as parameter, environemnt variable, or rc file
require = require("esm")(module /*,options*/);
require("../src/main").myCLI(process.argv);
