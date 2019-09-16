import App from 'next/app';
import Head from 'next/head';
import global from '../store/global';
import { Provider } from 'mobx-react';

const store = {
  global
};

class MyMobxApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Provider store={store}>
        <Head>
          <title>MeshPlus 陌加社区</title>
          <meta charSet='utf-8' />
          <meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no' />
          <meta httpEquiv='X-UA-Compatible' content='ie=edge' />
          <meta name='keywords' content='区块链,趣链科技,hyperchain,blockchain,meshplus,陌加,社区' />
          <meta name='description' content='MeshPlus 陌加，趣链科技高品质区块链社区，致力于促进区块链行业、技术、平台与应用的交流和发展' />
          <link rel='shortcut icon' href='/static/favicon.ico' type='image/ico'/>
        </Head>
        <Component {...pageProps} />
      </Provider>
    );
  }
}

export default MyMobxApp;
