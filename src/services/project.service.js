import { api_v1 } from '../util/api_caller.util'

export class ProjectService {
  static async index(page) {
    const response = await api_v1.get(`/projects?page=${page}`)
    if (response.status === 200) {
      return response
    }
  }
}