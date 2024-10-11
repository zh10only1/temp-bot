import Image from "next/image";
import parrotImg from "@/public/images/parrot.png";
import { Combobox } from "./ui/comboBox";
import { languages } from "@/constants";

interface BannerProps {
    selectedLanguage: string;
    setSelectedLanguage: React.Dispatch<React.SetStateAction<string>>;
}

const Banner:React.FC<BannerProps> = ({selectedLanguage, setSelectedLanguage}) => {
  return (
    <div className="w-full h-[14rem] bg-grayBlack flex flex-col justify-center items-center gap-7 sm:rounded-t-xl">
      <div className="flex flex-row items-center gap-4">
        <Image src={parrotImg} alt="parrot" />
        <div>
          <h1 className="font-bold text-grSkin3 text-3xl">PollyGlot</h1>
          <h3 className="text-md text-white font-bold">
            Perfect Translation Every Time!
          </h3>
        </div>
      </div>
      <Combobox
        items={languages}
        placeholder="Select language..."
        value={selectedLanguage}
        setValue={setSelectedLanguage}
      />
    </div>
  );
};

export default Banner;
