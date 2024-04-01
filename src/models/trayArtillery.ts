import { Geom3 } from '@jscad/modeling/src/geometries/types'
import { subtract } from '@jscad/modeling/src/operations/booleans'
import { cuboid } from '@jscad/modeling/src/primitives'

const width = 55
const length = 79
const wallDepth = 5.25

const smallCubeSideLength = 20.5
const cubeDepth = 3.5
const bigCubeSideLength = 51

const cubeZ =
	// move it to Z=0
	cubeDepth / 2 +
	// and to the top of the base-layer
	(wallDepth - cubeDepth)

export const codefreeze = (): Geom3[] => {
	const plate = cuboid({
		size: [length, width, wallDepth],
		center: [
			0,
			0,
			// Move the plate up, so its bottom is on Z=0
			wallDepth / 2,
		],
	})

	const figure1 = cuboid({
		size: [smallCubeSideLength, smallCubeSideLength, cubeDepth],
		center: [-26.5, -15.2, cubeZ],
	})

	const figure2 = cuboid({
		size: [smallCubeSideLength, smallCubeSideLength, cubeDepth],
		center: [-26.5, 15.2, cubeZ],
	})

	const figure3 = cuboid({
		size: [bigCubeSideLength, bigCubeSideLength, cubeDepth],
		center: [12, 0, cubeZ],
	})

	return [subtract(plate, figure1, figure2, figure3)]
}
