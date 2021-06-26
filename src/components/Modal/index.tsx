import React, {
  MutableRefObject,
  ReactNode,
  ReactPortal,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from './ModalOverlay';

import style from './style.module.css';

const Modal = ({
  children,
  className,
  onClose,
  title,
}: {
  children?: ReactNode | ReactPortal;
  className?: string;
  onClose: () => void;
  title?: string;
}) => {
  const modalElementRef = useRef(null);

  useEffect(() => {
    const {
      current: modalElement,
    } = modalElementRef as MutableRefObject<HTMLElement | null>;

    if (modalElement) {
      modalElement.focus();
    }
  }, []);

  const keyDownHandler = useCallback(
    ({ key }) => {
      if (key === 'Escape' && onClose) {
        onClose();
      }
    },
    [onClose]
  );

  return (
    <>
      <ModalOverlay className={style['modal__overlay']} onClick={onClose} />
      <div
        ref={modalElementRef}
        className={cs(style['modal'], 'p-10', className)}
        onKeyDown={keyDownHandler}
        tabIndex={0}
      >
        <div className={style['modal__header']}>
          <div
            className={cs(style['modal__title'], ' text text_type_main-large')}
          >
            {title}
          </div>
          <button className={style['modal__close-button']} onClick={onClose}>
            <CloseIcon type={'primary'} />
          </button>
        </div>
        <div className={style['modal__content']}>{children}</div>
      </div>
    </>
  );
};

Modal.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  className: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
};

export default Modal;
