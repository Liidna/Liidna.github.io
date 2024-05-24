/* eslint-disable no-mixed-spaces-and-tabs */
import { useState, useEffect } from "react";
import { getConfigData } from "../data/configReader";
import {
	FaPlay,
	FaCircleChevronRight,
	FaCircleChevronLeft,
	FaArrowRotateLeft,
} from "react-icons/fa6";
import { GoCheckCircleFill } from "react-icons/go";

export default function Test() {
	const configData = getConfigData();
	const [view, setView] = useState("intro"); // 'intro', 'questions', or 'result'
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [feedback, setFeedback] = useState(null); // 'correct' or 'incorrect'
	const [selectedOption, setSelectedOption] = useState(null);
	const [answers, setAnswers] = useState({}); // Store user's answers
	const [correctAnswers, setCorrectAnswers] = useState(0); // Track correct answers
	const [displayedPercentage, setDisplayedPercentage] = useState(0); // Displayed percentage for animation
	const [percentageClass, setPercentageClass] = useState("text-lg"); // Initial class for percentage

	const startTest = () => {
		setView("questions");
		const initialAnswer = answers[0] || null;
		setSelectedOption(initialAnswer);
		setFeedback(
			initialAnswer
				? initialAnswer === configData.questions[0].correctAnswer
					? "correct"
					: "incorrect"
				: null,
		);
	};

	const handleAnswer = (optionKey) => {
		const currentQuestion = configData.questions[currentQuestionIndex];
		setSelectedOption(optionKey);
		setAnswers((prevAnswers) => ({
			...prevAnswers,
			[currentQuestionIndex]: optionKey,
		}));
		if (optionKey === currentQuestion.correctAnswer) {
			setFeedback("correct");
			setCorrectAnswers((prevCount) => prevCount + 1);
		} else {
			setFeedback("incorrect");
		}
	};

	const nextQuestion = () => {
		if (currentQuestionIndex < configData.questions.length - 1) {
			const nextIndex = currentQuestionIndex + 1;
			setCurrentQuestionIndex(nextIndex);
			const nextAnswer = answers[nextIndex] || null;
			setSelectedOption(nextAnswer);
			setFeedback(
				nextAnswer
					? nextAnswer === configData.questions[nextIndex].correctAnswer
						? "correct"
						: "incorrect"
					: null,
			);
			window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top
		}
	};

	const previousQuestion = () => {
		if (currentQuestionIndex > 0) {
			const prevIndex = currentQuestionIndex - 1;
			setCurrentQuestionIndex(prevIndex);
			const prevAnswer = answers[prevIndex] || null;
			setSelectedOption(prevAnswer);
			setFeedback(
				prevAnswer
					? prevAnswer === configData.questions[prevIndex].correctAnswer
						? "correct"
						: "incorrect"
					: null,
			);
			window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top
		}
	};

	const exitTest = () => {
		setView("intro");
		setCurrentQuestionIndex(0);
		setFeedback(null);
		setSelectedOption(null);
		setAnswers({});
		setCorrectAnswers(0);
		setDisplayedPercentage(0);
		setPercentageClass("text-lg"); // Reset class for percentage animation
	};

	const seeResults = () => {
		setView("result");
	};

	const restartTest = () => {
		setView("questions");
		setCurrentQuestionIndex(0);
		setFeedback(null);
		setSelectedOption(null);
		setAnswers({});
		setCorrectAnswers(0);
		setDisplayedPercentage(0); // Reset displayed percentage
		setPercentageClass("text-lg"); // Reset class for percentage animation
	};

	const calculatePercentage = () => {
		return (correctAnswers / configData.questions.length) * 100;
	};

	useEffect(() => {
		if (view === "result") {
			const targetPercentage = calculatePercentage();
			let currentPercentage = 0;
			const interval = setInterval(() => {
				if (currentPercentage < targetPercentage) {
					currentPercentage++;
					setDisplayedPercentage(currentPercentage);
				} else {
					clearInterval(interval);
				}
			}, 10); // Adjust the speed of the animation here (20ms for faster, increase for slower)

			// Animate text size
			setTimeout(() => {
				setPercentageClass("text-8xl");
			}, 100); // Add a slight delay to ensure the class change triggers the animation

			return () => clearInterval(interval);
		}
	}, [view]);

	const renderResultMessage = () => {
		if (correctAnswers >= 7) {
			return (
				<>
					<p className="text-xl mb-6 text-center text-gray-700 leading-loose">
						Tu spēj atpazīt maldinošu dizainu un veikt informētus un apdomātus
						lēmumus!
					</p>
					<button
						href="/"
						className="gap-x-3 font-bold before:ease relative overflow-hidden border border-[#000000] bg-[#050708] text-white shadow-2xl transition-all before:absolute before:right-0 before:top-0 before:h-32 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-300 hover:before:-translate-x-80 rounded-xl text-xl px-5 py-3 text-center inline-flex items-center mx-7"
					>
						<a href="/">Atgriezties uz mājas lapu</a> <FaPlay size={13} />
					</button>
				</>
			);
		} else if (correctAnswers >= 4) {
			return (
				<>
					<p className="text-xl mb-6 text-center text-gray-700 leading-loose">
						Tu spēj atpazīt dažus maldinošus dizainus, bet nepieciešamas
						papildus zināšanas
					</p>
					<button
						href="/"
						className="gap-x-3 font-bold before:ease relative overflow-hidden border border-[#000000] bg-[#050708] text-white shadow-2xl transition-all before:absolute before:right-6 before:top-0 before:h-32 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-200 hover:before:-translate-x-96 rounded-xl text-xl px-5 py-3 text-center inline-flex items-center mx-1"
					>
						<a href="/">Lasīt vairāk par Maldinošo dizainu</a>{" "}
						<FaPlay size={13} />
					</button>
				</>
			);
		} else {
			return (
				<>
					<p className="text-xl mb-6 text-center text-gray-700 leading-loose">
						Tev sagādā grūtības maldinoša dizaina atpazīšana. Nepieciešama
						papildus prakse un zināšanas :(
					</p>
					<button
						href="/"
						className="gap-x-3 font-bold before:ease relative overflow-hidden border border-[#000000] bg-[#050708] text-white shadow-2xl transition-all before:absolute before:right-6 before:top-0 before:h-32 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-200 hover:before:-translate-x-80 rounded-xl text-xl px-5 py-3 text-center inline-flex items-center mx-1"
					>
						<a href="/">Lasīt vairāk par Maldinošo dizainu</a>{" "}
						<FaPlay size={13} />
					</button>
				</>
			);
		}
	};

	return (
		<>
			<div className="text-gray-800">
				{view === "intro" && (
					<>
						<div className="flex items-center justify-center text-center py-8 gap-x-2">
							<div className="w-2 h-2 bg-[#9d105e] rounded-full m-2"></div>
							<h1 className="text-3xl md:text-4xl font-bold">
								Zināšanu pārbaude
							</h1>
							<div className="w-2 h-2 bg-[#9d105e] rounded-full m-2"></div>
						</div>

						<div className="text-xl px-7 py-5 flex flex-col leading-loose items-center justify-center">
							<div className="text-center pb-3">
								<p>{configData.testIntro}</p>
							</div>

							<div>
								<img
									src={configData.testImage}
									alt=""
									className="md:max-w-sm"
								/>
							</div>
							<div className="pt-6 pb-6">
								<button
									onClick={startTest}
									className="flex items-center gap-x-4 pr-6 pl-6 transition bg-gradient-to-br from-[#9d105e]/80 to-[#9d105e] hover:bg-[#9d105e] text-white font-bold py-2 px-4 rounded-full group"
								>
									<p>Sākt</p>
									<FaPlay className="text-sm group-hover:pl-1 transition duration-150" />
								</button>
							</div>
						</div>
					</>
				)}

				{view === "questions" && (
					<div className="text-xl px-6 py-5 flex flex-col leading-loose justify-center">
						{configData.questions.map(
							(question, index) =>
								index === currentQuestionIndex && (
									<div key={index}>
										<div className="pb-3">
											<div className="flex flex-row  items-center justify-center pt-1 pb-6 ">
												<button className="md:inline-block ">
													<svg
														className="w-6 h-6 text-gray-300 hover:text-gray-600 transition delay-100"
														xmlns="http://www.w3.org/2000/svg"
														fill="none"
														viewBox="0 0 24 24"
														strokeWidth="2"
														stroke="currentColor"
														onClick={exitTest}
													>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															d="M15.75 19.5l-7.5-7.5 7.5-7.5"
														/>
													</svg>
												</button>
												<div className="text-sm items-center justify-center text-center flex-grow pr-4">
													<p>{`Jautājums ${currentQuestionIndex + 1} no ${
														configData.questions.length
													}`}</p>
												</div>
											</div>
										</div>
										<div className="text-center font-bold text-2xl bg-black text-white  rounded-xl p-8">
											<p>{question.text}</p>
											<p className="text-sm font-normal text-gray-300 italic pt-1 justify-center">
												{configData.testCond}
											</p>
										</div>
										{configData.questions[currentQuestionIndex].qImage && (
											<div className="pt-6 pb-4">
												<img
													src={
														configData.questions[currentQuestionIndex].qImage
													}
													alt=""
													className="drop-shadow-lg rounded-2xl"
												/>
											</div>
										)}
										<div className="flex flex-col gap-4 pt-6 pb-6 text-md">
											{question.options &&
												Object.entries(question.options).map(([key, value]) => (
													<button
														key={key}
														onClick={() => handleAnswer(key)}
														className={`transition text-black py-2 px-4 rounded-xl ${
															feedback === "correct" &&
															key === question.correctAnswer
																? "bg-[#bbf1ae] border"
																: feedback === "incorrect" &&
																  key === question.correctAnswer
																? "bg-[#bbf1ae] border"
																: feedback === "incorrect" &&
																  key === selectedOption
																? "bg-[#f1b8ae]"
																: selectedOption === key
																? "bg-blue-500"
																: "bg-gray-100 border hover:bg-gray-200"
														}`}
														disabled={feedback !== null} // Disable buttons after an answer is selected
													>
														{value}
													</button>
												))}
										</div>
										<div>
											{feedback && (
												<div className="italic border p-4 rounded-md text-lg text-gray-600">
													<p>{question.explanation}</p>
												</div>
											)}
										</div>
										<div className="flex flex-col flex-grow">
											<div className="flex pt-6 pb-3">
												<button
													onClick={previousQuestion}
													className={`flex items-center gap-x-4 transition mr-auto md:inline-block ${
														currentQuestionIndex === 0
															? "text-gray-200 cursor-not-allowed"
															: "hover:text-gray-800 text-gray-700"
													}`}
													disabled={currentQuestionIndex === 0} // Disable button if it's the first question
												>
													<FaCircleChevronLeft className="text-3xl" />
												</button>
												{currentQuestionIndex <
												configData.questions.length - 1 ? (
													<button
														onClick={nextQuestion}
														className={`flex items-center gap-x-4 transition ml-auto md:inline-block ${
															selectedOption === null
																? "text-gray-200 cursor-not-allowed"
																: "dropshadow-xl text-[#9d105ec4]  hover:text-[#9d105e]"
														}`}
														disabled={selectedOption === null} // Disable button if no option is selected
													>
														<FaCircleChevronRight className="text-3xl" />
													</button>
												) : (
													<button
														onClick={seeResults}
														className={`flex items-center gap-x-4 transition text-4xl ${
															selectedOption === null
																? "text-gray-200 cursor-not-allowed"
																: "dropshadow-xl text-[#9d105ec4]  hover:text-[#9d105e]"
														}`}
														disabled={selectedOption === null} // Disable button if no option is selected
													>
														<GoCheckCircleFill />
													</button>
												)}
											</div>
										</div>
									</div>
								),
						)}
					</div>
				)}

				{view === "result" && (
					<div
						className="text-xl px-7 py-5 flex flex-col leading-loose items-center justify-center pb-16"
						style={{
							backgroundImage:
								correctAnswers >= 7
									? `url(${configData.bgCelebration})`
									: "none",
							backgroundSize: "cover",
							backgroundPosition: "center",
						}}
					>
						<div className="flex items-center justify-center py-8 gap-x-3">
							<div className="w-4 h-2 bg-[#9d105e] rounded-full"></div>
							<h1 className="text-4xl font-bold "> Rezultāts</h1>
							<div className="w-4 h-2 bg-[#9d105e] rounded-full"></div>
						</div>

						<div className="flex flex-col items-center justify-center pt-20 pb-44 p-8">
							<p
								className={`transition-all duration-1000 ${percentageClass} font-bold pb-5`}
							>
								{displayedPercentage}%
							</p>
							<p className="text-sm mb-6 italic text-gray-500 text-center">
								Tu pareizi atbildēji uz {correctAnswers} no{" "}
								{configData.questions.length} jautājumiem.
							</p>
							{renderResultMessage()}
						</div>

						<button
							onClick={restartTest}
							className="flex items-center gap-x-4 pr-6 pl-6 transition duration-500 bg-gradient-to-br from-[#9d105e]/80 to-[#9d105e] hover:bg-[#9d105e] text-white font-bold py-2 px-4 rounded-full group"
						>
							<p>Mēģināt vēlreiz</p>
							<FaArrowRotateLeft className="group-hover:-rotate-180 transition duration-500" />
						</button>
					</div>
				)}
			</div>
		</>
	);
}
