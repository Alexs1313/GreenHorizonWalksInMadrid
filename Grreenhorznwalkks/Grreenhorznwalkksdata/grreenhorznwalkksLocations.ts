export type GrreenhorznwalkksCategoryId =
  | 'botanical-calm'
  | 'urban-green-icons'
  | 'hidden-garden-corners'
  | 'scenic-walk-routes';

export type GrreenhorznwalkksLocation = {
  id: string;
  title: string;
  description: string;
  rating: number;
  durationLabel?: string;
  coordinates: {lat: number; lng: number};
  categoryId: GrreenhorznwalkksCategoryId;
  image?: unknown;
};

export type GrreenhorznwalkksCategory = {
  id: GrreenhorznwalkksCategoryId;
  title: string;
  emoji: string;
};

export const grreenhorznwalkksCategories: GrreenhorznwalkksCategory[] = [
  {id: 'botanical-calm', title: 'Botanical Calm', emoji: '🌺'},
  {id: 'urban-green-icons', title: 'Urban Green Icons', emoji: '🌿'},
  {id: 'hidden-garden-corners', title: 'Hidden Garden Corners', emoji: '💎'},
  {id: 'scenic-walk-routes', title: 'Scenic Walk Routes', emoji: '🌅'},
];

export const grreenhorznwalkksLocations: GrreenhorznwalkksLocation[] = [
  {
    id: 'el-retiro-park',
    title: 'El Retiro Park',
    description:
      'A refined green escape in the heart of the city, featuring wide walking paths, calm lake views, sculptures, and shaded zones perfect for slow walks.',
    rating: 4.9,
    durationLabel: '2-3 hours',
    coordinates: {lat: 40.4153, lng: -3.6844},
    categoryId: 'botanical-calm',
    image: require('../../assets/i/grreenhorznloc1.png'),
  },
  {
    id: 'royal-botanical-garden-madrid',
    title: 'Royal Botanical Garden Madrid',
    description:
      'A structured and curated botanical space with diverse plant collections, peaceful paths, and a quiet atmosphere ideal for focused walks.',
    rating: 4.8,
    coordinates: {lat: 40.4123, lng: -3.688},
    categoryId: 'botanical-calm',
    image: require('../../assets/i/grreenhorznloc2.png'),
  },
  {
    id: 'parque-del-capricho',
    title: 'Parque del Capricho',
    description:
      'A hidden historical park with artistic landscaping, small architectural elements, and significantly fewer visitors than central parks.',
    rating: 4.8,
    coordinates: {lat: 40.4543, lng: -3.599},
    categoryId: 'botanical-calm',
    image: require('../../assets/i/grreenhorznloc3.png'),
  },
  {
    id: 'campo-del-moro-gardens',
    title: 'Campo del Moro Gardens',
    description:
      'Symmetrical royal gardens behind the palace, combining long sightlines, fountains, and elegant greenery with a calm rhythm.',
    rating: 4.7,
    coordinates: {lat: 40.4179, lng: -3.7173},
    categoryId: 'botanical-calm',
    image: require('../../assets/i/grreenhorznloc4.png'),
  },
  {
    id: 'quinta-de-los-molinos-park',
    title: 'Quinta de los Molinos Park',
    description:
      'An open green space known for seasonal almond blossoms and wide, relaxed walking areas away from dense tourist flows.',
    rating: 4.7,
    durationLabel: '1-2 hours',
    coordinates: {lat: 40.4492, lng: -3.636},
    categoryId: 'botanical-calm',
    image: require('../../assets/i/grreenhorznloc5.png'),
  },

  {
    id: 'crystal-palace',
    title: 'Crystal Palace',
    description:
      'A glass pavilion surrounded by water and trees, creating a clean and visually balanced environment within a park setting.',
    rating: 4.8,
    durationLabel: '45-60 min',
    coordinates: {lat: 40.415, lng: -3.6832},
    categoryId: 'urban-green-icons',
    image: require('../../assets/i/grreenhorznloc6.png'),
  },
  {
    id: 'temple-of-debod',
    title: 'Temple of Debod',
    description:
      'An ancient structure placed in an open green area, known for its calm atmosphere and strong sunset views.',
    rating: 4.7,
    durationLabel: '1 hour',
    coordinates: {lat: 40.424, lng: -3.7174},
    categoryId: 'urban-green-icons',
    image: require('../../assets/i/grreenhorznloc7.png'),
  },
  {
    id: 'plaza-de-oriente',
    title: 'Plaza de Oriente',
    description:
      'A formal garden square framed by classical architecture, combining symmetry, greenery, and open space.',
    rating: 4.7,
    durationLabel: '45-60 min',
    coordinates: {lat: 40.4189, lng: -3.7113},
    categoryId: 'urban-green-icons',
    image: require('../../assets/i/grreenhorznloc8.png'),
  },
  {
    id: 'madrid-rio-park',
    title: 'Madrid Río Park',
    description:
      'A modern riverside development with long walking paths, bridges, and open green areas integrated into the city structure.',
    rating: 4.8,
    durationLabel: '2-3 hours',
    coordinates: {lat: 40.3995, lng: -3.7123},
    categoryId: 'urban-green-icons',
    image: require('../../assets/i/grreenhorznloc9.png'),
  },
  {
    id: 'puerta-de-alcala',
    title: 'Puerta de Alcalá',
    description:
      'A historic monument positioned within a green urban zone, creating a strong visual contrast between architecture and nature.',
    rating: 4.7,
    durationLabel: '30-45 min',
    coordinates: {lat: 40.4199, lng: -3.6887},
    categoryId: 'urban-green-icons',
    image: require('../../assets/i/grreenhorznloc10.png'),
  },

  {
    id: 'jardin-del-principe-de-anglona',
    title: 'Jardín del Príncipe de Anglona',
    description:
      'A compact historic garden hidden within the old city layout, offering a quiet and intimate environment.',
    rating: 4.6,
    durationLabel: '30-45 min',
    coordinates: {lat: 40.4129, lng: -3.7143},
    categoryId: 'hidden-garden-corners',
    image: require('../../assets/i/grreenhorznloc11.png'),
  },
  {
    id: 'huerto-de-las-monjas',
    title: 'Huerto de las Monjas',
    description:
      'A small courtyard-style green space with a local and almost private atmosphere, rarely crowded.',
    rating: 4.5,
    durationLabel: '30-45 min',
    coordinates: {lat: 40.4138, lng: -3.7095},
    categoryId: 'hidden-garden-corners',
    image: require('../../assets/i/grreenhorznloc12.png'),
  },
  {
    id: 'jardines-de-sabatini',
    title: 'Jardines de Sabatini',
    description:
      'Geometric gardens with clean lines and symmetry, located near the royal palace.',
    rating: 4.7,
    durationLabel: '1 hour',
    coordinates: {lat: 40.4196, lng: -3.7138},
    categoryId: 'hidden-garden-corners',
    image: require('../../assets/i/grreenhorznloc13.png'),
  },
  {
    id: 'parque-de-la-cornisa',
    title: 'Parque de la Cornisa',
    description:
      'An elevated green area offering open views and a calmer environment compared to central tourist routes.',
    rating: 4.5,
    durationLabel: '45-60 min',
    coordinates: {lat: 40.4147, lng: -3.717},
    categoryId: 'hidden-garden-corners',
    image: require('../../assets/i/grreenhorznloc14.png'),
  },
  {
    id: 'jardines-de-las-vistillas',
    title: 'Jardines de las Vistillas',
    description:
      'Terraced gardens with a relaxed vibe and panoramic perspectives over parts of the city.',
    rating: 4.6,
    durationLabel: '45-60 min',
    coordinates: {lat: 40.4122, lng: -3.716},
    categoryId: 'hidden-garden-corners',
    image: require('../../assets/i/grreenhorznloc15.png'),
  },

  {
    id: 'paseo-del-prado',
    title: 'Paseo del Prado',
    description:
      'A tree-lined boulevard connecting cultural landmarks, designed for smooth and structured walking through the city.',
    rating: 4.8,
    coordinates: {lat: 40.4138, lng: -3.6921},
    categoryId: 'scenic-walk-routes',
    image: require('../../assets/i/grreenhorznloc16.png'),
  },
  {
    id: 'gran-via-to-plaza-de-espana-walk',
    title: 'Gran Vía to Plaza de España Walk',
    description:
      'An urban route combining architecture, movement, and gradual transition into more open and green surroundings.',
    rating: 4.7,
    coordinates: {lat: 40.42, lng: -3.705},
    categoryId: 'scenic-walk-routes',
    image: require('../../assets/i/grreenhorznloc17.png'),
  },
  {
    id: 'madrid-rio-walkway',
    title: 'Madrid Río Walkway',
    description:
      'A long, continuous riverside path offering a relaxed walking experience with modern urban design elements.',
    rating: 4.8,
    coordinates: {lat: 40.401, lng: -3.7135},
    categoryId: 'scenic-walk-routes',
    image: require('../../assets/i/grreenhorznloc18.png'),
  },
  {
    id: 'retiro-outer-loop-walk',
    title: 'Retiro Outer Loop Walk',
    description:
      'A circular walking route around the outer edges of Retiro, balancing movement and a calm green space.',
    rating: 4.7,
    coordinates: {lat: 40.4148, lng: -3.6825},
    categoryId: 'scenic-walk-routes',
    image: require('../../assets/i/grreenhorznloc19.png'),
  },
  {
    id: 'casa-de-campo-trails',
    title: 'Casa de Campo Trails',
    description:
      'Natural trails in a large park area, offering a more open and less structured walking experience.',
    rating: 4.7,
    coordinates: {lat: 40.427, lng: -3.7485},
    categoryId: 'scenic-walk-routes',
    image: require('../../assets/i/grreenhorznloc20.png'),
  },
];

export function grreenhorznwalkksGetLocationById(id: string) {
  return grreenhorznwalkksLocations.find(l => l.id === id);
}
