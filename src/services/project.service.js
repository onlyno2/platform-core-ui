import Vue from 'vue'
import { api_v1 } from '../util/api_caller.util'

export class ProjectService {
  static async index(page) {
    const response = await api_v1.get(`/projects?page=${page}`)
    if (response.status === 200) {
      return response
    }
  }

  static async show(id) {
    const response = await api_v1.get(`/projects/${id}`)
    if (response.status === 200) {
      return response
    }
  }

  static async create(data) {
    const response = await api_v1.post('/projects', data)
    if (response.status === 200) {
      Vue.$toast.success('Tạo mới dự án thành công')
      return response
    }
  }

  static async update(id, data) {
    const response = await api_v1.patch(`/projects/${id}`, data)
    if (response.status === 200) {
      Vue.$toast.success('Cập nhật thông tin dự án thành công')
      return response
    }
  }

  static async delete(id) {
    const response = await api_v1.delete(`/projects/${id}`)
    if (response.status === 200) {
      Vue.$toast.success('Xóa dự án thành công')
      return response
    }
  }
}