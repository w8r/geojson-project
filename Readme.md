# geojson-project [![npm version](https://badge.fury.io/js/geojson-project.svg)](https://badge.fury.io/js/geojson-project)  ![circle](https://circleci.com/gh/w8r/geojson-project.svg?style=shield&circle-token=597a6db31df1e249a8a9bf29531f7baefc142641)

## API

*`geojsonProject(geojson, func, context)`*
* `geojson` is `Feature` or `FeatureCollection`
* `func` is the project function, takes in one coordinate pair,
         returns it transformed
* `context` _optional_ - transform function's `this`

returns transformed copy of GeoJSON

## Usage
```js
var geojsonProject = require('geojson-project');

geojsonProject({
  type: 'FeatureCollection',
    features: [{
      type: 'Feature',
      properties: {a : 1},
      geometry: {
        type: 'Point',
        coordinates: [6, 6]
      }
    }, {
      type: 'Feature',
      properties: {a : 2},
      geometry: {
        type: 'Point',
        coordinates: [4, 4]
      }
    }]
  }, function(coord) {
    return [coords[0]/2, coords[1]/2];
  });

```

will result in

```js
{
  type: 'FeatureCollection',
  features: [{
    type: 'Feature',
    properties: {a : 1},
    geometry: {
      type: 'Point',
      coordinates: [3, 3]
    }
  }, {
    type: 'Feature',
    properties: {a : 2},
    geometry: {
      type: 'Point',
      coordinates: [2, 2]
    }
  }]
}
```

## Test

```shell
$ npm test
```


## License

The MIT License (MIT)

Copyright (c) 2016 Alexander Milevski

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
