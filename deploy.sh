#!/bin/bash

#
# How to run this script
#
# ./deploy.sh <production|staging>
#
STAGING_MESSAGE="Send to staging"
PRODUCTION_MESSAGE="Pushing code to branch gh-pages..."

function dirty_check {
  if [[ `(git status --porcelain 2> /dev/null) && (git log origin/master..master 2> /dev/null)` &&  -z "$1" ]]; then
    echo ""
    echo "# You have changes that were not pushed to master yet."
    echo ""
    exit -1
  fi
}

function create_gh_pages {
  [[ `git ls-remote origin | grep gh-pages` ]] && return
  TMP="/tmp/$(LC_ALL=C tr -dc 0-9 < /dev/urandom | head -c 20 | xargs | cat)"
  rsync -qa .git $TMP
  pushd $TMP
    git checkout --orphan gh-pages
    git pull origin gh-pages
    git commit -qam "" --allow-empty --allow-empty-message
    git push origin gh-pages
  popd
  rm -rf $TMP
}

function dist {
  DIST_DIR=$(awk '/destination:/{dist=$2}; END {if (dist) print dist; else print "./_site"}' < _config.yml)
  if [[ ! -d $DIST_DIR/.git ]]; then
    REMOTE_ORIGIN=$(git remote -v | awk '/origin/{print $2}' | sort -u)
    rm -rf deploy.sh $DIST_DIR

    git clone \
      --single-branch \
      --branch=gh-pages \
      --depth=1 $REMOTE_ORIGIN \
      $DIST_DIR
  fi
  time jekyll build --incremental
}

function deploy {
  DIST_DIR=$(awk '/destination:/{dist=$2}; END {if (dist) print dist; else print "./_site"}' _config.yml)
  MASTER_HEAD_SHA=$(git rev-parse --short HEAD)
  pushd $DIST_DIR
    git add . -A
    git commit -m "Deployed from master: $MASTER_HEAD_SHA"

    echo $PRODUCTION_MESSAGE
    git push origin gh-pages
  popd
}

function heroku {
  DIST_DIR=$1
  MASTER_HEAD_SHA=$(git rev-parse --short HEAD)
  mkdir $DIST_DIR
  pushd $DIST_DIR
    git init
    git remote add heroku git@heroku.com:mst-ba.git
    git commit -qam "" --allow-empty --allow-empty-message
  popd

  time jekyll build --incremental
  rsync -r _site/* $DIST_DIR/

  pushd $DIST_DIR
    touch index.php
    echo '<?php include_once("index.html"); ?>' > index.php
    git add . -A
    git commit -m $STAGING_MESSAGE
    git push -f heroku master
    rm index.php
  popd
}

# function install_gems {
#   gem install jekyll pygments.rb redcarpet jekyll-paginate jekyll-gist
# }

DIST_FOLDER="/tmp/$(LC_ALL=C tr -dc 0-9 < /dev/urandom | head -c 20 | xargs | cat)"

# install_gems $1

if [ "$1" == "production" ]; then
  dirty_check $1
  create_gh_pages
  dist
  deploy
else
  heroku $DIST_FOLDER
fi
