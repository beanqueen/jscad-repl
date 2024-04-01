import { serialize } from '@jscad/stl-serializer'
// modify this line to your file + exported function
// this is what will be rendered by the server
import { codefreeze } from './models/trayInfantryBig8x3.js'
import { renderModel } from './renderModel.js'

const containerElement = document.getElementById('jscad')

// execute you exported function here
const model = codefreeze()

if (containerElement !== null) renderModel({ containerElement, model })

// open console in browser window and type startDownload()
const download = async (blob: Blob) => {
	const file = new File([await blob.arrayBuffer()], `model.stl`)
	const link = document.createElement('a')
	link.style.display = 'none'
	link.href = URL.createObjectURL(file)
	link.download = file.name

	document.body.appendChild(link)
	link.click()

	setTimeout(() => {
		URL.revokeObjectURL(link.href)
		link.parentNode?.removeChild(link)
	}, 0)
}

;(window as any).startDownload = () => {
	const rawData = serialize({ binary: true }, model)
	const blob = new Blob(rawData)
	download(blob).catch(console.error)
}
