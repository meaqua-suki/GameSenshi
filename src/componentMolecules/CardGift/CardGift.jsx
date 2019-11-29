import React from 'react'
import { Card, CardBody, Row, Col } from 'reactstrap'
import Image from 'material-ui-image'
import styles from './styles.module.css'

const IMAGE = 'image'

const CardGift = props => {
	const { icons } = props
	return (
		<Row>
			<Col md='5'>
				<div className={styles.gridContainer}>
					{icons.map((icon, index) => {
						const { [IMAGE]: src } = icon
						return (
							<div className={`grid-item-${index + 1}`}>
								<div className={styles.imgWrapper}>
									<Image src={src} alt={src} />
								</div>
							</div>
						)
					})}
				</div>
			</Col>
		</Row>
	)
}

export { CardGift, IMAGE }
