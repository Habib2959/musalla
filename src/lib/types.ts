// API Response Types
export interface ApiResponse<T = any> {
	data: T;
	message?: string;
	success: boolean;
	status: number;
}

export interface ApiError {
	message: string;
	status: number;
	code?: string;
	details?: any;
}

// HTTP Methods
export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

// Request Configuration
export interface RequestConfig {
	headers?: Record<string, string>;
	timeout?: number;
	retries?: number;
	baseURL?: string;
}

// Generic API Request Options
export interface ApiRequestOptions extends RequestConfig {
	params?: Record<string, any>;
	body?: any;
	signal?: AbortSignal;
}

// Prayer Times API Response (example)
export interface PrayerTimesResponse {
	fajr: string;
	dhuhr: string;
	asr: string;
	maghrib: string;
	isha: string;
	date: string;
	hijriDate?: string;
}

// Event API Response
export interface Event {
	id: string;
	title: string;
	description: string;
	dateTime: string;
	location: string;
	tags: string[];
	type: "one-time" | "recurring";
	frequency: string;
	isFeatured: boolean;
	speakers: {
		id: string;
		name: string;
		title: string;
		bio: string;
	}[];
}

// Media Item interface
export interface MediaItem {
	id: string;
	date: string;
	title: string;
	mediaLink: string;
	mediaType: "image" | "video";
	categoryId: string;
	description: string;
}

// Media Category interface
export interface MediaCategory {
	id: string;
	name: string;
	description: string;
}

// Contact Form Data (example)
export interface ContactFormData {
	name: string;
	email: string;
	phone?: string;
	message: string;
	subject: string;
}

// Contact Message for add_contact_message RPC
export interface ContactMessage {
	name: string;
	email: string;
	phone: string;
	message: string;
	subject: string;
	dateTime: string;
}

export interface AddContactMessageRequest {
	new_message: ContactMessage;
}

// Donation Data (example)
export interface DonationData {
	amount: number;
	currency: string;
	donorName?: string;
	donorEmail?: string;
	isAnonymous: boolean;
	purpose: string;
	paymentMethod: "etransfer" | "paypal" | "card" | "cash";
}

// Newsletter Subscription (example)
export interface NewsletterSubscription {
	email: string;
	name?: string;
	interests: string[];
	frequency: "weekly" | "monthly";
}

// Subscriber Data for add_subscriber RPC
export interface Subscriber {
	name: string;
	email: string;
	phone: string;
	comments: string;
	subscribedAt: string;
	subscriptionTypes: string[];
}

export interface AddSubscriberRequest {
	new_subscriber: Subscriber;
}

// Project Progress Types
export interface ProjectGoal {
	id: string;
	icon: string;
	title: string;
	completed: boolean;
	description: string;
}

export interface ProjectProgress {
	goals: ProjectGoal[];
	raised: number;
	target: number;
	vision: string;
	mission: string;
	timeline: string;
	contributors: number;
	timelineDate: string;
	prayerCapacity: number;
	volunteerHours: number;
	constructionPhases: any[];
}

export interface DonationMethod {
	id: string;
	link: string;
	type: string;
	email: string;
	title: string;
	isActive: boolean;
	accountInfo: string;
	description: string;
	displayOrder: number;
	instructions: string;
}
