import { ReactElement } from 'react';
import styles from './ApiCounter.module.scss';

type TApiCounterProps = {
  counter: number;
};

const ApiCounter = ({ counter }: TApiCounterProps): ReactElement => {
  return (
    <p className={styles.counter}>
      API requests this session:
      <span className={styles.counter__span}> {counter} </span>
    </p>
  );
};

export default ApiCounter;
