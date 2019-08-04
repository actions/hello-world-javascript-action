const core = require('@actions/core');
const github = require('@actions/core');

async function run() {
  try {
    const nameToGreet = core.getInput('who-to-greet');
        core.debug(`Hello ${nameToGreet}!`);
        const time = (new Date()).toTimeString();
        core.setOutput("time", time);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
