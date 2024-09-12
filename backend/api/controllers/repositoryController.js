const Repository = require('../models/Repository');
const { Octokit } = require('@octokit/rest');

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

exports.getRepositories = async (req, res) => {
  try {
    const repositories = await Repository.find();
    res.json(repositories);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching repositories', error: error.message });
  }
};

exports.updateRepositories = async (req, res) => {
  try {
    const { data } = await octokit.repos.listForAuthenticatedUser();
    
    for (const repo of data) {
      await Repository.findOneAndUpdate(
        { name: repo.name },
        {
          name: repo.name,
          description: repo.description,
          url: repo.html_url,
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          lastUpdated: repo.updated_at
        },
        { upsert: true, new: true }
      );
    }
    
    res.json({ message: 'Repositories updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating repositories', error: error.message });
  }
};