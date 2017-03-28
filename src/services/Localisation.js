
export default class Localisation {
  constructor() {
    this.locale = '';
    this.langs = {};
  }

  loadLang(url) {
    var request = new XMLHttpRequest();
    request.open('GET', url);
    request.send();

    var langs = this.langs;
    request.onload = function (e) {
      if (request.readyState == 4) {
        this.addLangs(JSON.parse(request.responseText));
      } else {
        throw '請求失敗';
      }
    }.bind(this);
  }

  addLangs(langs) {
    Object.keys(langs).map((locale) => {
      if (langs[locale] instanceof Object) {
        this.langs[locale] = this.langs[locale] || {};
        Object.assign(this.langs[locale], langs[locale]);
      }
    });
  }

  setLocale(locale) {
    this.locale = locale;
  }

  localize(index) {
    var lang = this.langs[this.locale];
    if (lang) {
      return lang[index] || '';
    }
    return '';
  }
}
