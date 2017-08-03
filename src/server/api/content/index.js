import { Router } from 'express';
const router = Router();

/**
 * Returns the status of the importer.
 */
router.get('/articles', (req, res) => {

  const articles = [
    {
      nid: 1,
      category: 'news',
      teaserTitle: 'Teaser Title article 1',
      title: 'Title article 1',
      path: '/advice/title-article-1',
      summary: 'This is the summary field for article 1',
      author: 'Edgar Alla Poe',
      articleDate: 1488989978,
      lastUpdatedDate: 1488989978,
      mainCopy: '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore praesentium eveniet eaque dignissimos, illo impedit nam, velit at quasi consectetur libero eum iusto. Aliquid a minus, mollitia alias. Ipsam, facere!</p>',
      teaserCopy: '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio nobis qui amet molestiae error vero ipsa sequi beatae fugiat laudantium ut cumque earum quasi, ea exercitationem impedit fugit dolores, recusandae.</p>'      
    },
    {
      nid: 2,
      category: 'advice',
      teaserTitle: 'Teaser Title Should I buy a car with a credit card?',
      title: 'Should I buy a car with a credit card?',
      path: '/advice/title-article-2',
      summary: 'This is the summary field for article 2',
      author: 'Ernest Hemingway',
      articleDate: 1488989978,
      lastUpdatedDate: 1488989978,
      mainCopy: '<h2 id=\"advantages-of-using-a-credit-card\"><strong>Advantages of using a credit card:</strong></h2> <h3 id=\"interest-free-credit\">Interest-free credit</h3><p>Perhaps the main advantage of using a credit card over another form of car finance is that you can avoid paying interest altogether by choosing a card offering 0% on purchases for an introductory period and paying it off within that time.</p><p>Many of the main credit card providers offer this feature as a promotional device to get you to sign up. You\'ll need to be careful, though, and check how the new card stacks up on fees, not to mention the eventual interest rate that you\'ll be charged when the 0% period runs out.</p><h3 id=\"extra-protection\">Extra protection</h3><p>The potential for interest-free borrowing is not the only advantage of buying a new or secondhand car with a credit card, though.</p><p><img src=\"http://whatcar.media/jpg/50/0/0/960/640/0/0/0/0/aspectfit/0/0/0/0/0/0/images/uploads/inline/14e524705944e5854bee689711f7c040fd626155.jpg\"></p><h3 id=\"interest-free-credit\">Interest-free credit</h3><p>Perhaps the main advantage of using a credit card over another form of car finance is that you can avoid paying interest altogether by choosing a card offering 0% on purchases for an introductory period and paying it off within that time.</p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus iure aperiam doloremque quas. Illum laborum dignissimos repellat molestias porro, tempora necessitatibus at ratione dolorum aspernatur libero nisi soluta dicta ut.</p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum, culpa iure. Nisi dicta, iusto numquam temporibus odit aspernatur aliquid. Alias in voluptatum incidunt ea harum omnis, deserunt quaerat ipsum molestias.</p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum, culpa iure. Nisi dicta, iusto numquam temporibus odit aspernatur aliquid. Alias in voluptatum incidunt ea harum omnis, deserunt quaerat ipsum molestias.</p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum, culpa iure. Nisi dicta, iusto numquam temporibus odit aspernatur aliquid. Alias in voluptatum incidunt ea harum omnis, deserunt quaerat ipsum molestias.</p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum, culpa iure. Nisi dicta, iusto numquam temporibus odit aspernatur aliquid. Alias in voluptatum incidunt ea harum omnis, deserunt quaerat ipsum molestias.</p><h3 id=\"interest-free-credit\">Interest-free credit</h3><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum, culpa iure. Nisi dicta, iusto numquam temporibus odit aspernatur aliquid. Alias in voluptatum incidunt ea harum omnis, deserunt quaerat ipsum molestias.</p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum, culpa iure. Nisi dicta, iusto numquam temporibus odit aspernatur aliquid. Alias in voluptatum incidunt ea harum omnis, deserunt quaerat ipsum molestias.</p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum, culpa iure. Nisi dicta, iusto numquam temporibus odit aspernatur aliquid. Alias in voluptatum incidunt ea harum omnis, deserunt quaerat ipsum molestias.</p>',
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
      articleDate: 1488989978,
      lastUpdatedDate: 1488989978,
      mainCopy: '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat similique soluta, earum adipisci harum voluptates quod incidunt dolorum iusto impedit culpa, pariatur labore deleniti, necessitatibus, facilis. Autem aliquam tenetur vitae.</p>',
      teaserCopy: '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio nobis qui amet molestiae error vero ipsa sequi beatae fugiat laudantium ut cumque earum quasi, ea exercitationem impedit fugit dolores, recusandae.</p>'
    },
    {
      nid: 5690,
      category: 'advice',
      teaserTitle: 'Teaser Title article 4',
      title: 'Title article 4',
      path: '/advice/title-article-4',
      summary: 'This is the summary field for article 4',
      author: 'William Shakespeare',
      articleDate: 1488989978,
      lastUpdatedDate: 1488989978,
      mainCopy: '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus accusamus assumenda ex consequatur fugit atque, a reprehenderit, voluptate cum quisquam amet, iusto quam magni obcaecati aliquid mollitia necessitatibus eos nisi!</p>',
      teaserCopy: '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio nobis qui amet molestiae error vero ipsa sequi beatae fugiat laudantium ut cumque earum quasi, ea exercitationem impedit fugit dolores, recusandae.</p>'
    }    
  ];

  const queryArticles = req.query.nodes;

  let result = [], status = 404;

  if(req.query.contentType === 'article'){
    for(let article of articles){
      if( article.path === queryArticles ){ //does map have the article?
        result.push(
          {
            nid: article.nid,
            category: article.category,
            title: article.title,
            path: article.path,
            summary: article.summary,
            author: article.author,
            articleDate: article.articleDate,
            lastUpdatedDate: article.lastUpdatedDate,
            mainCopy: article.mainCopy,
          }
        ); //yes: get it
        status = 200;
      }
    }
  }
  else if(req.query.contentType === 'teasers'){
    for(let article of articles){
      if( article.category === queryArticles.substring(1).toLowerCase() ){ //does map have the article?
        result.push(
          { 
            teaserTitle: article.teaserTitle,
            teaserCopy: article.teaserCopy,
            path: article.path 
          }
        ); //yes: get it
        status = 200;
      }
    }
  }

  res
    .status(status)
    .json(result);
});

export default router;