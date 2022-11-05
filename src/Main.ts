import * as child_process from "child_process";

// Run an interactive command, returning the results.
export const interactive = (
  command: string,
  opts: child_process.SpawnOptionsWithoutStdio | undefined
) =>
  new Promise((resolve, reject) => {
    const shell = child_process.spawn(command, {
      stdio: [0, null, 2],
      shell: true,
      ...opts,
    });
    let results = "";
    shell.stdout?.on("data", (data) => {
      results += data;
    });
    shell.on("close", (code) => (code ? reject() : resolve(results)));
    shell.on("error", (error) => reject(error));
  });
