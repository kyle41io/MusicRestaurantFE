'use client'

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import useUpload from "@/hooks/useUpload";

import Input from "@/components/shared/Input";
import UploadImg from "./UploadImg";
import Link from "next/link";
import ToastMessage from "@/components/shared/ToastMessage";

import IcCard from "@/assets/icons/IcCard";
import IcPerson from "@/assets/icons/IcPerson";
import IcLock from "@/assets/icons/IcLock";
import IcKey from "@/assets/icons/IcKey";

import styles from "@/styles/auth/sign-up/SignUp.module.css";

function SignUp() {
  const t = useTranslations("Auth")
  const router = useRouter();

  const [displayName, setDisplayName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [img, setImg] = useState();
  const [isErrorDisplayName, setIsErrorDisplayName] = useState(false);
  const [isErrorUserName, setIsErrorUserName] = useState(false);
  const [isErrorPassword, setIsErrorPassword] = useState(false);
  const [isErrorRepeatPassword, setIsErrorRepeatPassword] = useState(false);
  const [displayToast, setDisplayToast] = useState(false);
  
  const isError = useMemo(() => {
    return isErrorDisplayName || isErrorUserName || isErrorPassword || isErrorRepeatPassword
      || !displayName || !userName || !password || !repeatPassword
  }, [displayName, userName, password, repeatPassword, isErrorDisplayName, isErrorUserName, isErrorPassword, isErrorRepeatPassword])

  const handleSend = async () => {
    const body = {
      name: displayName,
      username: userName,
      password: password,
      image: await useUpload(img),
    };

    let responsePlaceHolder = {};

    fetch("http://192.168.1.123:3000/api/auth/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        responsePlaceHolder = response;
        return response.json();
      })
      .then((data) => {
        if (responsePlaceHolder.status === 200 || responsePlaceHolder.status === 201) {
          setDisplayToast(true);
          setTimeout(() => {
            router.push('/auth/sign-in', {
              scroll: true
            })
            setDisplayToast(false);
          }, 3000);

        } else {
          console.log(data);
        }
      });
  };

  const handleBlurDisplayName = () => {
    if (!displayName.match(/^.{6,32}$/)) {
      setIsErrorDisplayName(true);
    } else {
      setIsErrorDisplayName(false);
    }
  }

  const handleBlurUsername = () => {
    if (!userName.match(/^.{5,32}$/)) {
      setIsErrorUserName(true);
    } else {
      setIsErrorUserName(false);
    }
  }

  const handleBlurPassword = () => {
    if (!password.match(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,32}$/)) {
      setIsErrorPassword(true);
    } else {
      setIsErrorPassword(false);
    }
  }

  const handleBlurRepeatPassword = () => {
    if (repeatPassword !== password) {
      setIsErrorRepeatPassword(true);
    } else {
      setIsErrorRepeatPassword(false);
    }
  }

  return (
    <div className={styles["main-session"]}>
      <ToastMessage
        onClose={() => setDisplayToast(false)}
        error={isError}
        errorMessage={"sign_up_fail"}
        successMessage={t('sign_up_success')}
        showToast={displayToast}
      />
      <div className={styles["signup-container"]}>
        <div className={styles["listener-svg"]}></div>
        <div className={styles["signup-box"]}>
          <p className={styles["title"]}>{t("sign_up")}</p>
          <div className={styles["inputs-field"]}>
            <Input
              value={displayName}
              type={"text"}
              placeholder={t("display_name")}
              icon={<IcCard />}
              setDataState={setDisplayName}
              onBlur={handleBlurDisplayName}
              isError={isErrorDisplayName}
              errorMessage={"Display name must have 6-32 characters"}
            />
            <Input
              value={userName}
              type={"text"}
              placeholder={t("username")}
              icon={<IcPerson />}
              setDataState={setUserName}
              onBlur={handleBlurUsername}
              isError={isErrorUserName}
              errorMessage={"Username must have 5-32 characters"}
            />
            <Input
              value={password}
              type={"password"}
              placeholder={t("password")}
              icon={<IcLock />}
              setDataState={setPassword}
              onBlur={handleBlurPassword}
              isError={isErrorPassword}
              errorMessage={"Password must have 1 uppercase, 1 special character, 1 number and 8-32 characters"}
            />
            <Input
              value={repeatPassword}
              type={"password"}
              placeholder={t("repeat_password")}
              icon={<IcKey />}
              setDataState={setRepeatPassword}
              onBlur={handleBlurRepeatPassword}
              isError={isErrorRepeatPassword}
              errorMessage={"Please make sure that you have correctly repeated your password!"}
            />
          </div>
          <div className={styles.remember}>
            <input type="checkbox" name="" id="" className={styles.checkbox} />
            <span>
              {t("i_accept")} <span className="link">{t("term_of_use")}</span>
            </span>
          </div>
          <UploadImg onChange={setImg}/>
          <button className="button-1" disabled={isError} onClick={handleSend}>
            {t("send")}
          </button>
          <span className={styles["linkSignUp"]}>
            {t("or")}
            <Link href={"/auth/sign-in"}>
              <span className="link">{t("sign_in")}</span>
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
