type Slot = { day: string; startTime: string; endTime: string }

type Props = {
	userSlots: Slot[]
}

export default function ScheduleTable({ userSlots }: Props) {
	return (
		<div className='w-full overflow-hidden rounded-2xl p-5'>
			{userSlots.length > 0 ? (
				<table className='min-w-full divide-y divide-gray-200'>
					<thead className='bg-purple-100'>
						<tr className='items-center transition-all hover:bg-purple-200'>
							<th
								scope='col'
								className='px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-purple-500'>
								Day
							</th>

							<th
								scope='col'
								className='px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-purple-500'>
								From
							</th>

							<th
								scope='col'
								className='px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-purple-500'>
								To
							</th>
						</tr>
					</thead>

					<tbody className='divide-y divide-gray-200 bg-white text-sm'>
						{userSlots.map((slot, idx) => (
							<tr
								key={idx}
								className='items-center transition-all hover:bg-purple-50'>
								<td className='whitespace-nowrap px-6 py-4'>
									{slot.day}
								</td>

								<td className='whitespace-nowrap px-6 py-4'>
									{slot.startTime}
								</td>

								<td className='whitespace-nowrap px-6 py-4'>
									{slot.endTime}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			) : (
				<span className='flex flex-row justify-center text-center text-sm italic text-gray-400'>
					No schedule available
				</span>
			)}
		</div>
	)
}
