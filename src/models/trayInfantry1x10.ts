import { colorize, hexToRgb } from '@jscad/modeling/src/colors'
import { Geom3 } from '@jscad/modeling/src/geometries/types'
import { subtract, union } from '@jscad/modeling/src/operations/booleans'
import { translate } from '@jscad/modeling/src/operations/transforms'
import { cuboid } from '@jscad/modeling/src/primitives'

const width = 25
const length = 250
const wallDepth = 5.25

const smallCubeSideLength = 20.5
const smallCubeDepth = 3.5

const countCubes = 10
const spacing = 2.25
const defaultTranslateValue = 0

const cubeZ =
	// move it to Z=0
	smallCubeDepth / 2 +
	// and to the top of the base-layer
	(wallDepth - smallCubeDepth)

export const codefreeze = (): Geom3[] => {
	const geos: Geom3[] = []

	const stamps: Geom3[] = []

	//for (let j = -5; j < 5; j++) {
	for (let i = 0; i < countCubes; i++) {
		const translateXAmount = i * (smallCubeSideLength + spacing * 2)
		const translateYAmount = -12.5 //j * (smallCubeSideLength + spacing * 2)
		stamps.push(
			cuboid({
				size: [smallCubeSideLength, smallCubeSideLength, smallCubeDepth],
				center: [translateXAmount, translateYAmount, cubeZ],
			}),
		)
	}
	//}
	const translateXAmount = -2.5 * (smallCubeSideLength + spacing * 2)
	geos.push(
		colorize(
			hexToRgb('#1F1C83'),
			subtract(
				// this is the base plate
				cuboid({
					size: [length, width, wallDepth],
					center: [50, -0.75, wallDepth / 2],
				}),
				translate(
					[
						translateXAmount,
						smallCubeSideLength / 2 + 1.5,
						defaultTranslateValue,
					],
					union(stamps),
				),
			),
		),
	)

	return geos
}
