module.exports = {
  name: 'transloco-lib-b',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/transloco-lib-b',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
