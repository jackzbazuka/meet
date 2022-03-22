import {
	Dispatch,
	SetStateAction,
	MouseEvent,
	SyntheticEvent,
	useEffect,
} from 'react'

type Props = {
	fromSelectedTime: string
	setFromSelectedTime: Dispatch<SetStateAction<string>>
	toSelectedTime: string
	setToSelectedTime: Dispatch<SetStateAction<string>>
	handleSubmit: any
	setActiveComponent: Dispatch<SetStateAction<string>>
}

export default function TimeScheduler({
	fromSelectedTime,
	setFromSelectedTime,
	toSelectedTime,
	setToSelectedTime,
	handleSubmit,
	setActiveComponent,
}: Props) {
	const handlePrev = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()

		setActiveComponent('day')
	}

	return (
		<div className='relative flex h-[30vw] min-h-[20vw] w-[60vw] min-w-[40vw] flex-col items-center justify-around gap-20 pb-32'>
			<div className='flex flex-col items-center gap-3'>
				<h3 className='text-2xl font-semibold'>Time</h3>
				<p className='text-center text-sm italic text-gray-400'>
					Select statr and end time
				</p>
			</div>

			<div
				id='day-picker'
				className='flex flex-row items-center justify-around gap-5'>
				<label className='text-base'>From</label>
				<input
					id='from-time-picker'
					className='border p-2'
					type='time'
					value={fromSelectedTime}
					onChange={(e) => {
						setFromSelectedTime(e.target.value)
						setToSelectedTime(e.target.value)
					}}
				/>
				<label className='text-base'>To</label>
				<input
					id='to-time-picker'
					className='border p-2'
					type='time'
					min={fromSelectedTime}
					value={toSelectedTime}
					onChange={(e) => setToSelectedTime(e.target.value)}
				/>
			</div>

			<button
				onClick={handlePrev}
				className='absolute bottom-1 left-1 transition-all hover:-translate-x-1 hover:text-purple-600'>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					className='h-6 w-6'
					fill='none'
					viewBox='0 0 24 24'
					stroke='currentColor'
					strokeWidth={2}>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						d='M10 19l-7-7m0 0l7-7m-7 7h18'
					/>
				</svg>
			</button>

			<button
				onClick={handleSubmit}
				className='absolute bottom-1 right-1 transition-all hover:translate-x-1 hover:text-purple-600'>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					className='h-6 w-6'
					fill='none'
					viewBox='0 0 24 24'
					stroke='currentColor'
					strokeWidth={2}>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						d='M14 5l7 7m0 0l-7 7m7-7H3'
					/>
				</svg>
			</button>
		</div>
	)
}
