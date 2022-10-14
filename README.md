# pic-resize-demo
Proof of concept for using Javascript in the browser to:
- Change an image's aspect ratio from 4x3 to 16x9 using the [magic kernel](http://www.johncostella.com/magic/) algorithm
  - The magic kernel algorithm performs image rescaling without cropping, minimal distortion and added sharpness
- Transfer image metadata (EXIF) to the resized image
- Download resized image

Run with `npm start`

## Example
### Original 4x3
![](src/assets/4x3-with-metadata.jpg)

### Resized 16x9 (including metadata)
![](src/assets/16x9-resized.jpg)

Metadata can viewed by downloading and inspecting these photos located in `src/assets`
