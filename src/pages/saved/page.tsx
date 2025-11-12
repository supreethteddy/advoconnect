import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopNav from '../../components/feature/TopNav';
import BottomNav from '../../components/feature/BottomNav';
import { savedAdvocates } from '../../mocks/advocates';

const SavedPage = () => {
  const navigate = useNavigate();
  const [advocates, setAdvocates] = useState(savedAdvocates);

  const handleRemove = (advocateId: string) => {
    setAdvocates(advocates.filter(a => a.id !== advocateId));
  };

  const handleMessage = (advocateId: string) => {
    navigate(`/chat/${advocateId}`);
  };

  const handleViewProfile = (advocateId: string) => {
    navigate(`/advocate/${advocateId}`);
  };

  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <i className="ri-bookmark-line text-3xl text-gray-400"></i>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">No Saved Advocates</h3>
      <p className="text-gray-500 text-center mb-6">
        Save advocates you're interested in to easily find them later.
      </p>
      <button
        onClick={() => navigate('/search')}
        className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium"
      >
        Browse Advocates
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNav title="Saved Advocates" showNotifications={true} />

      <div className="pt-14 pb-20 px-4">
        {advocates.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <p className="text-gray-600">{advocates.length} saved advocates</p>
              <button className="text-blue-600 text-sm font-medium">
                Clear All
              </button>
            </div>

            {advocates.map((advocate) => (
              <div
                key={advocate.id}
                className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
              >
                <div className="flex space-x-3">
                  <div className="relative">
                    <img
                      src={advocate.photo}
                      alt={advocate.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    {advocate.verified && (
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                        <i className="ri-check-line text-white text-xs"></i>
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold text-gray-900">{advocate.name}</h3>
                          {advocate.premium && (
                            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs px-2 py-1 rounded-full">
                              Premium
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{advocate.court}</p>
                        <div className="flex flex-wrap gap-1 mb-2">
                          {advocate.specializations.slice(0, 2).map((spec) => (
                            <span
                              key={spec}
                              className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full"
                            >
                              {spec}
                            </span>
                          ))}
                        </div>
                      </div>
                      <button
                        onClick={() => handleRemove(advocate.id)}
                        className="w-8 h-8 flex items-center justify-center text-red-500 hover:bg-red-50 rounded-full"
                      >
                        <i className="ri-bookmark-fill"></i>
                      </button>
                    </div>

                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <i className="ri-star-fill text-yellow-400 text-sm"></i>
                          <span className="text-sm font-medium">{advocate.rating}</span>
                          <span className="text-xs text-gray-500">({advocate.reviewCount})</span>
                        </div>
                        <div className="text-sm">
                          <span className="font-semibold text-green-600">₹{advocate.fees.call.price}</span>
                          <span className="text-gray-500">/{advocate.fees.call.duration}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleMessage(advocate.id)}
                        className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg text-sm font-medium flex items-center justify-center space-x-1"
                      >
                        <i className="ri-chat-1-line"></i>
                        <span>Message</span>
                      </button>
                      <button
                        onClick={() => handleViewProfile(advocate.id)}
                        className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm font-medium flex items-center justify-center space-x-1"
                      >
                        <i className="ri-user-line"></i>
                        <span>View Profile</span>
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                      <span>{advocate.experience}+ years experience</span>
                      <span>Available today</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default SavedPage;