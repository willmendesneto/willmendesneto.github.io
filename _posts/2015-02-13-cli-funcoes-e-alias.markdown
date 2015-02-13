---
layout: post
title: "CLI: Funções e Alias"
categories: oh-my-zsh workflow
tags: oh-my-zsh workflow frontend backend cli functions aliases
status: publish
image: http://i.imgur.com/wRRE5cW.png
type: post
published: true
meta: {}
author:
---


## INTRODUÇÃO

Faz algum tempo que optei por utilizar editores de texto ao invés de utilizar IDE's mais robustas. A partir daí utilizo bastante os editores VIM e Sublime Text e adaptei algumas coisas ao meu workflow quando estou no ambiente CLI. Esta postagem mostra algumas alterações que fiz no meu workflow para melhorar o ambiente CLI e que podem ajudar outros devs.


## LINHA DE COMANDO

É sempre uma boa prática modularizar os arquivos. Para isto criaremos 2 arquivos:

- `.functions`: arquivo onde ficarão as funções;
- `.aliases`: arquivo onde ficarão os atalhos/aliases;

Utilizo como base algumas configurações do Paul Irish, uma das referências quando se fala em frontend atualmente, e os arquivos ficaram com o seguinte conteúdo:

.functions

```bash
# Simple calculator
function calc() {
    local result="";
    result="$(printf "scale=10;$*\n" | bc --mathlib | tr -d '\\\n')";
    #                       └─ default (when `--mathlib` is used) is 20
    #
    if [[ "$result" == *.* ]]; then
        # improve the output for decimal numbers
        printf "$result" |
        sed -e 's/^\./0./'        `# add "0" for cases like ".5"` \
            -e 's/^-\./-0./'      `# add "0" for cases like "-.5"`\
            -e 's/0*$//;s/\.$//';  # remove trailing zeros
    else
        printf "$result";
    fi;
    printf "\n";
}

# Create a new directory and enter it
function mkd() {
    mkdir -p "$@" && cd "$_";
}

# Create a .tar.gz archive, using `zopfli`, `pigz` or `gzip` for compression
function targz() {
    local tmpFile="${@%/}.tar";
    tar -cvf "${tmpFile}" --exclude=".DS_Store" "${@}" || return 1;

    size=$(
        stat -f"%z" "${tmpFile}" 2> /dev/null; # OS X `stat`
        stat -c"%s" "${tmpFile}" 2> /dev/null # GNU `stat`
    );

    local cmd="";
    if (( size < 52428800 )) && hash zopfli 2> /dev/null; then
        # the .tar file is smaller than 50 MB and Zopfli is available; use it
        cmd="zopfli";
    else
        if hash pigz 2> /dev/null; then
            cmd="pigz";
        else
            cmd="gzip";
        fi;
    fi;

    echo "Compressing .tar using \`${cmd}\`…";
    "${cmd}" -v "${tmpFile}" || return 1;
    [ -f "${tmpFile}" ] && rm "${tmpFile}";
    echo "${tmpFile}.gz created successfully.";
}

# Create a new directory and enter it
function md() {
    mkdir -p "$@" && cd "$@"
}


# find shorthand
function f() {
    find . -name "$1"
}

# Start an HTTP server from a directory, optionally specifying the port
function server() {
    local port="${1:-8000}"
    open "http://localhost:${port}/"
    # Set the default Content-Type to `text/plain` instead of `application/octet-stream`
    # And serve everything as UTF-8 (although not technically correct, this doesn’t break anything for binary files)
    python -c $'import SimpleHTTPServer;\nmap = SimpleHTTPServer.SimpleHTTPRequestHandler.extensions_map;\nmap[""] = "text/plain";\nfor key, value in map.items():\n\tmap[key] = value + ";charset=UTF-8";\nSimpleHTTPServer.test();' "$port"
}

