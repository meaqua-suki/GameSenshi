// states
import {
	RESET_STATE,
	storeAlert,
	storeSignIn,
	storeProgress,
	storeUser,
	storeWrapper,
	storeUserOnSignIn,
	storeModalOnAuthStateChange,
	storeUserOnSignOut,
} from 'state'
import { auth } from 'firebaseInit/core'
import { docGeneralSettingOnSnapshot } from 'firebaseInit/fireStored'

let unsubscribe = () => {}

const onAuthChanged = (userAuth, onSnapshot) => {
	storeModalOnAuthStateChange()
	if (userAuth) {
		unsubscribe = onSnapshot(
			doc => {
				const userData = doc.data()
				storeUserOnSignIn(userAuth, userData)
			},
			() => {
				//handle error here
			}
		)
	}
	// reset all store if user sign out
	else {
		storeUserOnSignOut()
		unsubscribe()
		unsubscribe = () => {}
		const stores = [
			storeAlert,
			storeSignIn,
			storeProgress,
			storeUser,
			storeWrapper,
		]
		stores.forEach(store => {
			store[RESET_STATE]()
		})
	}
}

const onAuthChange = () => {
	auth().onAuthStateChanged(userAuth => {
		onAuthChanged(userAuth, (next, error) =>
			docGeneralSettingOnSnapshot(
				{ includeMetadataChanges: true },
				{ next, error }
			)
		)
	})
}

export { onAuthChange }