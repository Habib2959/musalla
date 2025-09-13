# Community Info Integration Guide

This guide explains how the community-info API call has been integrated into the HomePage component.

## What Was Implemented

### 1. **Updated Type Definitions**

The `CommunityInfo` interface in `/src/lib/services/supabase-content.service.ts` was updated to match your exact API response structure:

```typescript
export interface CommunityInfo {
	key: "community-info";
	value: {
		about: string;
		vision: string;
		mission: string;
		memberCount: number;
		offers: Array<{
			id: string;
			title: string;
			description: string;
		}>;
		values: Array<{
			id: string;
			icon: string;
			title: string;
			description: string;
		}>;
		contact: {
			emails: string[];
			phones: string[];
			address: {
				city: string;
				street: string;
				country: string;
				address1: string;
				address2: string;
				province: string;
				postalCode: string;
			};
			location: string;
		};
		weeklyPrograms: Array<{
			id: string;
			day: string;
			name: string;
			time: string;
			description: string;
		}>;
	};
}
```

### 2. **HomePage Updates**

#### **Imports Added:**

```typescript
import { useApiOnMount, SupabaseContentService } from "../../lib";
import { Compass, Book, Star } from "lucide-react"; // Additional icons
```

#### **API Call:**

```typescript
const {
	data: communityInfoData,
	loading: communityLoading,
	error: communityError,
} = useApiOnMount(() => SupabaseContentService.getCommunityInfo());

const communityInfo = communityInfoData?.[0]?.value;
```

#### **Dynamic Content Sections:**

1. **Welcome Section** - Uses `communityInfo.about`
2. **Mission Section** - Uses `communityInfo.mission`
3. **Vision Section** - Uses `communityInfo.vision`
4. **Values Section** - Uses `communityInfo.values` array with dynamic icons
5. **What We Offer** - Uses `communityInfo.offers` array
6. **Stats Section** - Uses `communityInfo.memberCount`

### 3. **Features Implemented**

#### **Loading States:**

```typescript
{communityLoading ? (
  <div className="space-y-4">
    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
    <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
  </div>
) : // ... content
```

#### **Error Handling:**

```typescript
{communityError ? (
  <div className="text-red-600 bg-red-50 p-4 rounded-lg">
    <p>Unable to load community information. Please try again later.</p>
  </div>
) : // ... content
```

#### **Fallback Content:**

All sections maintain their original hardcoded content as fallback if API data is not available.

#### **Dynamic Icon Mapping:**

```typescript
const getIconComponent = (iconName: string) => {
	const iconMap: Record<string, any> = {
		Compass: Compass,
		Book: Book,
		Users: Users,
		Heart: Heart,
		Star: Star,
		Building2: Building2,
	};
	return iconMap[iconName] || Heart;
};
```

## Testing Your Integration

### 1. **Environment Setup**

Make sure your `.env` file contains:

```env
VITE_SUPABASE_PROJECT_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_API_KEY=your-anon-key-here
VITE_SUPABASE_TABLE_NAME=content
```

### 2. **Test Component**

Use the `CommunityInfoTest` component to verify the API call:

```typescript
import { CommunityInfoTest } from "./components/CommunityInfoTest";

// Temporarily add to your App.tsx to test
<CommunityInfoTest />;
```

### 3. **Verify in Browser**

1. Open your browser's Developer Tools
2. Go to Network tab
3. Refresh the page
4. Look for a request to your Supabase URL with `key=eq.community-info`
5. Check the response matches your expected structure

## API Response Structure

Your API should return:

```json
[
	{
		"key": "community-info",
		"value": {
			"about": "Long description text...",
			"mission": "Mission statement...",
			"vision": "Vision statement...",
			"memberCount": 200,
			"offers": [
				{
					"id": "1755384360650",
					"title": "Five daily prayers",
					"description": ""
				}
			],
			"values": [
				{
					"id": "1755384356167",
					"icon": "Compass",
					"title": "Faith",
					"description": "Deepening our relationship with Allah"
				}
			],
			"contact": {
				"emails": ["nwmis.bc@gmail.com"],
				"phones": ["(778) 317-6673"],
				"address": {
					"city": "Vancouver",
					"street": "Selkirk",
					"country": "Canada",
					"address1": "8879",
					"address2": "",
					"province": "BC",
					"postalCode": "V6P 6K9"
				}
			},
			"weeklyPrograms": [
				{
					"id": "1755384366067",
					"day": "Friday",
					"name": "khutbah",
					"time": "21:30",
					"description": ""
				}
			]
		}
	}
]
```

## Sections Updated

### ✅ **Welcome Section**

- Dynamically loads `about` text
- Preserves line breaks with `whitespace-pre-line`
- Shows loading animation
- Falls back to original text if API fails

### ✅ **Mission/Vision/Values**

- Mission and Vision use API data with fallbacks
- Values section renders dynamic list with proper icons
- Icon mapping supports your icon names (Compass, Book, Users, Heart, Star)

### ✅ **What We Offer**

- Renders dynamic list from `offers` array
- Falls back to original hardcoded list
- Maintains responsive grid layout

### ✅ **Stats Section**

- Uses `memberCount` from API
- Uses `weeklyPrograms.length` for program count
- Other stats remain static for now

## Troubleshooting

### **API Not Loading?**

1. Check browser console for errors
2. Verify environment variables are set
3. Check Supabase project URL and API key
4. Ensure your Supabase table has the correct structure

### **Data Not Showing?**

1. Verify the response structure matches the interface
2. Check that `key` field equals "community-info"
3. Ensure data is nested under `value` property

### **Icons Not Showing?**

1. Check that icon names in your data match the `getIconComponent` mapping
2. Add new icon mappings as needed
3. Fallback icon (Heart) will show for unmapped icons

## Next Steps

1. **Test with real Supabase data**
2. **Add more dynamic sections** (contact info, weekly programs)
3. **Implement other content types** (events, donation-methods, etc.)
4. **Add caching** for better performance
5. **Remove fallback content** once API is stable

## Development Notes

- All changes maintain backward compatibility
- Original content is preserved as fallbacks
- Loading states provide good UX
- Error handling prevents crashes
- TypeScript ensures type safety
