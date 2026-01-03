import React from 'react';
import { BountyStatus, SubmissionStatus, DataType } from '../../types';
import { cn } from '../../lib/utils';

interface BadgeProps {
  status: BountyStatus | SubmissionStatus | string;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ status, className = '' }) => {
  let variant = 'bg-slate-100 text-slate-600 border-slate-200 dark:bg-zinc-800 dark:text-slate-300 dark:border-zinc-700';

  switch (status) {
    case BountyStatus.OPEN:
    case SubmissionStatus.APPROVED:
    case 'Completed':
      // Green -> Monochrome Green/Grayish (Desaturated) or just bold white/black
      // Staying sleek: Dark mode -> High contrast border
      variant = 'bg-slate-100 text-slate-900 border-slate-300 dark:bg-zinc-900 dark:text-white dark:border-slate-500';
      break;
    case BountyStatus.FILLED:
    case BountyStatus.VALIDATING:
    case SubmissionStatus.VALIDATING:
    case 'Pending':
      variant = 'bg-slate-50 text-slate-500 border-slate-200 border-dashed dark:bg-zinc-900 dark:text-zinc-400 dark:border-zinc-700';
      break;
    case BountyStatus.CLOSED:
    case SubmissionStatus.REJECTED:
      variant = 'bg-black text-white border-black dark:bg-white dark:text-black dark:border-white';
      break;
    case DataType.IMAGE:
    case DataType.TEXT:
    case DataType.HANDWRITING:
    case DataType.AUDIO:
      variant = 'glass backdrop-blur-md text-slate-700 border-slate-200 dark:text-slate-200 dark:border-slate-700';
      break;
  }

  return (
    <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border shadow-sm", variant, className)}>
      {status}
    </span>
  );
};