# git log with per-commit cmd-clickable GitHub URLs (iTerm)
function gf() {
  local remote="$(git remote -v | awk '/^origin.*\(push\)$/ {print $2}')"
  [[ "$remote" ]] || return
  local user_repo="$(echo "$remote" | perl -pe 's/.*://;s/\.git$//')"
  git log $* --name-status --color | awk "$(cat <<AWK
    /^.*commit [0-9a-f]{40}/ {sha=substr(\$2,1,7)}
    /^[MA]\t/ {printf "%s\thttps://github.com/$user_repo/blob/%s/%s\n", \$1, sha, \$2; next}
    /.*/ {print \$0}
AWK
  )" | less -F
}


# Copy w/ progress
cp_p () {
  rsync -WavP --human-readable --progress $1 $2
}


# Test if HTTP compression (RFC 2616 + SDCH) is enabled for a given URL.
# Send a fake UA string for sites that sniff it instead of using the Accept-Encoding header. (Looking at you, ajax.googleapis.com!)
function httpcompression() {
    encoding="$(curl -LIs -H 'User-Agent: Mozilla/5 Gecko' -H 'Accept-Encoding: gzip,deflate,compress,sdch' "$1" | grep '^Content-Encoding:')" && echo "$1 is encoded using ${encoding#* }" || echo "$1 is not using any encoding"
}

# Syntax-highlight JSON strings or files
function json() {
    if [ -p /dev/stdin ]; then
        # piping, e.g. `echo '{"foo":42}' | json`
        python -mjson.tool | pygmentize -l javascript
    else
        # e.g. `json '{"foo":42}'`
        python -mjson.tool <<< "$*" | pygmentize -l javascript
    fi
}

# take this repo and copy it to somewhere else minus the .git stuff.
function gitexport(){
    mkdir -p "$1"
    git archive master | tar -x -C "$1"
}



# get gzipped size
function gz() {
    echo "orig size    (bytes): "
    cat "$1" | wc -c
    echo "gzipped size (bytes): "
    gzip -c "$1" | wc -c
}


# Extract archives - use: extract <file>
# Based on http://dotfiles.org/~pseup/.bashrc
function extract() {
    if [ -f "$1" ] ; then
        local filename=$(basename "$1")
        local foldername="${filename%%.*}"
        local fullpath=`perl -e 'use Cwd "abs_path";print abs_path(shift)' "$1"`
        local didfolderexist=false
        if [ -d "$foldername" ]; then
            didfolderexist=true
            read -p "$foldername already exists, do you want to overwrite it? (y/n) " -n 1
            echo
            if [[ $REPLY =~ ^[Nn]$ ]]; then
                return
            fi
        fi
        mkdir -p "$foldername" && cd "$foldername"
        case $1 in
            *.tar.bz2) tar xjf "$fullpath" ;;
            *.tar.gz) tar xzf "$fullpath" ;;
            *.tar.xz) tar Jxvf "$fullpath" ;;
            *.tar.Z) tar xzf "$fullpath" ;;
            *.tar) tar xf "$fullpath" ;;
            *.taz) tar xzf "$fullpath" ;;
            *.tb2) tar xjf "$fullpath" ;;
            *.tbz) tar xjf "$fullpath" ;;
            *.tbz2) tar xjf "$fullpath" ;;
            *.tgz) tar xzf "$fullpath" ;;
            *.txz) tar Jxvf "$fullpath" ;;
            *.zip) unzip "$fullpath" ;;
            *) echo "'$1' cannot be extracted via extract()" && cd .. && ! $didfolderexist && rm -r "$foldername" ;;
        esac
    else
        echo "'$1' is not a valid file"
    fi
}


