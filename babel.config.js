module.exports = {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            node: 'current'
          }
        }
      ],
      '@babel/preset-typescript'
    ],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            '@controllers': './src/controllers',
            "@middlewares":'./src/middlewares',
            "@infra":"./src/infra"
            
          }
        }
      ]
    ],
    ignore: ['**/*.spec.ts']
  }
  