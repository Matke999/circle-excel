import React from 'react';
import { Toolbar } from './Toolbar';
import { StatusBar } from './StatusBar';
import { TableView } from '../table-view/TableView';
import { RingView } from '../ring-view/RingView';

export function AppShell() {
  return (
    <div className="app-shell flex flex-col h-screen overflow-hidden bg-white">
      <Toolbar />
      <div className="flex flex-1 overflow-hidden">
        <div className="w-1/2 border-r border-gray-300 overflow-hidden flex flex-col">
          <TableView />
        </div>
        <div className="w-1/2 overflow-hidden flex flex-col">
          <RingView />
        </div>
      </div>
      <StatusBar />
    </div>
  );
}
