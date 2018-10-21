import { tabsAttributes } from './util'
const container = require('markdown-it-container')

export default md => {
  md.use(container, 'tabs', {
    render: (tokens, idx) => {
      const token = tokens[idx]
      const attributes = tabsAttributes (token.info)

      if (token.nesting === 1) {
        return `<tabs ${attributes}>\n`
      } else {
        return `</tabs>\n`
      }
    }
  })
}
