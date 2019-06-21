import Notion from './src/notion';

const options = {
  token_v2:
    '828227322c2c14e874045a4e38971bb3b81e06e6f4d030ef806ddb6c61720cc973c099fffef9c297e1db49a03a1d7ab757d2854d40861cd982b6431465c1bb7fcc2b0f87ecaaa66d3ea758e44315'
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
