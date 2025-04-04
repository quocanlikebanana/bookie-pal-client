import { Button } from '@/components/ui/button'

export default function Reviews() {
	return (
		<div>
			<h2 className="text-2xl font-bold mb-6">Reviews</h2>
			<div className="flex flex-col md:flex-row items-center justify-between mb-8">
				<p className="mb-4 md:mb-0">Be the first to review us and share insights about your experience.</p>
				<Button variant="outline" className="whitespace-nowrap">
					Write a review
				</Button>
			</div>
		</div>
	)
}
