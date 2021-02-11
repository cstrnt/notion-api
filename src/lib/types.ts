export type NotionObject = {
  id: string;
  type:
    | 'page'
    | 'text'
    | 'header'
    | 'sub_header'
    | 'sub_sub_header'
    | 'divider'
    | 'break'
    | 'numbered_list'
    | 'bulleted_list';
  properties: {
    source?: Array<Array<string>>;
    title?: Array<Array<string>>;
  };
  format: {
    page_icon: string;
    page_cover: string;
    page_cover_position: number;
    block_color: string;
  };
  content: Array<string>;
  created_time: number;
  last_edited_time: number
};

export type NotionResponse = {
  recordMap: {
    block: {
      id: {
        value: NotionObject;
      };
    };
  };
};
export type Options = {
  pageUrl?: string;
  colors?: {
    red?: string;
    brown?: string;
    orange?: string;
    yellow?: string;
    teal?: string;
    blue?: string;
    purple?: string;
    pink?: string;
  };
};

export interface Attributes {
  [key: string]: string | null;
}

export interface PageDTO {
  HTML?: string;
  Attributes?: Attributes;
}

export type htmlResponse = string | { [x: string]: string; } | null;

export type formatter = ((ObjectToParse: NotionObject, options: Options, index: number, ObjectList: Array<NotionObject>) => htmlResponse);
