"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Clock } from "lucide-react";
import { PrayerTimesService } from "../lib/services/prayer-times.service";

interface PrayerTime {
	name: string;
	time: string;
}

export function PrayerTimes() {
	const [prayerTimes, setPrayerTimes] = useState<PrayerTime[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchPrayerTimes() {
			try {
				const data = await PrayerTimesService.getTodayPrayerTimes();

				if (data) {
					const formatted: PrayerTime[] = [
						{ name: "Fajr", time: data.fajr_begins },
						{ name: "Dhuhr", time: data.zuhr_begins },
						{ name: "Asr", time: data.asr_1_begins },
						{ name: "Maghrib", time: data.maghrib_begins },
						{ name: "Isha", time: data.isha_begins },
					];
					setPrayerTimes(formatted);
				} else {
					console.warn("No prayer times found for today");
					setPrayerTimes([]); // keep empty list instead of breaking
				}
			} catch (error) {
				console.error("Failed to fetch prayer times:", error);
				setPrayerTimes([]);
			} finally {
				setLoading(false);
			}
		}

		fetchPrayerTimes();
	}, []);

	const today = new Date().toLocaleDateString("en-US", {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
	});

	return (
		<Card className="w-full max-w-md">
			<CardHeader className="pb-4">
				<CardTitle className="flex items-center gap-2 text-green-700">
					<Clock className="h-5 w-5" />
					Prayer Times
				</CardTitle>
				<p className="text-sm text-gray-600">{today}</p>
			</CardHeader>
			<CardContent>
				{loading ? (
					<p className="text-center text-gray-500">Loading...</p>
				) : prayerTimes.length > 0 ? (
					<div className="space-y-3">
						{prayerTimes.map((prayer, index) => (
							<div
								key={index}
								className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0"
							>
								<span className="font-medium text-gray-700">{prayer.name}</span>
								<span className="font-semibold text-green-600">
									{prayer.time}
								</span>
							</div>
						))}
					</div>
				) : (
					<p className="text-center text-gray-500">No data found for today</p>
				)}

				<div className="mt-4 p-3 bg-green-50 rounded-lg">
					<p className="text-sm text-green-800 text-center">
						Location: Marpole Musalla
						<br />
						8879 Selkirk Street, Vancouver, BC V6P 4J6
					</p>
				</div>
			</CardContent>
		</Card>
	);
}
