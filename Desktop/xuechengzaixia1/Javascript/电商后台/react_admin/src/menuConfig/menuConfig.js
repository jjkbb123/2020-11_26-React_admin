import {
  HomeOutlined,
  MailOutlined,
  UserOutlined,
  UserSwitchOutlined,
  BarChartOutlined,
  LineChartOutlined,
  PieChartOutlined
} from '@ant-design/icons';

const menuList = [
  {
    title:'首页',
    key:"/home",
    icon:<HomeOutlined/>,
    isPublic:true
  },
  {
    title:'商品',
    key:"/sub1",
    icon:<MailOutlined/>,
    children:[
      {
        title:'品类管理',
        key:"/category",
        icon:<MailOutlined/>,
  },
      {
        title:'商品管理',
        key:"/product",
        icon:<MailOutlined/>,
  },
    ]
  },
  {
    title:'用户管理',
    key:"/user",
    icon:<UserOutlined/>,
  },
  {
    title:'角色管理',
    key:"/role",
    icon:<UserSwitchOutlined/>,
  },
  {
    title:'图形图表',
    key:"/sub2",
        icon:<MailOutlined/>,
        children:[
      {
        title:'柱形图',
        key:"/charts/bar",
        icon:<BarChartOutlined/>,
      },
      {
        title:'折线图',
        key:"/charts/line",
        icon:<LineChartOutlined/>,
      },
      {
        title:'饼图',
        key:"/charts/pie",
        icon:<PieChartOutlined/>,
      },
    ]
  },

]

export default menuList