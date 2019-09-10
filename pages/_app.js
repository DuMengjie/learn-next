import App from 'next/app'
import React from 'react'
import global from '../store/global'
import { Provider } from 'mobx-react'

const store = {
  global
}

class MyMobxApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    )
  }
}

export default MyMobxApp