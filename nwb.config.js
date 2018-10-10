module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'react-record',
      externals: {
        react: 'React'
      }
    }
  }
}
