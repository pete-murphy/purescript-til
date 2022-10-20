import { exec } from "child_process";

export const exec1Impl = exec;
export const exec2Impl = exec;

export function exec2Impl2(command, options) {
  return exec(command, undefined, options);
}

export const exec3Impl = exec;
