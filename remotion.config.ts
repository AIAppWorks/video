import { Config } from '@remotion/cli/config';
import { enableTailwind } from '@remotion/tailwind';

Config.overrideWebpackConfig((c) => {
  return enableTailwind(c);
});

Config.setVideoImageFormat('jpeg');
Config.setOverwriteOutput(true);
