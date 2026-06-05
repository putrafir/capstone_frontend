// fix-repositories.js

const fs = require("fs");
const path = require("path");

const ROOT = path.join(process.cwd(), "src");

const replacements = {
  "@/repositories/LocalCampaignRepository":
    "@/features/campaigns/repositories/LocalCampaignRepository",

  "@/repositories/CampaignRepository":
    "@/features/campaigns/repositories/CampaignRepository",

  "@/types/campaign":
    "@/features/campaigns/types/campaign",

  "@/types/managedCampaign":
    "@/features/campaigns/types/managedCampaign",
};

function walk(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);

    if (stat.isDirectory()) {
      walk(full);
      continue;
    }

    if (!/\.(ts|tsx|js|jsx)$/.test(file)) {
      continue;
    }

    let content = fs.readFileSync(full, "utf8");
    let changed = false;

    for (const [oldPath, newPath] of Object.entries(replacements)) {
      if (content.includes(oldPath)) {
        content = content.replaceAll(oldPath, newPath);
        changed = true;
      }
    }

    if (changed) {
      fs.writeFileSync(full, content);
      console.log("FIXED:", full);
    }
  }
}

walk(ROOT);

console.log("DONE");