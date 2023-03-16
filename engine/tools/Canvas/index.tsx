import React, { useRef, useEffect } from 'react'

type Props = {
  map: string,
  player: {
    chracterImage: string
  },
  [key: string]: any
}

const Canvas = (props: Props) => {

  const { map, player, ...rest } = props

  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')

    const canvasRender = (ctx: CanvasRenderingContext2D) => { 
      requestAnimationFrame(() => drawCanvas(context!));

      const handleResize = () => {
        ctx.canvas.height = window.innerHeight;
        ctx.canvas.width = window.innerWidth;
      };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
     
    }

    const drawCanvas = (ctx:CanvasRenderingContext2D) => {
      const canvas = ctx.canvas;
      const mapImage = new Image();

      mapImage.src = map;

      let scaleFactor = Math.max(canvas?.width! / mapImage.width, canvas?.height! / mapImage.height);
      let newWidth = mapImage.width * scaleFactor;
      let newHeight = mapImage.height * scaleFactor;

      let x = (canvas?.width! / 2) - (newWidth / 2);
      let y = (canvas?.height! / 2) - (newHeight / 2);

      const chracterImg = new Image();
  
      chracterImg.src = player.chracterImage;


      ctx.drawImage(mapImage, x, y, newWidth, newHeight);
      ctx.drawImage(chracterImg, 0,4,80,80);
    
      requestAnimationFrame(() => drawCanvas(ctx));
    }

    const render = () => {
      canvasRender(context!)
    }

    render();
  }, [])

  return <canvas ref={canvasRef} {...rest} />
}

export default Canvas