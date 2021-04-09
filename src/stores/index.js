import ProjectModule from './projects'
import DeviceTypeModule from './device_types'
import DeviceModule from './devices'
import AppModule from './apps'

export default {
  projectModule: { namespaced: true, ...ProjectModule },
  deviceTypeModule: { namespaced: true, ...DeviceTypeModule },
  deviceModule: { namespaced: true, ...DeviceModule },
  appModule: { namespaced: true, ...AppModule }
}