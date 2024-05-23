import Types from "../components/Types";
import { getConfigData } from "../data/configReader";

import { FaAngleDown } from "react-icons/fa6";

export default function Home() {
	const configData = getConfigData();

	return (
		<>
			<div className="text-gray-800">
				<div className="flex items-center justify-center py-8 gap-x-3">
					<div className="w-4 h-2 bg-[#9d105e] rounded-full"></div>
					<h1 className="text-4xl font-bold "> Maldinošs Dizains</h1>
					<div className="w-4 h-2 bg-[#9d105e] rounded-full"></div>
				</div>
				<div>
					<img
						src="https://i.postimg.cc/wBC7RJQt/deceptive-Design-Bg.png"
						alt=""
					/>
				</div>
				<div className="text-xl px-7 py-10 flex flex-col text-md font-normal leading-loose indent-7">
					<p>{configData.deceptiveDesignIntro}</p>
					<br />
					<p>{configData.deceptiveDesignIntro2}</p>
					<br />
					<div className="flex flex-col items-center justify-center py-32 text-gray-300">
						<a href="#types" className=" hover:text-[#9d105e] transition">
							<FaAngleDown size={50} />
						</a>
					</div>

					<br />
				</div>
				<br />
			</div>
			<br id="types" />
			<br />
			<br />
			<div>
				<a>
					<div className="flex items-center justify-center py-8 gap-x-3">
						<div className="w-2 h-2 bg-[#9d105e] rounded-full"></div>
						<h2 className="text-3xl font-semibold"> Maldinoša Dizaina veidi</h2>
						<div className="w-2 h-2 bg-[#9d105e] rounded-full"></div>
					</div>
				</a>
				<Types />
			</div>
		</>
	);
}
