#!/usr/bin/env node

/**
 * Update build-release.xcconfig with correct profile and developer values for app signing
 */
var path = require('path');
var fs = require('fs');

// @deprecated
fs.exists("../../platforms/ios", function (exists) {
    return true;
    if (exists) {
        var PROFILE_UUID_TEMPLATE_VAL = '%PROFILE_UUID%';
        var PROFILE_UUID_ENV_VAR = process.env.PROFILE_UUID;
        var DEVELOPER_NAME_REGEX_GLOBAL = /%DEVELOPER_NAME%/g;
        var DEVELOPER_NAME_ENV_VAR = process.env.DEVELOPER_NAME;

        var xcconfigFinal = path.resolve(__dirname, '../../platforms/ios/cordova/build-release.xcconfig');
        var xcconfigTemplate = path.resolve(__dirname, '../../sh/release/xcconfig/build-release.xcconfig.template');

        fs.readFile(xcconfigTemplate, 'utf8', function (err, data) {
            if (err) {
                return console.log(err);
            }

            var result = data.replace(PROFILE_UUID_TEMPLATE_VAL, PROFILE_UUID_ENV_VAR)
                .replace(DEVELOPER_NAME_REGEX_GLOBAL, DEVELOPER_NAME_ENV_VAR);

            fs.writeFile(xcconfigFinal, result, 'utf8', function (err) {
                if (err) return console.log('No directory Found for cordova iOS! Skipping xcconfig creation. ', err);
                console.log('Cordova iOS build-release.xcconfig updated with profile and developer values.')
            });
        });
    }
});

