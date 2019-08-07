const core = require('@actions/core');
const github = require('@actions/core');

try {
  const nameToGreet = core.getInput('who-to-greet');
      console.log(`Hello ${nameToGreet}!`);
      const time = (new Date()).toTimeString();
      core.setOutput("time", time);
  const context = github.context;
  core.debug(`The webhook payload: ${context.payload}`);
} catch (error) {
  core.setFailed(error.message);
}
