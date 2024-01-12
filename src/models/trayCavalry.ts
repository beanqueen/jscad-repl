import { colorize, hexToRgb } from '@jscad/modeling/src/colors'
import { Geom3 } from '@jscad/modeling/src/geometries/types'
import { subtract, union } from '@jscad/modeling/src/operations/booleans'
import { translate } from '@jscad/modeling/src/operations/transforms'
import { cuboid } from '@jscad/modeling/src/primitives'

const width = 125
const length = 150
const wallDepth = 5.25
const centerZAmount = wallDepth / 2

const cavalrySideLength = 27
const cavalrySideWidth = 52
const cavalryDepth = 3.5

const countCavalry = 5
const sideSpacing = 1.5
const defaultTranslateValue = 0
const heightDifference = 1.75

export const codefreeze = (): Geom3[] => {
	const geos: Geom3[] = []

	const stamps: Geom3[] = []

	for (let j = 0; j < 2; j++) {
		for (let i = 0; i < countCavalry; i++) {
			const translateXAmount = (i - 2) * (cavalrySideLength + sideSpacing * 2)
			const x = j === 0 ? -cavalrySideWidth / 2 - 6 : -cavalrySideWidth / 2 + 3
			const translateYAmount = x + j * (cavalrySideWidth + sideSpacing * 2)
			const translateZAmount = centerZAmount + heightDifference
			stamps.push(
				cuboid({
					size: [cavalrySideLength, cavalrySideWidth, cavalryDepth],
					center: [translateXAmount, translateYAmount, translateZAmount],
				}),
			)
		}
	}
	const translateXAmount = 0 //-2.5 * (cavalrySideLength + spacing*2);
	geos.push(
		colorize(
			hexToRgb('#00FF00'),
			subtract(
				cuboid({
					size: [length, width, wallDepth],
					center: [defaultTranslateValue, defaultTranslateValue, centerZAmount],
				}),
				translate(
					[translateXAmount, defaultTranslateValue, defaultTranslateValue],
					union(stamps),
				),
			),
		),
	)

	return geos
}
