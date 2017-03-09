/**
 * Created by Stefan Höhn
 * Takes the parameters from the URL and exports them to be used
 *
 */

const defaultParams = {
  name: "Ironman",
  color: "rgb(255,0,0)",
  speed: 5
};

function retrievePlayerParamsFromURL() {
    return window.location.search
        .substring(1)
        .split("&")
        .map(v => v.split("="))
        .filter(pairs => pairs.length === 2)
        .reduce((map, [key, value]) => {
          map[key] = decodeURIComponent(value);
          return map;
        }, {});
}

export default function mergeWithUrlParams(ownParams) {
  const urlParams = retrievePlayerParamsFromURL();
    
  if (urlParams.x != undefined) {
      ownParams.startPoint.x = urlParams.x;
  }
  if (urlParams.y != undefined) {
      ownParams.startPoint.y = urlParams.y;
  }
  return Object.assign({}, defaultParams, ownParams, urlParams );
}
