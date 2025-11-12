import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import TopNav from '../../components/feature/TopNav';
import BottomNav from '../../components/feature/BottomNav';
import { advocates } from '../../mocks/advocates';

const SearchPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    court: '',
    practiceArea: '',
    language: '',
    experience: '',
    feeRange: [0, 1000],
    sortBy: 'relevance'
  });

  const [filteredAdvocates, setFilteredAdvocates] = useState(advocates);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      let results = advocates;
      
      if (query) {
        results = results.filter(advocate => 
          advocate.name.toLowerCase().includes(query.toLowerCase()) ||
          advocate.specializations.some(spec => spec.toLowerCase().includes(query.toLowerCase())) ||
          advocate.court.toLowerCase().includes(query.toLowerCase())
        );
      }

      if (filters.court) {
        results = results.filter(advocate => advocate.court.includes(filters.court));
      }

      if (filters.practiceArea) {
        results = results.filter(advocate => 
          advocate.specializations.includes(filters.practiceArea)
        );
      }

      if (filters.language) {
        results = results.filter(advocate => 
          advocate.languages.includes(filters.language)
        );
      }

      if (filters.experience) {
        const minExp = parseInt(filters.experience);
        results = results.filter(advocate => advocate.experience >= minExp);
      }

      // Sort results
      if (filters.sortBy === 'rating') {
        results.sort((a, b) => b.rating - a.rating);
      } else if (filters.sortBy === 'fee_low') {
        results.sort((a, b) => a.fees.call.price - b.fees.call.price);
      }

      setFilteredAdvocates(results);
      setLoading(false);
    }, 500);
  }, [query, filters]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is handled by useEffect
  };

  const clearFilters = () => {
    setFilters({
      court: '',
      practiceArea: '',
      language: '',
      experience: '',
      feeRange: [0, 1000],
      sortBy: 'relevance'
    });
  };

  const FilterModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
      <div className="bg-white rounded-t-3xl w-full max-h-[80vh] overflow-y-auto">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Filters</h3>
            <button
              onClick={() => setShowFilters(false)}
              className="w-8 h-8 flex items-center justify-center text-gray-500"
            >
              <i className="ri-close-line text-xl"></i>
            </button>
          </div>
        </div>

        <div className="p-4 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Court Type</label>
            <select
              value={filters.court}
              onChange={(e) => setFilters({...filters, court: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Courts</option>
              <option value="High Court">High Court</option>
              <option value="District Court">District Court</option>
              <option value="Sessions Court">Sessions Court</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Practice Area</label>
            <select
              value={filters.practiceArea}
              onChange={(e) => setFilters({...filters, practiceArea: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Areas</option>
              <option value="Criminal Law">Criminal Law</option>
              <option value="Family Law">Family Law</option>
              <option value="Corporate Law">Corporate Law</option>
              <option value="Property Law">Property Law</option>
              <option value="Tax Law">Tax Law</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
            <select
              value={filters.language}
              onChange={(e) => setFilters({...filters, language: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Languages</option>
              <option value="Hindi">Hindi</option>
              <option value="English">English</option>
              <option value="Marathi">Marathi</option>
              <option value="Gujarati">Gujarati</option>
              <option value="Telugu">Telugu</option>
              <option value="Punjabi">Punjabi</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Experience</label>
            <select
              value={filters.experience}
              onChange={(e) => setFilters({...filters, experience: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Any Experience</option>
              <option value="5">5+ Years</option>
              <option value="10">10+ Years</option>
              <option value="15">15+ Years</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
            <select
              value={filters.sortBy}
              onChange={(e) => setFilters({...filters, sortBy: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="relevance">Relevance</option>
              <option value="rating">Rating</option>
              <option value="fee_low">Fee: Low to High</option>
            </select>
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              onClick={clearFilters}
              className="flex-1 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium"
            >
              Clear All
            </button>
            <button
              onClick={() => setShowFilters(false)}
              className="flex-1 py-3 bg-blue-600 text-white rounded-lg font-medium"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <i className="ri-search-line text-3xl text-gray-400"></i>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">No advocates found</h3>
      <p className="text-gray-500 text-center mb-6">
        Try adjusting your search criteria or filters to find more advocates
      </p>
      <div className="space-y-2 text-sm text-gray-600">
        <p>• Try different keywords</p>
        <p>• Check spelling</p>
        <p>• Use broader search terms</p>
        <p>• Clear some filters</p>
      </div>
    </div>
  );

  const LoadingSkeleton = () => (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-white rounded-xl p-4 shadow-sm animate-pulse">
          <div className="flex space-x-3">
            <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNav 
        title="Search Advocates" 
        showBack={true}
        showNotifications={true}
      />

      <div className="pt-14 pb-20 px-4">
        {/* Search Bar */}
        <div className="mb-4">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search advocates, specializations..."
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <i className="ri-search-line absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
          </form>
        </div>

        {/* Filter Bar */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => setShowFilters(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg"
          >
            <i className="ri-filter-line text-gray-600"></i>
            <span className="text-gray-700">Filters</span>
          </button>
          <span className="text-sm text-gray-500">
            {filteredAdvocates.length} advocates found
          </span>
        </div>

        {/* Results */}
        {loading ? (
          <LoadingSkeleton />
        ) : filteredAdvocates.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="space-y-4">
            {filteredAdvocates.map((advocate) => (
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
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold text-gray-900">{advocate.name}</h3>
                          {advocate.premium && (
                            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs px-2 py-1 rounded-full">
                              Premium
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{advocate.court}</p>
                        <div className="flex flex-wrap gap-1 mt-1">
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
                      <button className="w-8 h-8 flex items-center justify-center text-gray-400">
                        <i className="ri-bookmark-line"></i>
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-3">
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
                      <button
                        onClick={() => navigate(`/advocate/${advocate.id}`)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
                      >
                        View Profile
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                      <span>{advocate.experience}+ years experience</span>
                      <span>Next available: Today 2:00 PM</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showFilters && <FilterModal />}
      <BottomNav />
    </div>
  );
};

export default SearchPage;