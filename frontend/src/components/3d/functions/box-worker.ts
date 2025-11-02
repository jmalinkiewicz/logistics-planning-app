import { calculateBoxPositions } from "./calculate-box-positions";

self.onmessage = (e) => {
  const { boxesInput, container } = e.data;
  const result = calculateBoxPositions(boxesInput, container);
  postMessage(result);
};
