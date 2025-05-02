export function AvatarUpload({
	initialAvatar, onAvatarUploaded,
}: {
	initialAvatar?: string;
	onAvatarUploaded: (src: string) => void;
}) {
	return (
		<div className="w-full flex justify-center mb-4">
			<div className="relative">
				<div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
					{initialAvatar ? (
						<img
							src={initialAvatar}
							alt="Customer avatar"
							className="w-full h-full object-cover" />
					) : (
						<svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
						</svg>
					)}
				</div>
				<input
					type="file"
					id="avatar-upload"
					accept="image/*"
					className="hidden"
					onChange={(e) => {
						const file = e.target.files?.[0];
						if (file) {
							const reader = new FileReader();
							reader.onloadend = () => {
								onAvatarUploaded(reader.result as string);

							};
							reader.readAsDataURL(file);
						}
					}} />
				<label
					htmlFor="avatar-upload"
					className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-1 cursor-pointer"
				>
					<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
					</svg>
				</label>
			</div>
		</div>
	);
}
