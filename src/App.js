import './App.css';
import * as Pica from 'pica'
import piexif from 'piexifjs'

function App() {

    let imageMetadata;
    let isResized = false

    const handleOnLoad = async (e) => {
        const img = e.target
        // need this to read exif data because converting to canvas removes it
        const reader = new FileReader()
        reader.onloadend = async () => {
            const exifObj = piexif.load(reader.result) // get exif data from img
            imageMetadata = piexif.dump(exifObj) // dump as str
            await processImage(img)
        }
        const res = await fetch(img.src)
        const blob = await res.blob()
        reader.readAsDataURL(blob)
    }

    const processImage = async (originalImg) => {
        const aspectRatioMultiplier = originalImg.naturalWidth / 16
        const resizedWidth = aspectRatioMultiplier * 16
        const resizedHeight = aspectRatioMultiplier * 9
        const resizedImg = document.getElementById("16x9-canvas")
        resizedImg.width = resizedWidth
        resizedImg.height = resizedHeight
        const pica = new Pica()
        await pica.resize(originalImg, resizedImg, {
            unsharpAmount: 160,
            unsharpRadius: 0.6,
            unsharpThreshold: 1
        })
        isResized = true
    }

    const downloadResizedImage = () => {
        if (!isResized || !imageMetadata) return
        const resizedImage = document.getElementById("16x9-canvas")
        const rawImageData = resizedImage.toDataURL("image/jpeg")
        const enrichedImageData = piexif.insert(imageMetadata, rawImageData)
        const downloadLink = document.getElementById("download-link")
        downloadLink.setAttribute('download', "resized.jpg")
        downloadLink.setAttribute('href', enrichedImageData);
        downloadLink.click()
    }

    return (
        <div className="app app-header">
            <h3>Original 4x3 Image</h3>
            <img src={require("./assets/4x3-with-metadata.jpg")}
                 onLoad={handleOnLoad}/>
            <h3>Upscaled 16x9 Image</h3>
            <canvas id="16x9-canvas" onClick={downloadResizedImage}/>
            <a id="download-link"/>
        </div>
    );
}

export default App;
