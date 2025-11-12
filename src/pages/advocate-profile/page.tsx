import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TopNav from '../../components/feature/TopNav';
import BottomNav from '../../components/feature/BottomNav';
import { advocates, reviews } from '../../mocks/advocates';

const AdvocateProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [saved, setSaved] = useState(false);

  const advocate = advocates.find(a => a.id === id);

  if (!advocate) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Advocate not found</h2>
          <button
            onClick={() => navigate('/search')}
            className="text-blue-600 font-medium"
          >
            Back to Search
          </button>
        </div>
      </div>
    );
  }

  const advocateReviews = reviews.filter(r => r.advocateId === advocate.id);

  const handleSave = () => {
    setSaved(!saved);
    // Show toast notification
  };

  const handleMessage = () => {
    navigate(`/chat/${advocate.id}`);
  };

  const handleBook = () => {
    navigate(`/booking/${advocate.id}`);
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'credentials', label: 'Credentials' }
  ];

  const OverviewTab = () => (
    <div className="space-y-6">
      {/* Consultation Modes */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Consultation Modes</h3>
        <div className="space-y-3">
          {Object.entries(advocate.fees).map(([mode, details]) => (
            <div key={mode} className="bg-white rounded-xl p-4 border border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                    <i className={`ri-${mode === 'chat' ? 'chat-1' : mode === 'call' ? 'phone' : 'video'}-line text-blue-600`}></i>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 capitalize">{mode} Consultation</h4>
                    <p className="text-sm text-gray-500">{details.duration}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">₹{details.price}</p>
                  <p className="text-xs text-gray-500">per session</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Calendar Availability */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Availability</h3>
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <div className="grid grid-cols-7 gap-2 mb-4">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
              <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                {day}
              </div>
            ))}
            {Array.from({ length: 7 }, (_, i) => (
              <div key={i} className="text-center py-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                  i === 2 ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'
                }`}>
                  {15 + i}
                </div>
              </div>
            ))}
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between py-2 px-3 bg-green-50 rounded-lg">
              <span className="text-sm text-green-700">10:00 AM - 11:00 AM</span>
              <span className="text-xs text-green-600 font-medium">Available</span>
            </div>
            <div className="flex items-center justify-between py-2 px-3 bg-green-50 rounded-lg">
              <span className="text-sm text-green-700">2:00 PM - 3:00 PM</span>
              <span className="text-xs text-green-600 font-medium">Available</span>
            </div>
            <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-500">4:00 PM - 5:00 PM</span>
              <span className="text-xs text-gray-400 font-medium">Booked</span>
            </div>
          </div>
        </div>
      </div>

      {/* About */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">About</h3>
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <p className="text-gray-700 leading-relaxed">{advocate.description}</p>
        </div>
      </div>
    </div>
  );

  const ReviewsTab = () => (
    <div className="space-y-4">
      <div className="bg-white rounded-xl p-4 border border-gray-200">
        <div className="flex items-center space-x-4 mb-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900">{advocate.rating}</div>
            <div className="flex items-center justify-center space-x-1 mb-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <i
                  key={star}
                  className={`ri-star-fill text-sm ${
                    star <= Math.floor(advocate.rating) ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                ></i>
              ))}
            </div>
            <div className="text-sm text-gray-500">{advocate.reviewCount} reviews</div>
          </div>
          <div className="flex-1">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center space-x-2 mb-1">
                <span className="text-sm text-gray-600 w-3">{rating}</span>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-400 h-2 rounded-full"
                    style={{ width: `${rating === 5 ? 70 : rating === 4 ? 20 : 5}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {advocateReviews.map((review) => (
          <div key={review.id} className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-medium text-sm">
                  {review.clientName.charAt(0)}
                </span>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-medium text-gray-900">{review.clientName}</h4>
                    <div className="flex items-center space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <i
                          key={star}
                          className={`ri-star-fill text-xs ${
                            star <= review.rating ? 'text-yellow-400' : 'text-gray-300'
                          }`}
                        ></i>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    {review.verified && (
                      <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                        Verified
                      </span>
                    )}
                    <span className="text-xs text-gray-500">
                      {new Date(review.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <p className="text-gray-700 text-sm">{review.review}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const CredentialsTab = () => (
    <div className="space-y-4">
      <div className="bg-white rounded-xl p-4 border border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-4">Education & Qualifications</h3>
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center mt-1">
              <i className="ri-graduation-cap-line text-blue-600 text-sm"></i>
            </div>
            <div>
              <h4 className="font-medium text-gray-900">LLB, Delhi University</h4>
              <p className="text-sm text-gray-500">Bachelor of Laws • 2005-2008</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center mt-1">
              <i className="ri-award-line text-blue-600 text-sm"></i>
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Bar Council Registration</h4>
              <p className="text-sm text-gray-500">Delhi Bar Council • Reg. No: DL/2009/12345</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 border border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-4">Professional Experience</h3>
        <div className="space-y-4">
          <div className="border-l-2 border-blue-200 pl-4">
            <h4 className="font-medium text-gray-900">Senior Associate</h4>
            <p className="text-sm text-blue-600">Kumar & Associates Law Firm</p>
            <p className="text-xs text-gray-500">2015 - Present</p>
            <p className="text-sm text-gray-600 mt-1">
              Specializing in criminal and corporate law cases with focus on high-profile litigation.
            </p>
          </div>
          <div className="border-l-2 border-gray-200 pl-4">
            <h4 className="font-medium text-gray-900">Junior Associate</h4>
            <p className="text-sm text-gray-600">Sharma Legal Services</p>
            <p className="text-xs text-gray-500">2009 - 2015</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 border border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-4">Certifications</h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gray-50 rounded-lg p-3 text-center">
            <i className="ri-file-text-line text-2xl text-blue-600 mb-2"></i>
            <p className="text-sm font-medium text-gray-900">Bar Council Certificate</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-3 text-center">
            <i className="ri-shield-check-line text-2xl text-green-600 mb-2"></i>
            <p className="text-sm font-medium text-gray-900">Background Verified</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNav 
        showBack={true}
        rightAction={
          <button
            onClick={handleSave}
            className="w-8 h-8 flex items-center justify-center text-gray-600"
          >
            <i className={`ri-bookmark-${saved ? 'fill' : 'line'} text-xl ${saved ? 'text-blue-600' : ''}`}></i>
          </button>
        }
      />

      <div className="pt-14 pb-20">
        {/* Hero Section */}
        <div className="bg-white border-b border-gray-200">
          <div className="px-4 py-6">
            <div className="flex space-x-4">
              <div className="relative">
                <img
                  src={advocate.photo}
                  alt={advocate.name}
                  className="w-20 h-20 rounded-full object-cover"
                />
                {advocate.verified && (
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                    <i className="ri-check-line text-white text-sm"></i>
                  </div>
                )}
              </div>

              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <h1 className="text-xl font-bold text-gray-900">{advocate.name}</h1>
                      {advocate.premium && (
                        <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs px-2 py-1 rounded-full">
                          Premium
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 mb-2">{advocate.court}</p>
                    <div className="flex items-center space-x-4 mb-2">
                      <div className="flex items-center space-x-1">
                        <i className="ri-star-fill text-yellow-400 text-sm"></i>
                        <span className="font-medium">{advocate.rating}</span>
                        <span className="text-gray-500 text-sm">({advocate.reviewCount})</span>
                      </div>
                      <span className="text-gray-500 text-sm">{advocate.experience}+ years</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {advocate.specializations.map((spec) => (
                    <span
                      key={spec}
                      className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full"
                    >
                      {spec}
                    </span>
                  ))}
                </div>

                <div className="flex space-x-2">
                  <span className="text-xs text-gray-500">Languages:</span>
                  <span className="text-xs text-gray-700">{advocate.languages.join(', ')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white border-b border-gray-200">
          <div className="flex">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-3 text-sm font-medium border-b-2 ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="px-4 py-6">
          {activeTab === 'overview' && <OverviewTab />}
          {activeTab === 'reviews' && <ReviewsTab />}
          {activeTab === 'credentials' && <CredentialsTab />}
        </div>
      </div>

      {/* Fixed Bottom Actions */}
      <div className="fixed bottom-16 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="flex space-x-3">
          <button
            onClick={handleMessage}
            className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-medium flex items-center justify-center space-x-2"
          >
            <i className="ri-chat-1-line"></i>
            <span>Message</span>
          </button>
          <button
            onClick={handleBook}
            className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-medium flex items-center justify-center space-x-2"
          >
            <i className="ri-calendar-line"></i>
            <span>Book Consultation</span>
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default AdvocateProfilePage;