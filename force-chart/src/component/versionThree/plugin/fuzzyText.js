// Convert text into grid of points that lay on top of the text
// Inspired by FizzyText. See http://bl.ocks.org/tophtucker/978513bc74d0b32d3795
function rasterizeText(text, options) {
	let o = options || {}
	let fontSize = o.fontSize || '200px',
		fontWeight = o.fontWeight || '600',
		fontFamily = o.fontFamily || 'sans-serif',
		textAlign = o.center || 'center',
		textBaseline = o.textBaseline || 'middle',
		spacing = o.spacing || 10,
		width = o.width || 960,
		height = o.height || 500,
		x = o.x || width / 2,
		y = o.y || height / 2

	let canvas = document.createElement('canvas')
	canvas.width = width
	canvas.height = height

	let context = canvas.getContext('2d')

	context.font = [fontWeight, fontSize, fontFamily].join(' ')
	context.textAlign = textAlign
	context.textBaseline = textBaseline

	let dx = context.measureText(text).width,
		dy = +fontSize.replace('px', ''),
		bBox = [
			[x - dx / 2, y - dy / 2],
			[x + dx / 2, y + dy / 2],
		]

	context.fillText(text, x, y)

	let imageData = context.getImageData(0, 0, width, height)

	let pixels = []
	for (let x = bBox[0][0]; x < bBox[1][0]; x += spacing) {
		for (let y = bBox[0][1]; y < bBox[1][1]; y += spacing) {
			let pixel = getPixel(imageData, x, y)
			if (pixel[3] !== 0) pixels.push([x, y])
		}
	}

	return pixels
}

function getPixel(imageData, x, y) {
	let i = 4 * (parseInt(x) + parseInt(y) * imageData.width)
	let d = imageData.data
	return [d[i], d[i + 1], d[i + 2], d[i + 3]]
}

export { rasterizeText }
