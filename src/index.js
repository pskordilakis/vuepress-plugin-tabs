import tabs from './tabs'
import tab from './tab'

module.exports = () => {
  return {
    enhanceAppFiles: [
      {
        name: 'register-vue-tabs-component',
        content: `import Tabs from 'vue-tabs-component';export default ({ Vue }) => Vue.use(Tabs)`
      }
    ],
    extendMarkdown: md => {
      tabs(md)
      tab(md)
    }
  }
}
