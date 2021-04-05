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
    console.log(data)
    const response = await api_v1.post('/projects', data)
    if (response.status === 200) {
      Vue.$toast.success('Create success')
      return response
    }
  }

  static async update(id, data) {
    const response = await api_v1.patch(`/projects/${id}`, data)
    if (response.status === 200) {
      Vue.$toast.success('Update success')
      return response
    }
  }

  static async delete(id) {
    const response = await api_v1.delete(`/projects/${id}`)
    if (response.status === 200) {
      Vue.$toast.success('Delete success')
      return response
    }
  }
}