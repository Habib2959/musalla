import { useState } from "react";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import { useRouter } from "./Router";
import logo from "../assets/logo.png";

export function Header() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const { currentPage, navigateTo } = useRouter();

	const handleNavigation = (
		page:
			| "home"
			| "mosque-project"
			| "events"
			| "donate"
			| "subscribe"
			| "contact"
	) => {
		navigateTo(page);
		setIsMenuOpen(false);
	};

	const isActive = (page: string) => currentPage === page;

	return (
		<header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
			<div className="max-w-7xl mx-auto">
				<div className="flex justify-between items-center h-20 px-6">
					{" "}
					{/* Increased height */}
					{/* Logo */}
					<div
						className="flex items-center gap-4 cursor-pointer"
						onClick={() => handleNavigation("home")}
					>
						<img
							src={logo}
							alt="NWMIS Logo"
							className="w-12 h-12 object-contain rounded-lg bg-white shadow"
						/>
						<span className="text-gray-900 font-bold tracking-tight text-2xl">
							NWMIS
						</span>
					</div>
					{/* Desktop Navigation - All tabs visible */}
					<nav className="hidden lg:flex items-center space-x-24">
						{" "}
						{/* Further increased space between items */}
						<button
							onClick={() => handleNavigation("home")}
							className={`px-6 text-lg transition-colors duration-200 ${
								isActive("home")
									? "text-green-700 font-bold underline underline-offset-4"
									: "text-gray-700 hover:text-green-700"
							}`}
						>
							Home
						</button>
						<button
							onClick={() => handleNavigation("mosque-project")}
							className={`px-6 text-lg transition-colors duration-200 ${
								isActive("mosque-project")
									? "text-green-700 font-bold underline underline-offset-4"
									: "text-gray-700 hover:text-green-700"
							}`}
						>
							Mosque Project
						</button>
						<button
							onClick={() => handleNavigation("events")}
							className={`px-6 text-lg transition-colors duration-200 ${
								isActive("events")
									? "text-green-700 font-bold underline underline-offset-4"
									: "text-gray-700 hover:text-green-700"
							}`}
						>
							Events
						</button>
						<button
							onClick={() => handleNavigation("subscribe")}
							className={`px-6 text-lg transition-colors duration-200 ${
								isActive("subscribe")
									? "text-green-700 font-bold underline underline-offset-4"
									: "text-gray-700 hover:text-green-700"
							}`}
						>
							Subscribe
						</button>
						<button
							onClick={() => handleNavigation("contact")}
							className={`px-6 text-lg transition-colors duration-200 ${
								isActive("contact")
									? "text-green-700 font-bold underline underline-offset-4"
									: "text-gray-700 hover:text-green-700"
							}`}
						>
							Contact
						</button>
					</nav>
					{/* Right Side */}
					<div className="flex items-center gap-6">
						{/* Donate Button */}
						<Button
							onClick={() => handleNavigation("donate")}
							className="hidden sm:inline-flex bg-green-600 hover:bg-green-700 text-white px-6 py-3 h-12 text-lg font-bold rounded-full transition-all duration-200 shadow-md"
						>
							Donate
						</Button>
						{/* Mobile menu button */}
						<button
							onClick={() => setIsMenuOpen(!isMenuOpen)}
							className="lg:hidden p-3 -m-2 text-gray-700 hover:text-green-700 transition-colors duration-200"
						>
							{isMenuOpen ? (
								<X className="h-7 w-7" />
							) : (
								<Menu className="h-7 w-7" />
							)}
						</button>
					</div>
				</div>

				{/* Mobile Navigation */}
				{isMenuOpen && (
					<div className="lg:hidden border-t border-gray-100 bg-white/95 backdrop-blur-md">
						<div className="px-6 py-8 space-y-10">
							{" "}
							{/* Further increased vertical space between mobile menu items */}
							<button
								onClick={() => handleNavigation("home")}
								className={`block w-full text-left py-3 text-lg transition-colors duration-200 ${
									isActive("home")
										? "text-green-700 font-bold underline underline-offset-4"
										: "text-gray-700"
								}`}
							>
								Home
							</button>
							<button
								onClick={() => handleNavigation("mosque-project")}
								className={`block w-full text-left py-3 text-lg transition-colors duration-200 ${
									isActive("mosque-project")
										? "text-green-700 font-bold underline underline-offset-4"
										: "text-gray-700"
								}`}
							>
								Mosque Project
							</button>
							<button
								onClick={() => handleNavigation("events")}
								className={`block w-full text-left py-3 text-lg transition-colors duration-200 ${
									isActive("events")
										? "text-green-700 font-bold underline underline-offset-4"
										: "text-gray-700"
								}`}
							>
								Events
							</button>
							<button
								onClick={() => handleNavigation("subscribe")}
								className={`block w-full text-left py-3 text-lg transition-colors duration-200 ${
									isActive("subscribe")
										? "text-green-700 font-bold underline underline-offset-4"
										: "text-gray-700"
								}`}
							>
								Subscribe
							</button>
							<button
								onClick={() => handleNavigation("contact")}
								className={`block w-full text-left py-3 text-lg transition-colors duration-200 ${
									isActive("contact")
										? "text-green-700 font-bold underline underline-offset-4"
										: "text-gray-700"
								}`}
							>
								Contact
							</button>
							<div className="pt-4 border-t border-gray-100">
								<Button
									onClick={() => handleNavigation("donate")}
									className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg font-bold rounded-full shadow-md"
								>
									Donate
								</Button>
							</div>
						</div>
					</div>
				)}
			</div>

			{/* Subtle Mosque Project Banner */}
			<div className="bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-100">
				<div className="max-w-7xl mx-auto px-6 py-2">
					<div className="flex items-center justify-center text-center">
						<p className="text-sm text-green-800">
							<span className="font-medium">New Mosque Project:</span>
							<span className="mx-2">$32,000 raised of $50,000 goal</span>
							<button
								onClick={() => handleNavigation("mosque-project")}
								className="text-green-700 hover:text-green-900 font-medium underline underline-offset-2 transition-colors duration-200"
							>
								Learn more
							</button>
						</p>
					</div>
				</div>
			</div>
		</header>
	);
}
