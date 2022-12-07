import { Route, Routes } from 'react-router-dom';
import { Dashboard } from './Dashboard';
import { DataEntry } from './DataEntry';
import { ESGReporting } from './ESGReporting';
import { DataAudit } from './DataAudit';

export function Routing() {
  return <div>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/data_entry/gas" element={<DataEntry source="gas"/>} />
      <Route path="/data_entry/diesol" element={<DataEntry source="diesol" />} />
      <Route path="/data_entry/propane" element={<DataEntry source="propane" />} />
      <Route path="/data_entry/electricity" element={<DataEntry source="electricity" />} />
      <Route path="/data_reporting" element={<ESGReporting />} />
      <Route path="/data_audit" element={<DataAudit />} />
    </Routes>   
  </div>
}