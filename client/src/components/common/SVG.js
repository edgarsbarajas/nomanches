import React from 'react';

const getPath = (name, props) => {
  switch(name) {
    case 'search':
      return <path {...props} d="M268.94,287.85c-10.45,6.33-20.46,10.07-31.41,11.38-36.86,4.41-71.83-22-76.69-58.12-5.4-40.09,19.92-75.06,58.58-80.28,28.3-3.82,51.41,6,67.6,29.44,16.32,23.6,17,48.75,3.37,74-1.69,3.13-1.39,4.74,1,7.13q21.91,21.56,43.5,43.44c5.12,5.16,6.23,11.15,3.47,16.87-2.65,5.5-8.32,9.2-14.2,8a20.79,20.79,0,0,1-9.81-5.2c-14.29-14-28.25-28.29-42.29-42.52A41.66,41.66,0,0,1,268.94,287.85Zm-89.11-58.15A49.81,49.81,0,1,0,230,180.08,50,50,0,0,0,179.83,229.71Z" transform="translate(-160.12 -160.04)"/>
    default:
      return <path />;
  }
}

const SVG = ({
  name = '',
  style = {},
  fill = '#000',
  width = '100%',
  className = '',
  height = '100%',
  viewBox = '0 0 32 32',
}) =>
  <svg
    width={width}
    style={style}
    height={height}
    viewBox={viewBox}
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
      {getPath(name, { fill })}
  </svg>;

export default SVG;
