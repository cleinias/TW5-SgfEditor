#! /bin/bash

# This bash script creates a distribution-ready version of the plugin

# Parameters
all=besogo.all.js
min=besogo.min.js
distPath=dist
library=besogo
homeDir=$PWD

echo "Distribution path is: "
echo distPath
echo ""
echo "Combining all" ./$library  " library files..."

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
mkdir -p ./$distPath/files/jdoc
mkdir -p ./$distPath/files/$library
mkdir -p ./$distPath/files/$library/css
mkdir -p ./$distPath/files/$library/img

echo "Copying " $library  "combined + minified js files..."
cp files/$library/$min ./$distPath/files/$library/
cp files/$library/$all ./$distPath/files/$library/

echo "Copying " $library "CSS files and images..."
cp files/$library/css/* ./$distPath/files/$library/css
cp files/$library/img/* ./$distPath/files/$library/img


echo "Copying plugin javascript files and plugin.info..."
cp ./*.js ./$distPath/
cp plugin.info ./$distPath/

echo "Copying tiddlywiki.info, documentation, and .json settings..."
cp files/doc/* ./$distPath/files/doc/
cp files/tiddlywiki.files ./$distPath/files
cp files/config.json ./$distPath/files

echo "Uploading test wiki..."
# TO DO
echo "Test wiki upload still to do!"

echo "Generating JDOC API docs..."
jsdoc files/$library/js/*.js --destination jsdoc 

echo "Done"
