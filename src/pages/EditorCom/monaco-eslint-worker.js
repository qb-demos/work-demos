import ESLint from './eslint.bundle'

self.addEventListener('message', event => {
  const { code, version } = event.data

  try {
    const markers = ESLint.verify(
      code,
      { /* ESLint config */ }
    ).map(err => ({
      startLineNumber: err.line,
      endLineNumber: err.line,
      startColumn: err.column,
      endColumn: err.column,
      message: `${err.message} (${err.ruleId})`,
      severity: 3,
      source: 'ESLint'
    }))

    self.postMessage({ markers, version })
  } catch (e) {
    /* Ignore error */
  }
})
