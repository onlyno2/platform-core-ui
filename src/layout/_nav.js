export default [
  {
    _name: 'CSidebarNav',
    _children: [
      {
        _name: 'CSidebarNavItem',
        name: 'Dự án',
        to: '/projects',
        icon: 'cib-graphcool'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Schema',
        to: '/schemas',
        icon: 'cil-file'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Loại thiết bị',
        to: '/device_types',
        icon: 'cil-memory'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Thiết bị ',
        to: '/devices',
        icon: 'cil-memory'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Ứng dụng',
        to: '/apps',
        icon: 'cil-applications'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Luật',
        to: '/rules',
        icon: 'cil-list-numbered'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Trạng thái thiết bị',
        to: '/mappings',
        icon: 'cil-swap-horizontal'
      }
    ]
  }
]