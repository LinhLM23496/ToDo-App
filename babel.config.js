module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    '@babel/plugin-proposal-export-namespace-from',
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.d.js', '.d.ts', '.js', '.ts', '.tsx', '.json'],
        alias: {
          assets: './src/assets',
          icons: './src/assets/icons',
          images: './src/assets/images',
          components: './src/components',
          navigation: './src/navigation',
          hooks: './src/hooks',
          screens: './src/screens',
          themes: './src/themes',
          lib: './src/lib',
          stores: './src/stores'
        }
      }
    ]
  ]
}
