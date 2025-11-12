import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TopNav from '../../components/feature/TopNav';
import BottomNav from '../../components/feature/BottomNav';
import { advocates } from '../../mocks/advocates';

const BookingPage = () => {
  const { advocateId } = useParams();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedMode, setSelectedMode] = useState('');
  const [selectedDuration, setSelectedDuration] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [selectedDate, setSelectedDate] = useState('2024-01-15');
  const [caseType, setCaseType] = useState('');
  const [description, setDescription] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFailure, setShowFailure] = useState(false);

  const advocate = advocates.find(a => a.id === advocateId);

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

  const timeSlots = [
    '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
  ];

  const caseTypes = [
    'Criminal Law', 'Family Law', 'Corporate Law', 'Property Law', 'Tax Law', 'Consumer Law', 'Other'
  ];

  const calculateTotal = () => {
    if (!selectedMode) return 0;
    const basePrice = advocate.fees[selectedMode as keyof typeof advocate.fees].price;
    const platformFee = Math.round(basePrice * 0.2);
    const discount = promoCode === 'FIRST20' ? Math.round(basePrice * 0.2) : 0;
    return basePrice + platformFee - discount;
  };

  const handlePayment = () => {
    // Simulate payment processing
    setTimeout(() => {
      if (Math.random() > 0.1) { // 90% success rate
        setShowSuccess(true);
        // Auto-create appointment in cases
        setTimeout(() => {
          navigate('/cases');
        }, 3000);
      } else {
        setShowFailure(true);
      }
    }, 2000);
  };

  const StepIndicator = () => (
    <div className="flex items-center justify-center space-x-2 mb-6">
      {[1, 2, 3, 4].map((stepNum) => (
        <div key={stepNum} className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
            step >= stepNum ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
          }`}>
            {stepNum}
          </div>
          {stepNum < 4 && (
            <div className={`w-8 h-1 mx-2 ${
              step > stepNum ? 'bg-blue-600' : 'bg-gray-200'
            }`}></div>
          )}
        </div>
      ))}
    </div>
  );

  const Step1 = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Choose Consultation Mode</h2>
        <div className="space-y-3">
          {Object.entries(advocate.fees).map(([mode, details]) => (
            <button
              key={mode}
              onClick={() => setSelectedMode(mode)}
              className={`w-full p-4 rounded-xl border-2 text-left ${
                selectedMode === mode
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 bg-white'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    selectedMode === mode ? 'bg-blue-600' : 'bg-gray-100'
                  }`}>
                    <i className={`ri-${mode === 'chat' ? 'chat-1' : mode === 'call' ? 'phone' : 'video'}-line text-xl ${
                      selectedMode === mode ? 'text-white' : 'text-gray-600'
                    }`}></i>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 capitalize">{mode} Consultation</h3>
                    <p className="text-sm text-gray-500">{details.duration}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">₹{details.price}</p>
                  <p className="text-xs text-gray-500">per session</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={() => setStep(2)}
        disabled={!selectedMode}
        className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        Continue
      </button>
    </div>
  );

  const Step2 = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Select Date & Time</h2>
        
        {/* Date Selection */}
        <div className="mb-6">
          <h3 className="font-medium text-gray-900 mb-3">Choose Date</h3>
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 7 }, (_, i) => {
              const date = new Date();
              date.setDate(date.getDate() + i);
              const dateStr = date.toISOString().split('T')[0];
              return (
                <button
                  key={i}
                  onClick={() => setSelectedDate(dateStr)}
                  className={`p-3 rounded-lg text-center ${
                    selectedDate === dateStr
                      ? 'bg-blue-600 text-white'
                      : 'bg-white border border-gray-200 text-gray-700'
                  }`}
                >
                  <div className="text-xs">{date.toLocaleDateString('en', { weekday: 'short' })}</div>
                  <div className="font-medium">{date.getDate()}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Time Selection */}
        <div>
          <h3 className="font-medium text-gray-900 mb-3">Available Time Slots</h3>
          <div className="grid grid-cols-2 gap-3">
            {timeSlots.map((slot) => (
              <button
                key={slot}
                onClick={() => setSelectedSlot(slot)}
                className={`p-3 rounded-lg text-center ${
                  selectedSlot === slot
                    ? 'bg-blue-600 text-white'
                    : 'bg-white border border-gray-200 text-gray-700'
                }`}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex space-x-3">
        <button
          onClick={() => setStep(1)}
          className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-medium"
        >
          Back
        </button>
        <button
          onClick={() => setStep(3)}
          disabled={!selectedSlot}
          className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-medium disabled:bg-gray-300"
        >
          Continue
        </button>
      </div>
    </div>
  );

  const Step3 = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Case Details</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Case Type</label>
            <select
              value={caseType}
              onChange={(e) => setCaseType(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select case type</option>
              {caseTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Brief Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Briefly describe your legal issue..."
              rows={4}
              maxLength={500}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
            <p className="text-xs text-gray-500 mt-1">{description.length}/500 characters</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Upload Documents (Optional)</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <i className="ri-upload-cloud-line text-3xl text-gray-400 mb-2"></i>
              <p className="text-sm text-gray-500">Click to upload or drag and drop</p>
              <p className="text-xs text-gray-400">PDF, DOC, JPG up to 10MB</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex space-x-3">
        <button
          onClick={() => setStep(2)}
          className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-medium"
        >
          Back
        </button>
        <button
          onClick={() => setStep(4)}
          disabled={!caseType || !description.trim()}
          className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-medium disabled:bg-gray-300"
        >
          Continue
        </button>
      </div>
    </div>
  );

  const Step4 = () => {
    const basePrice = advocate.fees[selectedMode as keyof typeof advocate.fees].price;
    const platformFee = Math.round(basePrice * 0.2);
    const discount = promoCode === 'FIRST20' ? Math.round(basePrice * 0.2) : 0;
    const total = calculateTotal();

    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Payment Summary</h2>
          
          {/* Booking Summary */}
          <div className="bg-white rounded-xl p-4 border border-gray-200 mb-4">
            <div className="flex items-center space-x-3 mb-4">
              <img
                src={advocate.photo}
                alt={advocate.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold text-gray-900">{advocate.name}</h3>
                <p className="text-sm text-gray-500 capitalize">{selectedMode} Consultation</p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Date & Time:</span>
                <span className="text-gray-900">{new Date(selectedDate).toLocaleDateString()} at {selectedSlot}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Case Type:</span>
                <span className="text-gray-900">{caseType}</span>
              </div>
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="bg-white rounded-xl p-4 border border-gray-200 mb-4">
            <h3 className="font-semibold text-gray-900 mb-3">Price Breakdown</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Consultation Fee:</span>
                <span className="text-gray-900">₹{basePrice}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Platform Fee (20%):</span>
                <span className="text-gray-900">₹{platformFee}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount (FIRST20):</span>
                  <span>-₹{discount}</span>
                </div>
              )}
              <hr className="my-2" />
              <div className="flex justify-between font-semibold text-lg">
                <span>Total:</span>
                <span>₹{total}</span>
              </div>
            </div>
          </div>

          {/* Promo Code */}
          <div className="mb-4">
            <div className="flex space-x-2">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Enter promo code"
                className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button className="bg-blue-600 text-white px-4 py-3 rounded-lg font-medium">
                Apply
              </button>
            </div>
            {promoCode === 'FIRST20' && (
              <p className="text-green-600 text-sm mt-1">✓ 20% discount applied!</p>
            )}
          </div>

          {/* Payment Methods */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">Payment Method</h3>
            <div className="space-y-3">
              {['wallet', 'upi', 'card'].map((method) => (
                <button
                  key={method}
                  onClick={() => setPaymentMethod(method)}
                  className={`w-full p-4 rounded-lg border-2 text-left ${
                    paymentMethod === method
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 bg-white'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <i className={`ri-${method === 'wallet' ? 'wallet' : method === 'upi' ? 'smartphone' : 'bank-card'}-line text-xl text-gray-600`}></i>
                    <span className="font-medium text-gray-900 capitalize">
                      {method === 'upi' ? 'UPI' : method === 'wallet' ? 'Wallet (₹2,500)' : 'Credit/Debit Card'}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex space-x-3">
          <button
            onClick={() => setStep(3)}
            className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-medium"
          >
            Back
          </button>
          <button
            onClick={handlePayment}
            disabled={!paymentMethod}
            className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-medium disabled:bg-gray-300"
          >
            Pay ₹{total}
          </button>
        </div>
      </div>
    );
  };

  const SuccessModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <i className="ri-check-line text-3xl text-green-600"></i>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Booking Confirmed!</h3>
        <p className="text-gray-600 mb-4">
          Your consultation with {advocate.name} has been scheduled for {new Date(selectedDate).toLocaleDateString()} at {selectedSlot}.
        </p>
        <p className="text-sm text-gray-500 mb-6">
          You will receive a confirmation email and SMS shortly.
        </p>
        <button
          onClick={() => navigate('/cases')}
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium"
        >
          View My Cases
        </button>
      </div>
    </div>
  );

  const FailureModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <i className="ri-close-line text-3xl text-red-600"></i>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Payment Failed</h3>
        <p className="text-gray-600 mb-6">
          We couldn't process your payment. Please try again or use a different payment method.
        </p>
        <div className="flex space-x-3">
          <button
            onClick={() => setShowFailure(false)}
            className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-medium"
          >
            Try Again
          </button>
          <button
            onClick={() => navigate('/home')}
            className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-medium"
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNav title="Book Consultation" showBack={true} />

      <div className="pt-14 pb-20 px-4">
        <StepIndicator />

        {step === 1 && <Step1 />}
        {step === 2 && <Step2 />}
        {step === 3 && <Step3 />}
        {step === 4 && <Step4 />}
      </div>

      {showSuccess && <SuccessModal />}
      {showFailure && <FailureModal />}
      <BottomNav />
    </div>
  );
};

export default BookingPage;