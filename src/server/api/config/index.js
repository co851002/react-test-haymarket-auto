import { Router } from 'express';
const router = Router();

/**
 * Returns the status of the importer.
 */
router.get('/properties', (req, res) => {
  const data = {
    'copyright.text': '<p class="no-marg"><strong>What Car?</strong> is a part of <a class="mastfoot__link" href="http://www.haymarket.com/brands?sector=automotive">Haymarket Motoring</a> brought to you by <a class="mastfoot__link" href="http://www.haymarket.com/division.aspx?division=1">Haymarket Consumer Media</a></p>',
    'copyright.copytext': '© Haymarket Media Group 2017',
    'copyright.image': {
      'src': 'http://whatcar.media/png/0/0/0/0/0/0/0/0/0/aspectfit/0/0/0/0/0/0/public/img/haymarket-logo.png',
      'src@2x': 'http://whatcar.media/png/0/0/0/0/0/0/0/0/0/aspectfit/0/0/0/0/0/0/public/img/haymarket-logo.png',
      'alt': 'Haymarket Media Group Logo',
      'title': 'Haymarket Media Group'
    },
    'feedback.label': 'Beta',
    'feedback.text': 'This is a trial service. Help us improve it by <a href="#">sending your feedback</a>',
    'feedback.feedbackify': '9431',
    'subscribe.cta': {
      'href': 'https://www.themagazineshop.com/what-car/',
      'text': 'Subscribe now'
    },
    'subscribe.text': 'Get the latest copy of What' + '\u00a0' + 'Car?',
    'subscribe.image': {
      'src': 'https://www.themagazineshop.com/out/pictures/generated/product/thumb/146_190_75/WCAR.jpg',
      'src@2x': 'https://www.themagazineshop.com/out/pictures/generated/product/thumb/146_190_75/WCAR.jpg',
      'alt': 'What Car? cover',
      'title': 'What Car? Magazine'
    }
  };
  const result = Object.keys(req.query).reduce((result, key) => {
    if (typeof data[key] !== 'undefined') {
      result[key] = data[key];
    }
    return result;
  }, {});
  res
    .status(200)
    .json(result);
});

/**
 * Returns the status of the importer.
 */
router.get('/menus', (req, res) => {
  const menus = {
    'footer-menu': {
      properties: {},
      items: [{
        elemId: 501,
        text: 'About Us',
        path: '/about-us',
        parent: 0,
        weight: 0
      },{
        elemId: 502,
        text: 'Site Map',
        path: '/site-map',
        parent: 0,
        weight: 0
      },{
        elemId: 503,
        text: 'Contact What Car?',
        path: '/contact',
        parent: 0,
        weight: 0
      },{
        elemId: 504,
        text: 'Cookie Policy',
        path: '/cookies',
        parent: 0,
        weight: 0
      },{
        elemId: 505,
        text: 'Privacy',
        path: '/privacy',
        parent: 0,
        weight: 0
      },{
        elemId: 506,
        text: 'Terms & Conditions',
        path: '/terms',
        parent: 0,
        weight: 0
      },{
        elemId: 507,
        text: 'Complaints',
        path: '/complaints',
        parent: 0,
        weight: 0
      }]
    },
    'main-menu':
    {
      properties: {
        stickToMoreMenu: 'n'
      },
      items:
      [
        {
          elemId: 1,
          type: 'mainmenu',
          text: 'Reviews',
          path: '/reviews',
          parent: 0,
          weight: 10
        },
        {
          elemId: 1000,
          type: 'mainmenu',
          text: 'Reviews New Cars',
          path: '/reviews/reviews-new-cars',
          parent: 1,
          weight: 11
        },
        {
          elemId: 1001,
          type: 'mainmenu',
          text: 'Reviews Used Cars',
          path: '/reviews/reviews-used-cars',
          parent: 1,
          weight: 12
        },
        {
          elemId: 2000,
          type: 'mainmenu',
          text: 'New Cars',
          path: '/news/news-new-cars',
          parent: 4,
          weight: 600
        },
        {
          elemId: 2001,
          type: 'mainmenu',
          text: 'Used Cars',
          path: '/news/news-used-cars',
          parent: 4,
          weight: 2
        },
        {
          elemId: 4,
          type: 'mainmenu',
          text: 'News',
          path: '/news',
          parent: 0,
          weight: 12
        },
        {
          elemId: 5,
          type: 'mainmenu',
          text: 'Style Guide',
          path: 'style-guide',
          parent: 0,
          weight: -101
        },
        {
          elemId: 6,
          type: 'mainmenu',
          text: 'Advice',
          path: '/advice',
          parent: 0,
          weight: -100
        },
        {
          elemId: 666,
          type: 'mainmenu',
          text: 'Valuations',
          path: '/valuations',
          parent: 0,
          weight: 13
        },
        {
          elemId: 2,
          type: 'mainmenu',
          text: 'New Car deals',
          path: '/buy',
          parent: 0,
          weight: 15
        },
        {
          elemId: 2444,
          type: 'mainmenu',
          text: 'Test',
          path: '/test',
          parent: 0,
          weight: 16
        }
      ]
    },
    'social-menu':
    {
      properties: {
        stickToMoreMenu: 'y'
      },
      items: [
        {
          elemId: 4,
          type: 'socialmenu',
          text: 'Subscribe to newsletter',
          path: 'http://www.whatcar.com/subscribe',
          parent: 0,
          icon: {
            code: 'email',
            position: 'left'
          },
          weight: 0
        },
        {
          elemId: 1,
          type: 'socialmenu',
          text: 'Facebook',
          path: 'http://www.facebook.com',
          parent: 0,
          icon: {
            code: 'facebook',
            position: 'left'
          },
          weight: 1
        },
        {
          elemId: 2,
          type: 'socialmenu',
          text: 'You Tube',
          path: 'http://www.youtube.com',
          parent: 0,
          icon: {
            code: 'youtube',
            position: 'left'
          },
          weight: 2
        },
        {
          elemId: 3,
          type: 'socialmenu',
          text: 'Twitter',
          path: 'http://www.twitter.com',
          parent: 0,
          icon: {
            code: 'twitter',
            position: 'left'
          },
          weight: 3
        }
      ]
    },
  };
  for (let i = 0; i < 10; i++) {
    menus['main-menu'].items.push({
      elemId: 8000 + i,
      type: 'mainmenu',
      text: 'Menu Item ' + i,
      path: '/menu-item' + i,
      parent: 0,
      weight: 666+i
    });
  }


  let status = 200;
  const menuObject = {};
  req.query.menus.split(',').map((param) => {

    if (menus[param] == null) {
      status = 404;
    }
    else{
      menuObject[param] = menus[param].items;
    }
  });
  const result = status === 200 ? menuObject : [];
  res
    .status(status)
    .json(result);
});


