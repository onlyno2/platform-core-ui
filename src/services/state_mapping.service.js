import { api_v1 } from '../util/api_caller.util'

export class MappingService {
  static async index(project_id, type_id, event_id, page) {
    const response = await api_v1.get(`/projects/${project_id}/device_types/${type_id}/events/${event_id}/states?page=${page}`)
    if(response.status === 200) {
      return response
    }
  }

  static async show(project_id, id) {
    const response = await api_v1.get(`/projects/${project_id}/schemas/${id}`)
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

  static async create(project_id, type_id, event_id, data) {
    const response = await api_v1.post(`/projects/${project_id}/device_types/${type_id}/events/${event_id}/states`, data)
    if(response.status === 201) {
      return response
    }
  }

  static async destroy(project_id, id) {
    const response = await api_v1.delete(`/projects/${project_id}/schemas/${id}`)
    if(response.status === 200) {
      return response
    }
  }

  static async content(project_id, id) {
    const response = await api_v1.get(`/projects/${project_id}/schemas/${id}/content`)
    if(response.status === 200) {
      return response
    }
  }
}