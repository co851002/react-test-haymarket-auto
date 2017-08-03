export const ARTICLE =     {
  nid: 1,
  category: 'news',
  teaserTitle: 'Teaser Title article 1',
  title: 'Title article 1',
  path: '/advice/title-article-1',
  summary: 'This is the summary field for article 1',
  author: 'Edgar Alla Poe',
  articleDate: '1488989978',
  lastUpdatedDate: 1488989978,
  mainCopy: '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore praesentium eveniet eaque dignissimos, illo impedit nam, velit at quasi consectetur libero eum iusto. Aliquid a minus, mollitia alias. Ipsam, facere!</p>',
  teaserCopy: '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio nobis qui amet molestiae error vero ipsa sequi beatae fugiat laudantium ut cumque earum quasi, ea exercitationem impedit fugit dolores, recusandae.</p>'      
};

export const ARTICLES = [
  ARTICLE,
  {
    nid: 2,
    category: 'news',
    teaserTitle: 'Teaser Title article 1',
    title: 'Title article 1',
    path: '/advice/title-article-1',
    summary: 'This is the summary field for article 1',
    author: 'Edgar Alla Poe',
    articleDate: '1488989978',
    lastUpdatedDate: '1488989978',
    mainCopy: '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore praesentium eveniet eaque dignissimos, illo impedit nam, velit at quasi consectetur libero eum iusto. Aliquid a minus, mollitia alias. Ipsam, facere!</p>',
    teaserCopy: '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio nobis qui amet molestiae error vero ipsa sequi beatae fugiat laudantium ut cumque earum quasi, ea exercitationem impedit fugit dolores, recusandae.</p>'      
  },
  {
    nid: 345,
    category: 'news',
    teaserTitle: 'Teaser Title article 3',
    title: 'Title article 3',
    path: '/advice/title-article-3',
    summary: 'This is the summary field for article 3',
    author: 'Ernest Hemingway',
    articleDate: '1488989978',
    lastUpdatedDate: '1488989978',
    mainCopy: '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat similique soluta, earum adipisci harum voluptates quod incidunt dolorum iusto impedit culpa, pariatur labore deleniti, necessitatibus, facilis. Autem aliquam tenetur vitae.</p>',
    teaserCopy: '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio nobis qui amet molestiae error vero ipsa sequi beatae fugiat laudantium ut cumque earum quasi, ea exercitationem impedit fugit dolores, recusandae.</p>'
  }   
];

export const CAROUSEL = {
  title: 'Trending news articles',
  items: [{
    nid: 1,
    teaserTitle: 'New Mercedes A-Class Saloon – everything you need to know',
    path: '/advice/title-article-1',
    teaserCopy: '<p>The Mercedes Concept A previews next year’s A-Class Saloon and the fourth-generation A-Class hatchback. Here\'s what to expect...</p>',
    image: {
      'src': 'http://whatcar.media/jpg/85/0/0/640/426/0/0/0/0/0/center/0/0/0/0/0/images/uploads/carousels/fa3a848996a565dc7a06b6ac4f63ea82f50a18ec.jpg',
      'src@2x': 'http://whatcar.media/jpg/85/0/0/640/426/0/0/0/0/0/center/0/0/0/0/0/images/uploads/carousels/fa3a848996a565dc7a06b6ac4f63ea82f50a18ec.jpg',
    },
  },
  {
    nid: 2,
    teaserTitle: 'New Volkswagen ID Crozz concept previews electric SUV',
    path: '/advice/title-article-2',
    teaserCopy: '<p>Volkswagen has revealed details of its latest ID concept car ahead of its launch at the Shanghai motor show.</p>',
    image: {
      'src': 'http://whatcar.media/jpg/85/0/0/640/426/0/0/0/0/0/center/0/0/0/0/0/images/uploads/carousels/339ff94be29c8224fddf5b54463f8546aa21325b.jpg',
      'src@2x': 'http://whatcar.media/jpg/85/0/0/640/426/0/0/0/0/0/center/0/0/0/0/0/images/uploads/carousels/339ff94be29c8224fddf5b54463f8546aa21325b.jpg',
    },
  }]
};