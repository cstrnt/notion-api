export declare type NotionObject = {
    id: string;
    type: 'page' | 'text' | 'header' | 'sub_header' | 'sub_sub_header' | 'divider' | 'break' | 'numbered_list' | 'bulleted_list';
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
export declare type NotionResponse = {
    recordMap: {
        block: {
            id: {
                value: NotionObject;
            };
        };
    };
};
export declare type Options = {
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
