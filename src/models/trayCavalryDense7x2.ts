import { colorize, hexToRgb } from '@jscad/modeling/src/colors'
import { Geom3 } from '@jscad/modeling/src/geometries/types'
import { subtract, union } from '@jscad/modeling/src/operations/booleans'
import { translate } from '@jscad/modeling/src/operations/transforms'
import { cuboid } from '@jscad/modeling/src/primitives'

const width = 120
const length = 210
const wallDepth = 5.25

const cavalrySideLength = 24
const cavalrySideWidth = 50
const cavalryDepth = 3.5

const countCavalry = 7
const sideSpacing = 3
const defaultTranslateValue = 0
const cubeZ =
	// move it to Z=0
	cavalryDepth / 2 +
	// and to the top of the base-layer
	(wallDepth - cavalryDepth)

export const codefreeze = (): Geom3[] => {
	const geos: Geom3[] = []

	const stamps: Geom3[] = []

	for (let j = 0; j < 2; j++) {
		for (let i = 0; i < countCavalry; i++) {
			const translateXAmount = (i - 2) * (cavalrySideLength + sideSpacing * 2)
			const x = j === 0 ? -cavalrySideWidth / 2 - 6 : -cavalrySideWidth / 2
			const translateYAmount = x + j * (cavalrySideWidth + sideSpacing * 2)
			stamps.push(
				cuboid({
					size: [cavalrySideLength, cavalrySideWidth, cavalryDepth],
					center: [translateXAmount, translateYAmount, cubeZ],
				}),
			)
		}
	}

	geos.push(
		colorize(
			hexToRgb('#00FF00'),
			subtract(
				// this is the base plate
				cuboid({
					size: [length, width, wallDepth],
					center: [14, defaultTranslateValue, wallDepth / 2],
				}),
				translate([-16, 0, defaultTranslateValue], union(stamps)),
			),
		),
	)

	return geos
}
