
import { useNavigate, useLocation } from 'react-router-dom';
import { notifications } from '../../mocks/advocates';

interface TopNavProps {
  title?: string;
  showBack?: boolean;
  showNotifications?: boolean;
  rightAction?: React.ReactNode;
}

const TopNav = ({ title, showBack = false, showNotifications = false, rightAction }: TopNavProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const unreadCount = notifications.filter(n => !n.read).length;

  const handleBack = () => {
    navigate(-1);
  };

  const handleNotifications = () => {
    navigate('/notifications');
  };

  return (
    <div className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <div className="flex items-center justify-between h-14 px-4">
        <div className="flex items-center">
          {showBack ? (
            <button
              onClick={handleBack}
              className="w-8 h-8 flex items-center justify-center text-gray-600 mr-2"
            >
              <i className="ri-arrow-left-line text-xl"></i>
            </button>
          ) : null}
          {title ? (
            <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
          ) : (
            <button
              onClick={() => navigate('/')}
              className="text-lg font-semibold text-gray-900"
              aria-label="Go to home"
            >
              AdvocateConnect
            </button>
          )}
        </div>

        <div className="flex items-center space-x-2">
          {rightAction}
          {showNotifications && (
            <button
              onClick={handleNotifications}
              className="relative w-8 h-8 flex items-center justify-center text-gray-600"
            >
              <i className="ri-notification-line text-xl"></i>
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopNav;
