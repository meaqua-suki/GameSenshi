import {
	CREATED_AT,
	UPDATED_AT,
	FIRESTORE_USER_SETTINGS_NOTIFICATION_EMAIL,
	FIRESTORE_USER_SETTINGS_NOTIFICATION_EMAIL_ORDER_UPDATES,
	FIRESTORE_USER_SETTINGS_NOTIFICATION_EMAIL_NEWS_LETTER,
	FIRESTORE_USER_SETTINGS_NOTIFICATION_EMAIL_CHATS,
	FIRESTORE_USER_SETTINGS_NOTIFICATION_EMAIL_COMMENTS,
	FIRESTORE_USER_SETTINGS_NOTIFICATION_PUSH,
	FIRESTORE_USER_SETTINGS_NOTIFICATION_PUSH_ORDER_UPDATES,
	FIRESTORE_USER_SETTINGS_NOTIFICATION_PUSH_CHATS,
	FIRESTORE_USER_SETTINGS_NOTIFICATION_PUSH_COMMENTS,
	FIRESTORE_USER_SETTINGS_GENERAL_DISPLAY_NAME,
	FIRESTORE_USER_SETTINGS_GENERAL_SHORT_ID,
	INTERNAL_ERROR_CODE_5,
	INTERNAL_ERROR_CODE_6,
} from 'constantValues'
import nanoid from 'nanoid'
import {
	functions,
	getServerTimestamp,
	docUserSettingGeneralSet,
	docUserSettingNotificationSet,
} from 'firebaseInit'
import { resObj } from 'utils'

const onCreateUser_ = async userRecord => {
	const { uid, displayName } = userRecord

	const isPasswordExist = userRecord.providerData.some(
		data => data.providerId === 'password'
	)

	const serverTimestamp = getServerTimestamp()

	const shortId = nanoid(10)

	try {
		await docUserSettingGeneralSet(uid, {
			[CREATED_AT]: serverTimestamp,
			[UPDATED_AT]: serverTimestamp,
			[FIRESTORE_USER_SETTINGS_GENERAL_SHORT_ID]: shortId,
			...(!isPasswordExist && {
				[FIRESTORE_USER_SETTINGS_GENERAL_DISPLAY_NAME]: displayName || shortId,
			}),
		})
	} catch (err) {
		return console.log(resObj(false, INTERNAL_ERROR_CODE_5, err))
	}
	try {
		await docUserSettingNotificationSet(uid, {
			[CREATED_AT]: serverTimestamp,
			[UPDATED_AT]: serverTimestamp,
			[FIRESTORE_USER_SETTINGS_NOTIFICATION_EMAIL]: {
				[FIRESTORE_USER_SETTINGS_NOTIFICATION_EMAIL_ORDER_UPDATES]: true,
				[FIRESTORE_USER_SETTINGS_NOTIFICATION_EMAIL_CHATS]: true,
				[FIRESTORE_USER_SETTINGS_NOTIFICATION_EMAIL_COMMENTS]: true,
				[FIRESTORE_USER_SETTINGS_NOTIFICATION_EMAIL_NEWS_LETTER]: true,
			},
			[FIRESTORE_USER_SETTINGS_NOTIFICATION_PUSH]: {
				[FIRESTORE_USER_SETTINGS_NOTIFICATION_PUSH_ORDER_UPDATES]: true,
				[FIRESTORE_USER_SETTINGS_NOTIFICATION_PUSH_CHATS]: true,
				[FIRESTORE_USER_SETTINGS_NOTIFICATION_PUSH_COMMENTS]: true,
			},
		})
	} catch (err) {
		return console.log(resObj(false, INTERNAL_ERROR_CODE_6, err))
	}
}

const onCreateUser = functions.auth
	.user()
	.onCreate((userRecord, eventContext) => {
		return onCreateUser_(userRecord, eventContext)
	})

export { onCreateUser }
