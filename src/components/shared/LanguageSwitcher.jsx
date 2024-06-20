"use client";
import { Link } from "next-intl/link";

export default function LanguageSwitcher() {
  return (
    <div>
      <Link href={"/"} locale="en">
        English
      </Link>
      <Link href={"/"} locale="vi">
        Tiếng Việt
      </Link>
    </div>
  );
}
