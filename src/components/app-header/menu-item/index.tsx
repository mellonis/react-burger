import { TIconProps } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/utils';
import cs from 'classnames';
import React from 'react';
import style from './style.module.css';

type Icon_t = ({ type }: TIconProps) => JSX.Element;

const MenuItem = ({
  className,
  Icon,
  isActive,
  onClick,
  text,
}: {
  className?: string;
  Icon: Icon_t;
  isActive?: boolean;
  onClick?: (...a: any[]) => void;
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
      onClick={onClick}
      role="button"
    >
      <Icon type={isActive ? 'primary' : 'secondary'} />
      <span className="ml-2">{text}</span>
    </li>
  );
};

MenuItem.defaultProps = {
  isActive: true,
};

export { MenuItem };
