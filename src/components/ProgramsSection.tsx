import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { BookOpen, Users, Clock, Award, ArrowRight } from "lucide-react";
import { useRouter } from "./Router";

export function ProgramsSection() {
	const { navigateTo } = useRouter();

	const programs = [
		{
			id: 1,
			title: `Qur’an Class for Boys`,
			subtitle: "Beginner to Advance",
			description: `A dedicated program for boys of all levels — including those who have never learned to read the Qur’an before — to learn Arabic reading skills and recite the Qur’an with proper tajweed. Whether starting from the alphabet, building fluency, or perfecting recitation, this class offers a supportive and encouraging environment to help every student progress with confidence and love for the Qur’an.`,
			schedule: "Sundays, Tuesdays and Fridays 5:30 PM - 8:00 PM",
			nextStart: "Anytime",
			features: [
				"Arabic alphabet",
				"Correct pronunciation & articulation",
				"Tajweed rules",
				"Qur’an recitation",
				"Qur’an memorization",
				"Islamic reminders",
			],
			contact: "604-364-3260",
		},
		{
			id: 2,
			title: `Qur’an Class for Women and Girls`,
			subtitle: "Beginner to Advance",
			description: `A welcoming and supportive program for girls and women of all levels — including those who have never learned to read the Qur’an before — offering step-by-step guidance to develop Arabic reading skills and recite the Qur’an with proper tajweed. Whether you are starting from the basics, aiming to improve fluency, or perfecting your recitation, this class provides a respectful, motivating environment to help you build confidence, deepen your connection with the Qur’an, and grow spiritually.`,
			schedule: "Sundays and Tuesdays 6:00 PM - 8:00 PM",
			nextStart: "Anytime",
			features: [
				"Arabic alphabet",
				"Correct pronunciation & articulation",
				"Tajweed rules",
				"Qur’an recitation",
				"Qur’an memorization",
				"Islamic reminders",
			],
			contact: "604-214-1390",
		},
		{
			id: 3,
			title: `Arabic Language Class for Kids`,
			subtitle: "Beginner",
			description: `A fun and interactive class designed to help children learn Arabic from the basics. Through engaging activities, kids will develop skills in reading, writing, and speaking while building a foundation to understand the Qur’an and Islamic studies.`,
			schedule: "Saturdays 2:00 PM - 3:30 PM",
			nextStart: "Anytime",
			features: [
				"Arabic alphabet & pronunciation",
				"Reading skills",
				"Writing skills",
				"Speaking skills",
				"Building foundation for Qur’an",
			],
			contact: "778-710-1774",
		},
		{
			id: 4,
			title: `English Language Class for Women`,
			subtitle: "Beginner",
			description: `This class is designed specifically for women who want to build their English step by step in a friendly and supportive environment. Together, we will learn the alphabet, practice basic conversation, and develop the essential skills of reading, writing, speaking, and listening.`,
			schedule: "Saturdays 4:00 PM - 5:30 PM",
			nextStart: "Anytime",
			features: [
				"Alphabet games and writing practice to strengthen reading and spelling",
				"Role-plays and dialogues to practice everyday conversations",
				"Listening exercises using short stories, songs, and simple videos",
				"Group discussions and speaking activities to build confidence",
				"Creative tasks such as writing short notes, filling forms, and simple journaling",
			],
			contact: "778-710-1774",
		},
	];

	return (
		<section id="programs" className="py-24 bg-white">
			<div className="max-w-7xl mx-auto px-6">
				{/* Programs Section */}
				<div className="text-center mb-16">
					<h2 className="text-4xl font-light text-gray-900 mb-8 tracking-tight">
						Islamic Education Programs
					</h2>
					<p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
						Strengthen your faith through knowledge. Join our comprehensive
						Islamic education programs designed for all ages and experience
						levels.
					</p>
				</div>

				<div className="grid lg:grid-cols-2 gap-8 mb-16">
					{programs.map((program) => (
						<Card
							key={program.id}
							className="hover:shadow-lg transition-shadow"
						>
							<CardHeader className="pb-4">
								<CardTitle className="text-2xl font-semibold mb-1">
									{program.title}
								</CardTitle>
								{program.subtitle && (
									<div className="text-green-700 text-base font-medium mb-2">
										{program.subtitle}
									</div>
								)}
								<p className="text-gray-700 mb-4">{program.description}</p>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="space-y-2 text-sm">
									<p>
										<strong>Schedule:</strong> {program.schedule}
									</p>
									<p>
										<strong>Start:</strong> {program.nextStart}
									</p>
									{program.contact && (
										<p>
											<strong>Contact:</strong>{" "}
											<a
												href={`tel:${program.contact}`}
												className="text-green-700 underline"
											>
												{program.contact}
											</a>
										</p>
									)}
								</div>

								<div>
									<h4 className="font-semibold mb-2">What You'll Learn:</h4>
									<ul className="text-sm text-gray-600 space-y-1">
										{program.features.map((feature, index) => (
											<li key={index} className="flex items-center gap-2">
												<ArrowRight className="h-3 w-3 text-green-600" />
												{feature}
											</li>
										))}
									</ul>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</section>
	);
}
