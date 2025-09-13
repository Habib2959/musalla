# API Client Documentation

This document explains how to use the generic API client system implemented for the Musalla website.

## Overview

The API client provides a complete solution for making HTTP requests with:

- Generic GET and POST methods (plus PUT, PATCH, DELETE)
- Built-in error handling and retry logic
- TypeScript support with proper typing
- React hooks for easy integration
- Authentication support
- Request/response interceptors
- Automatic timeout handling

## Installation

The API client is already set up in the project. Simply import what you need:

```typescript
import { httpClient, PrayerTimesService, useApi, useApiOnMount } from "../lib";
```

## Configuration

### Environment Variables

Add these to your `.env` file:

```env
VITE_API_URL=https://your-api-domain.com/api
```

### Basic Configuration

```typescript
import { httpClient, API_CONFIG } from "../lib";

// Update base URL
httpClient.setBaseURL("https://your-api-domain.com/api");

// Set authentication token
httpClient.setAuthToken("your-jwt-token");

// Set default headers
httpClient.setDefaultHeaders({
	"X-Client-Version": "1.0.0",
});
```

## Supabase Integration

The API client includes full Supabase integration for your specific table structure.

### Content Keys

Your Supabase table supports these content types:

- `community-info` - Community/mosque information
- `donation-methods` - Available donation methods
- `events` - Community events and programs
- `media-categories` - Media organization categories
- `media-items` - Media files (videos, images, documents)
- `project-progress` - Fundraising project progress
- `social-links` - Social media and website links

### Supabase Configuration

```typescript
import { supabaseClient } from "../lib";

// The client is automatically configured from environment variables:
// VITE_SUPABASE_PROJECT_URL
// VITE_SUPABASE_API_KEY
// VITE_SUPABASE_TABLE_NAME
```

### Using the Supabase Content Service

```typescript
import { SupabaseContentService, CONTENT_KEYS } from "../lib";

// Get community information
const communityInfo = await SupabaseContentService.getCommunityInfo();

// Get active donation methods
const donationMethods = await SupabaseContentService.getDonationMethods(true);

// Get upcoming events
const events = await SupabaseContentService.getEvents({
	upcoming: true,
	limit: 5,
});

// Get featured media items
const media = await SupabaseContentService.getMediaItems({
	featured: true,
});

// Get project progress
const projects = await SupabaseContentService.getProjectProgress();

// Get social links
const socialLinks = await SupabaseContentService.getSocialLinks();

// Get all content at once
const allContent = await SupabaseContentService.getAllContent();
```

### API URL Structure

Your API follows this pattern:

```
{{SUPABASE_PROJECT_URL}}/rest/v1/{{TABLE_NAME}}?select=*&key=eq.{{CONTENT_KEY}}
```

For example:

```
https://your-project.supabase.co/rest/v1/content?select=*&key=eq.community-info
https://your-project.supabase.co/rest/v1/content?select=*&key=eq.events
```

### React Hook Examples

```typescript
import { useApiOnMount, SupabaseContentService } from "../lib";

// Community info component
function CommunityInfo() {
	const { data, loading, error } = useApiOnMount(() =>
		SupabaseContentService.getCommunityInfo()
	);

	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error: {error}</div>;

	const info = data?.[0];
	return (
		<div>
			<h1>{info?.title}</h1>
			<p>{info?.description}</p>
			<p>📍 {info?.address}</p>
			<p>📞 {info?.phone}</p>
		</div>
	);
}

// Events list component
function EventsList() {
	const {
		data: events,
		loading,
		error,
	} = useApiOnMount(() => SupabaseContentService.getEvents({ upcoming: true }));

	return (
		<div>
			{loading && <div>Loading events...</div>}
			{error && <div>Error: {error}</div>}
			{events?.map((event) => (
				<div key={event.id}>
					<h3>{event.title}</h3>
					<p>{event.description}</p>
					<p>
						📅 {event.event_date} ⏰ {event.event_time}
					</p>
					<p>📍 {event.location}</p>
				</div>
			))}
		</div>
	);
}
```

## Basic Usage

### Direct HTTP Client

