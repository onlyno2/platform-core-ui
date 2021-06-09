import { api_v1 } from '../util/api_caller.util'

export class RuleService {
  static async index(project_id, type_id, page) {
    const response = await api_v1.get(`/projects/${project_id}/device_types/${type_id}/rules?page=${page}`)
    if(response.status === 200) {
      return response
    }
  }

  static async show(project_id, type_id, rule_id) {
    const response = await api_v1.get(`/projects/${project_id}/device_types/${type_id}/rules/${rule_id}`)
    if(response.status === 200) {
      return response
    }
  }

  static async update(project_id, type_id, rule_id, data) {
    const response = await api_v1.patch(`/projects/${project_id}/device_types/${type_id}/rules/${rule_id}`, data)
    if(response.status === 200) {
      return response
    }
  }

  static async create(project_id, type_id, data) {
    const response = await api_v1.post(`/projects/${project_id}/device_types/${type_id}/rules`, data)
    if(response.status === 201) {
      return response
    }
  }

  static async destroy(project_id, type_id, rule_id) {
    console.log(`/projects/${project_id}/device_types/${type_id}/rules/${rule_id}`)
    const response = await api_v1.delete(`/projects/${project_id}/device_types/${type_id}/rules/${rule_id}`)
    if(response.status === 200) {
      return response
    }
  }

  static async actions(project_id, type_id, rule_id, page = 1) {
    const response = await api_v1.get(`/projects/${project_id}/device_types/${type_id}/rules/${rule_id}/actions?page=${page}`)
    if(response.status === 200) {
      return response
    }
  }
}