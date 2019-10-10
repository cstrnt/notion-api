import Notion from './src/notion';

const options = {
  token_v2:
    'ea74addc8fedac245edf80a6a39c77f4e5319ffbfe6e7bc12073b23eed557ef8d5a89de4aa5f43bef24c64d1f70b7895e8e1303a0913e0f773abe92f20ba838556f6177e9f8b680296e90285ee55'
};

const api = new Notion({
  token: options.token_v2,
  options: {
    pageUrl: '/posts/',
    colors: {
      red: 'tomato',
      blue: 'rgb(100, 149, 237)',
      purple: '#9933cc'
    }
  }
});

// Use the api here

(async () => {
  const p = await api.getAllHTML();
  console.log(p[0]);
})();
