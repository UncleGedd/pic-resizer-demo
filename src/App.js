import './App.css';
import * as React from 'react'
import * as Pica from 'pica'
import piexif from 'piexifjs'

class App extends React.Component {

    componentDidMount() {
        this.loadImage()
    }

    loadImage = () => {
        const canvas = document.getElementById("4x3-canvas")
        const ctx = canvas.getContext('2d')
        const img = new Image()
        img.src = require("./assets/4x3-with-metadata.jpg")
        img.onload = () => {
            canvas.width = img.naturalWidth
            canvas.height = img.naturalHeight
            ctx.drawImage(img, 0, 0)
            this.processImage(canvas)
        }
    }

    processImage = (originalCanvas) => {
        // get metadata
        const exifObj = piexif.load(originalCanvas.toDataURL("image/jpeg"))
        const exifStr = piexif.dump(exifObj)

        const aspectRatioMultiplier = originalCanvas.width / 16
        const upscaledWidth = aspectRatioMultiplier * 16
        const upscaledHeight = aspectRatioMultiplier * 9
        const upscaledImage = document.getElementById("16x9-canvas")
        upscaledImage.width = upscaledWidth
        upscaledImage.height = upscaledHeight
        const pica = new Pica()
        pica.resize(originalCanvas, upscaledImage, {
            unsharpAmount: 160,
            unsharpRadius: 0.6,
            unsharpThreshold: 1
        })
    }

    render() {
        return (
            <div className="app app-header">
                <h3>Original 4x3 Image</h3>
                <canvas id="4x3-canvas"/>
                {/*<img id={"4x3-canvas"} className={"img-4x3"} src={require("./assets/4x3-with-metadata.jpg")}/>*/}
                <h3>Upscaled 16x9 Image</h3>
                <canvas id="16x9-canvas"/>
            </div>
        );
    }
}

export default App;
