import { colorize, hexToRgb } from '@jscad/modeling/src/colors'
import { Geom3 } from '@jscad/modeling/src/geometries/types'
import { subtract } from '@jscad/modeling/src/operations/booleans'
import { cuboid } from '@jscad/modeling/src/primitives'

const width = 60
const length = 101
const wallDepth = 5.25

export const codefreeze = (): Geom3[] => {
	const geos: Geom3[] = []

	geos.push(
		colorize(
			hexToRgb('#1F1C83'),
			subtract(
				// this is the base plate
				cuboid({
					size: [length, width, wallDepth],
					center: [0, 0, wallDepth / 2],
				}),
				cuboid({
					size: [100, 49, 3.5],
					center: [0, 0, 3.5],
				}),
			),
		),
	)

	return geos
}
