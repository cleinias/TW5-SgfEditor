#! /bin/bash

# This bash script create a distribution ready version of the plugin

# Parameters
all=besogo.all.js
min=besogo.min.js
distPath=dist\/
library=besogo
homeDir=$PWD

echo "Distribution path is: "
echo distPath
echo ""
echo "Combining all", ./$library,  " library files..."

# Combine all library files
cd files/$library/
cat js/* > $all

#  Inject the commonJS call at the end of the combined file
echo "Injecting commonJS code into " $library " library..."
echo "exports.besogo=besogo;" >> $all

# Minify library
echo "Minifying library..."
curl -s \
  -d compilation_level=SIMPLE_OPTIMIZATIONS \
  -d output_format=text \
  -d output_info=compiled_code \
  --data-urlencode "js_code@${all}" \
  http://closure-compiler.appspot.com/compile \
  > $min

cd $homeDir

# Clear destination directory and copy all needed files to it

echo "Clearing distribution directory " ./$distPath "..."
rm -rf ./$distPath/

echo "Creating distribution subtree..."
mkdir -p ./$distPath/files
mkdir -p ./$distPath/files/doc
mkdir -p ./$distPath/files/$library
mkdir -p ./$distPath/files/$library/css

echo "Copying " $library  "combined js file..."
cp $min ./$distPath/files/$library

echo "Copying " $library "CSS files..."
cp files/$library/css/* ./$distPath/files/$library/css

echo "Copying plugin javascript files and plugin.info..."
cp ./*.js ./$distPath/
cp plugin.info ./$distPath/

echo "Copying tiddlywiki.info and documentation..."
cp files/doc/* ./$distPath/files/doc/
cp files/tiddlywiki.files ./$distPath/files

echo "Uploading test wiki..."
# TO DO
echo "Test wiki upload still to do!"

echo "Done"
