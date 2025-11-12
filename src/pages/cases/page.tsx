import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopNav from '../../components/feature/TopNav';
import BottomNav from '../../components/feature/BottomNav';
import { cases, consultationHistory } from '../../mocks/advocates';

const CasesPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('active');

  const activeCases = cases.filter(c => c.status !== 'Closed');
  const pastConsultations = consultationHistory;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Hearing Scheduled':
        return 'bg-blue-100 text-blue-700';
      case 'Under Review':
        return 'bg-yellow-100 text-yellow-700';
      case 'Evidence Stage':
        return 'bg-purple-100 text-purple-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
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

  const ActiveCasesTab = () => (
    <div className="space-y-4">
      {activeCases.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="ri-file-list-line text-3xl text-gray-400"></i>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Active Cases</h3>
          <p className="text-gray-500 mb-6">You don't have any active cases at the moment.</p>
          <button
            onClick={() => navigate('/search')}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium"
          >
            Find an Advocate
          </button>
        </div>
      ) : (
        activeCases.map((caseItem) => (
          <div key={caseItem.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">{caseItem.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{caseItem.court}</p>
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(caseItem.status)}`}>
                  {caseItem.status}
                </span>
              </div>
              <button className="w-8 h-8 flex items-center justify-center text-gray-400">
                <i className="ri-more-2-line"></i>
              </button>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Case ID:</span>
                <span className="text-gray-900 font-mono">{caseItem.id}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Next Hearing:</span>
                <span className="text-gray-900">
                  {formatDate(caseItem.nextHearing)} at {formatTime(caseItem.nextHearing)}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Advocate:</span>
                <span className="text-gray-900">{caseItem.advocate}</span>
              </div>
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => navigate(`/chat/${caseItem.advocate.split(' ')[1]}`)}
                className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg text-sm font-medium flex items-center justify-center space-x-1"
              >
                <i className="ri-chat-1-line"></i>
                <span>Chat</span>
              </button>
              <button className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg text-sm font-medium flex items-center justify-center space-x-1">
                <i className="ri-download-line"></i>
                <span>Orders</span>
              </button>
              <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm font-medium flex items-center justify-center space-x-1">
                <i className="ri-upload-line"></i>
                <span>Documents</span>
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );

  const ConsultationsTab = () => (
    <div className="space-y-4">
      {pastConsultations.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="ri-chat-1-line text-3xl text-gray-400"></i>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Consultations</h3>
          <p className="text-gray-500 mb-6">You haven't had any consultations yet.</p>
          <button
            onClick={() => navigate('/search')}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium"
          >
            Book Consultation
          </button>
        </div>
      ) : (
        pastConsultations.map((consultation) => (
          <div key={consultation.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">{consultation.advocateName}</h3>
                <p className="text-sm text-gray-600 mb-2">
                  {formatDate(consultation.date)} • {consultation.duration} min • {consultation.mode}
                </p>
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                  consultation.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {consultation.status === 'completed' ? 'Completed' : 'Scheduled'}
                </span>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">₹{consultation.fee}</p>
                {consultation.rating && (
                  <div className="flex items-center space-x-1 mt-1">
                    <i className="ri-star-fill text-yellow-400 text-sm"></i>
                    <span className="text-sm text-gray-600">{consultation.rating}</span>
                  </div>
                )}
              </div>
            </div>

            {consultation.review && (
              <div className="bg-gray-50 rounded-lg p-3 mb-3">
                <p className="text-sm text-gray-700">"{consultation.review}"</p>
              </div>
            )}

            <div className="flex space-x-2">
              {consultation.status === 'completed' ? (
                <>
                  <button className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg text-sm font-medium">
                    Download Receipt
                  </button>
                  <button
                    onClick={() => navigate(`/advocate/${consultation.advocateId}`)}
                    className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm font-medium"
                  >
                    Book Again
                  </button>
                </>
              ) : (
                <button className="w-full bg-green-600 text-white py-2 rounded-lg text-sm font-medium flex items-center justify-center space-x-1">
                  <i className="ri-video-line"></i>
                  <span>Join Call</span>
                </button>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNav 
        title="My Cases" 
        showNotifications={true}
        rightAction={
          <button
            onClick={() => navigate('/case-tracker')}
            className="w-8 h-8 flex items-center justify-center text-gray-600"
          >
            <i className="ri-search-line text-xl"></i>
          </button>
        }
      />

      <div className="pt-14 pb-20">
        {/* Tabs */}
        <div className="bg-white border-b border-gray-200">
          <div className="flex">
            <button
              onClick={() => setActiveTab('active')}
              className={`flex-1 py-3 text-sm font-medium border-b-2 ${
                activeTab === 'active'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500'
              }`}
            >
              Active Cases ({activeCases.length})
            </button>
            <button
              onClick={() => setActiveTab('consultations')}
              className={`flex-1 py-3 text-sm font-medium border-b-2 ${
                activeTab === 'consultations'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500'
              }`}
            >
              Consultations ({pastConsultations.length})
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="px-4 py-6">
          {activeTab === 'active' && <ActiveCasesTab />}
          {activeTab === 'consultations' && <ConsultationsTab />}
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default CasesPage;