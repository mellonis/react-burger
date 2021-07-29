import React from 'react';
import PropTypes from 'prop-types';
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

ModalOverlay.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
};

export { ModalOverlay };
