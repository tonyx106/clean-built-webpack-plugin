const del = require('del');

/**
 * A webpack plugin to clean your built directory before compiling.
 * 
 * An alternative to `clean-webpack-plugin` (an original plugin doesn't support
 * ignoring files).
 */
class CleanPlugin {
  /**
   * @constructor
   * @param {object} [config] 
   * @param {boolean} [config.dry] If `true`, simulates the removing and see 
   * what would be deleted.
   * @param {string[]} [config.ignore] The array of files to ignore, it supports
   * {@link https://github.com/sindresorhus/globby#globbing-patterns|glob patterns}.
   * @param {string[]} [config.include] The array of files to remove (if not 
   * specified, remove all files excluding specified in `ignore`). 
   * @param {boolean} [config.verbose] If `true`, writes logs to console (always 
   * enabled if `dry` or `force` is `true`).
   * @param {boolean} [config.force] If `true`, allows deleting files outside 
   * current working directory.
   * @param {'before' | 'after'} [config.event] Running time (before or after 
   * compiling).
   */
  constructor({ dry = false, force = false, include = ['*'], ignore = [], verbose = false, event = 'before' } = {}) {
    this.ignore = ignore;
    this.dry = dry;
    this.outputPath = '';
    this.verbose = verbose;
    this.force = force;
    this.event = event === 'before' ? 'emit' : 'done';
    this.include = include;
  }

  /**
   * @private
   */
  apply(compiler) {
    this.outputPath = compiler.options.output.path;

    if (compiler.hooks) {
      compiler.hooks[this.event].tap('CleanPlugin', () => this.cleanOutputDir());
    } else {
      compiler.plugin(this.event, (_, next) => {
        this.cleanOutputDir();
        next();
      });
    }
  }

  /**
   * @private
   */
  cleanOutputDir() {
    const files = del.sync(this.include, {
      cwd: this.outputPath,
      ignore: this.ignore,
      dryRun: this.dry,
      force: this.force
    });

    if (this.verbose || this.force || this.dry) {
      console.warn(
        '%scleaning directory "%s" result (\x1b[1m\x1b[33m%s\x1b[0m)\x1b[1m\x1b[32m\n%s\n\x1b[0m', 
          this.force ? '\x1b[1m\x1b[33mrunning in forcex1b[0m\n' : '', this.outputPath, files.length, files.join('\n')
      );
    }
  }
}

module.exports = CleanPlugin;