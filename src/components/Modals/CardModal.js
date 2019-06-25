import React, { useState, useEffect } from 'react'

// reactstrap
import {
	Button,
	Modal,
	ModalBody,
	ModalFooter,
	Container,
	Row,
	Col,
	FormGroup,
	Input,
	Label,
} from 'reactstrap'

// core components
import { Form as FinalForm } from 'react-final-form'
import Cards from 'react-credit-cards'
import Select from 'react-select'
import InputField from 'components/Inputs/InputField'

// styles
import 'react-credit-cards/lib/styles.scss'

// constants
import {
	CARD_CARDS,
	MONTH_ABVS,
	CARD_CVC,
	CARD_NUMBER,
	CARD_EXPIRY_MONTH,
	CARD_EXPIRY_YEAR,
} from 'constantValues'

// state
import { cardStore, Subscribe } from 'state'

// utils
import valid from 'card-validator'
import { string } from 'yup'
import createDecorator from 'final-form-focus'
import { cardNumberValidation } from 'utils/validation'

const focusOnError = createDecorator()

const cardType = cardNumber => {
	// this is for payment icon
	switch (valid.number(cardNumber)) {
		case 'Visa':
			return 'visa'
		case 'Mastercard':
			return 'mastercard'
		case 'Diners Club':
			return 'diners'
		case 'Discover':
			return 'discover'
		case 'JCB':
			return 'jcb'
		case 'UnionPay':
			return 'unionpay'
		case 'Maestro':
			return 'maestro'
		case 'Elo':
			return 'elo'
		case 'Hipercard':
			return 'hipercard'
		default:
			return 'default'
	}
}

const monthAbvs = [...MONTH_ABVS].map((monthName, i) => ({
	value: i.toString().length === 1 ? '0' + i : i.toString(),
	label: monthName,
}))
monthAbvs[0] = { value: '', label: 'Month', isDisabled: true }

const year = new Date().getFullYear()

const years = Array.from(new Array(30), (e, i) => {
	const yearString = (year + i).toString()
	return { value: yearString, label: yearString }
})

years.unshift({ value: '', label: 'Year', isDisabled: true })

