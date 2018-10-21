'use strict';

function tabAttributes(val) {
  return val
  // sanitize input
  .trim().slice("tab".length).trim()
  // parse into array
  .split(/ +(?=(?:(?:[^"]*"){2})*[^"]*$)/g)
  // normalize name attribute
  .map(function (attr) {
    if (!attr.includes("=")) {
      if (!attr.startsWith('"')) {
        attr = "\"" + attr;
      }

      if (!attr.endsWith('"')) {
        attr = attr + "\"";
      }

      return "name=" + attr;
    }

    return attr;
  })
  // roin into a string
  .join(" ");
}

function tabsAttributes(val) {
  return val
  // sanitize input
  .trim().slice("tabs".length).trim();
}

var container = require('markdown-it-container');

var tabs = (function (md) {
  md.use(container, 'tabs', {
    render: function render(tokens, idx) {
      var token = tokens[idx];
      var attributes = tabsAttributes(token.info);

      if (token.nesting === 1) {
        return '<tabs ' + attributes + '>\n';
      } else {
        return '</tabs>\n';
      }
    }
  });
});

var container$1 = require('markdown-it-container');

var tab = (function (md) {
  md.use(container$1, 'tab', {
    render: function render(tokens, idx) {
      var token = tokens[idx];
      var attributes = tabAttributes(token.info);

      if (token.nesting === 1) {
        return '<tab ' + attributes + '>\n';
      } else {
        return '</tab>\n';
      }
    }
  });
});

module.exports = function () {
  return {
    enhanceAppFiles: [{
      name: 'register-vue-tabs-component',
      content: 'import Tabs from \'vue-tabs-component\';export default ({ Vue }) => Vue.use(Tabs)'
    }],
    extendMarkdown: function extendMarkdown(md) {
      tabs(md);
      tab(md);
    }
  };
};
