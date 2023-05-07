import { FC } from 'react';
import Loader from './components/Loader';

interface loadingProps {}

const loading: FC<loadingProps> = ({}) => {
  return <Loader />;
};

export default loading;
