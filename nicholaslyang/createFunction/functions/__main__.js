const fs = require("fs");
const axios = require("axios");
const tar = require("tar-stream");
const path = require("path");
const async = require("async");
const zlib = require("zlib");

const readFiles = (base, properties, dir, data) => {
  dir = dir || "/";
  data = data || [];
  properties = properties || {};

  let ignore = properties.ignore || {};

  return fs.readdirSync(path.join(base, dir)).reduce((data, f) => {
    let pathname = path.join(dir, f);
    let fullpath = path.join(base, pathname);

    for (let i = 0; i < ignore.length; i++) {
      if (ignore[i][0] === "/") {
        if (pathname.split(path.sep).join("/") === ignore[i]) {
          return data;
        }
      } else {
        if (f === ignore[i]) {
          return data;
        }
      }
    }

    if (fs.statSync(fullpath).isDirectory()) {
      return readFiles(base, properties, pathname, data);
    } else {
      let filename = pathname[0] === path.sep ? pathname.substr(1) : pathname;
      let buffer = fs.readFileSync(fullpath);
      filename = filename.split(path.sep).join("/"); // Windows
      data.push({ filename: filename, buffer: buffer });
      return data;
    }
  }, data);
};

const createFolders = (USERNAME_FOLDER, BASE_FOLDER) => {
  try {
    fs.mkdirSync(USERNAME_FOLDER);
  } catch (err) {}

  try {
    fs.mkdirSync(BASE_FOLDER);
  } catch (err) {}

  try {
    fs.mkdirSync(BASE_FOLDER + "/functions");
  } catch (err) {}
};

const createPackageJSON = (
  BASE_FOLDER,
  functionName,
  username,
  email,
  callback
) => {
  const packageJSON = `{
  "name": "${functionName}",
  "version": "0.0.0",
  "description": "",
  "author": "${username} <${email}>",
  "main": "functions/__main__.js",
  "dependencies": {},
  "private": true,
  "stdlib": {
    "build": "faaslang",
    "name": "${username}/${functionName}",
    "timeout": 10000,
    "publish": true,
    "personalize": {
      "keys": [],
      "user": []
    }
  }
}`;
  fs.writeFile(BASE_FOLDER + "/package.json", packageJSON, function(err) {
    if (err) {
      callback(null, err);
    }
  });
};

const createEnvJSON = (BASE_FOLDER, callback) => {
  const envJSON = `
{
    "local": {
        "key": "value"
    },
    "dev": {
        "key": "value"
    },
    "release": {
        "key": "value"
    }
}
`;
  fs.writeFile(BASE_FOLDER + "/env.json", envJSON, function(err) {
    if (err) {
      callback(null, err);
    }
  });
};

const createMainJS = (code, BASE_FOLDER, callback) => {
  const mainJs = `
/**
* A function created by Microtea.ch
* @param {string} jsonInput Input for the function
* @returns {string}
*/

module.exports = (jsonInput, context, callback) => {
const input = JSON.parse(jsonInput);
${code}
};`;
  fs.writeFile(BASE_FOLDER + "/functions/__main__.js", mainJs, function(err) {
    if (err) {
      callback(null, err);
    }
  });
};

const getAccessToken = (email, password) => {
  return axios.post("https://api.polybit.com/v1/access_tokens", {
    grant_type: "password",
    username: email,
    password: password
  });
};

/**
* Creates a new function
* @param {string} functionName Name of the function you're uploading
* @param {string} email Email of user (must be same as stdlib account)
* @param {string} username Username of user
* @param {string} password User's stdlib account password
* @param {string} code Code written by user
* @returns {string}
*/
module.exports = (
  functionName,
  email,
  username,
  password,
  code,
  context,
  callback
) => {

  const USERNAME_FOLDER = `/tmp/${username}`;
  const BASE_FOLDER = `${USERNAME_FOLDER}/${functionName}`;
  let pkg;

  try {
    pkg = require(path.join(process.cwd(), "package.json"));
  } catch (e) {
    return callback(new Error("Invalid package.json"));
  }

  createFolders(USERNAME_FOLDER, BASE_FOLDER);
  createPackageJSON(BASE_FOLDER, functionName, username, email, callback);
  createEnvJSON(BASE_FOLDER, callback);
  createMainJS(code, BASE_FOLDER, callback);

  getAccessToken(email, password).then(response => {
    const accessToken = response.data.data[0].access_token;
    const tmpPath = path.join(process.cwd(), "tmp.tar.gz");

    let tarball = fs.createWriteStream(tmpPath, { mode: 0o777 });

    let pack = tar.pack();

    let defignore = ["/node_modules", "/.stdlib", "/.git", ".DS_Store"];
    let libignore = fs.existsSync(".libignore")
      ? fs.readFileSync(".libignore").toString()
      : "";
    libignore = libignore
      .split("\n")
      .map(v => v.replace(/^\s(.*)\s$/, "$1"))
      .filter(v => v);
    while (defignore.length) {
      let ignore = defignore.pop();
      libignore.indexOf(ignore) === -1 && libignore.push(ignore);
    }

    let data = readFiles(process.cwd(), { ignore: libignore });

    // pipe the pack stream to your file
    pack.pipe(tarball);

    // Run everything in parallel...

    async.parallel(
      data.map(file => {
        return callback => {
          pack.entry({ name: file.filename }, file.buffer, callback);
        };
      }),
      err => {
        if (err) {
          return callback(err);
        }

        pack.finalize();
      }
    );

    tarball.on("close", () => {
      let buffer = fs.readFileSync(tmpPath);
      fs.unlinkSync(tmpPath);

      zlib.gzip(buffer, (err, result) => {
        axios
          .post(
            "https://registry.stdlib.com/" +
              username +
              "/" +
              functionName +
              "@dev",
            result,
            {
              headers: {
                Authorization: "Bearer " + accessToken,
                "X-Stdlib-Build": "faaslang"
              }
            }
          )
          .then(response =>
            callback(
              null,
              "Created " + functionName
            )
          );
      });
    });
  });

  process.chdir(BASE_FOLDER);
  console.log(process.cwd());
};
