import { colorize, hexToRgb } from '@jscad/modeling/src/colors'
import { Geom3 } from '@jscad/modeling/src/geometries/types'
import { subtract, union } from '@jscad/modeling/src/operations/booleans'
import { translate } from '@jscad/modeling/src/operations/transforms'
import { cuboid } from '@jscad/modeling/src/primitives'

const width = 125
const length = 150
const wallDepth = 5.25

const smallCubeSideLength = 22
const smallCubeDepth = 3.5

const countCubes = 6
const spacing = 1.5
const defaultTranslateValue = 0

export const codefreeze = (): Geom3[] => {
	const geos: Geom3[] = []

	const stamps: Geom3[] = []

	for (let j = -2; j < 3; j++) {
		for (let i = 0; i < countCubes; i++) {
			const translateXAmount = i * (smallCubeSideLength + spacing * 2)
			const translateYAmount = j * (smallCubeSideLength + spacing * 2)
			const translateZAmount = wallDepth / 2 + 1.75
			stamps.push(
				cuboid({
					size: [smallCubeSideLength, smallCubeSideLength, smallCubeDepth],
					center: [translateXAmount, translateYAmount, translateZAmount],
				}),
			)
		}
	}
	const translateXAmount = -2.5 * (smallCubeSideLength + spacing * 2)
	const centerZAmount = wallDepth / 2
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
