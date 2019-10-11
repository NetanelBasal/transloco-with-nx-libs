module.exports = {
  name: 'transloco-lib-a',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/transloco-lib-a',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
