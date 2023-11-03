import Image from "next/image";
import { useEffect, useRef } from "react";

import findPixelColorFunction from "@/helper/findPixelColor";

type DrawCanvasProps = {
  canvasId: string;
  duration: number;
  randomMax: number;
  filepath: string;
};

const DrawCanvas: React.FC<DrawCanvasProps> = ({
  canvasId,
  duration,
  randomMax,
  filepath,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      // Get canvas set up

      const ctx = canvas.getContext("2d");
      if (ctx) {
        let xpos = 0;
        let ypos = 0;
        let color = "white";
        let previousColor = "white";
        let mid_color = "";
        let mid_color2 = "";
        let mid_color3 = "";

        let previous_filepath = "";

        const generateRandNumber = (max: number) => {
          return Math.floor(Math.random() * max);
        };

        ctx.beginPath();

        let random_start_xpos = generateRandNumber(501);
        let random_start_ypos = generateRandNumber(501);
        ctx.moveTo(random_start_xpos, random_start_ypos);

        let iteration = 0;

        // set to 0,0 because we start from 0,0
        let previous_xpos = random_start_xpos;
        let previous_ypos = random_start_ypos;

        const draw = async () => {
          if (iteration < duration) {
            xpos = generateRandNumber(randomMax);
            ypos = generateRandNumber(randomMax);

            // if filepath changed, clear the canvas
            if (previous_filepath != filepath) {
              ctx.clearRect(0, 0, canvas.width, canvas.height);
            }

            // get color from logo and apply
            color = await findPixelColorFunction(
              filepath,
              xpos,
              ypos
            ).then();

            // 1/4 midpoint
            const mid_xpos = Math.round((previous_xpos + xpos) / 4);
            const mid_ypos = Math.round((previous_ypos + ypos) / 4);

            // 2/4
            const mid_xpos2 = Math.round(
              ((previous_xpos + xpos) * 2) / 4
            );
            const mid_ypos2 = Math.round(
              ((previous_ypos + ypos) * 2) / 4
            );

            // 3/4
            const mid_xpos3 = Math.round(
              ((previous_xpos + xpos) * 3) / 4
            );
            const mid_ypos3 = Math.round(
              ((previous_ypos + ypos) * 3) / 4
            );

            // find midpoint color 1/4
            mid_color = await findPixelColorFunction(
              filepath,
              mid_xpos,
              mid_ypos
            ).then();

            // find midpoint color 2/4
            mid_color2 = await findPixelColorFunction(
              filepath,
              mid_xpos2,
              mid_ypos2
            ).then();
            // find midpoint color 3/4
            mid_color3 = await findPixelColorFunction(
              filepath,
              mid_xpos3,
              mid_ypos3
            ).then();

            const gradient = ctx.createLinearGradient(
              previous_xpos,
              previous_ypos,
              xpos,
              ypos
            );

            // three color stops starting, midpoint, and finally new x,y position
            gradient.addColorStop(0, previousColor);
            gradient.addColorStop(0.25, mid_color);
            gradient.addColorStop(0.5, mid_color2);
            gradient.addColorStop(0.75, mid_color3);
            gradient.addColorStop(1, color);

            ctx.strokeStyle = gradient;
            ctx.beginPath();
            ctx.moveTo(previous_xpos, previous_ypos);
            ctx.lineTo(xpos, ypos);
            ctx.stroke();

            previous_xpos = xpos;
            previous_ypos = ypos;
            previousColor = color;
            previous_filepath = filepath;

            iteration++;
            setTimeout(draw, 10);
          }
        };
        draw();
      }
    }
  }, [duration, randomMax, filepath]);

  return (
    <div>
      <canvas ref={canvasRef} width={500} height={500}></canvas>
    </div>
  );
};

export default DrawCanvas;
