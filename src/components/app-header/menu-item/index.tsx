import React from 'react';
import cs from 'classnames';
import { TIconProps } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/utils';
import style from './style.module.css';

type EditIcon = ({ type }: TIconProps) => JSX.Element;

const MenuItem = ({
  className,
  Icon,
  isActive = true,
  text,
}: {
  className?: string;
  Icon: EditIcon;
  isActive?: boolean;
  text: string;
}) => {
  return (
    <li
      className={cs(style['menu-item'], className, 'p-5', {
        text_color_inactive: !isActive,
      })}
    >
      <Icon type={isActive ? 'primary' : 'secondary'} />
      <span className="ml-2">{text}</span>
    </li>
  );
};

export default MenuItem;
