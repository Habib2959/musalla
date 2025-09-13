import React from "react";
import { useApiOnMount, SupabaseContentService } from "../lib";

/**
 * Test component to verify the community-info API call is working
 * You can temporarily add this to your App.tsx to test the integration
 */
export function CommunityInfoTest() {
	const {
		data: communityInfoData,
		loading,
		error,
	} = useApiOnMount(() => SupabaseContentService.getCommunityInfo());

	if (loading) {
		return (
			<div className="p-6 bg-blue-50 border border-blue-200 rounded-lg">
				<h3 className="text-lg font-semibold text-blue-900">
					Testing Community Info API
				</h3>
				<p className="text-blue-700">Loading community information...</p>
			</div>
		);
	}

	if (error) {
		return (
			<div className="p-6 bg-red-50 border border-red-200 rounded-lg">
				<h3 className="text-lg font-semibold text-red-900">API Error</h3>
				<p className="text-red-700">Error: {error}</p>
				<p className="text-red-600 text-sm mt-2">
					Please check your environment variables:
					<br />• VITE_SUPABASE_PROJECT_URL
					<br />• VITE_SUPABASE_API_KEY
					<br />• VITE_SUPABASE_TABLE_NAME
				</p>
			</div>
		);
	}

	const communityInfo = communityInfoData?.[0];

	return (
		<div className="p-6 bg-green-50 border border-green-200 rounded-lg">
			<h3 className="text-lg font-semibold text-green-900 mb-4">
				✅ Community Info API Test Successful
			</h3>

			{communityInfo ? (
				<div className="space-y-4">
					<div>
						<h4 className="font-semibold text-green-800">Raw API Response:</h4>
						<pre className="bg-white p-3 rounded text-xs overflow-auto mt-2 border">
							{JSON.stringify(communityInfo, null, 2)}
						</pre>
					</div>

					<div>
						<h4 className="font-semibold text-green-800">Parsed Data:</h4>
						<div className="bg-white p-3 rounded mt-2 border">
							<p>
								<strong>About:</strong>{" "}
								{communityInfo.value?.about?.substring(0, 100)}...
							</p>
							<p>
								<strong>Mission:</strong>{" "}
								{communityInfo.value?.mission?.substring(0, 100)}...
							</p>
							<p>
								<strong>Vision:</strong>{" "}
								{communityInfo.value?.vision?.substring(0, 100)}...
							</p>
							<p>
								<strong>Member Count:</strong>{" "}
								{communityInfo.value?.memberCount}
							</p>
							<p>
								<strong>Offers Count:</strong>{" "}
								{communityInfo.value?.offers?.length}
							</p>
							<p>
								<strong>Values Count:</strong>{" "}
								{communityInfo.value?.values?.length}
							</p>
						</div>
					</div>
				</div>
			) : (
				<p className="text-green-700">
					No community info data found in response.
				</p>
			)}
		</div>
	);
}

// Example usage:
/*
To test this component, temporarily add it to your App.tsx:

import { CommunityInfoTest } from './components/CommunityInfoTest';

function App() {
  return (
    <div>
      <CommunityInfoTest />
      // Your existing app content
    </div>
  );
}

Don't forget to remove it after testing!
*/
