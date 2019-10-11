module.exports = {
  name: 'transloco-holder',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/transloco-holder',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
