import 'isomorphic-unfetch'
import qs from 'qs';
import 'es6-promise'

const BASE_URL = 'https://api.tvmaze.com'; //服务器地址

class Api {
  //检查响应状态
  checkStatus(response) {
    if(response.status >= 200 && response.status < 300) { //响应成功
      return response;
    }
    if(response.status === 301 || response.status === 302) { //重定向
      window.location = response.headers.get('Location');
    }
    const error = new Error(response.statusText);
    error.data = response;
    throw error;
  }

  //解析返回的结果
  async parseResult(response) {
    const contentType = response.headers.get('Content-Type');
    if(contentType != null) {
      if(contentType.indexOf('text') > -1) {
        return await response.text()
      }
      if(contentType.indexOf('form') > -1) {
        return await response.formData();
      }
      if(contentType.indexOf('video') > -1) {
        return await response.blob();
      }
      if(contentType.indexOf('json') > -1) {
        return await response.json();
      }
    }
    return await response.text();
  }

  async processResult(response) {
    let _response = this.checkStatus(response)
    _response = await this.parseResult(_response);
    return _response;
  }
  
  async _request(url, options = {}) {
    const realUrl = url.match(/^(http)|(\/\/)/)
      ? url
      : `${BASE_URL}${url}`;

    try {
      let response = await fetch(realUrl, {
        ...options,
        headers: {
          // Authorization: getAuthToken(),
          ...(options.headers ? options.headers : {})
        }
      });
      response = await this.processResult(response); //这里是对结果进行处理。包括判断响应状态和根据response的类型解析结果
      return response;
    } catch(error) {
      throw error;
      return null;
    }
  }

  async get(url) {
    return await this._request(url, { method: 'GET' });
  }

  async post(url, data = {}) {
    return await this._request(url, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      method: 'POST',
      body: qs.stringify(data)
    });
  }

  async postJson(url, data = {}) {
    return await this._request(url, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      },
      method: 'POST',
      body: JSON.stringify(data)
    });
  };

  async postFormData(url, data = {}) {
    const formData = new FormData();

    Object.keys(data).forEach(key => {
      formData.append(key, data[key]);
    });

    return await this._request(url, {
      method: 'POST',
      body: formData
    });
  };

  async putJson(url, data) {
    return await this.request(url, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      },
      method: 'PUT',
      body: JSON.stringify(data)
    });
  };

  async delete(url) {
    return await this._request(url, { method: 'DELETE' });
  };
}

export default new Api();