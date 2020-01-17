var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

// Map to keep track of used ids
var tabIds = new Map();

function dedupeId(id) {
  var normalizedId = String(id).toLowerCase().replace(' ', '-');
  var currentValue = !tabIds.has(normalizedId) ? 1 : tabIds.get(normalizedId) + 1;
  tabIds.set(normalizedId, currentValue);

  return normalizedId + '-' + currentValue;
}

function tabAttributes(val) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var attributes = val
  // sanitize input
  .trim().slice("tab".length).trim()
  // parse into array
  .split(/ +(?=(?:(?:[^"]*"){2})*[^"]*$)/g)
  // normalize name attribute
  .map(function (attr) {
    if (!attr.includes("=")) {
      if (!attr.startsWith('"')) {
        attr = '"' + attr;
      }

      if (!attr.endsWith('"')) {
        attr = attr + '"';
      }

      return 'name=' + attr;
    }

    return attr;
  });

  if (options.dedupeIds) {
    var idIndex = attributes.findIndex(function (attr) {
      return attr.startsWith('id=');
    });
    var nameIndex = attributes.findIndex(function (attr) {
      return attr.startsWith('name=');
    });

    if (idIndex !== -1) {
      var id = attributes[idIndex];

      var _id$split = id.split('='),
          _id$split2 = slicedToArray(_id$split, 2),
          idValue = _id$split2[1];

      attributes[idIndex] = 'id="' + dedupeId(idValue.substring(1, idValue.length - 1)) + '"';
    } else {
      var name = attributes[nameIndex];

      var _name$split = name.split('='),
          _name$split2 = slicedToArray(_name$split, 2),
          nameValue = _name$split2[1];

      attributes.unshift('id="' + dedupeId(nameValue.substring(1, nameValue.length - 1)) + '"');
    }
  }

  return attributes.join(" ");
}

function tabsAttributes(val) {
  return val
  // sanitize input
  .trim().slice("tabs".length).trim();
}

function defaultTabsAttributes(attributes) {
  var attributesString = [];
  if (!attributes || Object.keys(attributes).length === 0) {
    return '';
  }

  for (var key in attributes) {
    var substring = ':' + key + '=\'' + JSON.stringify(attributes[key]) + '\'';
    attributesString.push(substring);
  }

  return attributesString.join(' ');
}

var container = require('markdown-it-container');

var tabs = (function (md, options) {
  md.use(container, 'tabs', {
    render: function render(tokens, idx) {
      var token = tokens[idx];
      var defaultAttributes = defaultTabsAttributes(options.tabsAttributes);
      var attributes = tabsAttributes(token.info);

      if (token.nesting === 1) {
        return '<tabs ' + defaultAttributes + ' ' + attributes + '>\n';
      } else {
        return '</tabs>\n';
      }
    }
  });
});

var container$1 = require('markdown-it-container');

var tab = (function (md, options) {
  md.use(container$1, 'tab', {
    render: function render(tokens, idx) {
      var token = tokens[idx];
      var attributes = tabAttributes(token.info, options);

      if (token.nesting === 1) {
        return '<tab ' + attributes + '>\n';
      } else {
        return '</tab>\n';
      }
    }
  });
});

module.exports = function (opts) {
  var defaultOptions = {
    dedupeIds: false
  };

  var options = Object.assign({}, defaultOptions, opts);

  return {
    enhanceAppFiles: [{
      name: 'register-vue-tabs-component',
      content: 'import Tabs from \'vue-tabs-component\';export default ({ Vue }) => Vue.use(Tabs)'
    }],
    extendMarkdown: function extendMarkdown(md) {
      tabs(md, options);
      tab(md, options);
    }
  };
};
