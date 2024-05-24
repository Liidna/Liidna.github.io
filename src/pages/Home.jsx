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
					<h1 className="text-2xl md:text-4xl font-bold "> Maldinošs Dizains</h1>
					<div className="w-4 h-2 bg-[#9d105e] rounded-full"></div>
				</div>
				<div>
					<img
						src="https://i.postimg.cc/wBC7RJQt/deceptive-Design-Bg.png"
						alt=""
					/>
				</div>
				<div className="text-base md:text-xl px-7 pt-10 flex flex-col font-normal md:leading-loose leading-loose indent-7">
					<p>{configData.deceptiveDesignIntro}</p>
					<br />
					<p>{configData.deceptiveDesignIntro2}</p>
					<div className="flex flex-col items-center justify-center invisible md:visible md:pt-20 text-gray-300">
						<a href="#types" className=" hover:text-[#9d105e] transition">
							<FaAngleDown size={40} />
						</a>
					</div>
				</div>
			</div>
			<br id="types" />
			<br />
			<br />
			<div>
				<a>
					<div className="flex items-center justify-center py-8 gap-x-3">
						<div className="w-2 h-2 bg-[#9d105e] rounded-full"></div>
						<h2 className="text-2xl md:text-4xl font-bold"> Maldinoša Dizaina veidi</h2>
						<div className="w-2 h-2 bg-[#9d105e] rounded-full"></div>
					</div>
				</a>
				<Types />
			</div>
		</>
	);
}
