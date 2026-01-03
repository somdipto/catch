import React, { useState } from 'react';
import { WalletProvider } from './services/wallet';
import { Layout } from './components/Layout';
import { Landing } from './pages/Landing';
import { Marketplace } from './pages/Marketplace';
import { BountyDetail } from './pages/BountyDetail';
import { CreateBounty } from './pages/CreateBounty';
import { Earnings } from './pages/Earnings';

// Simple custom router for SPA
const App = () => {
  const [currentPage, setCurrentPage] = useState('landing');
  const [pageParams, setPageParams] = useState<any>({});

  const navigate = (page: string, params?: any) => {
    setCurrentPage(page);
    if (params) setPageParams(params);
    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <Landing onNavigate={navigate} />;
      case 'marketplace':
        return (
          <Layout activePage="marketplace" onNavigate={navigate}>
            <Marketplace onNavigate={navigate} />
          </Layout>
        );
      case 'bounty-detail':
        return (
          <Layout activePage="marketplace" onNavigate={navigate}>
            <BountyDetail bountyId={pageParams.bountyId} onBack={() => navigate('marketplace')} />
          </Layout>
        );
      case 'create':
        return (
           <Layout activePage="create" onNavigate={navigate}>
              <CreateBounty onNavigate={navigate} />
           </Layout>
        );
      case 'earnings':
         return (
            <Layout activePage="earnings" onNavigate={navigate}>
               <Earnings />
            </Layout>
         );
      default:
        // Fallback for not implemented pages
        return (
          <Layout activePage={currentPage} onNavigate={navigate}>
             <div className="flex flex-col items-center justify-center h-[60vh] text-slate-500">
                <h2 className="text-xl font-bold text-white mb-2">Coming Soon</h2>
                <p>The {currentPage} page is under construction.</p>
                <button 
                    onClick={() => navigate('marketplace')}
                    className="mt-6 text-primary hover:underline"
                >
                    Return to Marketplace
                </button>
             </div>
          </Layout>
        );
    }
  };

  // Special case for Landing page which has no sidebar
  if (currentPage === 'landing') {
    return (
        <WalletProvider>
            <Landing onNavigate={navigate} />
        </WalletProvider>
    );
  }

  return (
    <WalletProvider>
      {renderPage()}
    </WalletProvider>
  );
};

export default App;
