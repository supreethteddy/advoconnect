import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopNav from '../../components/feature/TopNav';
import BottomNav from '../../components/feature/BottomNav';
import { notifications } from '../../mocks/advocates';

const NotificationsPage = () => {
  const navigate = useNavigate();
  const [notificationList, setNotificationList] = useState(notifications);

  const handleNotificationClick = (notification: any) => {
    // Mark as read
    setNotificationList(prev => 
      prev.map(n => n.id === notification.id ? { ...n, read: true } : n)
    );

    // Navigate to relevant screen
    switch (notification.actionType) {
      case 'consultation':
        navigate('/cases');
        break;
      case 'case':
        navigate('/cases');
        break;
      case 'chat':
        navigate(`/chat/${notification.actionId.split('_')[1]}`);
        break;
      case 'payment':
        navigate('/cases');
        break;
      default:
        break;
    }
  };

  const markAllAsRead = () => {
    setNotificationList(prev => prev.map(n => ({ ...n, read: true })));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'booking_confirmed':
        return 'ri-calendar-check-line';
      case 'hearing_reminder':
        return 'ri-alarm-line';
      case 'new_message':
        return 'ri-chat-1-line';
      case 'platform_update':
        return 'ri-information-line';
      case 'payment_success':
        return 'ri-check-line';
      default:
        return 'ri-notification-line';
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'booking_confirmed':
        return 'bg-green-100 text-green-600';
      case 'hearing_reminder':
        return 'bg-orange-100 text-orange-600';
      case 'new_message':
        return 'bg-blue-100 text-blue-600';
      case 'platform_update':
        return 'bg-purple-100 text-purple-600';
      case 'payment_success':
        return 'bg-green-100 text-green-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const formatTime = (timeString: string) => {
    const now = new Date();
    const time = new Date(timeString);
    const diffInHours = Math.floor((now.getTime() - time.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now.getTime() - time.getTime()) / (1000 * 60));
      return `${diffInMinutes}m ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d ago`;
    }
  };

  const groupNotificationsByDate = () => {
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    
    const grouped = {
      today: [] as any[],
      yesterday: [] as any[],
      older: [] as any[]
    };

    notificationList.forEach(notification => {
      const notificationDate = new Date(notification.time).toDateString();
      if (notificationDate === today) {
        grouped.today.push(notification);
      } else if (notificationDate === yesterday) {
        grouped.yesterday.push(notification);
      } else {
        grouped.older.push(notification);
      }
    });

    return grouped;
  };

  const groupedNotifications = groupNotificationsByDate();
  const unreadCount = notificationList.filter(n => !n.read).length;

  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <i className="ri-notification-line text-3xl text-gray-400"></i>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">No Notifications</h3>
      <p className="text-gray-500 text-center">
        You're all caught up! We'll notify you when there's something new.
      </p>
    </div>
  );

  const NotificationGroup = ({ title, notifications }: { title: string; notifications: any[] }) => {
    if (notifications.length === 0) return null;

    return (
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3 px-4">
          {title}
        </h3>
        <div className="space-y-1">
          {notifications.map((notification) => (
            <button
              key={notification.id}
              onClick={() => handleNotificationClick(notification)}
              className={`w-full text-left p-4 border-l-4 ${
                notification.read 
                  ? 'bg-white border-transparent' 
                  : 'bg-blue-50 border-blue-500'
              } hover:bg-gray-50 transition-colors`}
            >
              <div className="flex space-x-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getNotificationColor(notification.type)}`}>
                  <i className={`${getNotificationIcon(notification.type)} text-lg`}></i>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className={`text-sm font-medium ${notification.read ? 'text-gray-900' : 'text-gray-900'}`}>
                        {notification.title}
                      </h4>
                      <p className={`text-sm mt-1 ${notification.read ? 'text-gray-600' : 'text-gray-700'}`}>
                        {notification.message}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2 ml-2">
                      <span className="text-xs text-gray-500">
                        {formatTime(notification.time)}
                      </span>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNav 
        title="Notifications" 
        showBack={true}
        rightAction={
          unreadCount > 0 ? (
            <button
              onClick={markAllAsRead}
              className="text-blue-600 text-sm font-medium"
            >
              Mark all read
            </button>
          ) : null
        }
      />

      <div className="pt-14 pb-20">
        {notificationList.length === 0 ? (
          <EmptyState />
        ) : (
          <div>
            {/* Summary */}
            {unreadCount > 0 && (
              <div className="bg-blue-600 text-white p-4">
                <p className="text-sm">
                  You have {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
                </p>
              </div>
            )}

            {/* Notifications */}
            <div className="py-4">
              <NotificationGroup title="Today" notifications={groupedNotifications.today} />
              <NotificationGroup title="Yesterday" notifications={groupedNotifications.yesterday} />
              <NotificationGroup title="Older" notifications={groupedNotifications.older} />
            </div>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default NotificationsPage;