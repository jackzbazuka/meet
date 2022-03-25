// Core imports
import {
	Dispatch,
	MouseEvent,
	SetStateAction,
	SyntheticEvent,
	useEffect,
	useState,
} from 'react'

type Props = {
	days: string[]
	selectedDay: string
	setSelectedDay: Dispatch<SetStateAction<string>>
	setActiveComponent: Dispatch<SetStateAction<string>>
}

export default function DayScheduler({
	days,
	selectedDay,
	setSelectedDay,
	setActiveComponent,
}: Props) {
	const handleNext = async (e: SyntheticEvent<HTMLButtonElement>) => {
		e.preventDefault()

		setActiveComponent('time')
	}

	const handleRadioChange = (e: MouseEvent, idx: number) => {
		e.preventDefault()

		setSelectedDay(days[idx])
	}

	return (
		<div className='relative flex h-[30vw] min-h-[20vw] w-[60vw] min-w-[40vw] flex-col items-center justify-around gap-20 pb-32'>
			<div className='flex flex-col items-center gap-3'>
				<h3 className='text-2xl font-semibold'>Day</h3>
				<p className='text-center text-sm italic text-gray-400'>
					Select a day to set your availability
				</p>
			</div>

			<div
				id='day-picker'
				className='grid auto-cols-fr auto-rows-fr grid-cols-2 place-items-center justify-around gap-5 lg:grid-cols-5'>
				{days.map((day, idx) => (
					<div
						className={`w-full rounded-lg border px-3 py-2 text-center text-sm transition-all lg:hover:cursor-pointer ${
							selectedDay === day
								? 'border-blue-800 bg-blue-800 text-white'
								: 'bg-white text-black lg:hover:bg-blue-50'
						}`}
						key={idx}
						onClick={(e) => handleRadioChange(e, idx)}>
						{day}
					</div>
				))}
			</div>

			<button
				onClick={handleNext}
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
