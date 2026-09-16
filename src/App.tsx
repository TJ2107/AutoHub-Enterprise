/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { CustomerList } from './components/crm/CustomerList';
import { CustomerDetail } from './components/crm/CustomerDetail';
import { VehicleList } from './components/fleet/VehicleList';
import { VehicleDetail } from './components/fleet/VehicleDetail';
import { Catalog } from './components/concession/Catalog';
import { VehiclePublicSheet } from './components/concession/VehiclePublicSheet';
import { SalesManager } from './components/concession/SalesManager';
import { SaleDetail } from './components/concession/SaleDetail';
import { StockManager } from './components/concession/StockManager';
import { WorkshopPlanning } from './components/workshop/WorkshopPlanning';
import { RepairOrderForm } from './components/workshop/RepairOrderForm';
import { RepairOrderDetail } from './components/workshop/RepairOrderDetail';
import { MaintenanceDashboard } from './components/maintenance/MaintenanceDashboard';
import { MaintenanceDetail } from './components/maintenance/MaintenanceDetail';
import { MaintenanceEditReport } from './components/maintenance/MaintenanceEditReport';
import { RentalDashboard } from './components/rental/RentalDashboard';
import { RentalCatalog } from './components/rental/RentalCatalog';
import { RentalContractForm } from './components/rental/RentalContractForm';
import { RentalContractDetail } from './components/rental/RentalContractDetail';
import { IndustrialDashboard } from './components/industrial/IndustrialDashboard';
import { EquipmentDetail } from './components/industrial/EquipmentDetail';
import { StockDashboard } from './components/stocks/StockDashboard';
import { PartDetail } from './components/stocks/PartDetail';
import { FuelMissionDashboard } from './components/fleet/FuelMissionDashboard';
import { ProcurementDashboard } from './components/procurement/ProcurementDashboard';
import { FinanceModule } from './components/finance/FinanceModule';
import { HRModule } from './components/hr/HRModule';
import { ExecutiveDashboard } from './components/dashboard/ExecutiveDashboard';
import { ReportsHub } from './components/reports/ReportsHub';
import { SecurityHub } from './components/security/SecurityHub';
import { DataArchitectureHub } from './components/architecture/DataArchitectureHub';
import { SecurityProvider } from './lib/securityContext';
import { TopHeader } from './components/common/TopHeader';

export default function App() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <BrowserRouter>
      <SecurityProvider>
        <div className="flex min-h-screen bg-surface-gray">
          <Sidebar 
            isCollapsed={isCollapsed} 
            setIsCollapsed={setIsCollapsed} 
            mobileOpen={mobileOpen} 
            setMobileOpen={setMobileOpen} 
          />
          <main className={`flex-1 transition-all duration-300 p-4 lg:p-8 ${
            isCollapsed ? 'lg:ml-20' : 'lg:ml-64'
          } ml-0 w-full`}>
            <TopHeader setMobileOpen={setMobileOpen} />
            <Routes>
              <Route path="/" element={<ExecutiveDashboard />} />
              <Route path="/crm" element={<CustomerList />} />
              <Route path="/crm/:id" element={<CustomerDetail />} />
              <Route path="/vehicules" element={<VehicleList />} />
              <Route path="/vehicules/:id" element={<VehicleDetail />} />
              <Route path="/concession" element={<Catalog />} />
              <Route path="/concession/catalog/:id" element={<VehiclePublicSheet />} />
              <Route path="/concession/sales" element={<SalesManager />} />
              <Route path="/concession/sales/:id" element={<SaleDetail />} />
              <Route path="/concession/stock" element={<StockManager />} />
              <Route path="/workshop" element={<WorkshopPlanning />} />
              <Route path="/workshop/new" element={<RepairOrderForm />} />
              <Route path="/workshop/order/:id" element={<RepairOrderDetail />} />
              <Route path="/maintenance" element={<MaintenanceDashboard />} />
              <Route path="/maintenance/:id" element={<MaintenanceDetail />} />
              <Route path="/maintenance/:id/edit" element={<MaintenanceEditReport />} />
              <Route path="/rental" element={<RentalDashboard />} />
              <Route path="/rental/catalog" element={<RentalCatalog />} />
              <Route path="/rental/new" element={<RentalContractForm />} />
              <Route path="/rental/contract/:id" element={<RentalContractDetail />} />
              <Route path="/industriels" element={<IndustrialDashboard />} />
              <Route path="/industriels/:id" element={<EquipmentDetail />} />
              <Route path="/stocks" element={<StockDashboard />} />
              <Route path="/stocks/part/:id" element={<PartDetail />} />
              <Route path="/carburant" element={<FuelMissionDashboard />} />
              <Route path="/achats" element={<ProcurementDashboard />} />
              <Route path="/finance" element={<FinanceModule />} />
              <Route path="/rh" element={<HRModule />} />
              <Route path="/rapports" element={<ReportsHub />} />
              <Route path="/architecture" element={<DataArchitectureHub />} />
              <Route path="/admin" element={<SecurityHub />} />
              <Route path="*" element={<div className="p-10 text-center text-slate-500">Module en construction</div>} />
            </Routes>
          </main>
        </div>
      </SecurityProvider>
    </BrowserRouter>
  );
}
