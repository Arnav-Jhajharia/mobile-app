module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        envName: 'APP_ENV',
        moduleName: '@env',
        path: '.env',
        blocklist: null,
        allowlist: null,
        // "blacklist": null, // DEPRECATED
        // "whitelist": null, // DEPRECATED
        safe: false,
        allowUndefined: true,
        verbose: false,
      },
    ],
    ['@babel/plugin-proposal-private-methods', {loose: false}],
    ['@babel/plugin-proposal-private-property-in-object', {loose: false}],
    ['@babel/plugin-proposal-class-properties', {loose: false}],
    [
      'react-native-reanimated/plugin',
      {
        relativeSourceLocation: true,
      },
    ],
  ],
};
