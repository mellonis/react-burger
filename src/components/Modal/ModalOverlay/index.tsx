import React from 'react';
import cs from 'classnames';

import style from './style.module.css';

const ModalOverlay = ({
  className,
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) => (
  <div
    className={cs(
      style['modal-overlay'],
      {
        [`${style['modal-overlay_interactive']}`]: onClick,
      },
      className
    )}
    onClick={onClick}
  />
);

export default ModalOverlay;
