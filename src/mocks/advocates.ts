export const advocates = [
  {
    id: '1',
    name: 'Adv. Rajesh Kumar',
    photo: 'https://readdy.ai/api/search-image?query=Professional%20Indian%20male%20lawyer%20in%20formal%20suit%2C%20confident%20expression%2C%20law%20office%20background%2C%20professional%20headshot%20photography%2C%20high%20quality%20portrait&width=120&height=120&seq=adv1&orientation=squarish',
    verified: true,
    premium: true,
    court: 'Delhi High Court',
    specializations: ['Criminal Law', 'Corporate Law'],
    languages: ['Hindi', 'English'],
    experience: 15,
    rating: 4.8,
    reviewCount: 127,
    fees: {
      chat: { price: 299, duration: '30 min' },
      call: { price: 499, duration: '30 min' },
      video: { price: 799, duration: '30 min' }
    },
    nextAvailable: '2024-01-15T10:00:00Z',
    description: 'Experienced criminal and corporate lawyer with 15+ years of practice in Delhi High Court.'
  },
  {
    id: '2',
    name: 'Adv. Priya Sharma',
    photo: 'https://readdy.ai/api/search-image?query=Professional%20Indian%20female%20lawyer%20in%20formal%20blazer%2C%20confident%20smile%2C%20law%20books%20background%2C%20professional%20headshot%20photography%2C%20high%20quality%20portrait&width=120&height=120&seq=adv2&orientation=squarish',
    verified: true,
    premium: false,
    court: 'Mumbai Sessions Court',
    specializations: ['Family Law', 'Property Law'],
    languages: ['Hindi', 'English', 'Marathi'],
    experience: 12,
    rating: 4.6,
    reviewCount: 89,
    fees: {
      chat: { price: 199, duration: '30 min' },
      call: { price: 399, duration: '30 min' },
      video: { price: 599, duration: '30 min' }
    },
    nextAvailable: '2024-01-15T14:00:00Z',
    description: 'Specialist in family and property disputes with extensive experience in Mumbai courts.'
  },
  {
    id: '3',
    name: 'Adv. Suresh Patel',
    photo: 'https://readdy.ai/api/search-image?query=Professional%20Indian%20male%20lawyer%20with%20glasses%2C%20formal%20suit%2C%20law%20library%20background%2C%20professional%20headshot%20photography%2C%20high%20quality%20portrait&width=120&height=120&seq=adv3&orientation=squarish',
    verified: true,
    premium: true,
    court: 'Gujarat High Court',
    specializations: ['Corporate Law', 'Tax Law'],
    languages: ['Gujarati', 'Hindi', 'English'],
    experience: 18,
    rating: 4.9,
    reviewCount: 156,
    fees: {
      chat: { price: 399, duration: '30 min' },
      call: { price: 699, duration: '30 min' },
      video: { price: 999, duration: '30 min' }
    },
    nextAvailable: '2024-01-16T09:00:00Z',
    description: 'Senior corporate and tax law expert with 18+ years of experience in Gujarat High Court.'
  },
  {
    id: '4',
    name: 'Adv. Meera Reddy',
    photo: 'https://readdy.ai/api/search-image?query=Professional%20Indian%20female%20lawyer%20in%20black%20blazer%2C%20confident%20pose%2C%20courthouse%20background%2C%20professional%20headshot%20photography%2C%20high%20quality%20portrait&width=120&height=120&seq=adv4&orientation=squarish',
    verified: true,
    premium: false,
    court: 'Hyderabad District Court',
    specializations: ['Criminal Law', 'Consumer Law'],
    languages: ['Telugu', 'Hindi', 'English'],
    experience: 10,
    rating: 4.5,
    reviewCount: 73,
    fees: {
      chat: { price: 249, duration: '30 min' },
      call: { price: 449, duration: '30 min' },
      video: { price: 649, duration: '30 min' }
    },
    nextAvailable: '2024-01-15T16:00:00Z',
    description: 'Criminal and consumer law specialist with strong track record in Hyderabad courts.'
  },
  {
    id: '5',
    name: 'Adv. Vikram Singh',
    photo: 'https://readdy.ai/api/search-image?query=Professional%20Indian%20male%20lawyer%20with%20beard%2C%20formal%20suit%2C%20law%20office%20background%2C%20professional%20headshot%20photography%2C%20high%20quality%20portrait&width=120&height=120&seq=adv5&orientation=squarish',
    verified: true,
    premium: true,
    court: 'Punjab & Haryana High Court',
    specializations: ['Property Law', 'Civil Law'],
    languages: ['Punjabi', 'Hindi', 'English'],
    experience: 14,
    rating: 4.7,
    reviewCount: 98,
    fees: {
      chat: { price: 349, duration: '30 min' },
      call: { price: 549, duration: '30 min' },
      video: { price: 749, duration: '30 min' }
    },
    nextAvailable: '2024-01-16T11:00:00Z',
    description: 'Property and civil law expert with 14+ years of experience in Punjab & Haryana High Court.'
  }
];

export const legalNews = [
  {
    id: '1',
    title: 'Supreme Court Rules on Digital Evidence Admissibility',
    summary: 'New guidelines for digital evidence in criminal proceedings',
    date: '2024-01-14',
    category: 'Criminal Law'
  },
  {
    id: '2',
    title: 'Property Registration Process Digitized in 5 States',
    summary: 'Online property registration now available across major states',
    date: '2024-01-13',
    category: 'Property Law'
  },
  {
    id: '3',
    title: 'New Consumer Protection Guidelines Released',
    summary: 'Enhanced protection for online purchases and services',
    date: '2024-01-12',
    category: 'Consumer Law'
  }
];

