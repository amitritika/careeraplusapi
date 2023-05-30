const { SitemapStream, streamToPromise } = require('sitemap');
const { Readable } = require('stream');
const axios = require('axios');


async function generateSitemap(req, res) {
  try {
    const links = [];

    function processPost(post) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          links.push({
            url: `/blogs/${post.slug}`,
            changefreq: 'daily',
            priority: 0.9,
          });
          resolve();
        }, 1000);
      });
    }

    axios.get('http://localhost:8000/api/blogs') // Replace 'http://example.com/api/blogs' with your actual API endpoint
      .then((response) => {
        const data = response.data;
        const postPromises = data.map(processPost);
        return Promise.all(postPromises);
      })
      .then(() => {
        const pages1 = [
          '/examplan',
          '/visualresume',
          '/blogs',
          '/aboutus',
          '/contactus',
        ];
        const pagesExamplan = ['gate', 'ese', 'psc'];
        const pagesExamplanGate = [
          'mechanical',
          'civil',
          'electronics',
          'computerscience',
          'electrical',
          'chemical',
          'instrumentation',
        ];
        const pagesExamplanEse = ['mechanical', 'civil', 'electronics', 'electrical'];
        const pagesExamplanPsc = ['mppscenglish', 'mppschindi'];

        pages1.forEach((url) => {
          links.push({
            url,
            changefreq: 'daily',
            priority: 0.9,
          });
        });

        pagesExamplan.forEach((u) => {
          links.push({
            url: `/examplan/${u}`,
            changefreq: 'daily',
            priority: 0.9,
          });
        });

        pagesExamplanGate.forEach((u) => {
          links.push({
            url: `/examplan/gate/${u}`,
            changefreq: 'daily',
            priority: 0.9,
          });
        });

        pagesExamplanEse.forEach((u) => {
          links.push({
            url: `/examplan/ese/${u}`,
            changefreq: 'daily',
            priority: 0.9,
          });
        });

        pagesExamplanPsc.forEach((u) => {
          links.push({
            url: `/examplan/psc/${u}`,
            changefreq: 'daily',
            priority: 0.9,
          });
        });

        const stream = new SitemapStream({
          hostname: 'https://careeraplus.in',
        });

        res.set('Content-Type', 'application/xml');

        const xmlStringPromise = Promise.resolve(
          streamToPromise(Readable.from(links).pipe(stream))
        ).then((data) => data.toString());

        xmlStringPromise.then((xmlString) => {
          res.send(xmlString);
        });
      })
      .catch((error) => {
        console.log(error);
        res.sendStatus(500);
      });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}

module.exports = generateSitemap;
