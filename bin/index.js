#!/usr/bin/env node
import url from "url";
import { main } from "../bundle/Main/index.js";

process.env["TIL_PATH"] = url.fileURLToPath(new URL("..", import.meta.url));

main();
