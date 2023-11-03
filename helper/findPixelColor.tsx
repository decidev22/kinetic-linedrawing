const findPixelColorFunction = (
  src: string,
  xpos: number,
  ypos: number
) => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = src;
    image.crossOrigin = "Anonymous";
    image.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (ctx) {
        canvas.width = image.width;
        canvas.height = image.height;
        ctx.drawImage(image, 0, 0);
        try {
          const pixelData = ctx.getImageData(xpos, ypos, 1, 1).data;
          const [red, green, blue, alpha] = pixelData;
          const rgbaColor = `rgba(${red}, ${green}, ${blue}, ${
            alpha / 255
          })`;
          resolve(rgbaColor);
        } catch (e) {
          reject(e);
        }
      }
    };
    image.onerror = reject;
  });
};

export default findPixelColorFunction;
