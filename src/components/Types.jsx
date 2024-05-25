import { useState, useRef, useEffect } from "react";
import { getConfigData } from "../data/configReader";

export default function Card() {
	const configData = getConfigData();
	const types = configData.types;

	const [expandedIndices, setExpandedIndices] = useState([]);
	const [openSubtypeIndex, setOpenSubtypeIndex] = useState(null);
	const [currentOpenType, setCurrentOpenType] = useState(null);
	const [openTypeExampleIndex, setOpenTypeExampleIndex] = useState(null);

	const refs = useRef([]);

	const handleToggleExpand = (index) => {
		if (expandedIndices.includes(index)) {
			setExpandedIndices(expandedIndices.filter((i) => i !== index));
			if (currentOpenType === index) {
				setCurrentOpenType(null);
				setOpenSubtypeIndex(null);
				setOpenTypeExampleIndex(null);
			}
		} else {
			setExpandedIndices([...expandedIndices, index]);
			setCurrentOpenType(index);
		}
	};

	const handleToggleSubtype = (subIndex) => {
		if (openSubtypeIndex === subIndex) {
			setOpenSubtypeIndex(null);
		} else {
			setOpenSubtypeIndex(subIndex);
		}
	};

	const handleToggleTypeExample = (typeIndex) => {
		if (openTypeExampleIndex === typeIndex) {
			setOpenTypeExampleIndex(null);
		} else {
			setOpenTypeExampleIndex(typeIndex);
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

	useEffect(() => {
		if (currentOpenType !== null) {
			const currentRef = refs.current[currentOpenType];
			if (currentRef) {
				setTimeout(() => {
					currentRef.style.maxHeight = `${currentRef.scrollHeight}px`;
				}, 150); // Ensure transition is smooth and faster
			}
		}
	}, [openSubtypeIndex, openTypeExampleIndex, currentOpenType]);

	const getSvgClass = (index) => {
		return expandedIndices.includes(index)
			? "w-6 h-6 text-gray-500 transition delay-100 transform rotate-180"
			: "w-6 h-6 text-gray-300 transition delay-100";
	};

	return (
		<div className="px-2">
			<div className="flex flex-col bg-gray-100 rounded-lg px-5 py-5 mb-2">
				<div className="flex items-center justify-between mb-3"></div>
				<div className="flex flex-col gap-y-8">
					{types.map((type, index) => (
						<div
							key={index}
							className="drop-shadow-md card bg-white rounded-lg px-5 py-3 gap-x-3 flex flex-col md:flex-none hover:-translate-y-1 hover:scale-100 duration-300 transition ease-in-out delay-100 hover:shadow-sm border border-gray-200 hover:border-gray-300"
						>
							<div
								className="flex items-center cursor-pointer"
								onClick={() => handleToggleExpand(index)}
							>
								<div className="rounded-full overflow-hidden items-center justify-center border hidden md:block">
									<div className="card-image w-16 h-16 rounded-full">
										<img
											className="w-full h-full object-cover"
											src={type["type-image-url"]}
											alt=""
										/>
									</div>
								</div>
								<div className="flex flex-col justify-center flex-grow md:pl-4">
									<h1 className="font-bold md:text-xl text-lg">
										{type["type-name"]}
									</h1>
								</div>
								<button className="ml-auto hidden md:inline-block">
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
								className="overflow-hidden transition-max-height duration-300 ease-in-out"
							>
								<div className="mt-5 md:m-3 text-gray-700 md:text-lg text-base md:leading-loose leading-loose">
									<p>
										<span className="font-semibold text-[#9d105e]">
											{type["type-name"]}
										</span>{" "}
										{type["type-definition"]}
									</p>
									<br />
									{type["type-markers"] && type["type-markers"].length > 0 && (
										<div className="mb-3">
											<p className="font-semibold text-[#9d105e]">
												Indikatori:
											</p>
											<ul className="list-disc list-inside marker:text-[#9d105e] md:indent-4">
												{type["type-markers"].map((marker, markerIndex) => (
													<li key={markerIndex}>{marker}</li>
												))}
											</ul>
										</div>
									)}
									{type["type-subtypes-intro"] &&
										type["type-subtypes-intro"].length > 0 && (
											<p>{type["type-subtypes-intro"]}</p>
										)}
									{type["type-subtypes"] &&
										type["type-subtypes"].length > 0 && (
											<ul className="list-disc list-inside mt-3 md:text-lg text-base">
												{type["type-subtypes"].map((subtype, subIndex) => (
													<li
														key={subIndex}
														className=" list-none leading-loose pb-8"
													>
														<div className="flex flex-col items-start w-full">
															<p>
																<span className="text-[#9d105e] font-semibold">
																	{subtype["subtype-name"]}
																</span>{" "}
																{subtype["subtype-description"]}
															</p>
															<button
																className="mt-3 text-center text-gray-600 font-normal bg-gray-100 hover:bg-gray-200 border border-gray-200 hover:border-gray-300 rounded-lg md:px-4 md:py-4 transition duration-200 ease-in-out w-full"
																onClick={() => handleToggleSubtype(subIndex)}
															>
																{openSubtypeIndex === subIndex &&
																subtype["subtype-image-url"] ? (
																	<div>
																		<img
																			src={subtype["subtype-image-url"]}
																			alt={subtype["subtype-name"]}
																			className="w-full h-auto rounded-lg"
																		/>
																		{subtype["subtype-image-description"] && (
																			<div className="m-2 md:pt-2 text-gray-600 text-sm text-start">
																				<p>
                                        {subtype["subtype-image-source-intro"]}
																					<a
																						href={subtype["subtype-image-source-url"]}
																						target="_blank"
																						rel="noreferrer"
																						className="underline text-blue-400"
																					>
																						{subtype["subtype-image-source"]}
																					</a>
																				</p>
                                        <p className="italic">{subtype["subtype-image-description"]}</p>
																			</div>
																		)}
																	</div>
																) : (
																	<p className="text-base">Skatīt piemēru</p>
																)}
															</button>
														</div>
													</li>
												))}
											</ul>
										)}
								</div>
								{type["type-example"] && (
									<div className="mt-5">
										<button
											className="mt-3 mb-8 text-center text-gray-600 font-normal bg-gray-100 hover:bg-gray-200 border border-gray-200 hover:border-gray-300 rounded-lg md:px-4 md:py-4 py-1 transition duration-200 ease-in-out w-full"
											onClick={() => handleToggleTypeExample(index)}
										>
											{openTypeExampleIndex === index ? (
												<div>
													<img
														src={type["type-example"]}
														alt={`${type["type-name"]} Example`}
														className="w-full h-auto rounded-lg"
													/>
													{type["type-example-description"] && (
														<div className="m-2 md:pt-2 text-gray-600 text-sm text-start">
                            <p>
                            {type["type-image-source-intro"]}
                              <a
                                href={type["type-image-source-url"]}
                                target="_blank"
                                rel="noreferrer"
                                className="underline text-blue-400"
                              >
                                {type["type-image-source"]}
                              </a>
                            </p>
                            <p className="italic">{type["type-example-description"]}</p>
                          </div>
													)}
												</div>
											) : (
												<p className="text-base">Skatīt piemēru</p>
											)}
										</button>
									</div>
								)}
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
