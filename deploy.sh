#!/bin/sh
echo '-> Write .html file'
output=$(php index.php); 
echo "$output" > index.html;

echo '-> Compile CSS'
compass compile

# echo '-> Compress svgs'
# find ./img/build/ -type d | while read d; do
#    # https://github.com/svg/svgo/issues/217
#    svgo -f $d/ --disable=removeUnknownsAndDefaults
# done