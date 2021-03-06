import React from 'react'
import { FinalTextPassword, FINAL_TEXT_PASSWORD } from './FinalTextPassword'

import {
	signUpPasswordValidation,
	passwordPopoverMessages,
	signInPasswordValidation,
	stopUndefined,
} from 'utils'

// components
import { Exports } from 'component_c_Molecules'

const { LabelForm } = stopUndefined(Exports)

const FinalTextPasswordPropedSignUp = props => {
	return (
		<FinalTextPassword
			validation={signUpPasswordValidation}
			popoverMessages={passwordPopoverMessages}
			{...props}
		/>
	)
}

const FinalTextPasswordPropedSignIn = props => {
	return (
		<FinalTextPassword
			validation={signInPasswordValidation}
			hideSuccess
			{...props}
		/>
	)
}

const FinalTextPasswordPropedAccount = props => {
	return (
		<LabelForm label='Email' htmlFor={FINAL_TEXT_PASSWORD}>
			<FinalTextPassword
				validation={signUpPasswordValidation}
				hideSuccess
				onlyShowErrorAfterSubmit
				{...props}
			/>
		</LabelForm>
	)
}

export {
	FinalTextPasswordPropedSignUp,
	FinalTextPasswordPropedSignIn,
	FinalTextPasswordPropedAccount,
	FINAL_TEXT_PASSWORD,
}
