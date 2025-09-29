// services/prayer-times.service.ts
export type PrayerTimesResponse = Record<
	string,
	{
		date: string;
		day: string;
		month: string;
		fajr_begins: string;
		fajr_jamaah: string;
		sunrise: string;
		zuhr_begins: string;
		zuhr_jamaah: string;
		asr_1_begins: string;
		asr_2_begins: string;
		asr_jamaah: string;
		maghrib_begins: string;
		maghrib_jamaah: string;
		isha_begins: string;
		isha_jamaah: string;
	}
>;

export class PrayerTimesService {
	private static readonly BASE_URL = `https://script.googleusercontent.com/macros/echo?user_content_key=${
		import.meta.env.VITE_PRAYER_TIMES_API_KEY
	}&lib=${import.meta.env.VITE_PRAYER_LIB_KEY}`;

	/**
	 * Fetch all monthly prayer times
	 */
	static async getMonthlyPrayerTimes(): Promise<PrayerTimesResponse> {
		const res = await fetch(this.BASE_URL);
		console.log("Fetched prayer times:", res.status, res.statusText);

		if (!res.ok) {
			throw new Error(`Failed to fetch prayer times: ${res.status}`);
		}
		return res.json();
	}

	/**
	 * Fetch today's prayer times
	 */
	static async getTodayPrayerTimes() {
		const data = await this.getMonthlyPrayerTimes();

		// Format today's key as dd/mm/yyyy
		const today = new Date();
		const day = String(today.getDate()).padStart(2, "0");
		const month = String(today.getMonth() + 1).padStart(2, "0");
		const year = today.getFullYear();
		const todayKey = `${day}/${month}/${year}`;

		return data[todayKey] ?? null;
	}
}
