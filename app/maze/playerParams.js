/**
 * Created by Stefan Höhn
 * Takes the parameters from the URL and exports them to be used
 *
 */

const defaultParams = {
  name: "Ironman",
  color: "rgb(255,0,0)",
  speed: 10
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
  return Object.assign({}, defaultParams, urlParams, ownParams);
}
