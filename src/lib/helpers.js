const SEPERATOR = `\n        `;
const types = {
  page: 'div',
  text: 'p',
  header: 'h1',
  sub_header: 'h3',
  divider: 'hr',
  break: 'br',
  numbered_list: 'ol',
  bulleted_list: 'ul',
};

function formatToHtml(ObjectToParse) {
  let { type, properties } = ObjectToParse;
  const content = properties && properties.title;
  if (!content && type !== 'divider') {
    type = 'break';
  }
  switch (types[type]) {
    case types.divider: {
      return `<${types.divider} />`;
    }
    case types.break: {
      return `<${types.break} />`;
    }
    case types.numbered_list:
    case types.bulleted_list: {
      return `    <li>${content}</li>`;
    }
    default: {
      return `<${types[type]}>${content}</${types[type]}>`;
    }
  }
}

function formatList(ObjectList) {
  const items = [];
  for (let index = 0; index < ObjectList.length; index += 1) {
    const element = ObjectList[index];
    let html = formatToHtml(element);

    if (element && element.type.includes('list')) {
      // If it the element is the first ul or ol element
      if (
        ObjectList[index - 1] &&
        !ObjectList[index - 1].type.includes('list')
      ) {
        html = `<${types[element.type]}>${SEPERATOR}${html}`;
      }
      if (
        index + 1 >= ObjectList.length ||
        (ObjectList[index + 1] && !ObjectList[index + 1].type.includes('list'))
      ) {
        html = `${html}${SEPERATOR}</${types[element.type]}>`;
      }
    }
    items.push(html);
  }
  return items;
}

function toHTMLPage(ObjectList) {
  const elementsString = formatList(ObjectList).join(SEPERATOR);
  return elementsString
    ? `<html>
    <body>${elementsString}
    </body>
</html>`
    : null;
}

module.exports = toHTMLPage;
