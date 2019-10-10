import { NotionObject, Options, Attributes, PageDTO } from './types';
import slugify from 'slugify';

// Seperator for good-looking HTML ;)
const SEPERATOR = '';

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
function formatToHtml(
  ObjectToParse: NotionObject,
  options: Options,
  index: number
) {
  let { type, properties, format } = ObjectToParse;
  // Get color
  const color = format && format.block_color;
  // Replace color with custom color if passed
  const customColor =
    color &&
    options.colors &&
    ((options.colors as any)[color.split('_')[0]] || color);
  // Set content
  const content =
    properties &&
    properties.title &&
    properties.title[0][0].replace(/\[.*\]:.{1,}/, '');
  const tags = (content && content[0] ? content[0][0] : '').match(
    /\[.{1,}\]: .{1,}/
  );
  const attrib = tags && tags[0].replace(/(\[|\])/g, '').split(':');
  if (attrib && attrib.length == 2) {
    return {
      [attrib[0]]: attrib[1].trim()
    };
  }

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
      if (index === 0) {
        return `<h1 ${style}>${content}</h1>`;
      }
      return null;
    }
    case types.divider: {
      return `<${types.divider}${style}/>`;
    }
    case types.break: {
      return `<${types.break} />`;
    }
    case types.numbered_list:
    case types.bulleted_list: {
      return `<li${style}>${content}</li>`;
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
  const attributes: Attributes = {};
  for (let index = 0; index < ObjectList.length; index += 1) {
    const element = ObjectList[index];
    let html = formatToHtml(element, options, index);
    if (html && typeof html === 'object') {
      const keys = Object.keys(html as Attributes);
      keys.forEach(key => {
        attributes[key] = (html as Attributes)[key];
      });
    } else if (
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
    if (typeof html === 'string') {
      items.push(html);
    }
  }
  const { format, properties } = ObjectList[0];
  const title = (properties && properties.title[0][0]) || '';
  const cover =
    format && format.page_cover
      ? format.page_cover.includes('http')
        ? format.page_cover
        : `https://www.notion.so${format.page_cover}`
      : null;
  return {
    items,
    attributes: {
      ...attributes,
      title,
      slug: slugify(title, { lower: true }),
      cover,
      teaser: items
        .map(i =>
          i
            .replace(/\[.{1,}\]: .{1,}/g, '')
            .replace(/\<a.*\>*\<\/a\>/g, '')
            .replace(/<[^>]*>/g, '')
        )
        .filter(i => i)
        .join(' ')
        .trim()
        .substring(0, 200),
      icon: format ? format.page_icon : null
    }
  };
}

/**
 * Creates a HTML Page out of a List of Notion-Objects
 * @param {*} ObjectList List of Notion-Objects
 * @param {*} options Options for parsing
 */
function toHTMLPage(
  ObjectList: Array<NotionObject>,
  options: Options
): PageDTO {
  const { items, attributes } = formatList(ObjectList, options);
  const elementsString = items.join('');
  return {
    HTML: elementsString ? `<div>${elementsString}</div>` : '',
    Attributes: { ...attributes, id: ObjectList[0].id }
  };
}

export function handleNotionError(err: Error) {
  if (err.message.includes('block')) {
    console.error('Authentication Error: Please check your token!');
  } else {
    console.error(err);
  }
}

export function isNotionID(id: string) {
  const idRegex = new RegExp(
    /[a-z,0-9]{8}-[a-z,0-9]{4}-[a-z,0-9]{4}-[a-z,0-9]{4}-[a-z,0-9]{12}/g
  );
  return idRegex.test(id);
}

export default toHTMLPage;
