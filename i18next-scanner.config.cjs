const fs = require('fs');
const { crc32 } = require('crc');

const systemLanguage = {
  zh_CN: 'zh-CN',
  zh_HK: 'zh-HK',
  en_US: 'en-US',
};

const lngs = Object.keys(systemLanguage).map((i) => systemLanguage[i]);

module.exports = {
  input: [
    'src/**/*.{js,jsx,tsx,ts}',
    // 不需要扫描的文件加!
    '!src/locales/**',
    '!**/node_modules/**',
  ],
  output: './',
  options: {
    debug: true,
    func: false,
    trans: false,
    lngs,
    defaultLng: systemLanguage.zh_CN,
    resource: {
      loadPath: './i18n/translate/{{lng}}.json',
      savePath: './i18n/scan/{{lng}}.json',
      jsonIndent: 2,
      lineEnding: '\n',
    },
    nsSeparator: false,
    keySeparator: false,
    interpolation: {
      prefix: '{{',
      suffix: '}}',
    },
  },

  transform: function (file, enc, done) {
    const { parser } = this;
    const content = fs.readFileSync(file.path, enc);
    parser.parseFuncFromString(content, { list: ['t', 'i18next._', 'i18next.__'] }, (key, options) => {
      options.defaultValue = key;
      const hashKey = `K_${crc32(key).toString(16)}`; // crc32转换格式
      parser.set(hashKey, options);
    });

    done();
  },
};
