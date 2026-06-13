import { useState } from 'react'
import './App.css'
import { AppProvider, useApp } from './context/AppContext'
import { Header } from './components/Header'
import { InputPanel } from './components/InputPanel'
import { FilterPanel } from './components/FilterPanel'
import { SavedFilterSetsPanel } from './components/SavedFilterSetsPanel'
import { FilteredDataPanel } from './components/FilteredDataPanel'
import { TabNav, type TabId } from './components/TabNav'
import { SettingsModal } from './components/SettingsModal'
import { ResetDialog } from './components/ResetDialog'
import { TranslatorTab } from './components/tabs/TranslatorTab'
import { CompareTab } from './components/tabs/CompareTab'
import { ParserTab } from './components/tabs/ParserTab'
import { ValidatorTab } from './components/tabs/ValidatorTab'
import { EnumsTab } from './components/tabs/EnumsTab'
import { DictionaryTab } from './components/tabs/DictionaryTab'
import { ExamplesTab } from './components/tabs/ExamplesTab'
import { FixatdlPage } from './fixatdl/components/FixatdlPage'

function AppShell() {
  const [activeTab, setActiveTab] = useState<TabId>('translator')
  const [showSettings, setShowSettings] = useState(false)
  const [showReset, setShowReset] = useState(false)
  const { resetAll } = useApp()

  return (
    <div className="app">
      <Header
        onSettings={() => setShowSettings(true)}
        onReset={() => setShowReset(true)}
      />
      <div className="app-body">
        <InputPanel />
        <FilterPanel />
        <SavedFilterSetsPanel />
        <FilteredDataPanel />
        <TabNav active={activeTab} onChange={setActiveTab} />
        <div className="tab-content" role="tabpanel">
          {activeTab === 'translator' && <TranslatorTab />}
          {activeTab === 'compare' && <CompareTab />}
          {activeTab === 'parser' && <ParserTab />}
          {activeTab === 'validator' && <ValidatorTab />}
          {activeTab === 'enums' && <EnumsTab />}
          {activeTab === 'dictionary' && <DictionaryTab />}
          {activeTab === 'examples' && <ExamplesTab />}
          {activeTab === 'fixatdl' && <FixatdlPage />}
        </div>
      </div>
      {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}
      {showReset && (
        <ResetDialog
          onConfirm={() => { resetAll(); setShowReset(false) }}
          onCancel={() => setShowReset(false)}
        />
      )}
    </div>
  )
}

export default function App() {
  return (
    <AppProvider>
      <AppShell />
    </AppProvider>
  )
}
