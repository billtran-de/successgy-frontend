import { useNavigate } from 'react-router-dom';
import { Menu } from 'antd';
import { BarChartOutlined, FormOutlined, DashboardOutlined, CheckSquareOutlined } from '@ant-design/icons';

export function SideMenu() {
  const navigate = useNavigate()

  return (
    <div style={{backgroundColor: "#F1F3F5"}}>
      <Menu
        mode="inline"
        onClick={({key}) => {
          navigate(key);
        }} 
        defaultSelectedKeys={[window.location.pathname]}
        defaultOpenKeys={["/data_entry"]}
        items={[
          { label: 'CORE MODULES' },
          { label: 'Dashboard', key:"/", icon:<BarChartOutlined /> }, 
          { label: 'Data Entry', key:"/data_entry", icon:<FormOutlined />, children:
              [{ label: "Gas", key:"/data_entry/gas"},{ label: "Diesol", key:"/data_entry/diesol"},{ label: "Propane", key:"/data_entry/propane"},{ label: "Electricity", key:"/data_entry/electricity"}] }, 
          { label: 'ESG Reporting', key:"/data_reporting", icon:<DashboardOutlined /> }, 
          { label: 'Data Audit', key:"/data_audit", icon:<CheckSquareOutlined /> }]}>
      </Menu>
    </div>
  )
}