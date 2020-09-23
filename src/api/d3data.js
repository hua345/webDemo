import request from '@/utils/request'

export function forceDirectedData(query) {
  return request({
    url: '/d3/force-directed',
    method: 'get',
    params: query
  })
}
