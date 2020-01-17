// Map to keep track of used ids
const tabIds = new Map();

export function dedupeId(id) {
  const normalizedId = String(id).toLowerCase().replace(' ', '-')
  let currentValue = !tabIds.has(normalizedId) ? 1 : (tabIds.get(normalizedId) + 1);
  tabIds.set(normalizedId, currentValue);

  return `${normalizedId}-${currentValue}`;
}

export function tabAttributes(val, options = {}) {
  let attributes = val
    // sanitize input
    .trim()
    .slice("tab".length)
    .trim()
    // parse into array
    .split(/ +(?=(?:(?:[^"]*"){2})*[^"]*$)/g)
    // normalize name attribute
    .map(attr => {
      if (!attr.includes("=")) {
        if (!attr.startsWith('"')) {
          attr = `"${attr}`;
        }

        if (!attr.endsWith('"')) {
          attr = `${attr}"`;
        }

        return `name=${attr}`;
      }

      return attr;
    });

  if (options.dedupeIds) {
    const idIndex = attributes.findIndex(attr => attr.startsWith('id='));
    const nameIndex = attributes.findIndex(attr => attr.startsWith('name='));


    if (idIndex !== -1) {
      const id = attributes[idIndex];
      const [ , idValue ] = id.split('=');
      attributes[idIndex] = `id="${dedupeId(idValue.substring(1, idValue.length - 1))}"`;
    } else {
      const name = attributes[nameIndex];
      const [ , nameValue ] = name.split('=');
      attributes.unshift(`id="${dedupeId(nameValue.substring(1, nameValue.length - 1))}"`);
    }
  }

  return attributes.join(" ");
}

export function tabsAttributes(val) {
  return (
    val
      // sanitize input
      .trim()
      .slice("tabs".length)
      .trim()
  );
}

export function defaultTabsAttributes(attributes) {
  let attributesString = []
  if (!attributes || Object.keys(attributes).length === 0) {
    return ''
  }

  for (const key in attributes) {
    const substring = `:${key}='${JSON.stringify(attributes[key])}'` 
    attributesString.push(substring)
  }

  return attributesString.join(' ')
}
