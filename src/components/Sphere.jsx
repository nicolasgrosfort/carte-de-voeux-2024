import { useId, useState } from "react";

const sphereRadius = 100;

const mapRadius = (z, maxZ = sphereRadius, minRadius = 1, maxRadius = 2) => {
  return maxRadius - (maxRadius - minRadius) * (z / maxZ);
};
const fibonacciSphere = (
  samples = 100,
  diameter = 100,
  xStart = 50,
  yStart = 50
) => {
  const points = [];
  const phi = Math.PI * (3.0 - Math.sqrt(5.0)); // angle d'or en radians
  const radius = diameter / 2; // Calculer le rayon à partir du diamètre

  for (let i = 0; i < samples; i++) {
    const y = 1 - (i / (samples - 1)) * 2; // y va de 1 à -1
    const r = Math.sqrt(1 - y * y); // rayon à y

    const theta = phi * i; // incrément de l'angle d'or

    const x = Math.cos(theta) * r * radius + xStart;
    const z = Math.sin(theta) * r * radius;

    points.push({ x, y: y * radius + yStart, z });
  }

  return points;
};

const points = fibonacciSphere(100, sphereRadius);

export const Sphere = () => {
  const [x, setX] = useState(50);
  const [y, setY] = useState(50);
  const [z, setZ] = useState(50);

  console.log(points);

  return (
    <>
      <Slider value={x} onChange={(e) => setX(e.target.value)} label="X" />
      <Slider value={y} onChange={(e) => setY(e.target.value)} label="Y" />
      <Slider value={z} onChange={(e) => setZ(e.target.value)} label="Z" />
      <svg
        id="canvas"
        width="800"
        height="600"
        xmlns="http://www.w3.org/2000/svg"
        style={{ border: "1px solid black" }}
      >
        {points.length > 0 &&
          points.map((point, index) => (
            <circle
              key={index}
              cx={point.x}
              cy={point.y}
              r={mapRadius(point.z)}
              fill="black"
            />
          ))}
        <Point x={x} y={y} z={z} />
      </svg>
    </>
  );
};

const Slider = ({ value, onChange, label }) => {
  const id = useId();
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type="range"
        min={0}
        max={sphereRadius}
        value={value}
        onChange={onChange}
      />
    </>
  );
};

const Point = ({ x, y, z }) => {
  return <circle cx={x} cy={y} r={mapRadius(z)} fill="red" />;
};
