import {
  type FrameLoopHandle,
  type Gpu,
  clock,
  draw,
  frameLoop,
  geometry,
  init,
  surface,
} from "vgpu";
import { useEffect, useRef } from "react";
import { createFileRoute } from "@tanstack/react-router";
import logoShader from "#/shaders/logo.wgsl";

export const Route = createFileRoute("/logo")({ component: RouteComponent });

const positions: readonly number[] = [
  -0.68062, 0.58491, 0.00395, -0.58491, -0.40174, 0.58491, 0.15083, -0.35181, -0.49108, 0.26016,
  -0.26793, 0.3589, -0.40645, 0.11569, -0.19864, 0.24134, -0.22965, -0.18612, -0.05248, -0.00673,
  0.1501, 0.24134, 0.01102, -0.00673, 0.35319, 0.58491, 0.22901, 0.3589, 0.03763, -0.07662, 0.17747,
  -0.31188, 0.41046, 0.58491, 0.68062, 0.58491,
];

const indices: readonly number[] = [
  0, 4, 5, 0, 5, 2, 7, 9, 11, 7, 11, 10, 5, 4, 6, 5, 6, 7, 7, 6, 8, 7, 8, 9, 9, 8, 1, 9, 1, 3, 2, 5,
  13, 2, 13, 12, 14, 15, 17, 14, 17, 16,
];

function logoGeometry(gpu: Gpu) {
  return geometry(gpu, {
    buffers: [{ attributes: { position: "float32x2" }, data: new Float32Array(positions) }],
    indexCount: indices.length,
    indices: new Uint16Array(indices),
    vertexCount: positions.length / 2,
  });
}

function RouteComponent() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    let disposed = false;
    let loop: FrameLoopHandle | undefined = undefined;
    let gpu: Gpu | undefined = undefined;

    void (async () => {
      gpu = await init();
      if (disposed) {
        return gpu.dispose();
      }

      const canvasSurface = surface(gpu, canvas, {
        clearColor: [0, 0, 0, 0],
        dpr: [1, 2],
      });
      const logo = draw(gpu, { geometry: logoGeometry(gpu), shader: logoShader });
      const time = clock(gpu);

      loop = frameLoop(gpu, (frame) => {
        logo.set({ params: { time: time.time } });
        frame.pass(canvasSurface, logo);
      });
    })();

    return () => {
      disposed = true;
      loop?.stop();
      gpu?.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="mx-auto mt-10 block aspect-square w-64" />;
}
