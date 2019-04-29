# CMSC190-Ionic3

ionic cordova build android --prod --release
keytool -genkey -v -keystore my-release-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias my-alias
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.jks platforms/android/build/outputs/apk/android-release-unsigned.apk my-alias
zipalign -v 4 platforms/android/build/outputs/apk/android-release-unsigned.apk Drawtotype-v1.apk
keytool -exportcert -alias my-alias -keystore my-release-key.jks | openssl sha1 -binary | openssl base64
