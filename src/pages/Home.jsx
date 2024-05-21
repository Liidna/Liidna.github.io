import Projects from "../components/Projects";
import { getConfigData } from "../data/configReader";

import { FaAngleDown } from "react-icons/fa6";

export default function Home() {
	const configData = getConfigData();

	return (
		<>
			<div className="text-gray-800">
				<div >
					<div className="flex items-center justify-center py-8 gap-x-3">
						<div className="w-4 h-2 bg-[#9d105e] rounded-full"></div>
						<h1 className="text-4xl font-bold"> Maldinošs Dizains</h1>
            <div className="w-4 h-2 bg-[#9d105e] rounded-full"></div>
					</div>
				</div>

				<div className="text-xl px-7 py-5 flex flex-col text-md font-normal leading-loose">
					<p>{configData.deceptiveDesignIntro}</p>
					<br />
					<p>{configData.deceptiveDesignIntro2}</p>
					<br />
					<div className="flex flex-col items-center justify-center py-32 text-gray-300">
						<a href="#types" className=" hover:text-gray-900">
							<FaAngleDown href="#types" size={50} />
						</a>
					</div>
					<br />
				</div>
			</div>

			<div>
				<a id="types">
					<div className="flex flex-col items-center justify-center py-8">
						<h2 className="text-2xl font-semibold"> Maldinoša dizaina veidi</h2>
					</div>
				</a>
				<Projects />
			</div>
		</>
	);
}
