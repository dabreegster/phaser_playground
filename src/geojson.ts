import url from "../assets/buildings.geojson?url";
import bbox from "@turf/bbox";
import distanceKm from "@turf/distance";

export async function getMapspaceBuildings() {
  let resp = await fetch(url);
  let gj = await resp.json();

  // TODO Is there really no package to do something like this?
  let [x1, y1, x2, y2] = bbox(gj);
  let width = distanceKm([x1, y1], [x2, y1]);
  let height = distanceKm([x1, y1], [x1, y2]);
  console.log({ width, height });

  let polygons = [];
  for (let f of gj.features) {
    if (f.geometry.type == "Polygon") {
      // Ignore holes
      polygons.push(
        f.geometry.coordinates[0].map((pt) => {
          let x = ((pt[0] - x1) / (x2 - x1)) * width;
          let y = height - ((pt[1] - y1) / (y2 - y1)) * height;
          return [x, y];
        }),
      );
    }
  }

  return polygons;
}
