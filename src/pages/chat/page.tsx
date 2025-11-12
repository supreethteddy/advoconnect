import { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TopNav from '../../components/feature/TopNav';
import { advocates } from '../../mocks/advocates';

const ChatPage = () => {
  const { advocateId } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: '1',
      sender: 'advocate',
      content: 'Hello! I received your consultation request. How can I help you with your legal matter?',
      time: '2024-01-14T10:30:00Z',
      type: 'text'
    },
    {
      id: '2',
      sender: 'user',
      content: 'Hi, I need help with a property dispute case. My neighbor is claiming part of my land.',
      time: '2024-01-14T10:32:00Z',
      type: 'text'
    },
    {
      id: '3',
      sender: 'advocate',
      content: 'I understand. Property disputes can be complex. Can you please share the property documents and any correspondence with your neighbor?',
      time: '2024-01-14T10:35:00Z',
      type: 'text'
    },
    {
      id: '4',
      sender: 'user',
      content: 'property_deed.pdf',
      time: '2024-01-14T10:37:00Z',
      type: 'file'
    },
    {
      id: '5',
      sender: 'advocate',
      content: 'Thank you for sharing the documents. Based on the property deed, you have a strong case. I recommend we schedule a video consultation to discuss the legal strategy in detail.',
      time: '2024-01-14T10:45:00Z',
      type: 'text'
    }
  ]);
  const [showCallOptions, setShowCallOptions] = useState(false);
  const [showRating, setShowRating] = useState(false);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const advocate = advocates.find(a => a.id === advocateId) || advocates[0];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      sender: 'user',
      content: message,
      time: new Date().toISOString(),
      type: 'text'
    };

    setMessages([...messages, newMessage]);
    setMessage('');

    // Simulate advocate response
    setTimeout(() => {
      const responses = [
        'I understand your concern. Let me review this and get back to you.',
        'That is a valid point. We should consider this in our legal strategy.',
        'Based on my experience, this approach would be most effective.',
        'Let me research this further and provide you with detailed options.'
      ];
      
      const response = {
        id: (Date.now() + 1).toString(),
        sender: 'advocate',
        content: responses[Math.floor(Math.random() * responses.length)],
        time: new Date().toISOString(),
        type: 'text'
      };
      
      setMessages(prev => [...prev, response]);
    }, 2000);
  };

  const handleScheduleCall = (type: string) => {
    setShowCallOptions(false);
    // Navigate to booking with pre-selected mode
    navigate(`/booking/${advocateId}?mode=${type}`);
  };

  const handleCompleteCall = () => {
    setShowRating(true);
  };

  const handleSubmitRating = () => {
    // Submit rating and review
    setShowRating(false);
    setRating(0);
    setReview('');
    // Show success message
  };

  const formatTime = (timeString: string) => {
    return new Date(timeString).toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const CallOptionsModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
      <div className="bg-white rounded-t-3xl w-full p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Schedule Call</h3>
          <button
            onClick={() => setShowCallOptions(false)}
            className="w-8 h-8 flex items-center justify-center text-gray-500"
          >
            <i className="ri-close-line text-xl"></i>
          </button>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => handleScheduleCall('call')}
            className="w-full p-4 bg-blue-50 rounded-xl text-left"
          >
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                <i className="ri-phone-line text-white text-xl"></i>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Voice Call</h4>
                <p className="text-sm text-gray-600">₹{advocate.fees.call.price} for {advocate.fees.call.duration}</p>
              </div>
            </div>
          </button>

          <button
            onClick={() => handleScheduleCall('video')}
            className="w-full p-4 bg-green-50 rounded-xl text-left"
          >
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                <i className="ri-video-line text-white text-xl"></i>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Video Call</h4>
                <p className="text-sm text-gray-600">₹{advocate.fees.video.price} for {advocate.fees.video.duration}</p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );

  const RatingModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm">
        <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">Rate Your Experience</h3>
        
        <div className="flex justify-center space-x-2 mb-6">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setRating(star)}
              className={`text-3xl ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
            >
              <i className="ri-star-fill"></i>
            </button>
          ))}
        </div>

        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Share your experience (optional)"
          rows={3}
          maxLength={500}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none mb-4"
        />

        <div className="flex space-x-3">
          <button
            onClick={() => setShowRating(false)}
            className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-medium"
          >
            Skip
          </button>
          <button
            onClick={handleSubmitRating}
            disabled={rating === 0}
            className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-medium disabled:bg-gray-300"
          >
            Submit
          </button>
        </div>

        <button className="w-full mt-3 text-blue-600 text-sm">
          Request Refund
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <TopNav 
        title={advocate.name}
        showBack={true}
        rightAction={
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowCallOptions(true)}
              className="w-8 h-8 flex items-center justify-center text-gray-600"
            >
              <i className="ri-phone-line text-xl"></i>
            </button>
            <button
              onClick={() => navigate(`/advocate/${advocate.id}`)}
              className="w-8 h-8 flex items-center justify-center text-gray-600"
            >
              <i className="ri-information-line text-xl"></i>
            </button>
          </div>
        }
      />

      {/* Messages */}
      <div className="flex-1 pt-14 pb-20 px-4 overflow-y-auto">
        <div className="space-y-4 py-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-xs lg:max-w-md ${
                msg.sender === 'user' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-gray-900 border border-gray-200'
              } rounded-2xl px-4 py-3`}>
                {msg.type === 'file' ? (
                  <div className="flex items-center space-x-2">
                    <i className="ri-file-text-line text-lg"></i>
                    <span className="text-sm">{msg.content}</span>
                  </div>
                ) : (
                  <p className="text-sm">{msg.content}</p>
                )}
                <p className={`text-xs mt-1 ${
                  msg.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                }`}>
                  {formatTime(msg.time)}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="flex items-center space-x-3">
          <button className="w-10 h-10 flex items-center justify-center text-gray-500">
            <i className="ri-attachment-line text-xl"></i>
          </button>
          <div className="flex-1 relative">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type your message..."
              className="w-full pl-4 pr-12 py-3 bg-gray-100 rounded-full focus:ring-2 focus:ring-blue-500 focus:bg-white focus:border-transparent border-none"
            />
            <button
              onClick={handleSendMessage}
              disabled={!message.trim()}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white disabled:bg-gray-300"
            >
              <i className="ri-send-plane-fill"></i>
            </button>
          </div>
        </div>

        {/* Call Completion Button */}
        <div className="mt-3 flex justify-center">
          <button
            onClick={handleCompleteCall}
            className="bg-green-600 text-white px-6 py-2 rounded-full text-sm font-medium flex items-center space-x-2"
          >
            <i className="ri-check-line"></i>
            <span>Mark Call Complete</span>
          </button>
        </div>
      </div>

      {showCallOptions && <CallOptionsModal />}
      {showRating && <RatingModal />}
    </div>
  );
};

export default ChatPage;