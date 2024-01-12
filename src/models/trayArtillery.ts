import { colorize, hexToRgb } from '@jscad/modeling/src/colors'
import { Geom3 } from '@jscad/modeling/src/geometries/types'
import { subtract } from '@jscad/modeling/src/operations/booleans'
// import { translate } from '@jscad/modeling/src/operations/transforms'
import { cuboid } from '@jscad/modeling/src/primitives'

const width = 50
const length = 74
const wallDepth = 5.25

const smallCubeSideLength = 22
const cubeDepth = 3.5
const bigCubeSideLength = 41

const centerZAmount = wallDepth / 2

export const codefreeze = (): Geom3[] => {
	const plate = cuboid({
		size: [length, width, wallDepth],
		center: [0, 0, 0],
	})

	const figure1 = cuboid({
		size: [smallCubeSideLength, smallCubeSideLength, cubeDepth],
		center: [-24.5, -12.5, centerZAmount],
	})

	const figure2 = cuboid({
		size: [smallCubeSideLength, smallCubeSideLength, cubeDepth],
		center: [-24.5, 12.5, centerZAmount],
	})

	const figure3 = cuboid({
		size: [bigCubeSideLength, bigCubeSideLength, cubeDepth],
		center: [12, 0, centerZAmount],
	})

	const substractOne = colorize(
		hexToRgb('#00ab30'),
		subtract(plate, figure1),
	) as Geom3
	const substractTwo = colorize(
		hexToRgb('#00ab30'),
		subtract(substractOne, figure2),
	) as Geom3
	const substractThree = colorize(
		hexToRgb('#00ab30'),
		subtract(substractTwo, figure3),
	) as Geom3

	return [substractThree]
}
