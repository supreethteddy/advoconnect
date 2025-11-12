
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopNav from '../../components/feature/TopNav';
import BottomNav from '../../components/feature/BottomNav';
import { advocates, legalNews } from '../../mocks/advocates';

const HomePage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [caseNumber, setCaseNumber] = useState('');

  const categories = [
    { id: 'criminal', name: 'Criminal', icon: 'https://readdy.ai/api/search-image?query=icon%2C%203D%20cartoon%20criminal%20law%20gavel%20and%20handcuffs%2C%20the%20icon%20should%20take%20up%2070%25%20of%20the%20frame%2C%20vibrant%20colors%20with%20soft%20gradients%2C%20minimalist%20design%2C%20smooth%20rounded%20shapes%2C%20subtle%20shading%2C%20no%20outlines%2C%20centered%20composition%2C%20isolated%20on%20white%20background%2C%20playful%20and%20friendly%20aesthetic%2C%20isometric%20perspective%2C%20high%20detail%20quality%2C%20clean%20and%20modern%20look%2C%20single%20object%20focus&width=64&height=64&seq=cat1&orientation=squarish' },
    { id: 'family', name: 'Family', icon: 'https://readdy.ai/api/search-image?query=icon%2C%203D%20cartoon%20family%20law%20house%20and%20heart%2C%20the%20icon%20should%20take%20up%2070%25%20of%20the%20frame%2C%20vibrant%20colors%20with%20soft%20gradients%2C%20minimalist%20design%2C%20smooth%20rounded%20shapes%2C%20subtle%20shading%2C%20no%20outlines%2C%20centered%20composition%2C%20isolated%20on%20white%20background%2C%20playful%20and%20friendly%20aesthetic%2C%20isometric%20perspective%2C%20high%20detail%20quality%2C%20clean%20and%20modern%20look%2C%20single%20object%20focus&width=64&height=64&seq=cat2&orientation=squarish' },
    { id: 'corporate', name: 'Corporate', icon: 'https://readdy.ai/api/search-image?query=icon%2C%203D%20cartoon%20corporate%20law%20briefcase%20and%20building%2C%20the%20icon%20should%20take%20up%2070%25%20of%20the%20frame%2C%20vibrant%20colors%20with%20soft%20gradients%2C%20minimalist%20design%2C%20smooth%20rounded%20shapes%2C%20subtle%20shading%2C%20no%20outlines%2C%20centered%20composition%2C%20isolated%20on%20white%20background%2C%20playful%20and%20friendly%20aesthetic%2C%20isometric%20perspective%2C%20high%20detail%20quality%2C%20clean%20and%20modern%20look%2C%20single%20object%20focus&width=64&height=64&seq=cat3&orientation=squarish' },
    { id: 'property', name: 'Property', icon: 'https://readdy.ai/api/search-image?query=icon%2C%203D%20cartoon%20property%20law%20house%20and%20key%2C%20the%20icon%20should%20take%20up%2070%25%20of%20the%20frame%2C%20vibrant%20colors%20with%20soft%20gradients%2C%20minimalist%20design%2C%20smooth%20rounded%20shapes%2C%20subtle%20shading%2C%20no%20outlines%2C%20centered%20composition%2C%20isolated%20on%20white%20background%2C%20playful%20and%20friendly%20aesthetic%2C%20isometric%20perspective%2C%20high%20detail%20quality%2C%20clean%20and%20modern%20look%2C%20single%20object%20focus&width=64&height=64&seq=cat4&orientation=squarish' }
  ];

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleCategoryClick = (category: string) => {
    navigate(`/search?category=${category}`);
  };

  const handleCaseTracker = () => {
    if (caseNumber.trim()) {
      navigate(`/case-tracker?case=${encodeURIComponent(caseNumber)}`);
    } else {
      navigate('/case-tracker');
    }
  };

  const handleAdvocateClick = (advocateId: string) => {
    navigate(`/advocate/${advocateId}`);
  };

  const handleBookAdvocate = (advocateId: string) => {
    navigate(`/booking/${advocateId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNav showNotifications={true} />

      <div className="pt-14 pb-20">
        {/* Header */}
        <div className="bg-white px-4 py-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Good morning, Priya!</h1>
              <p className="text-gray-600">Find the right legal help today</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-bold text-lg">P</span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Search advocates, specializations..."
              className="w-full pl-12 pr-4 py-3 bg-gray-100 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white"
            />
            <i className="ri-search-line absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            <button
              onClick={handleSearch}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
            >
              Search
            </button>
          </div>
        </div>

        {/* Quick Categories */}
        <div className="px-4 py-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Categories</h2>
          <div className="grid grid-cols-4 gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 mx-auto mb-2 overflow-hidden rounded-lg">
                  <img
                    src={category.icon}
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-sm font-medium text-gray-900 leading-tight">
                  {category.name}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Case Tracker Card */}
        <div className="px-4 mb-6">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <i className="ri-file-search-line text-white text-xl"></i>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Case Tracker</h3>
                <p className="text-blue-100 text-sm">Track your legal proceedings</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <input
                type="text"
                value={caseNumber}
                onChange={(e) => setCaseNumber(e.target.value)}
                placeholder="Enter case number"
                className="flex-1 px-4 py-3 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg text-white placeholder-blue-100 focus:ring-2 focus:ring-white focus:ring-opacity-50 focus:border-transparent"
              />
              <button
                onClick={handleCaseTracker}
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors"
              >
                Track Now
              </button>
            </div>
          </div>
        </div>

        {/* Featured Advocates */}
        <div className="px-4 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Featured Advocates</h2>
            <button
              onClick={() => navigate('/search')}
              className="text-blue-600 text-sm font-medium"
            >
              View All
            </button>
          </div>
          <div className="space-y-4">
            {advocates.slice(0, 3).map((advocate) => (
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
                        <div className="flex items-center space-x-4 mb-2">
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
                    </div>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {advocate.specializations.slice(0, 2).map((spec) => (
                        <span
                          key={spec}
                          className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>

                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleAdvocateClick(advocate.id)}
                        className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg text-sm font-medium"
                      >
                        View Profile
                      </button>
                      <button
                        onClick={() => handleBookAdvocate(advocate.id)}
                        className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm font-medium"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Legal News */}
        <div className="px-4 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Latest Legal News</h2>
          <div className="space-y-3">
            {legalNews.map((news) => (
              <div
                key={news.id}
                className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
              >
                <div className="flex items-start space-x-3">
                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                    <i className="ri-newspaper-line text-blue-600 text-xl"></i>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 mb-1">{news.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{news.summary}</p>
                    <div className="flex items-center justify-between">
                      <span className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full">
                        {news.category}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(news.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default HomePage;
