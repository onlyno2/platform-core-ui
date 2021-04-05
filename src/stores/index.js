import ProjectModule from './projects'
import DeviceTypeModule from './device_types'

export default {
  projectModule: { namespaced: true, ...ProjectModule },
  deviceTypeModule: { namespaced: true, ...DeviceTypeModule }
}