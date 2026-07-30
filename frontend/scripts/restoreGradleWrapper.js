// Restores the Gradle wrapper files into android/gradle/wrapper/ after every
// npm install. This runs regardless of whether `expo prebuild` (which EAS
// Build runs automatically before invoking gradlew) leaves the wrapper jar
// in place, since that behavior differs between local and EAS environments.
const fs = require("fs");
const path = require("path");

const backupDir = path.resolve(__dirname, "..", "gradle-wrapper-backup");
const targetDir = path.resolve(__dirname, "..", "android", "gradle", "wrapper");

const files = ["gradle-wrapper.jar", "gradle-wrapper.properties"];

// Nothing to restore into if the native android project hasn't been
// generated yet (e.g. a fresh install before the first prebuild).
if (!fs.existsSync(path.resolve(__dirname, "..", "android"))) {
  process.exit(0);
}

fs.mkdirSync(targetDir, { recursive: true });

for (const file of files) {
  const src = path.join(backupDir, file);
  const dest = path.join(targetDir, file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`Restored ${file} to android/gradle/wrapper/`);
  }
}
