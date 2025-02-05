const transform = require('./release.utils.cjs');

module.exports = {
  branches: [
    '+([0-9])?(.{+([0-9]),x}).x',
    'master',
    'next',
    'next-major',
    { name: 'beta', prerelease: true },
    { name: 'alpha', prerelease: true },
  ],
  repositoryUrl: 'git@github.com:deriv-com/quill-tokens.git',
  plugins: [
    [
      '@semantic-release/commit-analyzer',
      {
        releaseRules: [
          {
            type: 'bump',
            release: 'major',
          },
          {
            type: 'feat',
            release: 'minor',
          },
          {
            type: 'build',
            release: 'patch',
          },
          {
            type: 'ci',
            release: 'patch',
          },
          {
            type: 'chore',
            release: 'patch',
          },
          {
            type: 'fix',
            release: 'patch',
          },
        ],
      },
    ],
    [
      '@semantic-release/release-notes-generator',
      {
        parserOpts: {
          mergePattern: /^Merge pull request #(\d+) from (.*)$/,
          mergeCorrespondence: ['id', 'source'],
        },
        writerOpts: {
          transform: (commit) => {
            try {
              return commit;
            } catch (error) {
              // Log the error and continue processing the next commit
              console.error(`Error processing commit: ${commit.message}`, error);
              return null; // This will skip the problematic commit
            }
          },
        },
      },
    ],
    '@semantic-release/changelog',
    [
      '@semantic-release/npm',
      {
        npmPublish: true,
      },
    ],
    '@semantic-release/github',
  ],
};
