import { Bounty, BountyStatus, DataType, Submission, SubmissionStatus, UserProfile } from './types';

export const MOCK_USER: UserProfile = {
  walletAddress: '8x...3j92',
  balance: 142.5,
  reputationScore: 88,
  validationsCompleted: 1240,
  acceptanceRate: 94.2,
  totalEarned: 45.2,
};

export const MOCK_BOUNTIES: Bounty[] = [
  {
    id: 'b-101',
    title: 'Street Sign Classification (Night/Rain)',
    creatorWallet: '9z...k2la',
    dataType: DataType.IMAGE,
    requiredQuantity: 10000,
    acceptedQuantity: 4230,
    rewardPool: 50,
    rewardPerUnit: 0.005,
    tags: ['Autonomous Driving', 'Computer Vision'],
    status: BountyStatus.OPEN,
    deadline: '2023-12-31',
    validatorCount: 12,
    description: 'High-resolution images of street signs in low-light and rainy conditions. Must be 1080p minimum.',
    validationRules: [
      'Image must be clear despite rain',
      'Sign must occupy at least 10% of frame',
      'No motion blur on the sign text',
      'Resolution > 1920x1080'
    ]
  },
  {
    id: 'b-102',
    title: 'Medical Handwriting Transcription',
    creatorWallet: '3m...p9qq',
    dataType: DataType.HANDWRITING,
    requiredQuantity: 5000,
    acceptedQuantity: 4890,
    rewardPool: 120,
    rewardPerUnit: 0.024,
    tags: ['OCR', 'Healthcare'],
    status: BountyStatus.VALIDATING,
    deadline: '2023-11-15',
    validatorCount: 24,
    description: 'Transcribed doctor notes from provided anonymous scanned PDFs.',
    validationRules: [
      'Transcription must match image exactly',
      'Maintain original formatting',
      'Flag illegible words with [UNK]'
    ]
  },
  {
    id: 'b-103',
    title: 'Reinforcement Learning Human Feedback',
    creatorWallet: '7y...m2ns',
    dataType: DataType.TEXT,
    requiredQuantity: 20000,
    acceptedQuantity: 1200,
    rewardPool: 200,
    rewardPerUnit: 0.01,
    tags: ['RLHF', 'LLM'],
    status: BountyStatus.OPEN,
    deadline: '2024-02-28',
    validatorCount: 45,
    description: 'Rank 5 model outputs for helpfulness and safety.',
    validationRules: [
      'Justification required for ranking',
      'No automated scripts',
      'Minimum 2 mins per task'
    ]
  },
    {
    id: 'b-104',
    title: 'Retail Shelf Inventory (Beverages)',
    creatorWallet: '2x...j8kk',
    dataType: DataType.IMAGE,
    requiredQuantity: 2500,
    acceptedQuantity: 0,
    rewardPool: 15,
    rewardPerUnit: 0.006,
    tags: ['Retail', 'Object Detection'],
    status: BountyStatus.OPEN,
    deadline: '2024-01-20',
    validatorCount: 5,
    description: 'Photos of supermarket shelves focused on beverage section. Must be well-lit.',
    validationRules: [
      'Prices must be visible',
      'No blurred products',
      'Wide angle preferred'
    ]
  }
];

export const MOCK_EARNINGS_DATA = [
  { name: 'Oct 01', sol: 1.2 },
  { name: 'Oct 05', sol: 0.8 },
  { name: 'Oct 10', sol: 3.5 },
  { name: 'Oct 15', sol: 2.1 },
  { name: 'Oct 20', sol: 4.2 },
  { name: 'Oct 25', sol: 1.5 },
  { name: 'Oct 30', sol: 5.8 },
];

export const MOCK_SUBMISSIONS: Submission[] = [
  {
    id: 's-1',
    bountyId: 'b-101',
    contributorWallet: '8x...3j92',
    quantity: 50,
    timestamp: '2023-10-28T14:30:00Z',
    status: SubmissionStatus.APPROVED,
    dataHash: 'ipfs://QmHash...',
    estimatedReward: 0.25
  },
  {
    id: 's-2',
    bountyId: 'b-101',
    contributorWallet: '8x...3j92',
    quantity: 120,
    timestamp: '2023-10-29T09:15:00Z',
    status: SubmissionStatus.PENDING,
    dataHash: 'ipfs://QmHash2...',
    estimatedReward: 0.60
  }
];
