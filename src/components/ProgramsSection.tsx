import type { EducationalProgram } from "../lib/services/supabase-content.service";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ArrowRight } from "lucide-react";

interface ProgramsSectionProps {
	programs: EducationalProgram["value"]; // Accepts both static and dynamic shape
	loading: boolean;
	error: string | null;
}

export function ProgramsSection({
	programs,
	loading,
	error,
}: ProgramsSectionProps) {
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
					{loading && (
						<div className="col-span-2 text-center text-lg text-gray-500 py-12">
							Loading programs...
						</div>
					)}
					{error && (
						<div className="col-span-2 text-center text-red-600 py-12">
							{error}
						</div>
					)}
					{!loading && !error && (!programs || programs.length === 0) && (
						<div className="col-span-2 text-center text-gray-500 py-12">
							No programs found.
						</div>
					)}
					{!loading &&
						!error &&
						programs &&
						programs.map((program) => (
							<Card
								key={program?.id || program.id}
								className="hover:shadow-lg transition-shadow"
							>
								<CardHeader className="pb-4">
									<CardTitle className="text-2xl font-semibold mb-1">
										{program?.title || program.title}
									</CardTitle>
									{program?.level && (
										<div className="text-green-700 text-base font-medium mb-2">
											{program.level}
										</div>
									)}
									<p className="text-gray-700 mb-4">
										{program?.description || program.description}
									</p>
								</CardHeader>
								<CardContent className="space-y-4">
									<div className="space-y-2 text-sm">
										<p>
											<strong>Schedule:</strong>{" "}
											{program?.schedules && program.schedules.length > 0
												? program.schedules
														.map(
															(s: any) => `${s.day} ${s.timeFrom}-${s.timeTo}`
														)
														.join(", ")
												: "TBA"}
										</p>
										<p>
											<strong>Start:</strong> {program?.startDate || "TBA"}
										</p>
										{program?.isFree !== undefined ? (
											<p>
												<strong>Fee:</strong>{" "}
												{program.isFree
													? "Free"
													: `$${program.fee} (${program.feeFrequency})`}
											</p>
										) : null}
										{program?.status && (
											<p>
												<strong>Status:</strong> {program.status}
											</p>
										)}
										{program?.studentCount !== undefined && (
											<p>
												<strong>Students:</strong> {program.studentCount}
											</p>
										)}
									</div>
									<div>
										<h4 className="font-semibold mb-2">Topics:</h4>
										<ul className="text-sm text-gray-600 space-y-1">
											{(program?.topics || []).map(
												(topic: string, index: number) => (
													<li key={index} className="flex items-center gap-2">
														<ArrowRight className="h-3 w-3 text-green-600" />
														{topic}
													</li>
												)
											)}
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
