declare function request({ endpoint, creds: { token }, body }: {
    endpoint: string;
    creds: {
        token: string;
    };
    body?: object;
}): Promise<any>;
export default request;
