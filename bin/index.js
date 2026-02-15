#!/usr/bin/env node

import { program } from "commander";
import { showMainMenu } from "../src/lib/quizLogic.js";

showMainMenu();
program.parse(process.argv);