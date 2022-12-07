import { Route, Routes } from 'react-router-dom';
import { DataEntry } from './DataEntry';
import { Dashboard } from './Dashboard';

export function Routing() {
  return <div>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/data_entry/gas" element={<DataEntry source="gas"/>} />
      <Route path="/data_entry/diesol" element={<DataEntry source="diesol" />} />
      <Route path="/data_entry/propane" element={<DataEntry source="propane" />} />
      <Route path="/data_entry/electricity" element={<DataEntry source="electricity" />} />
      <Route path="/data_reporting" element={<h3>Data Reporting</h3>} />
      <Route path="/data_audit" element={<h3>Data Audit</h3>} />
    </Routes>   
  </div>
}