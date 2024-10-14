import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface IArrowProps {
  type: string;
}

function ArrowBack({ type }: IArrowProps) {
  const navigate = useNavigate();

  const goBack = () => {
    if (type === "home") {
      navigate("/home");
      return;
    }
    navigate(-1);
  };
  return (
    <button
      onClick={goBack}
      className="w-[8%] flex justify-center items-center border border-gray-300 hover:opacity-60 text-gray-600 py-2 rounded-3xl  print-hidden"
    >
      <ArrowLeft className=" md:w-6 md:h-5" />
      <span className="ml-1">뒤로가기</span>
    </button>
  );
}

export default ArrowBack;
