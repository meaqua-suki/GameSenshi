import { Exports as ExportCompounds } from 'component_d_Compounds'
import {
	FormSignInPropedSignIn,
	FormSignInStoreSignInPropedApp,
} from './FormSignIn'
import { FormSignUpPropedDefault } from './FormSignUp'
import { FormCard, FORM_CARD_DEFAULT } from './FormCard'
import { TabPaneAccountSettings } from './TabPaneAccountSettings'
import { TabPaneGeneralSettings } from './TabPaneGeneralSettings'
import { FormResetPasswordPropedDefault } from './FormResetPassword'
import { NavbarIndexStoreAlertPropApp } from './NavbarIndex'
import { CheckoutCardPropedDefault } from './CheckoutCard'
import { ContainerSearchResultsPropedDefault } from './ContainerSearchResults'
import { TabProductPropedProfile } from './TabProduct'

export const Exports = {
	...ExportCompounds,
	FormSignInPropedSignIn,
	FormSignInStoreSignInPropedApp,
	FormSignUpPropedDefault,
	FormCard,
	FORM_CARD_DEFAULT,
	TabPaneAccountSettings,
	TabPaneGeneralSettings,
	FormResetPasswordPropedDefault,
	NavbarIndexStoreAlertPropApp,
	CheckoutCardPropedDefault,
	ContainerSearchResultsPropedDefault,
	TabProductPropedProfile,
}