# animated gifs from any video
# from alex sexton   gist.github.com/SlexAxton/4989674
gifify() {
  if [[ -n "$1" ]]; then
    if [[ $2 == '--good' ]]; then
      ffmpeg -i $1 -r 10 -vcodec png out-static-%05d.png
      time convert -verbose +dither -layers Optimize -resize 900x900\> out-static*.png  GIF:- | gifsicle --colors 128 --delay=5 --loop --optimize=3 --multifile - > $1.gif
      rm out-static*.png
    else
      ffmpeg -i $1 -s 600x400 -pix_fmt rgb24 -r 10 -f gif - | gifsicle --optimize=3 --delay=3 > $1.gif
    fi
  else
    echo "proper usage: gifify <input_movie.mov>. You DO need to include extension."
  fi
}

# turn that video into webm.
# brew reinstall ffmpeg --with-libvpx
webmify(){
    ffmpeg -i $1 -vcodec libvpx -acodec libvorbis -isync -copyts -aq 80 -threads 3 -qmax 30 -y $2 $1.webm
}

```

Agora o arquivo .aliases

```bash

################################################################################
#       Default Aliases
################################################################################

# Easier navigation: .., ..., ...., ....., ~ and -
alias ..="cd .."
alias ...="cd ../.."
alias ....="cd ../../.."
alias .....="cd ../../../.."
alias ~="cd ~" # `cd` is probably faster to type though
alias -- -="cd -"

# List only directories
alias listdir="ls -lF ${colorflag} | grep --color=never '^d'"

alias sha1='openssl sha1'

alias path='echo -e ${PATH//:/\\n}'
alias now='date +"%T"'
alias nowtime=now
alias nowdate='date +"%d-%m-%Y"'

# Stop after sending count ECHO_REQUEST packets #
alias ping='ping -c 5'
# Do not wait interval 1 second, go fast #
alias fastping='ping -c 100 -s.2'

alias ports='netstat -tulanp'

# get web server headers #
alias header='curl -I'

# find out if remote server supports gzip / mod_deflate or not #
alias headerc='curl -I --compress'

## shortcut  for iptables and pass it via sudo#
alias ipt='sudo /sbin/iptables'

# display all rules #
alias iptlist='sudo /sbin/iptables -L -n -v --line-numbers'
alias iptlistin='sudo /sbin/iptables -L INPUT -n -v --line-numbers'
alias iptlistout='sudo /sbin/iptables -L OUTPUT -n -v --line-numbers'
alias iptlistfw='sudo /sbin/iptables -L FORWARD -n -v --line-numbers'
alias firewall=iptlist

## Colorize the grep command output for ease of use (good for log files)##
alias grep='grep --color=auto'
alias egrep='egrep --color=auto'
alias fgrep='fgrep --color=auto'

# YUM Package manager alias
alias yumupdate='sudo yum update && sudo yum upgrade'
alias yumsearch='sudo yum search'
alias yumremove='sudo yum remove'

# Shortcuts
alias dl="cd ~/Downloads"
alias dt="cd ~/Desktop"
alias p="cd ~/projects"
alias g="git"
alias h="history"
alias j="jobs"

# IP addresses
alias ip="dig +short myip.opendns.com @resolver1.opendns.com"
alias localip="ifconfig getifaddr en1"
alias ips="ifconfig -a | perl -nle'/(\d+\.\d+\.\d+\.\d+)/ && print $1'"


# Copy my public key to the pasteboard
alias pubkey="more ~/.ssh/id_rsa.pub | pbcopy | printf '=> Public key copied to pasteboard.\n'"

# Flush Directory Service cache
alias flush="dscacheutil -flushcache"

# View HTTP traffic
alias sniff="sudo ngrep -d 'en1' -t '^(GET|POST) ' 'tcp and port 80'"
alias httpdump="sudo tcpdump -i en1 -n -s 0 -w - | grep -a -o -E \"Host\: .*|GET \/.*\""

# File size
alias fs="stat -f \"%z bytes\""

