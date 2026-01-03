import React from 'react';
import { BountyStatus, SubmissionStatus } from '../../types';

interface BadgeProps {
  status: BountyStatus | SubmissionStatus | string;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ status, className = '' }) => {
  let variant = 'bg-slate-800 text-slate-300 border-slate-700';

  switch (status) {
    case BountyStatus.OPEN:
    case SubmissionStatus.APPROVED:
    case 'Completed':
      variant = 'bg-green-900/30 text-green-400 border-green-800';
      break;
    case BountyStatus.FILLED:
    case BountyStatus.VALIDATING:
    case SubmissionStatus.VALIDATING:
    case 'Pending':
      variant = 'bg-yellow-900/30 text-yellow-400 border-yellow-800';
      break;
    case BountyStatus.CLOSED:
    case SubmissionStatus.REJECTED:
      variant = 'bg-red-900/30 text-red-400 border-red-800';
      break;
    case DataType.IMAGE:
    case DataType.TEXT:
    case DataType.HANDWRITING:
    case DataType.AUDIO:
      variant = 'bg-blue-900/30 text-blue-400 border-blue-800';
      break;
  }

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${variant} ${className}`}>
      {status}
    </span>
  );
};

import { DataType } from '../../types';
