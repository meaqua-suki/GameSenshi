import React from 'react'
import { FinalInput } from 'componentMolecules/FinalInput/FinalInput'
import { ExportAtoms } from 'componentAtoms'
import { stopUndefined } from 'utils'

const { InputText, InputSelect } = stopUndefined(ExportAtoms)

const defaultProps = { onChange: () => {}, onValueChange: () => {} }
const FinalInputText = props => {
	const { onChange, onValueChange, ...restProps } = {
		...defaultProps,
		...props,
	}
	return (
		<FinalInput
			Component={InputText}
			onChange={e => {
				return onChange(e, onValueChange)
			}}
			{...restProps}
		/>
	)
}

const FinalInputSelect = props => {
	const { onValueChange, ...restProps } = { ...defaultProps, ...props }
	return (
		<FinalInput
			Component={InputSelect}
			onChange={e => {
				onValueChange(e)
				return e
			}}
			{...restProps}
		/>
	)
}

export { FinalInputText, FinalInputSelect }
