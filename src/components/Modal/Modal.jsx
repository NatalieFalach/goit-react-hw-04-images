import PropTypes from 'prop-types';
import styles from './Modal.module.css';
import { useEffect } from 'react';

export function Modal({onClose, children}) {
 
  const hanleOverlayClick = e => {
    if (e.currentTarget === e.target) { // проверка что мы кликнули именно на оверлей
     onClose()
    }
  }

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      return window.removeEventListener('keydown', handleKeyDown)
    }  
  }, [onClose]);

  return (
     <div className={styles.Overlay} onClick={hanleOverlayClick}>
        <div className={styles.Modal}>{children}</div>
    </div>
  )
}


 Modal.propTypes = {
    onClose:PropTypes.func.isRequired
  };

