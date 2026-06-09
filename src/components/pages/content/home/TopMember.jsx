import { useEffect, useState } from "react";
import { getUsers } from "@/api/apiUser";
import { useTranslations } from "next-intl";

import styles from "@/styles/content/home/TopMember.module.css";

function TopMember() {
  const t = useTranslations("Home");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await getUsers();
  
        const items = response.data;
        const details = items.map((item) => ({
          name: item.name,
          username: item.username,
          avatar: item.avatar,
        }));
  
        setUsers(details);
      } catch (error) {
        console.error("Error fetching users", error);
      }
    };
  
    fetchUserDetails();
  }, []);

  return (
    <div className={styles["top-member-container"]}>
      <p className={styles["title"]}>{t("top_member")}</p>
      <div className={styles["top-members"]}>
        {users.map((item, index) => (
          <div className={styles["top-member"]} key={index}>
            <img src={item.avatar} className={styles["avatar"]} />
            <div className={styles["artist-info"]}>
              <span className={styles["username"]}>{item.username}</span>
              <span className={styles["displayname"]}>
                {item.name}
              </span>
            </div>
            <div className={styles["total-views"]}>
              {/* <IcPlayWhite /> */}
              {/* <span className={styles["view-count"]}>
                {formatViews(item.totalViews)}
              </span> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopMember;
