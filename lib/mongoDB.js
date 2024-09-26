import mongoose from 'mongoose';

const { Schema, connect, model: _model, models } = mongoose;
const defaultOptions = { useNewUrlParser: true, useUnifiedTopology: true };

export class mongoDB {
  constructor(url, options = defaultOptions) {
    this.url = url;
    this.options = options;
    this.data = this._data = {};
    this._schema = {};
    this._model = {};
    this.db = connect(this.url, { ...this.options }).catch(console.error);
  }

  async read() {
    this.conn = await this.db;

    const schema = this._schema = new Schema({
      data: {
        type: Object,
        required: true,
        default: {}
      }
    });

    this._model = models.data || _model('data', schema);

    this._data = await this._model.findOne({});
    if (!this._data) {
      this.data = {};
      await this.write(this.data);
      this._data = await this._model.findOne({});
    } else {
      this.data = this._data.data;
    }
    
    return this.data;
  }

  write(data) {
    return new Promise(async (resolve, reject) => {
      if (!data) return reject('Data tidak valid');
      if (!this._data) return resolve((new this._model({ data })).save());

      try {
        const docs = await this._model.findById(this._data._id);
        if (!docs.data) docs.data = {};
        docs.data = data;
        this.data = {};
        await docs.save();
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  }
}

export class mongoDBV2 {
  constructor(url, options = defaultOptions) {
    this.url = url;
    this.options = options;
    this.models = [];
    this.data = {};
    this.db = connect(this.url, { ...this.options }).catch(console.error);
  }

  async read() {
    this.conn = await this.db;

    const schema = new Schema({
      data: [{ name: String }]
    });

    this.list = models.lists || _model('lists', schema);

    this.lists = await this.list.findOne({});
    if (!this.lists?.data) {
      await this.list.create({ data: [] });
      this.lists = await this.list.findOne({});
    }

    const garbage = [];
    await Promise.all(
      this.lists.data.map(async ({ name }) => {
        let collection;
        try {
          collection = models[name] || _model(name, new Schema({ data: Array }));
        } catch (e) {
          console.error(e);
          garbage.push(name);
        }

        if (collection) {
          const index = this.models.findIndex(v => v.name === name);
          if (index !== -1) {
            this.models[index].model = collection;
          } else {
            this.models.push({ name, model: collection });
          }

          const collectionsData = await collection.find({});
          this.data[name] = Object.fromEntries(collectionsData.map(v => v.data));
        }
      })
    );

    try {
      const del = await this.list.findById(this.lists._id);
      del.data = del.data.filter(v => !garbage.includes(v.name));
      await del.save();
    } catch (e) {
      console.error(e);
    }

    return this.data;
  }

  write(data) {
    return new Promise(async (resolve, reject) => {
      if (!this.lists || !data) return reject('List atau data tidak valid');

      const collections = Object.keys(data);
      const listDoc = [];

      await Promise.all(
        collections.map(async (key) => {
          const index = this.models.findIndex(v => v.name === key);

          // Jika sudah ada, update modelnya
          if (index !== -1) {
            const doc = this.models[index].model;
            if (Object.keys(data[key]).length > 0) {
              await doc.deleteMany().catch(console.error);
              await doc.insertMany(Object.entries(data[key]).map(v => ({ data: v })));
            }
            listDoc.push({ name: key });
          } else {
            // Jika belum ada, buat model baru
            const schema = new Schema({ data: Array });
            let doc;
            try {
              doc = models[key] || _model(key, schema);
            } catch (e) {
              console.error(e);
              doc = _model(key);
            }

            if (doc) {
              this.models.push({ name: key, model: doc });
              await doc.insertMany(Object.entries(data[key]).map(v => ({ data: v })));
              listDoc.push({ name: key });
            }
          }
        })
      );

      try {
        const doc = await this.list.findById(this.lists._id);
        if (!doc) {
          await this.read();
          await this.write(data);
        } else {
          doc.data = listDoc;
          await doc.save();
        }
        this.data = {};
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  }
}
