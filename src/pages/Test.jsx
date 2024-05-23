import { getConfigData } from "../data/configReader";

import { FaPlay } from "react-icons/fa6";

export default function Test() {
	const configData = getConfigData();

	return (
		<>
			<div className="text-gray-800">
				<div className="flex items-center justify-center py-8 gap-x-3">
					<div className="w-2 h-2 bg-[#9d105e] rounded-full"></div>
					<h1 className="text-4xl font-bold">Zināšanu pārbaude</h1>
					<div className="w-2 h-2 bg-[#9d105e] rounded-full"></div>
				</div>

				<div className="text-xl px-7 py-5 flex flex-col leading-loose items-center justify-center">
					<div className="text-center pb-3">
						<p>{configData.testIntro}</p>
					</div>

					<div>
						<img src={configData.testImage} alt="" className="max-w-sm" />
					</div>
					<div className="pt-6 pb-6">
						<button className="flex items-center gap-x-4 pr-6 pl-6 transition bg-gradient-to-br from-[#9d105e]/80 to-[#9d105e] hover:bg-[#9d105e] text-white font-bold py-2 px-4 rounded-full group">
							<p>Sākt</p>
							<FaPlay className="text-sm group-hover:pl-1 transtition duration-150" />
						</button>
					</div>
				</div>
			</div>
		</>
	);
}
