
interface Config {
  /**
   * The array of files to ignore.
   * 
   * @see {@link https://github.com/sindresorhus/globby#globbing-patterns|Patterns}
   */
  ignore?: string[];
  /**
   * If `true`, writes logs to console (always enabled if `dry` or `force` is 
   * `true`). 
   */
  verbose?: boolean;
  /**
   * If `true`, simulates the removing and see what would be deleted.
   */
  dry?: boolean;
  /**
   * If `true`, allows deleting files outside current working directory.
   */
  force?: boolean;
  /**
   * Running time (before or after compiling).
   */
  event?: 'before' | 'after'
}

/**
 * A webpack plugin to clean your built directory before running.
 * 
 * An alternative to `clean-webpack-plugin` (an original plugin doesn't support
 * ignoring files).
 */
declare class CleanPlugin {
  constructor(config?: Config);
}

export default CleanPlugin;