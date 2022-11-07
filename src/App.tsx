import { useState } from 'react'
import 'antd/dist/antd.css';
import './styles.css';
import {
  PieChartOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import { Monitor } from './Pages/Monitor';
import { Users } from './Pages/Users';

const { Header, Content, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('Monitorar', 'Monitorar', <PieChartOutlined />),
  getItem('Usuários', 'Usuários', <UserOutlined />),
]

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [page, setPage] = useState('')

  const setPageClick: MenuProps['onClick'] = e => {
    setPage(e.key)
  };

  const pageClicked = () => {
    if(page === 'Usuários') {
      return <Users/>
    }
    return <Monitor/>
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} onClick={setPageClick} />
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: '0 16px' }}>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            {pageClicked()}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default App
