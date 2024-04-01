import { colorize, hexToRgb } from '@jscad/modeling/src/colors'
import { Geom3 } from '@jscad/modeling/src/geometries/types'
import { subtract, union } from '@jscad/modeling/src/operations/booleans'
import { translate } from '@jscad/modeling/src/operations/transforms'
import { cuboid } from '@jscad/modeling/src/primitives'

const width = 60
const length = 210
const wallDepth = 5.25

const smallCubeSideLength = 25.5
const smallCubeDepth = 3.5

const countCubes = 7
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

	for (let j = -1; j < 1; j++) {
		for (let i = 0; i < countCubes; i++) {
			const translateXAmount = i * (smallCubeSideLength + spacing * 2)
			const translateYAmount = j * (smallCubeSideLength + spacing * 2)
			stamps.push(
				cuboid({
					size: [smallCubeSideLength, smallCubeSideLength, smallCubeDepth],
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
					center: [defaultTranslateValue, defaultTranslateValue, wallDepth / 2],
				}),
				translate([-90, 15, defaultTranslateValue], union(stamps)),
			),
		),
	)

	return geos
}
