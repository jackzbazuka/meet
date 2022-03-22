// Core imports
import { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRouter } from 'next/router'
import { query, getDocs, addDoc, updateDoc, where } from 'firebase/firestore'

// Native imports
import { auth, usersRef } from 'utils/clientApp'
import DayScheduler from 'components/DayScheduler'
import TimeScheduler from 'components/TimeScheduler'

export default function Scheduler() {
	const days = [
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday',
		'Sunday',
	]

	const [user, loading, error] = useAuthState(auth)

	const router = useRouter()

	const [selectedDay, setSelectedDay] = useState(days[0])
	const [fromSelectedTime, setFromSelectedTime] = useState('10:00')
	const [toSelectedTime, setToSelectedTime] = useState('11:00')

	const [activeComponent, setActiveComponent] = useState<string>('day')

	const handleSubmit = async (e: Event) => {
		e.preventDefault()

		if (user) {
			const userUID = user.uid
			const userName = user.displayName
			const userEmail = user.email

			const q = query(usersRef, where('uid', '==', user.uid))
			const querySnapshot = await getDocs(q)

			if (querySnapshot.empty) {
				// If doc does not exist
				await addDoc(usersRef, {
					uid: userUID,
					username: userName,
					email: userEmail,
					slots: [
						{
							day: selectedDay,
							startTime: fromSelectedTime,
							endTime: toSelectedTime,
						},
					],
				})
					.then((res) => {
						console.log(`Document written with id: ${res.id}`)
						router.reload()
					})
					.catch((err) => console.log(err.response))
			} else {
				// Doc does exists
				// If doc exits push to slots array
				querySnapshot.forEach((doc) => {
					const tempSlotCopy = doc.data()['slots']
					const documentRef = doc.ref

					tempSlotCopy.push({
						day: selectedDay,
						startTime: fromSelectedTime,
						endTime: toSelectedTime,
					})

					updateDoc(documentRef, {
						slots: tempSlotCopy,
					})
						.then((res) => {
							console.log(res)
							console.log('Updated slots field')
							router.reload()
						})
						.catch((err) => console.log(err))
				})
			}
		}
	}

	return (
		<div className='grid h-full place-items-center rounded-xl border-4 border-slate-500 p-10'>
			{activeComponent === 'day' ? (
				<DayScheduler
					days={days}
					selectedDay={selectedDay}
					setSelectedDay={setSelectedDay}
					setActiveComponent={setActiveComponent}
				/>
			) : (
				<TimeScheduler
					fromSelectedTime={fromSelectedTime}
					setFromSelectedTime={setFromSelectedTime}
					toSelectedTime={toSelectedTime}
					setToSelectedTime={setToSelectedTime}
					handleSubmit={handleSubmit}
					setActiveComponent={setActiveComponent}
				/>
			)}
		</div>
	)
}
