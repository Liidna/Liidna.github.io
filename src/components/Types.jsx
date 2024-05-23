import { useState, useRef, useEffect } from "react";
import { getConfigData } from "../data/configReader";

export default function Card() {
	const configData = getConfigData();
	const types = configData.types;

	const [setIsHovered] = useState(false);
	const [expandedIndices, setExpandedIndices] = useState([]);

	const refs = useRef([]);

	const handleMouseEnter = () => {
		setIsHovered(true);
	};

	const handleMouseLeave = () => {
		setIsHovered(false);
	};

	const handleToggleExpand = (index) => {
		if (expandedIndices.includes(index)) {
			setExpandedIndices(expandedIndices.filter((i) => i !== index));
		} else {
			setExpandedIndices([...expandedIndices, index]);
		}
	};

	useEffect(() => {
		refs.current.forEach((ref, index) => {
			if (ref) {
				ref.style.maxHeight = expandedIndices.includes(index)
					? `${ref.scrollHeight}px`
					: "0px";
			}
		});
	}, [expandedIndices]);

	const getSvgClass = (index) => {
		return expandedIndices.includes(index)
			? "w-6 h-6 text-gray-500 transition delay-150 transform rotate-180"
			: "w-6 h-6 text-gray-300 transition delay-150";
	};

	return (
		<div className="px-2">
			<div className="flex flex-col bg-gray-100 rounded-lg px-5 py-5 mb-2">
				<div className="flex items-center justify-between mb-3"></div>
				<div className="flex flex-col gap-y-8">
					{types.map((type, index) => (
						<div
							key={index}
							className="drop-shadow-md card bg-white rounded-lg px-5 py-3 gap-x-3 flex flex-col md:flex-none hover:-translate-y-1 hover:scale-100 duration-300 transition ease-in-out delay-150 hover:shadow-sm border border-gray-200 hover:border-gray-300"
						>
							<div
								className="flex items-center cursor-pointer"
								onMouseEnter={handleMouseEnter}
								onMouseLeave={handleMouseLeave}
								onClick={() => handleToggleExpand(index)}
							>
								<div className="rounded-full overflow-hidden flex items-center justify-center border hidden md:block">
									<div className="card-image w-16 h-16 rounded-full">
										<img
											className="w-full h-full object-cover"
											src={type["type-image-url"]}
											alt=""
										/>
									</div>
								</div>
								<div className="flex flex-col justify-center flex-grow pl-4">
									<h1 className="font-semibold text-xl">{type["type-name"]}</h1>
								</div>
								<button
									className="ml-auto hidden md:inline-block"
								>
									<svg
										className={getSvgClass(index)}
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth="2"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M19.5 8.25l-7.5 7.5-7.5-7.5"
										/>
									</svg>
								</button>
							</div>
							<div
								ref={(el) => (refs.current[index] = el)}
								className="overflow-hidden transition-max-height duration-500 ease-in-out delay-150"
							>
								<div className="mt-7 m-3 text-gray-700 text-lg leading-loose">
									<p>
										<span className="font-semibold text-[#9d105e]">
											{type["type-name"]}
										</span>{" "}
										{type["type-definition"]}
									</p>
									<br />
									
									{type["type-subtypes"] &&
										type["type-subtypes"].length > 0 && (
											<div>
												<p>{type["type-name"]} ietver sekojošus veidus:</p>
											<ul className="list-disc list-inside mt-3">
												{type["type-subtypes"].map((subtype, subIndex) => (
													<li
														key={subIndex}
														className="indent-8 marker:text-[#9d105e]"
													>
														{subtype}
													</li>
												))}
											</ul>
											</div>
										)}
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
