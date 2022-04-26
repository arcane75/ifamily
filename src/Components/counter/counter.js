import React from 'react';
import { Plus, Minus } from '../../assets/icons/PlusMinus';
import { CounterBox, CounterButton, CounterValue } from './counter.style';

export const Counter = ({
  maxAllowed,
  onDecrement,
  onIncrement,
  value,
  variant,
  className,
}) => {
  return (
    <CounterBox variant={variant} className={className}>
      <CounterButton
        onClick={onDecrement}
        variant={variant}
        className='control-button'
      >
        <Minus />
      </CounterButton>
      <CounterValue>{value}</CounterValue>
      {maxAllowed > 0 && maxAllowed <= value ? (
        <CounterButton
          variant={variant}
          className='control-button'
        >
        </CounterButton>
      ) : (
          <CounterButton
            onClick={onIncrement}
            variant={variant}
            className='control-button'
          >
            <Plus />
          </CounterButton>
        )}

    </CounterBox>
  );
};
