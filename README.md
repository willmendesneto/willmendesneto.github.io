# Blog - Wilson Mendes

> My personal blog built with [Jekyll](http://jekyllrb.com/).

[![Build Status](https://snap-ci.com/willmendesneto/willmendesneto.github.io/branch/master/build_image)](https://snap-ci.com/willmendesneto/willmendesneto.github.io/branch/master)

## Requirements

- [Git](http://git-scm.com/downloads);
- [Ruby](http://www.ruby-lang.org/pt/downloads/);
- [Jekyll](http://jekyllrb.com/);


## Usage


### Run at Localhost

Run this blog in your local host with the following steps:

    1. First, you need to execute the command bellow to:
     - Clone the repository
     - Access the generated folder
     - Run `jekyll serve` or `jekyll serve -w`

    git clone git@github.com:willmendesneto/willmendesneto.github.io.git

> If you have some performance problems in markdown compile task, please use  `jekyll serve --watch --limit_posts <number-of-posts-for-compile-using-watch>`. If you're using Jekyll >= 3.0 run `jekyll serve --incremental` command for a better feedback time


### Deploy

Run the command:

```bash
$ chmod +x deploy.sh
$ ./deploy.sh production
```


## Contribute

Feel free to [contribute](https://github.com/willmendesneto/willmendesneto.github.io/pulls) with this project or leave a [suggestion](https://github.com/willmendesneto/willmendesneto.github.io/issues).
