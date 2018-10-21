export function tabAttributes(val) {
  return (
    val
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
      })
      // roin into a string
      .join(" ")
  );
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