# Recursively delete `.DS_Store` files
alias cleanup="find . -type f -name '*.DS_Store' -ls -delete"
alias xlog="sudo grep --binary-files=without-match --color -nsie '(EE)' -e '(WW)' /var/log/Xorg.0.log"
alias which="whence"
alias sd='export DISPLAY=:0.0'
alias cpan="perl -MCPAN -e shell"
alias cup='cvs -z3 update -Pd'
alias mv='nocorrect /bin/mv'
alias rm='nocorrect /bin/rm -i'
alias shred='nocorrect ionice -c3 /usr/bin/shred -fuz'
alias wipe='nocorrect ionice -c3 /usr/bin/wipe -l2 -v -x -r'
alias man='nocorrect man'
alias mkdir='nocorrect /bin/mkdir -p'
alias find='noglob find'

# Jekyll alias
alias jsw='jekyll serve -w'

# alias wget="wget -c"
alias lsd='ls -Fld *(-/DN)'
alias weather="/home/gregf/code/bin/forecast/forecast.rb"
alias ncmpc="ncmpc -c"
alias fixdbus="sudo -s dbus-uuidgen --ensure"

alias v="vim"
alias o="open"
alias d="devtodo -A"
alias s="sudo subl"
alias subl="sudo subl"

# Reload the shell (i.e. invoke as a login shell)
alias reloadshell="exec $SHELL -l"

# Concatenate and print content of files (add line numbers)
alias catn="cat -n"

# Kill all the tabs in Chrome to free up memory
# [C] explained: http://www.commandlinefu.com/commands/view/402/exclude-grep-from-your-grepped-output-of-ps-alias-included-in-description
alias chromekill="ps ux | grep '[C]hrome Helper --type=renderer' | grep -v extension-process | tr -s ' ' | cut -d ' ' -f2 | xargs kill"

alias tlog='tail -f log/development.log'
alias rst='touch tmp/restart.txt'
alias giti="vim .gitignore"
alias g='gthumb'
alias burniso='wodim -v dev=/dev/cdrw'
alias burndvdiso='growisofs -speed=8 -dvd-compat -Z /dev/dvdrw=$1'
alias biosinfo='sudo dmidecode'
alias f-spot='dbus-launch f-spot'
alias gnp="git-notpushed"
alias k="killall"
alias poweroff='sudo poweroff'
alias reboot='sudo reboot'
alias lsnoext="ls | grep -v '\.'"
alias ipager='k ipager; sleep 1; ipager &'
alias gis="git status | grep --color=always '^[^a-z]\+\(new file:\|modified:\)' | cut -d'#' -f2-"
alias ports='netstat --inet -pln'

alias subl="sudo subl"
alias la="ls -la"
alias srm="sudo rm -rf"
alias smkdir="sudo mkdir"

```



## OH-MY-ZSH

Algumas informações para inserirmos algumas funções e aliases no ambiente CLI. Como utilizo e contribuo para o projeto oh-my-zsh, ele por padrão utiliza um arquivo `.zshrc` para carregar alguns plugins, alias e funções. Existe uma linha para o carregamento automático dos plugins do oh-my-zsh e alguns que carrego por padrão são:

```bash
plugins=(git rails ruby frontend-search nvm rvm vagrant)
```

E adicionamos estas linhas no arquivo `.zshrc` para carregar as nossas configurações.

```bash
##############################################################################
#       Clear screen on logout
##############################################################################
trap clear 0

################################################################################
# Resource Limits
################################################################################
limit stack 8192
#limit core unlimited
limit core 0
limit -s

# Source global definitions
if [ -f ~/.functions ]; then
    . ~/.functions
fi

# Source global definitions
if [ -f ~/.aliases ]; then
    . ~/.aliases
fi


# User configuration
export PATH="$PATH:$HOME/bin:/usr/local/bin"

devilspie -a & clear;

```


## CONCLUSÃO

Estas são algumas configurações que utilizo ao trabalhar em ambientes CLI, o que acontece diariamente já que minhas ferramentas de trabalho "default" são um editor de texto e um terminal.

Tem outro workflow para ambientes CLI? Comente e compartilhe essa experiência, pois...

> Conhecimento bom é conhecimento compartilhado

Abraço e até mais!
