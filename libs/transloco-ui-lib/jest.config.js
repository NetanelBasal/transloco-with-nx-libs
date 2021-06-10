module.exports = {
  name: 'transloco-ui-lib',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/transloco-ui-lib',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
