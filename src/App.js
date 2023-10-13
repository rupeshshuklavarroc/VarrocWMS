import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GlobalProvider } from './Actions/GlobalContext';
import LoginPage from './LoginPage';
import Select from './Select';
import EntryWithGlobalProvider from './Entry';
import IssueWithGlobalProvider from './Issue';
import LiveWithGlobalProvider from './LiveTable';
import TransactionWithGlobalProvider from './TransactionTable';
import StockAnalyticsWithGlobalProvider from './StockAnalytics';
import AnalyticsWithGlobalProvider from './Analytics';
import EmptyStatisticsWithGlobalProvider from './EmptyStatistics';

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          {/* Route to the LoginPage component */}
          <Route exact path="/" element={<LoginPage />} />
          {/* Route to the EntryWithGlobalProvider component */}
          <Route path="/entry" element={<EntryWithGlobalProvider />} />
          {/* Route to the Select component */}
          <Route path="/select" element={<Select />} />
          {/* Route to the IssueWithGlobalProvider component */}
          <Route path="/exit" element={<IssueWithGlobalProvider />} />
          {/* Route to the LiveWithGlobalProvider component */}
          <Route path="/live" element={<LiveWithGlobalProvider />} />
          {/* Route to the TransactionWithGlobalProvider component */}
          <Route path="/history" element={<TransactionWithGlobalProvider />} />
          {/* Route to the StockAnalyticsWithGlobalProvider component */}
          <Route path="/stocks" element={<StockAnalyticsWithGlobalProvider />} />
          {/* Route to the EmptyStatisticsWithGlobalProvider component */}
          <Route path="/empty" element={<EmptyStatisticsWithGlobalProvider />} />
          {/* Route to the AnalyticsWithGlobalProvider component */}
          <Route path="/analytics" element={<AnalyticsWithGlobalProvider />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default function AppWithGlobalProvider() {
  return (
    <GlobalProvider>
      {/* Render the App component wrapped with GlobalProvider */}
      <App />
    </GlobalProvider>
  );
}
