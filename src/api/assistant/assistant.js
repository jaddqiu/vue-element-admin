import request from '@/utils/request'

/**
 * 查询
 * @export
 * @param {object} data
 * @returns promise
 */
export function GetIndex(query) {
  return request({
    url: 'http://localhost:8888/api/v1/index',
    method: 'get',
    params: query
  })
}