```typescript
import { httpClient } from "../lib";

// GET request
const response = await httpClient.get("/prayer-times/current");
console.log(response.data);

// POST request
const response = await httpClient.post("/contact", {
	name: "John Doe",
	email: "john@example.com",
	message: "Hello",
});

// With parameters
const response = await httpClient.get("/events", {
	params: { category: "educational", limit: 10 },
});

// With custom headers
const response = await httpClient.get("/protected-data", {
	headers: { Authorization: "Bearer token" },
});
```

### Service Classes

Use the pre-built service classes for common operations:

```typescript
import { PrayerTimesService, EventsService, ContactService } from "../lib";

// Get prayer times
const prayerTimes = await PrayerTimesService.getCurrentPrayerTimes(
	49.2827,
	-123.1207
);

// Get events
const events = await EventsService.getUpcomingEvents(5);

// Submit contact form
const result = await ContactService.submitContactForm({
	name: "John Doe",
	email: "john@example.com",
	subject: "Question",
	message: "My question here",
});
```

## React Hooks

### useApi - Manual API Calls

```typescript
import { useApi, PrayerTimesService } from "../lib";

function MyComponent() {
	const { data, loading, error, execute } = useApi();

	const loadPrayerTimes = async () => {
		try {
			await execute(() => PrayerTimesService.getCurrentPrayerTimes());
		} catch (err) {
			console.error("Failed to load prayer times");
		}
	};

	return (
		<div>
			<button onClick={loadPrayerTimes} disabled={loading}>
				{loading ? "Loading..." : "Load Prayer Times"}
			</button>
			{error && <div>Error: {error}</div>}
			{data && <div>Fajr: {data.fajr}</div>}
		</div>
	);
}
```

### useApiOnMount - Auto-load Data

```typescript
import { useApiOnMount, PrayerTimesService } from "../lib";

function PrayerTimesComponent() {
	const { data, loading, error, refetch } = useApiOnMount(() =>
		PrayerTimesService.getCurrentPrayerTimes()
	);

	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error: {error}</div>;

	return (
		<div>
			<h3>Prayer Times</h3>
			{data && (
				<ul>
					<li>Fajr: {data.fajr}</li>
					<li>Dhuhr: {data.dhuhr}</li>
					<li>Asr: {data.asr}</li>
					<li>Maghrib: {data.maghrib}</li>
					<li>Isha: {data.isha}</li>
				</ul>
			)}
			<button onClick={refetch}>Refresh</button>
		</div>
	);
}
```

### useApiForm - Form Submissions

```typescript
import { useApiForm, ContactService } from "../lib";

function ContactForm() {
	const { submitting, success, error, submit } = useApiForm();
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		subject: "",
		message: "",
	});

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await submit(ContactService.submitContactForm, formData);
			setFormData({ name: "", email: "", subject: "", message: "" }); // Reset on success
		} catch (err) {
			// Error is handled by the hook
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			{/* Form fields */}
			<button type="submit" disabled={submitting}>
				{submitting ? "Sending..." : "Send Message"}
			</button>
			{success && <div>Message sent successfully!</div>}
			{error && <div>Error: {error}</div>}
		</form>
	);
}
```

### useApiPagination - Paginated Data

```typescript
import { useApiPagination, EventsService } from "../lib";

function EventsList() {
	const {
		data: events,
		loading,
		error,
		currentPage,
		totalPages,
		nextPage,
		prevPage,
	} = useApiPagination(
		(page, limit) => EventsService.getEvents({ page, limit }),
		10 // items per page
	);

	return (
		<div>
			{loading && <div>Loading...</div>}
			{error && <div>Error: {error}</div>}

			<div>
				{events.map((event) => (
					<div key={event.id}>{event.title}</div>
				))}
			</div>

			<div>
				<button onClick={prevPage} disabled={currentPage === 1}>
					Previous
				</button>
				<span>
					Page {currentPage} of {totalPages}
				</span>
				<button onClick={nextPage} disabled={currentPage === totalPages}>
					Next
				</button>
			</div>
		</div>
	);
}
```

### useApiPolling - Real-time Data

```typescript
import { useApiPolling, PrayerTimesService } from "../lib";

function LivePrayerTimes() {
	const { data, loading, error } = useApiPolling(
		() => PrayerTimesService.getCurrentPrayerTimes(),
		30000, // Poll every 30 seconds
		true // Enable polling
	);

	return (
		<div>
			{data && <div>Next prayer: {data.next}</div>}
			{loading && <span>Updating...</span>}
			{error && <div>Error: {error}</div>}
		</div>
	);
}
```

