import ProjectModule from './projects'
import DeviceTypeModule from './device_types'
import DeviceModule from './devices'
import AppModule from './apps'
import RuleModule from './rules'
import ActionModule from './actions'
import SchemaModule from './schemas'
import EventModule from './events'
import MappingModule from './mappings'

export default {
  projectModule: { namespaced: true, ...ProjectModule },
  deviceTypeModule: { namespaced: true, ...DeviceTypeModule },
  deviceModule: { namespaced: true, ...DeviceModule },
  appModule: { namespaced: true, ...AppModule },
  ruleModule: { namespaced: true, ...RuleModule },
  actionModule: { namespaced: true, ...ActionModule },
  schemaModule: { namespaced: true, ...SchemaModule },
  eventModule: { namespaced: true, ...EventModule },
  mappingModule: { namespaced: true, ...MappingModule }
}