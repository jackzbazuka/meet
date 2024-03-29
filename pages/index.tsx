// Core imports
import { query, where, getDocs } from 'firebase/firestore'
import { SyntheticEvent, useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'

// Native imports
import { auth, usersRef } from 'utils/clientApp'
import Scheduler from 'components/Scheduler'
import ScheduleTable from 'components/ScheduleTable'

type slot = {
	day: string
	startTime: string
	endTime: string
}

export default function Home() {
	const [user, loading, error] = useAuthState(auth)
	const [userSlots, setUserSlots] = useState<slot[]>([])
	const [newSchedule, setNetSchedule] = useState<boolean>(false)

	useEffect(() => {
		if (user) {
			;(async () => {
				const q = query(usersRef, where('uid', '==', user.uid))
				const querySnapshot = await getDocs(q)

				if (!querySnapshot.empty) {
					querySnapshot.forEach((doc) => {
						const availSlots = doc.data()['slots']
						setUserSlots(availSlots)
					})
				}
			})()
		}
	}, [user])

	const addSlotHandler = (e: SyntheticEvent<HTMLButtonElement>) => {
		e.preventDefault()

		setNetSchedule(true)
	}

	const handleCopy = (e: SyntheticEvent<HTMLButtonElement>) => {
		e.preventDefault()

		window.navigator.clipboard.writeText(
			String(`${window.location.hostname}${'/'}${user?.uid}`)
		)

		window.alert('Link copied to clipboard')
	}

	return (
		<div className='grid h-full w-full place-items-center'>
			{user ? (
				newSchedule ? (
					<Scheduler />
				) : (
					<div className=' flex w-full flex-col gap-5'>
						<h1 className='text-center text-xl font-semibold'>
							Schedule
						</h1>

						<ScheduleTable userSlots={userSlots} />

						<div className='flex flex-row items-center justify-center gap-5'>
							<button
								onClick={addSlotHandler}
								className='flex flex-row items-center gap-2 rounded bg-green-100 px-3 py-2 text-center text-sm font-medium text-green-600 transition-all hover:bg-green-200'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									className='h-5 w-5'
									fill='none'
									viewBox='0 0 24 24'
									stroke='currentColor'
									strokeWidth={2}>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										d='M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z'
									/>
								</svg>
								Add slot
							</button>

							<button
								onClick={handleCopy}
								className='flex flex-row items-center gap-2 rounded bg-blue-100 px-3 py-2 text-center text-sm font-medium text-blue-600 transition-all hover:bg-blue-200'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									className='h-5 w-5'
									fill='none'
									viewBox='0 0 24 24'
									stroke='currentColor'
									strokeWidth={2}>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2'
									/>
								</svg>
								Share link
							</button>
						</div>
					</div>
				)
			) : (
				<span className='text-3xl font-semibold'>
					Login to access the application
				</span>
			)}
		</div>
	)
}
