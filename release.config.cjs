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
          { type: 'bump', release: 'patch' },
          { type: '*', release: 'patch' }
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
              if (commit.committerDate) {
                const date = new Date(commit.committerDate);
                if (date > new Date()) {
                  commit.committerDate = new Date().toISOString();
                }
              }
              return commit;
            } catch (error) {
              console.error(`Error processing commit: ${commit.message}`, error);
              return null;
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
        nextVersion: process.env.NEXT_VERSION
      },
    ],
    '@semantic-release/github',
  ],
  analyzeCommits: () => {
    console.log('Version from input:', process.env.NEXT_VERSION);
    return process.env.RELEASE_TYPE || 'patch';
  }
};
