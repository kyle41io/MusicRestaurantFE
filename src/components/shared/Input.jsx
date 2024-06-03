'use client';

import { useEffect, useRef, useState } from 'react'

import IcError from '@/assets/icons/IcError';
import IcClose from '@/assets/icons/IcClose';
import IcOpen from '@/assets/icons/IcOpen';

import styles from '@/styles/shared/Input.module.css'

const Input = ({ value, type, placeholder, icon, setDataState, onBlur, isError, errorMessage }) => {
  const [internalType, setInternalType] = useState(type);
  const [eye, setEye] = useState('open');
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (isError) {
      setStatus('error')
    } else {
      setStatus('')
    }
  }, [isError])

  const handleChangeValue = (event) => {
    setDataState(event.target.value)
    setStatus('typing');
  }

  const handleToggleEye = () => {
    if (eye === 'open') {
      setEye('close');
      setInternalType('text');
    } else {
      setEye('open');
      setInternalType('password');
    }
  }

  const handleBlur = () => {
    if (isError) {
      setStatus('error')
    } else {
      setStatus('')
    }
    onBlur();
  }

  const configPadding = () => {
    if (type === 'password') {
      if (status === 'error') {
        return '!pr-16'
      }
      return '!pr-8'
    } else {
      return ''
    }
  }

  return (
    <div>
      <div className={styles['input-container']}>
        <div className={styles['icon']}>
          {icon}
        </div>
        <input type={internalType} id={`input-${placeholder}`} className={`${configPadding()} ${styles['input-1']} ${styles[status]}`} placeholder={placeholder} value={value} onChange={event => { handleChangeValue(event) }} onBlur={handleBlur} />
        <div className={styles['right-icons']}>
          {status === 'error' &&
            <IcError />
          }
          {type === 'password' && <div className={styles['right-icon']} onClick={handleToggleEye}>
            {eye === 'open' && <IcClose />}
            {eye === 'close' && <IcOpen />}
          </div>}
        </div>
      </div>
      {status === 'error' && <p className={styles['error-msg']}>{errorMessage}</p>}
    </div>

  )
}

export default Input