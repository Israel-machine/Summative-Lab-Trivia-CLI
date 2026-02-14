#!/usr/bin/env node

import { program } from "commander";
import { init } from "../src/lib/quizLogic.js";

init();
program.parse(process.argv);