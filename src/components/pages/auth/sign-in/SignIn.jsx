'use client'

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

import Link from "next/link";
import Input from "@/components/shared/Input";
import ToastMessage from "@/components/shared/ToastMessage";

import IcPerson from "@/assets/icons/IcPerson";
import IcLock from "@/assets/icons/IcLock";

import styles from "@/styles/auth/sign-in/SignIn.module.css";

const SignIn = () => {
  const t = useTranslations("Auth");
  const router = useRouter();

  const [userName, setUserName] = useState('');
  const [passWord, setPassword] = useState('');
  const [displayToast, setDisplayToast] = useState(false);
  const [displayToast2, setDisplayToast2] = useState(false);
  const [isErrorUsername, setIsErrorUsername] = useState(false);
  const [isErrorPassword, setIsErrorPassword] = useState(false);
  const [responseData, setResponseData] = useState('')

  const isError = useMemo(() => isErrorUsername || isErrorPassword || !userName || !passWord, [userName, passWord, isErrorUsername, isErrorPassword])

  const handleSubmit = () => {
    const requestBody = {
      username: userName,
      password: passWord
    }

    let responseHolder = {};

    fetch('http://localhost:3000/api/auth', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then(response => {
        responseHolder = response;
        return response.json();
      })
      .then(data => {
        if (responseHolder.status === 200 || responseHolder.status === 201) {
          setDisplayToast(true)
          setTimeout(() => {
            router.push('/home', {
              scroll: true
            });
            setDisplayToast(false);
          }, 3000);
          localStorage.setItem('token', data.token);
          localStorage.setItem('id', data.userId)
        } else {
          setResponseData(data.message)
          setDisplayToast2(true)
          setTimeout(() => {
            setDisplayToast2(false)
          }, 3000);
        }
      })
  }

  const handleBlurUsername = () => {
    if (!userName.match(/^.{5,32}$/)) {
      setIsErrorUsername(true);
    } else {
      setIsErrorUsername(false);
    }
  }

  const handleBlurPassword = () => {
    const regex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,32}$/;
    if (!passWord.match(regex)) {
      setIsErrorPassword(true);
    } else {
      setIsErrorPassword(false);
    }
  }

  return (
    <div className={styles["main-session"]}>
      <ToastMessage
        onClose={() => setDisplayToast(false)}
        error={false}
        successMessage={t('login_success')}
        showToast={displayToast}
      />
      <ToastMessage
        onClose={() => setDisplayToast2(false)}
        error={true}
        errorMessage={responseData}
        showToast={displayToast2}
      />
      <div className={styles["signin-container"]}>
        <div className={styles["listener-svg"]}></div>
        <div className={styles["signin-box"]}>
          <p className={styles["title"]}>{t("sign_in")}</p>
          <div className={styles["inputs-field"]}>
            <Input value={userName} type={"text"} placeholder={t("username")} icon={<IcPerson />} setDataState={setUserName} onBlur={handleBlurUsername} isError={isErrorUsername} errorMessage={"Username must have 5-32 characters"} />
            <Input
              value={passWord}
              type={"password"}
              placeholder={t("password")}
              icon={<IcLock />}
              setDataState={setPassword}
              onBlur={handleBlurPassword}
              isError={isErrorPassword}
              errorMessage={"Password must contain 1 upper case, 1 special characters, 1 number and have length from 8 to 32 characters"}
            />
          </div>
          <div className={styles.remember}>
            <input type="checkbox" name="" id="" className={styles.checkbox} />
            <span>{t("remember_me")}</span>
          </div>
          <button className="button-1" onClick={handleSubmit} disabled={isError}>{t("submit")}</button>
          <span className={styles["linkSignUp"]}>
            {t("or")}
            <Link href={"/auth/sign-up"} scroll={true}>
              <span className="link">{t("sign_up")}</span>
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
