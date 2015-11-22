
const _nav =  [
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Home'],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Input',
    route: '/input',
    icon: 'cil-pencil',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Laboratory',
        to: '/input/laboratory',
      },
    ],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Analysis',
    route: '/analysis',
    icon: 'cil-zoom',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Laboratory',
        to: '/analysis/laboratory',
      },
    ],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Stock Management',
    route: '/stock_management',
    icon: 'cil-basket',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Spare Parts',
        to: '/stock_management/spare_parts',
      },
    ],
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Import/Export'],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Import',
    route: '/import',
    icon: 'cil-arrow-circle-left',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'HS',
        to: '/import/hs',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Geo-Information System',
        to: '/import/geo_information',
      },
    ],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Export',
    route: '/export',
    icon: 'cil-arrow-circle-right',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'HS',
        to: '/export/hs',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Geo-Information System',
        to: '/export/geo_information',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Reports',
        to: '/export/reports',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Excel',
        to: '/export/excel',
      },
    ],
  },
]

export default _nav
