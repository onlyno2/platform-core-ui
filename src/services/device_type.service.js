import { api_v1 } from '../util/api_caller.util'

export class DeviceTypeService {
  static async index(project_id, page) {
    const response = await api_v1.get(`/projects/${project_id}/device_types?page=${page}`)
    if (response.status === 200) {
      return response
    }
  }
}