export const cases = [
  {
    id: 'DL/2024/CR/001234',
    title: 'Property Dispute - Sector 15',
    court: 'Delhi District Court',
    parties: ['Rajesh Kumar', 'Sunita Devi'],
    status: 'Hearing Scheduled',
    nextHearing: '2024-01-20T10:30:00Z',
    lastUpdate: '2024-01-10',
    advocate: 'Adv. Rajesh Kumar',
    summonsStatus: 'Served',
    orders: [
      {
        date: '2024-01-10',
        title: 'Notice to Defendant',
        description: 'Court notice served to defendant for appearance'
      },
      {
        date: '2024-01-05',
        title: 'Case Filed',
        description: 'Property dispute case filed and registered'
      }
    ]
  },
  {
    id: 'MH/2024/FAM/005678',
    title: 'Divorce Proceedings',
    court: 'Mumbai Family Court',
    parties: ['Amit Sharma', 'Neha Sharma'],
    status: 'Under Review',
    nextHearing: '2024-01-25T14:00:00Z',
    lastUpdate: '2024-01-12',
    advocate: 'Adv. Priya Sharma',
    summonsStatus: 'Pending',
    orders: [
      {
        date: '2024-01-12',
        title: 'Mediation Ordered',
        description: 'Court ordered mediation before next hearing'
      },
      {
        date: '2024-01-08',
        title: 'Response Filed',
        description: 'Defendant response filed to divorce petition'
      }
    ]
  },
  {
    id: 'GJ/2024/CIV/009876',
    title: 'Contract Breach Case',
    court: 'Gujarat High Court',
    parties: ['ABC Corp Ltd', 'XYZ Industries'],
    status: 'Evidence Stage',
    nextHearing: '2024-02-01T11:00:00Z',
    lastUpdate: '2024-01-14',
    advocate: 'Adv. Suresh Patel',
    summonsStatus: 'Served',
    orders: [
      {
        date: '2024-01-14',
        title: 'Evidence Submission',
        description: 'Plaintiff submitted documentary evidence'
      },
      {
        date: '2024-01-10',
        title: 'Pleadings Complete',
        description: 'All pleadings filed and case ready for evidence'
      }
    ]
  }
];

export const notifications = [
  {
    id: '1',
    type: 'booking_confirmed',
    title: 'Consultation Confirmed',
    message: 'Your consultation with Adv. Rajesh Kumar is confirmed for Jan 15, 10:00 AM',
    time: '2024-01-14T15:30:00Z',
    read: false,
    actionType: 'consultation',
    actionId: 'cons_001'
  },
  {
    id: '2',
    type: 'hearing_reminder',
    title: 'Hearing Reminder',
    message: 'Your case hearing is scheduled for tomorrow at 10:30 AM',
    time: '2024-01-14T10:00:00Z',
    read: false,
    actionType: 'case',
    actionId: 'DL/2024/CR/001234'
  },
  {
    id: '3',
    type: 'new_message',
    title: 'New Message',
    message: 'Adv. Priya Sharma sent you a message about your case',
    time: '2024-01-14T09:15:00Z',
    read: true,
    actionType: 'chat',
    actionId: 'chat_002'
  },
  {
    id: '4',
    type: 'hearing_reminder',
    title: 'Hearing in 2 Hours',
    message: 'Your case hearing starts in 2 hours. Please be prepared.',
    time: '2024-01-14T08:30:00Z',
    read: true,
    actionType: 'case',
    actionId: 'MH/2024/FAM/005678'
  },
  {
    id: '5',
    type: 'platform_update',
    title: 'New Feature Available',
    message: 'Case tracking is now available. Track your cases in real-time.',
    time: '2024-01-13T16:00:00Z',
    read: true,
    actionType: 'feature',
    actionId: 'case_tracking'
  },
  {
    id: '6',
    type: 'payment_success',
    title: 'Payment Successful',
    message: 'Your consultation fee of ₹799 has been processed successfully',
    time: '2024-01-13T14:20:00Z',
    read: true,
    actionType: 'payment',
    actionId: 'pay_003'
  }
];

export const savedAdvocates = [
  advocates[0],
  advocates[2],
  advocates[4]
];

export const consultationHistory = [
  {
    id: 'cons_001',
    advocateId: '1',
    advocateName: 'Adv. Rajesh Kumar',
    date: '2024-01-10T15:00:00Z',
    duration: 30,
    mode: 'video',
    fee: 799,
    status: 'completed',
    rating: 5,
    review: 'Excellent consultation. Very helpful and knowledgeable.'
  },
  {
    id: 'cons_002',
    advocateId: '2',
    advocateName: 'Adv. Priya Sharma',
    date: '2024-01-08T10:30:00Z',
    duration: 30,
    mode: 'call',
    fee: 399,
    status: 'completed',
    rating: 4,
    review: 'Good advice on family law matters.'
  }
];

export const reviews = [
  {
    id: '1',
    advocateId: '1',
    clientName: 'Amit K.',
    rating: 5,
    review: 'Excellent lawyer with deep knowledge of criminal law. Helped me understand my case clearly.',
    date: '2024-01-12T14:30:00Z',
    verified: true
  },
  {
    id: '2',
    advocateId: '1',
    clientName: 'Priya S.',
    rating: 5,
    review: 'Very professional and responsive. Highly recommended for corporate legal matters.',
    date: '2024-01-10T09:15:00Z',
    verified: true
  },
  {
    id: '3',
    advocateId: '1',
    clientName: 'Rahul M.',
    rating: 4,
    review: 'Good consultation. Provided clear guidance on legal procedures.',
    date: '2024-01-08T16:45:00Z',
    verified: true
  }
];