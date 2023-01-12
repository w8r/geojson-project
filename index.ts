import {
  FeatureCollection,
  Feature,
  Point,
  Polygon,
  MultiLineString,
  LineString,
  MultiPolygon,
  MultiPoint,
  Position,
} from "geojson";
/**
 * Node & browser script to transform/project geojson coordinates
 * @copyright Alexander Milevski <info@w8r.name>
 * @preserve
 * @license MIT
 */

type SingleGeometry =
  | Point
  | MultiPoint
  | LineString
  | MultiLineString
  | Polygon
  | MultiPolygon;

/**
 * Takes in GeoJSON and applies a function to each coordinate,
 * with a given context
 *
 * @param  {Object}     data GeoJSON
 * @param  {Function}   project
 * @param  {*=}         context
 * @return {Object}
 */
export default function geojsonProject<T extends FeatureCollection | Feature>(
  data: T,
  project: (coordinates: number[]) => number[],
  context?: unknown
): T {
  if (project === undefined) throw new Error("project function is required");
  data = { ...data };
  if (data.type === "FeatureCollection") {
    for (let i = data.features.length - 1; i >= 0; i--) {
      data.features[i] = projectFeature(data.features[i], project, context);
    }
  } else {
    data = projectFeature(data, project, context) as T;
  }
  return data;
}

/**
 * @param  {Object}     data GeoJSON
 * @param  {Function}   project
 * @param  {*=}         context
 * @return {Object}
 */
function projectFeature(
  feature: Feature,
  project: (coordinates: number[]) => number[],
  context?: unknown
) {
  if (feature.geometry.type === "GeometryCollection") {
    for (let i = 0, len = feature.geometry.geometries.length; i < len; i++) {
      feature.geometry.geometries[i] = projectGeometry(
        feature.geometry.geometries[i] as SingleGeometry,
        project,
        context
      );
    }
  } else {
    feature.geometry = projectGeometry(feature.geometry, project, context);
  }
  return feature;
}

/**
 * @param  {Object}     data GeoJSON
 * @param  {Function}   project
 * @param  {*=}         context
 * @return {Object}
 */
function projectGeometry(
  geometry: SingleGeometry,
  project: (coordinates: Position) => Position,
  context?: unknown
) {
  switch (geometry.type) {
    case "Point":
      geometry.coordinates = project.call(context, geometry.coordinates);
      break;

    case "MultiPoint":
    case "LineString":
      const coords = geometry.coordinates;
      for (let i = 0, len = coords.length; i < len; i++) {
        coords[i] = project.call(context, coords[i]);
      }
      geometry.coordinates = coords;
      break;

    case "Polygon":
      geometry.coordinates = projectCoords(
        geometry.coordinates,
        1,
        project,
        context
      );
      break;

    case "MultiLineString":
      geometry.coordinates = projectCoords(
        geometry.coordinates,
        1,
        project,
        context
      );
      break;

    case "MultiPolygon":
      geometry.coordinates = projectCoords(
        geometry.coordinates,
        2,
        project,
        context
      );
      break;

    default:
      break;
  }
  return geometry;
}

function projectCoords<T extends Position[] | Position[][] | Position[][][]>(
  coords: T,
  levelsDeep: number,
  project: (c: Position) => Position,
  context?: unknown
): T {
  const result: unknown[] = [];

  for (let i = 0, len = coords.length; i < len; i++) {
    const coord =
      levelsDeep > 0
        ? projectCoords(
            coords[i] as Position[],
            levelsDeep - 1,
            project,
            context
          )
        : project.call(context, coords[i]);

    result.push(coord);
  }

  return result as T;
}

geojsonProject.projectFeature = projectFeature;
geojsonProject.projectCoords = projectCoords;
geojsonProject.projectGeometry = projectGeometry;
