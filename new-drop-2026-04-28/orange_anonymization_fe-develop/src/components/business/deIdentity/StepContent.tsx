import type { FC } from 'react';
import Compliance from './Compliance';
import DataInput from './DataInput';
import Configuration from './Configuration';
import ReviewAndRun from './ReviewAndRun';

interface IProps {
  step: number;
  jobId: string;
}

export const StepContent: FC<IProps> = ({ step, jobId }) => {
  switch (step) {
    case 0:
      return <Compliance />;
    case 1:
      return <DataInput />;
    case 2:
      return <Configuration />;
    case 3:
      return <ReviewAndRun jobId={jobId} />;
    default:
      return null;
  }
};