## Error Handling

### Global Error Handling

```typescript
import { ApiException } from "../lib";

try {
	const response = await httpClient.get("/some-endpoint");
} catch (error) {
	if (error instanceof ApiException) {
		console.log("API Error:", error.message);
		console.log("Status Code:", error.status);
		console.log("Error Code:", error.code);
	}
}
```

### Custom Error Handling

```typescript
import { handleApiError } from "../lib";

try {
	// API call
} catch (error) {
	const apiError = handleApiError(error);

	switch (apiError.status) {
		case 401:
			// Redirect to login
			break;
		case 403:
			// Show permission denied message
			break;
		case 500:
			// Show server error message
			break;
		default:
		// Show generic error
	}
}
```

## Creating New Services

### Basic Service Template

```typescript
import { httpClient } from "../http-client";
import { ApiResponse } from "../types";

// Define your data types
interface MyData {
	id: string;
	name: string;
	// ... other fields
}

export class MyService {
	private static readonly BASE_PATH = "/my-endpoint";

	static async getAll(): Promise<ApiResponse<MyData[]>> {
		return httpClient.get(`${this.BASE_PATH}`);
	}

	static async getById(id: string): Promise<ApiResponse<MyData>> {
		return httpClient.get(`${this.BASE_PATH}/${id}`);
	}

	static async create(data: Omit<MyData, "id">): Promise<ApiResponse<MyData>> {
		return httpClient.post(`${this.BASE_PATH}`, data);
	}

	static async update(
		id: string,
		data: Partial<MyData>
	): Promise<ApiResponse<MyData>> {
		return httpClient.put(`${this.BASE_PATH}/${id}`, data);
	}

	static async delete(id: string): Promise<ApiResponse<{ success: boolean }>> {
		return httpClient.delete(`${this.BASE_PATH}/${id}`);
	}
}
```

## Advanced Features

### Request Interceptors

```typescript
// Automatically add auth token
httpClient.setDefaultHeaders({
	Authorization: `Bearer ${getAuthToken()}`,
});
```

### Retry Logic

```typescript
import { withRetry } from "../lib";

const result = await withRetry(
	() => httpClient.get("/unreliable-endpoint"),
	3, // max retries
	1000 // delay between retries
);
```

### Custom Timeout

```typescript
const response = await httpClient.get("/slow-endpoint", {
	timeout: 30000, // 30 seconds
});
```

### File Upload

```typescript
const formData = new FormData();
formData.append("file", file);
formData.append("description", "My file");

const response = await httpClient.post("/upload", formData);
```

### AbortController Support

```typescript
const controller = new AbortController();

const response = await httpClient.get("/data", {
	signal: controller.signal,
});

// Cancel the request
controller.abort();
```

## Best Practices

1. **Use Service Classes**: Create service classes for each domain (events, prayers, etc.)
2. **Type Safety**: Always define TypeScript interfaces for your data
3. **Error Handling**: Use try-catch blocks or the built-in error handling hooks
4. **Loading States**: Show loading indicators using the hook states
5. **Caching**: Consider implementing caching for frequently accessed data
6. **Environment Config**: Use environment variables for API URLs
7. **Authentication**: Set tokens globally using `setAuthToken()`

## Examples

Check the `/src/examples/ApiExamples.tsx` file for complete working examples of:

- Prayer times display
- Contact form submission
- Paginated events list

## Troubleshooting

### Common Issues

1. **CORS Errors**: Make sure your API server has CORS properly configured
2. **401 Unauthorized**: Check if your auth token is valid and properly set
3. **Network Errors**: Check internet connection and API server status
4. **Type Errors**: Ensure your interfaces match the API response structure

### Debug Mode

Enable debug logging:

```typescript
// In development, API errors are automatically logged to console
// Check browser DevTools for detailed error information
```

### Testing API Calls

```typescript
// Test with mock data
const mockResponse = {
	data: { fajr: "5:30 AM", dhuhr: "12:30 PM" },
	success: true,
	status: 200,
};

// Override for testing
httpClient.get = jest.fn().mockResolvedValue(mockResponse);
```
