const SEPERATOR = `\n        `;
const types = {
  page: 'a',
  text: 'p',
  header: 'h1',
  sub_header: 'h3',
  sub_sub_header: 'h5',
  divider: 'hr',
  break: 'br',
  numbered_list: 'ol',
  bulleted_list: 'ul',
};

function formatToHtml(ObjectToParse) {
  let { type, properties, format, id } = ObjectToParse;
  const color = format && format.block_color;
  const content = properties && properties.title;
  const style = color ? ` style="color:${color}"` : '';
  if (!content && type !== 'divider') {
    type = 'break';
  }
  switch (types[type]) {
    case types.page: {
      return `<${types.page} href="/page?id=${id}"${style}>${content}</${
        types.page
      }>`;
    }
    case types.divider: {
      return `<${types.divider}${style}/>`;
    }
    case types.break: {
      return `<${types.break}${style}/>`;
    }
    case types.numbered_list:
    case types.bulleted_list: {
      return `    <li${style}>${content}</li>`;
    }
    default: {
      return `<${types[type]}${style}>${content}</${types[type]}>`;
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
    ? `<div>
    ${elementsString}
</div>`
    : null;
}

module.exports = toHTMLPage;
