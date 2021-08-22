import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import cs from 'classnames';
import React, { FC } from 'react';
import style from './style.module.css';

const Amount: FC<{
  amount: number;
  className?: string;
  isTotal?: boolean;
}> = ({ amount, className, isTotal }) => (
  <div
    className={cs(
      style['amount'],
      'text',
      {
        [style['amount_type_total']]: isTotal,
        'text_type_digits-default': !isTotal,
        'text_type_digits-medium': isTotal,
      },
      className
    )}
  >
    <div className={style['amount__amount']}>{amount}</div>
    <div className={style['amount__currency-wrapper']}>
      <CurrencyIcon type={'primary'} />
    </div>
  </div>
);

export { Amount };
