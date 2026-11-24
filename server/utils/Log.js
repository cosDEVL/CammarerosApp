const chalk = require('chalk').default;

const log = {
  message: (content) => {
    console.log(content)
  },
  ok: (content) => {
    console.log(chalk.blue(content))
  },
  success: (content) => {
    console.log(chalk.green(content))
  },
  warn: (content) => {
    console.log(chalk.yellow(content))
  },
  error: (content) => {
    console.log(chalk.red(content))
  },
}

module.exports = log
