import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopNav from '../../components/feature/TopNav';
import BottomNav from '../../components/feature/BottomNav';
import { cases } from '../../mocks/advocates';

const CaseTrackerPage = () => {
  const navigate = useNavigate();
  const [caseNumber, setCaseNumber] = useState('');
  const [searchResult, setSearchResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showTimeline, setShowTimeline] = useState(false);

  const handleSearch = () => {
    if (!caseNumber.trim()) {
      setError('Please enter a case number');
      return;
    }

    setLoading(true);
    setError('');

    // Simulate API call
    setTimeout(() => {
      const foundCase = cases.find(c => c.id.toLowerCase() === caseNumber.toLowerCase());
      
      if (foundCase) {
        setSearchResult(foundCase);
        setError('');
      } else {
        setSearchResult(null);
        setError('Case not found. Please check the case number and try again.');
      }
      setLoading(false);
    }, 1500);
  };

  const handleRequestAdvocateHelp = () => {
    // Pre-fill case details and navigate to advocate search
    navigate(`/search?caseId=${searchResult?.id}&caseType=${searchResult?.title}`);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Hearing Scheduled':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Under Review':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Evidence Stage':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'Served':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'Pending':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const LoadingState = () => (
    <div className="bg-white rounded-xl p-6 text-center">
      <div className="animate-spin w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
      <p className="text-gray-600">Searching case records...</p>
    </div>
  );

  const ErrorState = () => (
    <div className="bg-white rounded-xl p-6 text-center">
      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <i className="ri-error-warning-line text-2xl text-red-600"></i>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">Case Not Found</h3>
      <p className="text-gray-600 mb-6">{error}</p>
      <div className="space-y-2 text-sm text-gray-500">
        <p>• Check the case number format</p>
        <p>• Ensure all characters are correct</p>
        <p>• Try searching with different formats</p>
      </div>
    </div>
  );

  const CaseResult = () => {
    if (!searchResult) return null;

    return (
      <div className="space-y-6">
        {/* Case Overview */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">{searchResult.title}</h2>
              <p className="text-gray-600 mb-3">{searchResult.court}</p>
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(searchResult.status)}`}>
                {searchResult.status}
              </span>
            </div>
            <button
              onClick={handleRequestAdvocateHelp}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
            >
              Get Help
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-600">Case Number</p>
              <p className="font-mono text-sm text-gray-900">{searchResult.id}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Last Updated</p>
              <p className="text-sm text-gray-900">{formatDate(searchResult.lastUpdate)}</p>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <h3 className="font-semibold text-gray-900 mb-2">Parties Involved</h3>
            <div className="flex flex-wrap gap-2">
              {searchResult.parties.map((party: string, index: number) => (
                <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                  {party}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Next Hearing */}
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <i className="ri-calendar-line text-white"></i>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Next Hearing</h3>
              <p className="text-sm text-gray-600">Scheduled court appearance</p>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-gray-900">
                  {formatDate(searchResult.nextHearing)}
                </p>
                <p className="text-sm text-gray-600">
                  {formatTime(searchResult.nextHearing)} • {searchResult.court}
                </p>
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
                Set Reminder
              </button>
            </div>
          </div>
        </div>

        {/* Summons Status */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-4">Summons Status</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`w-3 h-3 rounded-full ${
                searchResult.summonsStatus === 'Served' ? 'bg-green-500' : 'bg-orange-500'
              }`}></div>
              <span className="text-gray-900">{searchResult.summonsStatus}</span>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(searchResult.summonsStatus)}`}>
              {searchResult.summonsStatus}
            </span>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Recent Orders</h3>
            <button
              onClick={() => setShowTimeline(!showTimeline)}
              className="text-blue-600 text-sm font-medium"
            >
              {showTimeline ? 'Hide Timeline' : 'View Timeline'}
            </button>
          </div>

          {showTimeline ? (
            <div className="space-y-4">
              {searchResult.orders.map((order: any, index: number) => (
                <div key={index} className="flex space-x-4">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                    {index < searchResult.orders.length - 1 && (
                      <div className="w-px h-12 bg-gray-300 mt-2"></div>
                    )}
                  </div>
                  <div className="flex-1 pb-4">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-gray-900">{order.title}</h4>
                      <span className="text-xs text-gray-500">{formatDate(order.date)}</span>
                    </div>
                    <p className="text-sm text-gray-600">{order.description}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {searchResult.orders.slice(0, 2).map((order: any, index: number) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{order.title}</h4>
                    <span className="text-xs text-gray-500">{formatDate(order.date)}</span>
                  </div>
                  <p className="text-sm text-gray-600">{order.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleRequestAdvocateHelp}
              className="bg-blue-600 text-white p-4 rounded-xl text-center"
            >
              <i className="ri-user-line text-xl mb-2"></i>
              <p className="text-sm font-medium">Request Advocate Help</p>
            </button>
            <button className="bg-gray-100 text-gray-700 p-4 rounded-xl text-center">
              <i className="ri-download-line text-xl mb-2"></i>
              <p className="text-sm font-medium">Download Orders</p>
            </button>
            <button className="bg-gray-100 text-gray-700 p-4 rounded-xl text-center">
              <i className="ri-notification-line text-xl mb-2"></i>
              <p className="text-sm font-medium">Set Reminders</p>
            </button>
            <button className="bg-gray-100 text-gray-700 p-4 rounded-xl text-center">
              <i className="ri-share-line text-xl mb-2"></i>
              <p className="text-sm font-medium">Share Case Info</p>
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNav title="Case Tracker" showBack={true} showNotifications={true} />

      <div className="pt-14 pb-20 px-4">
        {/* Search Section */}
        <div className="mb-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Track Your Case</h2>
            <p className="text-gray-600 mb-4">
              Enter your case number to get real-time updates on your legal proceedings.
            </p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Case Number
                </label>
                <input
                  type="text"
                  value={caseNumber}
                  onChange={(e) => setCaseNumber(e.target.value)}
                  placeholder="e.g., DL/2024/CR/001234"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono"
                />
              </div>
              
              <button
                onClick={handleSearch}
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {loading ? 'Searching...' : 'Track Case'}
              </button>
            </div>

            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-700">
                <i className="ri-information-line mr-1"></i>
                Case numbers are usually in format: STATE/YEAR/TYPE/NUMBER
              </p>
            </div>
          </div>
        </div>

        {/* Results Section */}
        {loading && <LoadingState />}
        {error && !loading && <ErrorState />}
        {searchResult && !loading && !error && <CaseResult />}

        {/* Sample Case Numbers */}
        {!searchResult && !loading && !error && (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-4">Try Sample Case Numbers</h3>
            <div className="space-y-2">
              {cases.map((caseItem) => (
                <button
                  key={caseItem.id}
                  onClick={() => setCaseNumber(caseItem.id)}
                  className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <p className="font-mono text-sm text-blue-600">{caseItem.id}</p>
                  <p className="text-sm text-gray-600">{caseItem.title}</p>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default CaseTrackerPage;