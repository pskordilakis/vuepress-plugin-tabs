import { tabsAttributes, defaultTabsAttributes } from './util'
const container = require('markdown-it-container')

export default (md, options) => {
  md.use(container, 'tabs', {
    render: (tokens, idx) => {
      const token = tokens[idx]
      const defaultAttributes = defaultTabsAttributes(options.tabsAttributes)
      const attributes = tabsAttributes (token.info)

      if (token.nesting === 1) {
        return `<tabs ${defaultAttributes} ${attributes}>\n`
      } else {
        return `</tabs>\n`
      }
    }
  })
}
