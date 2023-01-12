import { describe, it } from "node:test";
import assert from "node:assert";

import project from "./dist/index.mjs";

function add(c) {
  return [c[0] + 1, c[1] + 1];
}

describe("project", () => {
  it("Feature", () => {
    assert.deepEqual(
      project(
        {
          type: "Feature",
          properties: {},
          geometry: {
            type: "Point",
            coordinates: [1, 1],
          },
        },
        add
      ),
      {
        type: "Feature",
        properties: {},
        geometry: {
          type: "Point",
          coordinates: [2, 2],
        },
      }
    );
  });

  it("FeatureCollection", () => {
    assert.deepEqual(
      project(
        {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              properties: { a: 1 },
              geometry: {
                type: "Point",
                coordinates: [1, 1],
              },
            },
            {
              type: "Feature",
              properties: { a: 2 },
              geometry: {
                type: "Point",
                coordinates: [2, 2],
              },
            },
          ],
        },
        add
      ),
      {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: { a: 1 },
            geometry: {
              type: "Point",
              coordinates: [2, 2],
            },
          },
          {
            type: "Feature",
            properties: { a: 2 },
            geometry: {
              type: "Point",
              coordinates: [3, 3],
            },
          },
        ],
      }
    );
  });

  it("Context", () => {
    var obj = {
      value: 2,
    };

    function proj(coords) {
      return [coords[0] + this.value, coords[1] + this.value];
    }

    assert.deepEqual(
      project(
        {
          type: "Feature",
          properties: {},
          geometry: {
            type: "Point",
            coordinates: [1, 1],
          },
        },
        proj,
        obj
      ),
      {
        type: "Feature",
        properties: {},
        geometry: {
          type: "Point",
          coordinates: [3, 3],
        },
      }
    );
  });

  it("GeometryCollection", () => {
    var obj = {
      value: 2,
    };

    function proj(coords) {
      return [coords[0] + this.value, coords[1] + this.value];
    }

    assert.deepEqual(
      project(
        {
          type: "Feature",
          properties: {},
          geometry: {
            type: "GeometryCollection",
            geometries: [
              {
                type: "Polygon",
                coordinates: [
                  [
                    [0, 0],
                    [4, 4],
                    [10, 10],
                    [0, 0],
                  ],
                ],
              },
              {
                type: "MultiPolygon",
                coordinates: [
                  [
                    [
                      [0, 0],
                      [4, 4],
                      [10, 10],
                      [0, 0],
                    ],
                  ],
                  [
                    [
                      [1, 1],
                      [5, 5],
                      [9, 9],
                      [1, 1],
                    ],
                  ],
                ],
              },
              {
                type: "LineString",
                coordinates: [
                  [0, 0],
                  [2, 2],
                  [4, 4],
                ],
              },
              {
                type: "MultiLineString",
                coordinates: [
                  [
                    [0, 0],
                    [2, 2],
                    [4, 4],
                  ],
                  [
                    [1, 1],
                    [3, 3],
                    [5, 5],
                  ],
                ],
              },
              {
                type: "Point",
                coordinates: [0, 0],
              },
              {
                type: "MultiPoint",
                coordinates: [
                  [0, 0],
                  [1, 1],
                ],
              },
            ],
          },
        },
        proj,
        obj
      ),
      {
        type: "Feature",
        properties: {},
        geometry: {
          type: "GeometryCollection",
          geometries: [
            {
              type: "Polygon",
              coordinates: [
                [
                  [2, 2],
                  [6, 6],
                  [12, 12],
                  [2, 2],
                ],
              ],
            },
            {
              type: "MultiPolygon",
              coordinates: [
                [
                  [
                    [2, 2],
                    [6, 6],
                    [12, 12],
                    [2, 2],
                  ],
                ],
                [
                  [
                    [3, 3],
                    [7, 7],
                    [11, 11],
                    [3, 3],
                  ],
                ],
              ],
            },
            {
              type: "LineString",
              coordinates: [
                [2, 2],
                [4, 4],
                [6, 6],
              ],
            },
            {
              type: "MultiLineString",
              coordinates: [
                [
                  [2, 2],
                  [4, 4],
                  [6, 6],
                ],
                [
                  [3, 3],
                  [5, 5],
                  [7, 7],
                ],
              ],
            },
            {
              type: "Point",
              coordinates: [2, 2],
            },
            {
              type: "MultiPoint",
              coordinates: [
                [2, 2],
                [3, 3],
              ],
            },
          ],
        },
      }
    );
  });
});
