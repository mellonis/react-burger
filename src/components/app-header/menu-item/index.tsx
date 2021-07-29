import React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import { TIconProps } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/utils';
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
    >
      <Icon type={isActive ? 'primary' : 'secondary'} />
      <span className="ml-2">{text}</span>
    </li>
  );
};

MenuItem.propTypes = {
  className: PropTypes.string,
  Icon: PropTypes.elementType.isRequired,
  isActive: PropTypes.bool,
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired,
};

MenuItem.defaultProps = {
  isActive: true,
};

export { MenuItem };
