import React from 'react'
import { FinalSelectGame, FINAL_SELECT_GAME } from './FinalSelectGame'

// components
import { stopUndefined } from 'utils'
import { Exports } from 'component_c_Molecules'

const { LabelForm } = stopUndefined(Exports)

const FinalSelectGamePropedGeneraL = props => {
	return (
		<LabelForm label='Select a game' htmlFor={FINAL_SELECT_GAME}>
			<FinalSelectGame hideSuccess onlyShowErrorAfterSubmit {...props} />
		</LabelForm>
	)
}

export { FinalSelectGamePropedGeneraL, FINAL_SELECT_GAME }
