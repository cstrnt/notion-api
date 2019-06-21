import { Options } from './lib/types';
declare class Notion {
    creds: {
        token: string;
    };
    options: Options;
    constructor({ token, options }: {
        token: string;
        options: Options;
    });
    getPages(): Promise<string[]>;
    getPageById(pageId: string): Promise<string>;
    getAllHTML(): Promise<string[]>;
}
export default Notion;
