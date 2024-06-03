"use client";

import { useTranslations } from "next-intl";

import { useState, useRef, useEffect } from "react";

import { LIST_GENRE } from "@/constants/genre";

import { BiSolidChevronDown } from "react-icons/bi";
import { BiSolidChevronUp } from "react-icons/bi";

import "@/styles/upload/DropDown.css";

const Dropdown = ({ genre, setGenre, setInfoPlaylist }) => {
  const t = useTranslations("Upload");

  const inputRef = useRef(null);

  const [inputStyles, setInputStyles] = useState({
    outlineColor: "#f08c51",
    borderColor: "#CFD3D4",
  });
  const [labelStyles, setLabelStyles] = useState({
    color: "#CFD3D4",
  });
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleChangeGenre = (genre) => {
    setGenre(genre);
    setInfoPlaylist((prevInfoPlaylist) => ({
      ...prevInfoPlaylist,
      genre: genre,
    }));
    setInputStyles({
      ...inputStyles,
      border: "1px solid #474646b0",
    });
    setLabelStyles({
      ...labelStyles,
      color: "#474646b0",
    });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <label className="text-xs" style={labelStyles} htmlFor="text-input">
        {t("genre")}
      </label>
      <div
        ref={inputRef}
        id="genre"
        className="flex relative justify-between items-center h-7 px-1 mt-1 rounded border"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        onBlur={(e) => handleBlur(e.target.value)}
        style={inputStyles}
      >
        {genre}
        {dropdownOpen ? (
          <BiSolidChevronUp size={20} color="gray" />
        ) : (
          <BiSolidChevronDown size={20} color="gray" />
        )}

        {dropdownOpen && (
          <ul className="dropdown-list w-full h-24 absolute z-10 mt-32 -ml-1 bg-white border border-[#dcdcdc] rounded overflow-y-scroll">
            {LIST_GENRE.map((option) => (
              <li key={option} onClick={() => handleChangeGenre(option)}>
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
