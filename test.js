var project = require('./');
var test = require('tape');

function add(c) {
  return [c[0] + 1, c[1] + 1];
}

test('project', function(t) {

  t.test('Feature', function(t) {

    t.deepEqual(project({
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Point',
        coordinates: [1, 1]
      }
    }, add), {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Point',
        coordinates: [2, 2]
      }
    });

    t.end();
  });


  t.test('FeatureCollection', function(t) {

    t.deepEqual(project({
        type: 'FeatureCollection',
        features: [{
        type: 'Feature',
        properties: {a : 1},
        geometry: {
          type: 'Point',
          coordinates: [1, 1]
        }
      }, {
        type: 'Feature',
        properties: {a : 2},
        geometry: {
          type: 'Point',
          coordinates: [2, 2]
        }
      }]
    }, add), {
        type: 'FeatureCollection',
        features: [{
        type: 'Feature',
        properties: {a : 1},
        geometry: {
          type: 'Point',
          coordinates: [2, 2]
        }
      }, {
        type: 'Feature',
        properties: {a : 2},
        geometry: {
          type: 'Point',
          coordinates: [3, 3]
        }
      }]
    });

    t.end();
  });


  t.test('Context', function(t) {

    var obj = {
      value: 2
    };

    function proj(coords) {
      return [coords[0] + this.value, coords[1] + this.value];
    }

    t.deepEqual(project({
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Point',
        coordinates: [1, 1]
      }
    }, proj, obj), {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Point',
        coordinates: [3, 3]
      }
    });

    t.end();
  });


  t.test('GeometryCollection', function (t) {
    var obj = {
      value: 2
    };

    function proj(coords) {
      return [coords[0] + this.value, coords[1] + this.value];
    }

    t.deepEqual(project({
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'GeometryCollection',
        geometries: [{
          type: 'Polygon',
          coordinates: [
            [[0, 0], [4, 4], [10, 10], [0, 0]]
          ]
        }, {
          type: 'MultiPolygon',
          coordinates: [
            [[[0, 0], [4, 4], [10, 10], [0, 0]]],
            [[[1, 1], [5, 5], [9, 9], [1, 1]]]
          ]
        }, {
          type: 'LineString',
          coordinates: [[0, 0], [2, 2], [4, 4]]
        }, {
          type: 'MultiLineString',
          coordinates: [
            [[0, 0], [2, 2], [4, 4]],
            [[1, 1], [3, 3], [5, 5]]
          ]
        }, {
          type: 'Point',
          coordinates: [0, 0]
        }, {
          type: 'MultiPoint',
          coordinates: [[0, 0], [1, 1]]
        }]
      }
    }, proj, obj), {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'GeometryCollection',
        geometries: [{
          type: 'Polygon',
          coordinates: [
            [[2, 2], [6, 6], [12, 12], [2, 2]]
          ]
        }, {
          type: 'MultiPolygon',
          coordinates: [
            [[[2, 2], [6, 6], [12, 12], [2, 2]]],
            [[[3, 3], [7, 7], [11, 11], [3, 3]]]
          ]
        }, {
          type: 'LineString',
          coordinates: [[2, 2], [4, 4], [6, 6]]
        }, {
          type: 'MultiLineString',
          coordinates: [
            [[2, 2], [4, 4], [6, 6]],
            [[3, 3], [5, 5], [7, 7]]
          ]
        }, {
          type: 'Point',
          coordinates: [2, 2]
        }, {
          type: 'MultiPoint',
          coordinates: [[2, 2], [3, 3]]
        }]
      }
    });

    t.end();
  });



  t.end();

});
