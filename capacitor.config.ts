import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.myproject.app',
  appName: 'my-project',
  webDir: 'out',
  server: {
    androidScheme: 'https',
  },
};

export default config;
