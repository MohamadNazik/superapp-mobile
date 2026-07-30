// Restores the Gradle wrapper files into android/gradle/wrapper/ after every
// npm install. This runs regardless of whether `expo prebuild` (which EAS
// Build runs automatically before invoking gradlew) leaves the wrapper jar
// in place, since that behavior differs between local and EAS environments.
//
// The jar is stored base64-encoded as a .txt-like file (gradle-wrapper.jar.b64)
// rather than a raw .jar, because EAS's own upload process appears to silently
// strip files with a literal .jar extension regardless of .gitignore/.easignore
// rules -- confirmed by the properties file (same folder) surviving while the
// jar consistently did not.
const fs = require("fs");
const path = require("path");

const backupDir = path.resolve(__dirname, "..", "gradle-wrapper-backup");
const targetDir = path.resolve(__dirname, "..", "android", "gradle", "wrapper");

// Nothing to restore into if the native android project hasn't been
// generated yet (e.g. a fresh install before the first prebuild).
if (!fs.existsSync(path.resolve(__dirname, "..", "android"))) {
  process.exit(0);
}

fs.mkdirSync(targetDir, { recursive: true });

// Plain-text file, restored as-is.
const propsSrc = path.join(backupDir, "gradle-wrapper.properties");
const propsDest = path.join(targetDir, "gradle-wrapper.properties");
if (fs.existsSync(propsSrc)) {
  fs.copyFileSync(propsSrc, propsDest);
  console.log("Restored gradle-wrapper.properties to android/gradle/wrapper/");
}

// Base64-encoded jar, decoded back into a real .jar file.
const jarB64Src = path.join(backupDir, "gradle-wrapper.jar.b64");
const jarDest = path.join(targetDir, "gradle-wrapper.jar");
if (fs.existsSync(jarB64Src)) {
  const decoded = Buffer.from(fs.readFileSync(jarB64Src, "utf8"), "base64");
  fs.writeFileSync(jarDest, decoded);
  console.log("Restored gradle-wrapper.jar to android/gradle/wrapper/ (decoded from base64)");
} else {
  console.warn("gradle-wrapper.jar.b64 backup not found -- gradle-wrapper.jar was not restored");
}