/**
 * Returns the status of the importer.
 */
router.get('/teasers', (req, res) => {

  const teasers = {
    type: 'REVIEWS',
    items: [{
      nid: 1,
      carType: 'Mercedes',
      teaserTitle: 'New Mercedes A-Class Saloon – everything you need to know',
      path: '/advice/title-article-1',
      teaserCopy: '<p>The Mercedes Concept A previews next year’s A-Class Saloon and the fourth-generation A-Class hatchback. Here\'s what to expect...</p>',
      image: {
        'src': 'http://whatcar.media/jpg/85/0/0/640/426/0/0/0/0/0/center/0/0/0/0/0/images/uploads/carousels/fa3a848996a565dc7a06b6ac4f63ea82f50a18ec.jpg',
        'src@2x': 'http://whatcar.media/jpg/85/0/0/640/426/0/0/0/0/0/center/0/0/0/0/0/images/uploads/carousels/fa3a848996a565dc7a06b6ac4f63ea82f50a18ec.jpg',
      },
      rating: 3
    },
    {
      nid: 2,
      carType: 'Volkswagen',
      teaserTitle: 'New Volkswagen ID Crozz concept previews electric SUV',
      path: '/advice/title-article-2',
      teaserCopy: '<p>Volkswagen has revealed details of its latest ID concept car ahead of its launch at the Shanghai motor show.</p>',
      image: {
        'src': 'http://whatcar.media/jpg/85/0/0/640/426/0/0/0/0/0/center/0/0/0/0/0/images/uploads/carousels/339ff94be29c8224fddf5b54463f8546aa21325b.jpg',
        'src@2x': 'http://whatcar.media/jpg/85/0/0/640/426/0/0/0/0/0/center/0/0/0/0/0/images/uploads/carousels/339ff94be29c8224fddf5b54463f8546aa21325b.jpg',
      },
      rating: 5
    },
    {
      nid: 345,
      carType: 'Citroën',
      teaserTitle: 'Citroën C5 Aircross to launch next year',
      path: '/advice/title-article-3',
      teaserCopy: '<p>BMW\'s new 5 Series saloon scores highly in safety tests, but the Fiat Doblo people carrier disappoints.</p>',
      image: {
        'src': 'http://whatcar.media/jpg/85/0/0/640/426/0/0/0/0/0/center/0/0/0/0/0/images/uploads/carousels/8c0cd2a7c3cebf10e7d909792f4e2ccb71972bd2.jpg',
        'src@2x': 'http://whatcar.media/jpg/85/0/0/640/426/0/0/0/0/0/center/0/0/0/0/0/images/uploads/carousels/8c0cd2a7c3cebf10e7d909792f4e2ccb71972bd2.jpg',
      },
      rating: 4
    },
    {
      nid: 5690,
      carType: 'Skodas',
      teaserTitle: 'Details of Skodas first ever electric car revealed',
      path: '/advice/title-article-4',
      teaserCopy: '<p>The May issue of What Car? magazine is now on sale; all this and more inside.</p>',
      image: {
        'src': 'http://whatcar.media/jpg/85/0/0/640/426/0/0/0/0/0/center/0/0/0/0/0/images/uploads/carousels/f4f4b7f05796733e3a9a1017ef78e4f3d58114ae.jpg',
        'src@2x': 'http://whatcar.media/jpg/85/0/0/640/426/0/0/0/0/0/center/0/0/0/0/0/images/uploads/carousels/f4f4b7f05796733e3a9a1017ef78e4f3d58114ae.jpg',
      },
      rating: 1
    }]
  };

  res
    .status(200)
    .json(teasers);
});

export default router;
