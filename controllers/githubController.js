const db = require("../config/db");
const {
  getGithubProfile,
  getGithubRepos
} = require("../services/githubService");

/**
 * 🔥 ANALYZE GITHUB PROFILE
 */
const analyzeProfile = async (req, res) => {
  try {
    const { username } = req.params;

    // 1. Fetch GitHub data
    const profile = await getGithubProfile(username);
    const repos = await getGithubRepos(username);

    // 2. Calculate total stars
    const totalStars = repos.reduce(
      (sum, repo) => sum + repo.stargazers_count,
      0
    );

    // 3. Account age calculation
    const accountAgeDays = Math.floor(
      (new Date() - new Date(profile.created_at)) /
        (1000 * 60 * 60 * 24)
    );

    // 4. Profile score (improved formula)
    const profileScore =
      profile.followers * 2 +
      profile.public_repos * 5 +
      totalStars * 3;

    // 5. Insert / Update DB
    const sql = `
      INSERT INTO github_profiles (
        username, name, bio, company, location,
        followers, following, public_repos, public_gists,
        account_age_days, total_stars, profile_score,
        avatar_url, github_url
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        name = VALUES(name),
        bio = VALUES(bio),
        company = VALUES(company),
        location = VALUES(location),
        followers = VALUES(followers),
        following = VALUES(following),
        public_repos = VALUES(public_repos),
        public_gists = VALUES(public_gists),
        account_age_days = VALUES(account_age_days),
        total_stars = VALUES(total_stars),
        profile_score = VALUES(profile_score),
        avatar_url = VALUES(avatar_url),
        github_url = VALUES(github_url)
    `;

    db.query(
      sql,
      [
        profile.login,
        profile.name,
        profile.bio,
        profile.company,
        profile.location,
        profile.followers,
        profile.following,
        profile.public_repos,
        profile.public_gists,
        accountAgeDays,
        totalStars,
        profileScore,
        profile.avatar_url,
        profile.html_url
      ],
      (err) => {
        if (err) {
          return res.status(500).json({
            success: false,
            message: err.message
          });
        }

        return res.json({
          success: true,
          message: "Profile analyzed successfully",
          data: {
            username: profile.login,
            name: profile.name,
            bio: profile.bio,
            location: profile.location,
            avatar_url: profile.avatar_url,
            public_repos: profile.public_repos,
            followers: profile.followers,
            following: profile.following
          },
          insights: {
            accountAgeDays,
            totalStars,
            profileScore
          }
        });
      }
    );
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * 📦 GET ALL ANALYZED PROFILES
 */
const getAllProfiles = (req, res) => {
  db.query("SELECT * FROM github_profiles", (err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: err.message
      });
    }

    return res.json({
      success: true,
      count: results.length,
      data: results
    });
  });
};

/**
 * 👤 GET SINGLE PROFILE
 */
const getSingleProfile = (req, res) => {
  db.query(
    "SELECT * FROM github_profiles WHERE username = ?",
    [req.params.username],
    (err, results) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: err.message
        });
      }

      if (results.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Profile not found"
        });
      }

      return res.json({
        success: true,
        data: results[0]
      });
    }
  );
};

module.exports = {
  analyzeProfile,
  getAllProfiles,
  getSingleProfile
};