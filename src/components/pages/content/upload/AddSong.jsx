import Image from "next/image";

import SearchImage from "@/assets/images/search.png";
import SearchIcon from "@/assets/icons/SearchIcon";

const AddSong = ({ setCurrentStep, setShowToast, setError, t }) => {
  return (
    <div
      className={`flex flex-col justify-center items-center h-[364px] w-[645px] p-6 gap-6 rounded-md border border-[#DCDCDC] shadow-[0px_0px_8px_0px_rgba(51,51,51,0.10)]`}
    >
      <div className="w-full relative">
        <input
          className="w-full h-11 rounded-md pl-4 pr-14 py-2 border border-[#DCDCDC]"
          placeholder={t("search_song_placeholder")}
        />
        <button
          className="absolute flex justify-center items-center rounded-md right-5 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer w-7 h-7 z-0 opacity-50"
          onClick={""}
        >
          <SearchIcon />
        </button>
      </div>
      <Image src={SearchImage} alt="" width={200} height={200} />

      <div className="w-full flex justify-end text-sm gap-2">
        <button
          className="px-3 py-1 rounded hover:bg-slate-300"
          onClick={() => setCurrentStep(1)}
        >
          {t("back")}
        </button>
        <button
          className="px-3 py-1 bg-primary hover:bg-orange-700 rounded p-2 text-white"
          onClick={() => setCurrentStep(3)}
        >
          {t("save")}
        </button>
      </div>
    </div>
  );
};

export default AddSong;
