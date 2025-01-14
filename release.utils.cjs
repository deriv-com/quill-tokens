const types = {
    maxSubjectLength: 72,
    bodyLineLength: 100,
    typesOrder: [
        "feat",
        "fix",
        "perf",
        "build",
        "refactor",
        "docs",
        "test",
        "ci",
        "chore",
        "style",
        "revert",
        "initial",
        "dependencies",
        "peerDependencies",
        "devDependencies",
        "metadata",
    ],
    types: {
        feat: {
            description: "A new feature",
            title: "Features",
            emoji: "✨",
            changelog: true,
            release: "minor",
            aliases: {
                initial: {
                    description: "Initial commit",
                    title: "Initial",
                    emoji: "🎉",
                },
            },
        },
        fix: {
            description: "A bug fix",
            title: "Bug Fixes",
            emoji: "🐛",
            changelog: true,
            release: "patch",
            aliases: {
                dependencies: {
                    description: "Update dependency",
                    title: "Dependencies",
                    emoji: "⬆️",
                    scope: "package",
                },
                peerDependencies: {
                    description: "Update peer dependency",
                    title: "Peer dependencies",
                    emoji: "⬆️",
                    scope: "package",
                },
                metadata: {
                    description: "Update metadata (package.json)",
                    title: "Metadata",
                    emoji: "📦",
                    scope: "package",
                },
            },
        },
        docs: {
            description: "Documentation only changes",
            title: "Documentation",
            emoji: "📚",
            changelog: true,
            release: { scope: "readme", release: "patch" },
        },
        style: {
            description:
                "Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)",
            title: "Styles",
            emoji: "💎",
            changelog: true,
            release: false,
        },
        refactor: {
            description:
                "A code change that neither fixes a bug nor adds a feature",
            title: "Code Refactoring",
            emoji: "📦",
            changelog: true,
            release: false,
        },
        perf: {
            description: "A code change that improves performance",
            title: "Performance Improvements",
            emoji: "🚀",
            changelog: true,
            release: "patch",
        },
        test: {
            description: "Adding missing tests or correcting existing tests",
            title: "Tests",
            emoji: "🚨",
            changelog: true,
            release: false,
        },
        build: {
            description:
                "Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)",
            title: "Builds",
            emoji: "🛠",
            changelog: true,
            release: "patch",
        },
        ci: {
            description:
                "Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)",
            title: "Continuous Integrations",
            emoji: "⚙️",
            changelog: true,
            release: false,
        },
        chore: {
            description: "Other changes that don't modify src or test files",
            title: "Chores",
            emoji: "♻️",
            changelog: true,
            release: false,
            aliases: {
                devDependencies: {
                    description: "Update dev dependencies",
                    title: "Dev dependencies",
                    emoji: "⬆️",
                    scope: "package",
                },
            },
        },
        revert: {
            description: "Reverts a previous commit",
            title: "Reverts",
            emoji: "🗑",
            changelog: true,
            release: false,
        },
    },
};

const COMMIT_HASH_LENGTH = 7;

/**
 * Transform a parsed commit to render the changelog.
 *
 * @param {Object} commit commit parsed with `conventional-changelog-parser`.
 * @param {Object} context `conventional-changelog` context.
 * @return {Object} the transformed commit.
 */

const customTransform = (commit, context) => {
    // Create a shallow copy of the commit object
    const newCommit = { ...commit };

    // Validate and format the date
    if (newCommit.date && !(new Date(newCommit.date) instanceof Date)) {
        console.error("Invalid commit.date:", newCommit.date);
        newCommit.date = new Date().toISOString(); // Default to current date if invalid
    }

    if (newCommit.notes) {
        newCommit.notes = newCommit.notes.map((note) => ({
            ...note,
            title: "Breaking changes",
        }));
    }

    if (
        types.types[newCommit.type] &&
        (types.types[newCommit.type].changelog ||
            (newCommit.notes && newCommit.notes.length > 0))
    ) {
        newCommit.type = `${
            types.types[newCommit.type].emoji ? types.types[newCommit.type].emoji : ""
        } \t ${types.types[newCommit.type].title}`;
    } else {
        return null;
    }

    if (newCommit.scope === "*") {
        newCommit.scope = "";
    }

    if (typeof newCommit.hash === "string") {
        newCommit.shortHash = newCommit.hash.slice(0, COMMIT_HASH_LENGTH);
    }

    const references = [];

    if (typeof newCommit.subject === "string") {
        let url = context.repository
            ? `${context.host}/${context.owner}/${context.repository}`
            : context.repoUrl;

        if (url) {
            url += "/issues/";
            // Issue URLs.
            newCommit.subject = newCommit.subject.replace(/#(\d+)/g, (_, issue) => {
                references.push(issue);
                return `[#${issue}](${url}${issue})`;
            });
        }

        if (context.host) {
            // User URLs.
            newCommit.subject = newCommit.subject.replace(
                /\B@([a-z0-9](?:-?[a-z0-9]){0,38})/g,
                `[@$1](${context.host}/$1)`,
            );
        }
    }

    if (newCommit.references) {
        // Remove references that already appear in the subject
        newCommit.references = newCommit.references.filter((reference) => {
            return !references.includes(reference.issue);
        });
    }

    return newCommit;
};



module.exports = customTransform;
