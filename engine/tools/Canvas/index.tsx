import React, { useRef, useEffect } from 'react'

type Props = {
  draw: any,
  map: string,
  player: {
    chracterImage: string
  },
  [key: string]: any
}

const Canvas = (props: Props) => {

  const { draw, map, player, ...rest } = props
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {

    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')

    let mapFrame: number

    const mapDraw = (ctx: CanvasRenderingContext2D) => {
      const mapImage = new Image();

      mapImage.src = map;

      let scaleFactor = Math.max(canvas?.width! / mapImage.width, canvas?.height! / mapImage.height);
      let newWidth = mapImage.width * scaleFactor;
      let newHeight = mapImage.height * scaleFactor;

      let x = (canvas?.width! / 2) - (newWidth / 2);
      let y = (canvas?.height! / 2) - (newHeight / 2);

      ctx.drawImage(mapImage, x, y, newWidth, newHeight);
    }

    const playerDraw = (ctx: CanvasRenderingContext2D) => {
      const playerImage = new Image();

      playerImage.src = player.chracterImage;

      ctx.drawImage(playerImage, 0, 30, 20, 20);
    }

    const render = () => {

      mapDraw(context!)
      playerDraw(context!)

    }
    render()

    return () => {
      window.cancelAnimationFrame(mapFrame)
    }
  }, [draw, map, player.chracterImage])

  return <canvas ref={canvasRef} style={{ maxWidth: '100%', width: '100%', height: '200' }} {...rest} />
}

export default Canvas