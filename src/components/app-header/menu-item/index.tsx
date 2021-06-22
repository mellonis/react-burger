import React from 'react';
import cs from 'classnames';
import { TIconProps } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/utils';
import style from './style.module.css';

type Icon_t = ({ type }: TIconProps) => JSX.Element;

const MenuItem = ({
  className,
  Icon,
  isActive = true,
  text,
}: {
  className?: string;
  Icon: Icon_t;
  isActive?: boolean;
  text: string;
}) => {
  return (
    <li
      className={cs(
        style['menu-item'],
        {
          [style['menu-item_active']]: isActive,
        },
        className,
        'p-5 text',
        {
          text_color_inactive: !isActive,
        }
      )}
    >
      <Icon type={isActive ? 'primary' : 'secondary'} />
      <span className="ml-2">{text}</span>
    </li>
  );
};

export default MenuItem;
