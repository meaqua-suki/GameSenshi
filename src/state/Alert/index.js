import { AlertContainer } from 'state/Alert/AlertContainer'
import {
	AlertStore,
	ALERT_STATE_BODY,
	ALERT_STATE_OPEN,
	ALERT_STATE_COLOR,
	ALERT_STATE_ICON,
	ALERT_SHOW,
	ALERT_TOGGLE,
} from 'state/Alert/AlertStore'

const alertStore = new AlertStore()
const alertStoreShow = alertStore[ALERT_SHOW].bind(alertStore)
const alertStateToggle = alertStore[ALERT_TOGGLE].bind(alertStore)
const alertStoreSetState = alertStore.setState.bind(alertStore)

// why no export state, because it lose reference very easily

export {
	alertStore,
	AlertContainer,
	alertStoreShow,
	alertStateToggle,
	alertStoreSetState,
	ALERT_STATE_BODY,
	ALERT_STATE_OPEN,
	ALERT_STATE_COLOR,
	ALERT_STATE_ICON,
}