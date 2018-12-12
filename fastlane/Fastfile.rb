# Customise this file, documentation can be found here:
# https://github.com/fastlane/fastlane/tree/master/fastlane/docs
# All available actions: https://docs.fastlane.tools/actions
# can also be listed using the `fastlane actions` command

# Change the syntax highlighting to Ruby
# All lines starting with a # are ignored when running `fastlane`

# If you want to automatically update fastlane if a new version is available:
# update_fastlane

# This is the minimum version number required.
# Update this, if you use features of a newer version
fastlane_version "2.53.1"

default_platform :ios

platform :ios do
  before_all do
    # ENV["SLACK_URL"] = "https://hooks.slack.com/services/..."
  end

  desc "Runs all the tests"
  lane :test do
    scan
  end

  desc "Submit a new Beta Build to Apple PGYER"
  desc "This will also make sure the profile is up to date"
  lane :beta do
    get_certificates           # invokes cert
    get_provisioning_profile   # invokes sigh

    create_keychain(
      name: ENV["MATCH_KEYCHAIN_NAME"],
      password: ENV["MATCH_PASSWORD"],
      default_keychain: true,
      unlock: true,
      timeout: 3600,
      add_to_search_list: true
    )

    # Import distribution certificate
    import_certificate(
      certificate_path: "sh/release/certificates/ios_distribution.p12",
      certificate_password: ENV["KEY_PASSWORD"],
      keychain_name: ENV["MATCH_KEYCHAIN_NAME"]
    )

    sigh(
      adhoc: true, 
      username: "yipeng.info@gamil.com",
      team_id: "CVU2X68836",
      provisioning_name: "ionic4_Ad_Hoc_Profile.mobileprovision",
      cert_id: "CVU2X68836"
    )

    # match(
    #   type: "adhoc", 
    #   keychain_name: ENV["MATCH_KEYCHAIN_NAME"],
    #   keychain_password: ENV["MATCH_PASSWORD"],
    #   readonly: true
    # )
    
    ## --prod
    sh "cd .. && ionic cordova build ios --release"
    
    cordova(
      platform: "ios", 
      type: "adhoc",
      cordova_prepare: false
    )

    sh "cd ./platforms/ios"
    # build_app(export_method: "ad-hoc")${PGYER_APIKEY}
    pgyer(api_key: ENV["PGYER_APIKEY"], user_key: ENV["PGYER_USERKEY"], update_description: "update by fastlane")
    # hockey(
    #   api_token: ENV["HOCKEYAPP_API_KEY"],
    #   ipa: ENV["CORDOVA_IOS_RELEASE_BUILD_PATH"],
    #   notify: "0"
    # )
  end

  desc "Deploy a new version to the App Store"
  lane :release do
    # match(type: "appstore")
    # snapshot
    gym # Build your app - more options available
    deliver(force: true)
    # frameit
  end

  # You can define as many lanes as you want

  after_all do |lane|
    # This block is called, only if the executed lane was successful

    # slack(
    #   message: "Successfully deployed new App Update."
    # )
  end

  error do |lane, exception|
    # slack(
    #   message: exception.message,
    #   success: false
    # )
  end
end


# More information about multiple platforms in fastlane: https://github.com/fastlane/fastlane/blob/master/fastlane/docs/Platforms.md
# All available actions: https://docs.fastlane.tools/actions

# fastlane reports which actions are used. No personal data is recorded. 
# Learn more at https://github.com/fastlane/fastlane#metrics