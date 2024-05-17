import Projects from "../components/Projects";
import { getConfigData } from "../data/configReader";

import { FaAngleDown } from "react-icons/fa6";

export default function Home() {
	const configData = getConfigData();

	return (
		<>
    <div className="text-gray-800">
			<div className="flex flex-col items-center justify-center py-8">
				<h1 className="text-3xl font-bold">
					{" "}
					Maldinošs Dizains
				</h1>
			</div>
			<div className="text-xl px-7 py-5 flex flex-col text-md font-normal leading-loose">
				<p>{configData.deceptiveDesignIntro}</p>
				<br />
				<p>{configData.deceptiveDesignIntro2}</p>

				<div className="flex flex-col items-center justify-center py-8 text-gray-300">
					<FaAngleDown size={50}/>
				</div>
			</div>
      </div>
			<Projects />
		</>
	);
}
