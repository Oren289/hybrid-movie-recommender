import React from 'react';

import { UncontrolledCarousel } from 'reactstrap';

const items = [
  {
    src: require('assets/img/movie_posters/interstellar-2014-wallpaper-preview.jpg'),
    altText: '',
    caption: '',
    header: '',
  },
  {
    src: require('assets/img/theme/img-2-1200x1000.jpg'),
    altText: '',
    caption: '',
    header: '',
  },
];

class Carousels extends React.Component {
  render() {
    return (
      <>
        <div style={{ height: '10rem', width: '50%' }}>
          <UncontrolledCarousel items={items} />
        </div>
      </>
    );
  }
}

export default Carousels;
