import Canvas from "@/engine/tools/Canvas"

export default function Play() {

  const map = {
    background: 'https://assets2.rockpapershotgun.com/stardew-valley-expanded-grandpas-farm.jpg/BROK/resize/1920x1920%3E/format/jpg/quality/80/stardew-valley-expanded-grandpas-farm.jpg'
  }

  const chracterSet = {
    name:'sıla',
    gender:'female',
    chracterImage:'https://i.hizliresim.com/i0sk8v5.png'
  }


  return <Canvas map={map.background} player={chracterSet} style={{
    backgroundColor: 'white',
    width: '100%'
  }} />
}
