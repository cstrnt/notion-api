import Notion from '../src';

describe('the client', () => {
  it('works', async () => {
    expect(() => new Notion({} as any)).toThrow();

    expect(
      () =>
        new Notion({
          token: 'abc',
          options: { colors: { purple: 'test' } },
        })
    ).not.toThrow();
  });
});
