export type ObjectToParse = {
  id: string;
  type: string;
  properties: {
    title: Array<Array<String>>;
  };
  format: {
    page_icon: string;
    page_cover: string;
    page_cover_position: number;
    block_color: string;
  };
};

export type NotionResponse = {
  recordMap: {
    block: {
      id: {
        value: ObjectToParse;
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
