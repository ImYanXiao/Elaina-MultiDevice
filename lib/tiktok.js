import axios from 'axios';
import * as cheerio from 'cheerio';
import FormData from 'form-data';

class Resource {
  constructor(url, index) {
    this.index = index;
    this.url = url;
  }

  download(config = {}) {
    return axios({
      url: this.url,
      responseType: 'stream',
      ...config
    });
  }
}

class SnapTikClient {
  constructor(config = {}) {
    this.axios = axios.create(this.config = {
      baseURL: 'https://dev.snaptik.app',
      ...config,
    });
  }

  async get_token() {
    try {
      const { data } = await this.axios({ url: '/' });
      const $ = cheerio.load(data);
      const token = $('input[name="token"]').val();
      console.log(token); // Debugging token
      return token;
    } catch (error) {
      console.error(error);
    }
  }

  async get_script(url) {
    try {
      const form = new FormData();
      const token = await this.get_token();
      form.append('token', token);
      form.append('url', url);

      const { data } = await this.axios({
        url: '/abc2.php',
        method: 'POST',
        data: form
      });

      console.log(data); // Debugging script data
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  async eval_script(script1) {
    try {
      const script2 = await new Promise(resolve => Function('eval', script1)(resolve));
      console.log(script2); // Debugging script2

      return new Promise((resolve, reject) => {
        let html = '';
        const [k, v] = ['keys', 'values'].map(x => Object[x]({
          $: () => Object.defineProperty({
            remove() {},
            style: { display: '' }
          }, 'innerHTML', { set: t => (html = t) }),
          app: { showAlert: reject },
          document: { getElementById: () => ({ src: '' }) },
          fetch: a => resolve({ html, oembed_url: a }),
          gtag: () => 0,
          Math: { round: () => 0 },
          XMLHttpRequest: function() { return { open() {}, send() {} } },
          window: { location: { hostname: 'snaptik.app' } }
        }));

        Function(...k, script2)(...v);
      });
    } catch (error) {
      console.error(error);
    }
  }

  async get_hd_video(token) {
    try {
      const { data: { error, url } } = await this.axios({
        url: `/getHdLink.php?token=${token}`
      });

      if (error) throw new Error(error);
      console.log(url); // Debugging HD video URL
      return url;
    } catch (error) {
      console.error(error);
    }
  }

  async parse_html(html) {
  try {
    const $ = cheerio.load(html);
    console.log(html); // Debugging loaded HTML

    const is_video = !$('div.render-wrapper').length;
    console.log(is_video); // Debugging video check

    if (is_video) {
      const hd_token = $('div.video-links > button[data-tokenhd]').data('tokenhd');
      console.log('HD Token:', hd_token); // Debugging HD token
      const hd_url = new URL(await this.get_hd_video(hd_token));
      const token = hd_url.searchParams.get('token');
      const { url } = JSON.parse(atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));

      return {
        type: 'video',
        data: {
          sources: [
            url,
            hd_url.href,
            ...$('div.video-links > a:not(a[href="/"])').toArray()
              .map(elem => $(elem).attr('href'))
              .map(x => x.startsWith('/') ? this.config.baseURL + x : x)
          ].map((...x) => new Resource(...x))
        }
      };
    } else {
      console.log('Handling photo or slideshow...');
      
      // Handle photo
      const images = $('img').toArray().map(img => $(img).attr('src'));
      console.log('Images found:', images);

      if (images.length > 0) {
        return {
          type: 'image',
          data: images.map(url => new Resource(url))
        };
      }

      // If there are no images, return unknown type
      return { type: 'unknown', data: {} };
    }
  } catch (error) {
    console.error(error);
  }
}

  async process(url) {
    try {
      const script = await this.get_script(url);
      console.log(script); // Debugging script

      const { html, oembed_url } = await this.eval_script(script);
      console.log(html); // Debugging HTML
      console.log(oembed_url); // Debugging oembed URL

      const res = {
        ...(await this.parse_html(html)),
        url
      };

      res.data.oembed_url = oembed_url;
      console.log(res); // Debugging final result
      return res;
    } catch (error) {
      console.error(error);
    }
  }
}

export default { SnapTikClient };
