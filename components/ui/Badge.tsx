import React from 'react';
import { BountyStatus, SubmissionStatus, DataType } from '../../types';
import { cn } from '../../lib/utils';

interface BadgeProps {
  status: BountyStatus | SubmissionStatus | string;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ status, className = '' }) => {
  let variant = 'bg-slate-100 text-slate-600 border-slate-200';

  switch (status) {
    case BountyStatus.OPEN:
    case SubmissionStatus.APPROVED:
    case 'Completed':
      variant = 'bg-emerald-50 text-emerald-600 border-emerald-100';
      break;
    case BountyStatus.FILLED:
    case BountyStatus.VALIDATING:
    case SubmissionStatus.VALIDATING:
    case 'Pending':
      variant = 'bg-amber-50 text-amber-600 border-amber-100';
      break;
    case BountyStatus.CLOSED:
    case SubmissionStatus.REJECTED:
      variant = 'bg-rose-50 text-rose-600 border-rose-100';
      break;
    case DataType.IMAGE:
    case DataType.TEXT:
    case DataType.HANDWRITING:
    case DataType.AUDIO:
      variant = 'bg-blue-50 text-blue-600 border-blue-100';
      break;
  }

  return (
    <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border shadow-sm", variant, className)}>
      {status}
    </span>
  );
};
