import ProjectModule from './projects'
import DeviceTypeModule from './device_types'
import DeviceModule from './devices'

export default {
  projectModule: { namespaced: true, ...ProjectModule },
  deviceTypeModule: { namespaced: true, ...DeviceTypeModule },
  deviceModule: { namespaced: true, ...DeviceModule }
}