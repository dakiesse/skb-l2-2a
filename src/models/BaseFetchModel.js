import fetch from "node-fetch";

export default class BaseFetchModel {
  data = {};

  constructor(url) {
    this.url = url;

    this.fetch()
      .then(json => {
        this.data = json;
      })
      .catch(err => {
        console.info(err);
        this.err = err;
      });
  }

  async fetch() {
    try {
      let response = await fetch(this.url);
      return await response.json();
    } catch (err) {
      return err
    }
  }

  get attributes() {
    return this.data;
  }

  isEmpty() {
    return Object.keys(this.data).length === 0;
  }
}