const CardModal = props => {
	const [, forceUpdate] = useState()
	//const [cardNumber, setCardNumber] = useState('')
	const [cardHolderName, setCardHolderName] = useState('')
	const [expiryMonth, setExpiryMonth] = useState('')
	const [expiryYear, setExpiryYear] = useState('')
	const [cvc, setCvc] = useState('')
	const [focus, setFocus] = useState('number')
	const [checked, setChecked] = useState(false)

	const onSubmit = () => {}

	const { open, toggle } = props

	const onChangeNumber = e => {
		let {
			target: { value },
		} = e

		let validate = false

		try {
			validate = string()
				.matches(/^(?:[0-9 ]*)$/, 'only number and space allowed')
				.isValidSync(value)
		} catch (e) {
			//
		}

		value = value.replace(/ /g, '')
		if (validate && value.length < 17) {
			const indexes = [4, 9, 14]
			indexes.forEach(element => {
				if (value.length > element) {
					value = value.substr(0, element) + ' ' + value.substr(element)
				}
			})
			return value
		} else {
			// return false to stop changing it
			return false
		}
	}

	useEffect(() => {
		window.addEventListener('resize', forceUpdate)
		return () => {
			window.removeEventListener('resize', forceUpdate)
		}
	}, [])
	return (
		<Subscribe to={[cardStore]}>
			{cardStore => {
				const {
					state: { [CARD_NUMBER]: cardNumber },
				} = cardStore
				return (
					<Modal
						style={window.innerWidth > 768 ? { maxWidth: 700 } : {}}
						isOpen={open}
						toggle={toggle}
						backdrop='static'
						modalClassName='modal-black'>
						<div className='modal-header'>
							<button
								type='button'
								className='close'
								data-dismiss='modal'
								aria-label='Close'
								onClick={toggle}>
								<i className='tim-icons icon-simple-remove' />
							</button>
							<h5 className='modal-title'>Card</h5>
						</div>
						<FinalForm
							initialValues={{
								[CARD_NUMBER]: '',
								cvc: '',
								expiryMonth: '',
								expiryYear: '',
								cardHolderName: '',
							}}
							decorators={[focusOnError]}
							onSubmit={values => {
								return onSubmit(values)
							}}>
							{({ handleSubmit, submitting }) => (
								<>
									<ModalBody>
										<Container>
											<Row>
												<Col xs='12' md='6'>
													<FormGroup>
														<Cards
															number={cardNumber}
															name={cardHolderName}
															expiry={`${expiryMonth}/${expiryYear}`}
															cvc={cvc}
															focused={focus}
														/>
													</FormGroup>
												</Col>
												<Col
													xs='12'
													md='6'
													className='d-flex align-items-center'>
													<Container>
														<Row>
															<Col>
																<FormGroup>
																	<InputField
																		placeholder='Card Number'
																		name={CARD_NUMBER}
																		type='text'
																		hideSuccess
																		container={cardStore}
																		onChange={onChangeNumber}
																		onFocus={() => {
																			setFocus('number')
																		}}
																		icon='tim-icons icon-email-85'
																		validation={value =>
																			cardNumberValidation(value)
																		}
																	/>
																</FormGroup>
															</Col>
														</Row>
														<Row>
															<Col>
																<FormGroup>
																	<Input
																		placeholder='Card Holder Name'
																		name='Card Holder Name'
																		type='text'
																		value={cardHolderName}
																		onFocus={() => {
																			setFocus('name')
																		}}
																		onChange={e => {
																			const {
																				target: { value },
																			} = e
																			if (value.length < 100) {
																				setCardHolderName(e.target.value)
																			}
																		}}
																	/>
																</FormGroup>
															</Col>
														</Row>
														<Row>
															<Col xs='6' className='pr-0'>
																<FormGroup>
																	<Select
																		className='react-select react-select-info'
																		classNamePrefix='react-select'
																		placeholder='Expiry Month'
																		onFocus={() => {
																			setFocus('expiry')
																		}}
																		value={{
																			value: expiryMonth,
																			label: monthAbvs.find(
																				monthName =>
																					monthName.value === expiryMonth
																			).label,
																		}}
																		onChange={expiryMonth =>
																			setExpiryMonth(expiryMonth.value)
																		}
																		options={monthAbvs}
																	/>
																</FormGroup>
															</Col>
															<Col xs='6'>
																<FormGroup>
																	<Select
																		className='react-select react-select-info'
																		classNamePrefix='react-select'
																		placeholder='Exp Year'
																		onFocus={() => {
																			setFocus('expiry')
																		}}
																		value={{
																			value: expiryYear,
																			label: years.find(
																				year => year.value === expiryYear
																			).label,
																		}}
																		onChange={expiryYear =>
																			setExpiryYear(expiryYear.value)
																		}
																		options={years}
																	/>
																</FormGroup>
															</Col>
														</Row>
														<Row>
															<Col xs='5'>
																<FormGroup>
																	<Input
																		placeholder='CVC'
																		name='CVC'
																		type='tel'
																		value={cvc}
																		onFocus={() => {
																			setFocus('cvc')
																		}}
																		onChange={e => {
																			const {
																				target: { value },
																			} = e
																			if (!isNaN(value) && value.length < 5) {
																				setCvc(value)
																			}
																		}}
																	/>
																</FormGroup>
															</Col>
															<Col xs='7'>
																<FormGroup check className='text-left'>
																	<Label check>
																		<Input
																			type='checkbox'
																			checked={checked}
																			onClick={() => {
																				setChecked(checked => !checked)
																			}}
																			onChange={() => {}}
																		/>
																		<span className='form-check-sign' />
																		set as default?
																	</Label>
																</FormGroup>
															</Col>
														</Row>
													</Container>
												</Col>
											</Row>
										</Container>
									</ModalBody>
									<ModalFooter>
										<Button color='secondary' onClick={toggle}>
											Close
										</Button>
										<Button
											color='primary'
											onClick={() => {
												cardStore.setState(state => {
													if (checked) {
														state[CARD_CARDS].forEach(creditCard => {
															creditCard.isDefault = false
														})
													}
													state[CARD_CARDS].push({
														last4Digits: cardNumber.slice(-4),
														expiryYear,
														expiryMonth,
														cardType: cardType(cardNumber),
														isDefault: checked,
													})
													toggle()
													return state
												})
											}}>
											Continue
										</Button>
									</ModalFooter>
								</>
							)}
						</FinalForm>
					</Modal>
				)
			}}
		</Subscribe>
	)
}

export default CardModal
