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



  t.end();

});
