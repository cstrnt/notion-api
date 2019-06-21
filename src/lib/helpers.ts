import { NotionObject, Options } from './types';

// Seperator for good-looking HTML ;)
const SEPERATOR = `\n        `;

// HTML Tag types
const types = {
  page: 'a',
  text: 'p',
  header: 'h1',
  sub_header: 'h3',
  sub_sub_header: 'h5',
  divider: 'hr',
  break: 'br',
  numbered_list: 'ol',
  bulleted_list: 'ul'
};

/**
 * Method that parses a Notion-Object to HTML
 * @param {*} ObjectToParse The Notion-Object
 * @param {*} options Options for parsing
 */
function formatToHtml(ObjectToParse: NotionObject, options: Options) {
  let { type, properties, format, id } = ObjectToParse;
  // Get color
  const color = format && format.block_color;
  // Replace color with custom color if passed
  const customColor =
    color &&
    options.colors &&
    ((options.colors as any)[color.split('_')[0]] || color);
  // Set content
  const content = properties && properties.title;

  // Only set Style if passed
  const property =
    customColor && color.includes('background')
      ? `style="background-color:${customColor.split('_')[0]}"`
      : `style="color:${customColor}"`;

  // Use ternary operator to return empty string instead of undefined
  const style = color ? ` ${property}` : '';

  // Set type to break if no content is existent
  if (!content && type !== 'divider') {
    type = 'break';
  }
  // Create HTML Tags with content
  switch (types[type]) {
    case types.page: {
      return `<${types.page} href="${options.pageUrl ||
        '/page?id='}${id}"${style}>${content}</${types.page}>`;
    }
    case types.divider: {
      return `<${types.divider}${style}/>`;
    }
    case types.break: {
      return `<${types.break} />`;
    }
    case types.numbered_list:
    case types.bulleted_list: {
      return `    <li${style}>${content}</li>`;
    }
    default: {
      if (types[type])
        return `<${types[type]}${style}>${content}</${types[type]}>`;
      return null;
    }
  }
}

/**
 * Formats a List of objects to HTML
 * @param {*} ObjectList List of Notion-Objects
 * @param {*} options Options for parsing
 */
function formatList(ObjectList: Array<NotionObject>, options: Options) {
  const items = [];
  for (let index = 0; index < ObjectList.length; index += 1) {
    const element = ObjectList[index];
    let html = formatToHtml(element, options);
    if (
      element &&
      element.type.includes('list') &&
      !element.type.includes('column')
    ) {
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

/**
 * Creates a HTML Page out of a List of Notion-Objects
 * @param {*} ObjectList List of Notion-Objects
 * @param {*} options Options for parsing
 */
function toHTMLPage(ObjectList: Array<NotionObject>, options: Options) {
  const elementsString = formatList(ObjectList, options).join(SEPERATOR);
  return elementsString
    ? `<div>
    ${elementsString}
</div>`
    : null;
}

export default toHTMLPage;
