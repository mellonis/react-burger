import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import cs from 'classnames';
import React, {
  FC,
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import { ModalOverlay } from './modal-overlay';
import style from './style.module.css';

const Modal: FC<{
  className?: string;
  onClose: () => void;
  title?: string;
}> = ({ children, className, onClose, title }) => {
  const modalElementRef = useRef(null);

  useEffect(() => {
    const { current: modalElement } =
      modalElementRef as MutableRefObject<HTMLElement | null>;

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
        <div className={cs(style['modal__content'], 'custom-scroll')}>
          {children}
        </div>
      </div>
    </>
  );
};

export { Modal };
