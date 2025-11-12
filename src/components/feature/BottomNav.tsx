
import { useLocation, useNavigate } from 'react-router-dom';

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: '/home', icon: 'ri-home-line', activeIcon: 'ri-home-fill', label: 'Home' },
    { path: '/search', icon: 'ri-search-line', activeIcon: 'ri-search-fill', label: 'Search' },
    { path: '/cases', icon: 'ri-file-list-line', activeIcon: 'ri-file-list-fill', label: 'Cases' },
    { path: '/saved', icon: 'ri-bookmark-line', activeIcon: 'ri-bookmark-fill', label: 'Saved' },
    { path: '/profile', icon: 'ri-user-line', activeIcon: 'ri-user-fill', label: 'Profile' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="grid grid-cols-5 h-16">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center justify-center space-y-1 ${
                isActive ? 'text-blue-600' : 'text-gray-500'
              }`}
            >
              <i className={`${isActive ? item.activeIcon : item.icon} text-lg`}></i>
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;
