export enum DataType {
  IMAGE = 'Image',
  TEXT = 'Text',
  HANDWRITING = 'Handwriting',
  AUDIO = 'Audio',
  CUSTOM = 'Custom',
}

export enum BountyStatus {
  OPEN = 'Open',
  FILLED = 'Filled',
  VALIDATING = 'Validating',
  CLOSED = 'Closed',
}

export enum SubmissionStatus {
  PENDING = 'Pending',
  VALIDATING = 'Validating',
  APPROVED = 'Approved',
  REJECTED = 'Rejected',
}

export interface Bounty {
  id: string;
  title: string;
  creatorWallet: string;
  dataType: DataType;
  requiredQuantity: number;
  acceptedQuantity: number;
  rewardPool: number; // in SOL
  rewardPerUnit: number;
  tags: string[];
  status: BountyStatus;
  deadline: string;
  validatorCount: number;
  description: string;
  validationRules: string[];
}

export interface Submission {
  id: string;
  bountyId: string;
  contributorWallet: string;
  quantity: number;
  timestamp: string;
  status: SubmissionStatus;
  dataHash: string; // mocked IPFS hash
  estimatedReward: number;
}

export interface ValidatorTask {
  id: string;
  submissionId: string;
  bountyId: string;
  dataPreview: string; // URL or text
  status: 'Pending' | 'Completed';
}

export interface UserProfile {
  walletAddress: string;
  balance: number;
  reputationScore: number;
  validationsCompleted: number;
  acceptanceRate: number;
  totalEarned: number;
}
