import request from '@/utils/request'

/**
 * 查询
 * @export
 * @param {object} data
 * @returns promise
 */
export function GetIndex(query) {
  return request({
    url: process.env.NODE_ENV === 'production' ? 'http://fa.jadd.me/api/v1/latest' : 'http://localhost:8888/api/v1/latest',
    // url: 'http://localhost:8888/api/v1/latest',
    method: 'get',
    params: query
  })
}
