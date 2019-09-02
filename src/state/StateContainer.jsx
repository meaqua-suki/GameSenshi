import React from 'react'
import { Subscribe } from 'unstated'
import { STATE } from 'state/constants'

const StateContainer = (
	Component,
	stores = [],
	stateToPropsMaps = [],
	methodToPropsMaps = []
) => {
	return props => (
		<Subscribe to={stores}>
			{() => {
				const accProps = stores.reduce((accProps, store, i) => {
					for (const prop in stateToPropsMaps[i]) {
						accProps[prop] = store[STATE][stateToPropsMaps[i][prop]]
					}
					for (const prop in methodToPropsMaps[i]) {
						accProps[prop] = methodToPropsMaps[i][prop]
					}
					return accProps
				}, {})
				return <Component {...accProps} {...props} />
			}}
		</Subscribe>
	)
}

export { StateContainer }
