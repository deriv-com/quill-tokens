const transform = require("./release.utils.cjs");

module.exports = {
    branches: [
        "+([0-9])?(.{+([0-9]),x}).x",
        "master",
        "next",
        "next-major",
        { name: "beta", prerelease: true },
        { name: "alpha", prerelease: true },
    ],
    repositoryUrl: "git@github.com:deriv-com/quill-tokens.git",
    plugins: [
        [
            "@semantic-release/commit-analyzer",
            {
                releaseRules: [
                    {
                        type: "bump",
                        release: "major",
                    },
                    {
                        type: "feat",
                        release: "minor",
                    },
                    {
                        type: "build",
                        release: "patch",
                    },
                    {
                        type: "ci",
                        release: "patch",
                    },
                    {
                        type: "chore",
                        release: "patch",
                    },
                    {
                        type: "fix",
                        release: "patch",
                    },
                ],
            },
        ],
        [
            "@semantic-release/release-notes-generator",
            {
              parserOpts: {
                mergePattern: /^Merge pull request #(\d+) from (.*)$/,
                mergeCorrespondence: ["id", "source"],
              },
              writerOpts: {
                transform: transform,
                // Adding a fallback for Date handling to avoid the TypeError
                processCommitDate: (commit) => {
                  if (commit.date && !(commit.date instanceof Date)) {
                    // If the commit date is not a valid Date, set it to a fallback Date
                    commit.date = new Date(commit.date);
                  }
                  return commit;
                }
              },
            },
          ],
          
        "@semantic-release/changelog",
        [
            "@semantic-release/npm",
            {
                npmPublish: true,
            },
        ],
        "@semantic-release/github",
    ],
};
