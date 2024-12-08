import React, { useEffect, useRef } from "react";

const TechAI = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let time = 0;

    class Circuit {
      constructor() {
        this.paths = this.generatePaths();
        this.progress = 0;
      }

      generatePaths() {
        const paths = [];
        const angles = [0, Math.PI / 2, Math.PI, -Math.PI / 2];
        angles.forEach((angle) => {
          const length = Math.random() * 20 + 10;
          paths.push({
            angle,
            length,
            progress: 0,
            active: false,
            timeout: Math.random() * 100,
          });
        });
        return paths;
      }

      draw(ctx, centerX, centerY) {
        this.paths.forEach((path) => {
          if (Math.random() < 0.01) path.active = true;
          if (path.active) {
            path.progress += 2;
            if (path.progress > path.length) {
              path.progress = 0;
              path.active = false;
            }

            const x = centerX + Math.cos(path.angle) * path.progress;
            const y = centerY + Math.sin(path.angle) * path.progress;

            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.lineTo(x, y);
            ctx.strokeStyle = `rgba(255, 140, 0, 0.5)`;
            ctx.lineWidth = 2;
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(x, y, 2, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(255, 200, 0, 0.8)";
            ctx.fill();
          }
        });
      }
    }

    class BinaryRing {
      constructor(radius) {
        this.radius = radius;
        this.chars = Array.from({ length: 32 }, () => ({
          value: Math.random() < 0.5 ? "0" : "1",
          opacity: Math.random(),
          fadeSpeed: Math.random() * 0.05 + 0.02,
        }));
        this.rotation = Math.random() * Math.PI * 2;
        this.speed = (Math.random() * 0.002 + 0.001) * (Math.random() < 0.5 ? 1 : -1);
      }

      update() {
        this.rotation += this.speed;
        this.chars.forEach((char) => {
          char.opacity += char.fadeSpeed;
          if (char.opacity >= 1 || char.opacity <= 0) {
            char.fadeSpeed = -char.fadeSpeed;
          }
          if (Math.random() < 0.01) {
            char.value = Math.random() < 0.5 ? "0" : "1";
          }
        });
      }

      draw(ctx, centerX, centerY) {
        this.chars.forEach((char, i) => {
          const angle = (i / this.chars.length) * Math.PI * 2 + this.rotation;
          const x = centerX + Math.cos(angle) * this.radius;
          const y = centerY + Math.sin(angle) * this.radius;

          ctx.font = "8px monospace";
          ctx.fillStyle = `rgba(255, 140, 0, ${char.opacity})`;
          ctx.fillText(char.value, x, y);
        });
      }
    }

    const circuits = Array.from({ length: 3 }, () => new Circuit());
    const rings = [new BinaryRing(20), new BinaryRing(35)];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const drawCore = () => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Core hexagon
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i + time;
        const radius = 15 + Math.sin(time * 2) * 2;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.strokeStyle = "rgba(255, 140, 0, 0.8)";
      ctx.stroke();

      // Core glow
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 20);
      gradient.addColorStop(0, "rgba(255, 140, 0, 0.4)");
      gradient.addColorStop(1, "rgba(255, 80, 0, 0)");
      ctx.fillStyle = gradient;
      ctx.fill();
    };

    const animate = () => {
      time += 0.01;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      circuits.forEach((circuit) => circuit.draw(ctx, centerX, centerY));
      rings.forEach((ring) => {
        ring.update();
        ring.draw(ctx, centerX, centerY);
      });
      drawCore();

      animationRef.current = requestAnimationFrame(animate);
    };

    resize();
    animate();

    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <div className="flex items-center justify-center w-full h-64">
      <div className="w-64 h-64">
        <canvas ref={canvasRef} className="w-full h-full" style={{ background: "transparent" }} />
      </div>
    </div>
  );
};

export default TechAI;
