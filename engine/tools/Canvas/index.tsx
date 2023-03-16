import React, { useRef, useEffect, useState } from 'react';

type Props = {
  map: string,
  player: {
    chracterImage: string
  },
  [key: string]: any
}

const Canvas = (props: Props) => {
  const { map, player, ...rest } = props;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 4 });

  console.log(position)

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'w':
          setPosition(prevPos => ({ ...prevPos, y: prevPos.y - 10 }));
          break;
        case 'a':
          setPosition(prevPos => ({ ...prevPos, x: prevPos.x - 10 }));
          break;
        case 's':
          setPosition(prevPos => ({ ...prevPos, y: prevPos.y + 10 }));
          break;
        case 'd':
          setPosition(prevPos => ({ ...prevPos, x: prevPos.x + 10 }));
          break;
        default:
          break;
      }
    };

    const canvasRender = (ctx: CanvasRenderingContext2D) => {
      requestAnimationFrame(() => drawCanvas(ctx));
    
      const handleResize = () => {
        ctx.canvas.height = window.innerHeight;
        ctx.canvas.width = window.innerWidth;
      };
    
      handleResize();
      window.addEventListener("resize", handleResize);
    
      return () => {
        window.removeEventListener("resize", handleResize);
        window.removeEventListener("keydown", handleKeyDown);
      };
    };

    const drawCanvas = (ctx:CanvasRenderingContext2D) => {
      const canvas = ctx.canvas;
      const mapImage = new Image();
      mapImage.src = map;

      let scaleFactor = Math.max(canvas?.width! / mapImage.width, canvas?.height! / mapImage.height);
      let newWidth = mapImage.width * scaleFactor;
      let newHeight = mapImage.height * scaleFactor;
      let x = (canvas?.width! / 2) - (newWidth / 2);
      let y = (canvas?.height! / 2) - (newHeight / 2);

     
      ctx.drawImage(mapImage, x, y, newWidth, newHeight);

      const characterImg = new Image();
      characterImg.src = player.chracterImage;
      ctx.drawImage(characterImg, position.x, position.y, 80, 80);

      

      requestAnimationFrame(() => drawCanvas(ctx));
    };

    const render = () => {
      canvasRender(context!);
      window.addEventListener('keydown', handleKeyDown);
    };

    render();

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [position]);

  return <canvas ref={canvasRef} {...rest} />;
};

export default Canvas;
