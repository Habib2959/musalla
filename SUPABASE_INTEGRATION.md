# Supabase Integration Guide

This guide shows how to integrate the new Supabase API system with your existing Musalla website components.

## Quick Setup

1. **Environment Variables**: Add to your `.env` file:

```env
VITE_SUPABASE_PROJECT_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_API_KEY=your-anon-key-here
VITE_SUPABASE_TABLE_NAME=content
```

2. **Import the Service**: In any component:

```typescript
import { SupabaseContentService, useApiOnMount } from "../lib";
```

## Integration Examples

### Replace Hardcoded Prayer Times

**Before** (in `PrayerTimes.tsx`):

```typescript
const prayerTimes = {
	fajr: "5:30 AM",
	dhuhr: "12:30 PM",
	// ... hardcoded times
};
```

**After**:

```typescript
import { useApiOnMount, SupabaseContentService } from "../lib";

export function PrayerTimes() {
	const { data: communityInfo } = useApiOnMount(() =>
		SupabaseContentService.getCommunityInfo()
	);

	// Use communityInfo[0]?.prayer_times_source or external API
}
```

### Replace Hardcoded Events

**Before** (in `EventsSection.tsx`):

```typescript
const events = [
	{ id: 1, title: "Friday Prayer", date: "2024-01-15" },
	// ... hardcoded events
];
```

**After**:

```typescript
import { useApiOnMount, SupabaseContentService } from "../lib";

export function EventsSection() {
	const {
		data: events,
		loading,
		error,
	} = useApiOnMount(() =>
		SupabaseContentService.getEvents({ upcoming: true, limit: 5 })
	);

	if (loading) return <div>Loading events...</div>;
	if (error) return <div>Error loading events</div>;

	return (
		<div>
			{events?.map((event) => (
				<div key={event.id}>
					<h3>{event.title}</h3>
					<p>{event.description}</p>
					<p>
						{event.event_date} at {event.event_time}
					</p>
					<p>{event.location}</p>
				</div>
			))}
		</div>
	);
}
```

### Replace Hardcoded Donation Methods

**Before** (in `DonationSection.tsx`):

```typescript
const donationMethods = [
	{ method: "E-Transfer", email: "nwmis.bc@gmail.com" },
	// ... hardcoded methods
];
```

**After**:

```typescript
import { useApiOnMount, SupabaseContentService } from "../lib";

export function DonationSection() {
	const { data: donationMethods } = useApiOnMount(() =>
		SupabaseContentService.getDonationMethods(true)
	);

	return (
		<div>
			{donationMethods?.map((method) => (
				<div key={method.id}>
					<h3>{method.method_name}</h3>
					{method.details.email && <p>Email: {method.details.email}</p>}
					{method.details.instructions && <p>{method.details.instructions}</p>}
				</div>
			))}
		</div>
	);
}
```

### Replace Hardcoded Project Progress

**Before** (in `HomePage.tsx` or `MosqueProjectPage.tsx`):

```typescript
const projectGoal = 50000;
const currentAmount = 32000;
const progressPercentage = Math.round((currentAmount / projectGoal) * 100);
```

**After**:

```typescript
import { useApiOnMount, SupabaseContentService } from "../lib";

export function ProjectProgress() {
	const { data: projects } = useApiOnMount(() =>
		SupabaseContentService.getProjectProgress(true)
	);

	const mainProject = projects?.[0]; // Assuming main mosque project

	return (
		<div>
			{mainProject && (
				<>
					<h2>{mainProject.project_name}</h2>
					<p>{mainProject.description}</p>
					<div>
						<div>
							Goal: {mainProject.goal_amount} {mainProject.currency}
						</div>
						<div>
							Raised: {mainProject.current_amount} {mainProject.currency}
						</div>
						<div>Progress: {mainProject.progress_percentage}%</div>
					</div>
					<div className="progress-bar">
						<div
							style={{ width: `${mainProject.progress_percentage}%` }}
							className="progress-fill"
						/>
					</div>
				</>
			)}
		</div>
	);
}
```

### Add Social Links to Footer

**Before** (in `Footer.tsx`):

```typescript
const socialLinks = [
	{ platform: "facebook", url: "https://facebook.com/..." },
	// ... hardcoded links
];
```

**After**:

```typescript
import { useApiOnMount, SupabaseContentService } from "../lib";

export function Footer() {
	const { data: socialLinks } = useApiOnMount(() =>
		SupabaseContentService.getSocialLinks(true)
	);

	return (
		<footer>
			<div className="social-links">
				{socialLinks?.map((link) => (
					<a
						key={link.id}
						href={link.url}
						target="_blank"
						rel="noopener noreferrer"
					>
						{link.display_name || link.platform_name}
					</a>
				))}
			</div>
		</footer>
	);
}
```

## Migration Strategy

1. **Start Small**: Begin with one component (e.g., events)
2. **Keep Fallbacks**: Maintain hardcoded data as fallback during transition
3. **Test Thoroughly**: Ensure Supabase connection works before removing hardcoded data
4. **Gradual Rollout**: Migrate one content type at a time

### Migration Example with Fallback

```typescript
import { useApiOnMount, SupabaseContentService } from "../lib";

export function EventsSection() {
	const {
		data: supabaseEvents,
		loading,
		error,
	} = useApiOnMount(() =>
		SupabaseContentService.getEvents({ upcoming: true, limit: 5 })
	);

	// Fallback to hardcoded events if Supabase fails
	const fallbackEvents = [
		{ id: "fallback-1", title: "Friday Prayer", date: "2024-01-15" },
		// ... your existing hardcoded events
	];

	const events =
		supabaseEvents && supabaseEvents.length > 0
			? supabaseEvents
			: fallbackEvents;

	return (
		<div>
			{loading && <div>Loading latest events...</div>}
			{error && <div>Using cached events...</div>}
			{events.map((event) => (
				<div key={event.id}>{/* Render event */}</div>
			))}
		</div>
	);
}
```

## Testing Your Integration

1. **Check Network Tab**: Verify API calls are being made to Supabase
2. **Console Logging**: Add temporary console.log to see data structure
3. **Error Handling**: Test with network disconnected to see fallbacks
4. **Loading States**: Verify loading indicators work properly

```typescript
// Temporary debugging
const { data, loading, error } = useApiOnMount(() => {
	console.log("Making Supabase request...");
	return SupabaseContentService.getEvents();
});

console.log("Data:", data);
console.log("Loading:", loading);
console.log("Error:", error);
```

## Production Checklist

- [ ] Environment variables set correctly
- [ ] Supabase RLS (Row Level Security) configured
- [ ] API keys secured (using ANON key, not service key)
- [ ] Error handling implemented
- [ ] Loading states added
- [ ] Fallback data removed (or kept as emergency fallback)
- [ ] Performance testing completed
- [ ] Mobile responsiveness verified
