import qs from 'qs';
import Api from '../utils/api';

export async function requestShowList(keyword = 'batman') {
  const url = `/search/shows?q=${keyword}`;
  // const url = `https://api.tvmaze.com/search/shows?q=${keyword}`;

  return Api.get(url);
}

export async function requestShowDetail(id) {
  const url = `/shows/${id}`;

  return Api.get(url);
}