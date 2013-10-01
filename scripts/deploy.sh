#! /bin/sh

echo "---> Deploying Master to gh-pages"
echo "---> Fetching from asouka"
git checkout master
git pull origin master
git push origin master
echo "---> Pushing to asouka develop"
git merge asouka/develop
MERGE_RETVAL=$?
if [ $MERGE_RETVAL -ne 0 ]; then
    echo "---> ERROR: Merging asouka/develop failed"
    exit 1
fi

git push asouka develop

echo "---> Pushing to asouka master"
git checkout master
git merge asouka/master
MERGE_RETVAL=$?
if [ $MERGE_RETVAL -ne 0 ]; then
    echo "---> ERROR: Merging asouka/master failed"
    exit 1
fi

git merge develop
MERGE_RETVAL=$?
if [ $MERGE_RETVAL -ne 0 ]; then
    echo "---> ERROR: Merging develop failed"
    exit 1
fi

git push asouka master

echo "---> Deploying to heroku"
git push heroku master

echo "---> Done."
