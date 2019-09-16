import React from 'react';
import Layout from '../components/Layout';
import { inject, observer } from 'mobx-react';
import '../styles/about.scss';

@inject('store')
@observer
class About extends React.Component {
  componentDidMount() {
    console.log('使用mobx:', this.props.store.global.startup);
  }
  render() {
    return (
      <Layout>
        <p className='about-p'>This is the about page</p>
      </Layout>
    );
  }
}

export default About;
