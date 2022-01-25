#!/bin/bash
#Watch and Sync files using MacOS Launchd "WatchPaths" mechanic and Rsync. Make sure SSH is set up.

## SYNC: if --sync-only flag is given, rsync the dir to remote. com.watch-bramjoosten will do this.
if [ "$1" = "--sync-only" ]; then
   echo "Syncing"
   rsync --archive --update --compress --verbose $PWD/public_html/ xxxxx@bramjoosten.nl:~/public_html
   exit 1
fi

## WATCH: start agent and close when needed
ID=$(id -u)
PLIST_LOC=$HOME/Library/LaunchAgents/com.watch-bramjoosten.plist

# if agent is not running, run it.
if ! launchctl print gui/$ID | grep -q 'watch-bramjoosten'; then
   echo "Starting watch agent"
   launchctl bootstrap gui/$ID $PLIST_LOC
fi

#capture exit codes, e.g. ctrl-c is 2
trap cleanup 1 2 3 6

cleanup() {
   echo ""
   echo "Stopping watch agent"
   launchctl bootout gui/$ID $PLIST_LOC
   exit 1
}

#tail will start an endless loop, capture ctrl-c to do some cleanup and show stdout logs meanwhile.
echo "Watching files, Press [CTRL+C] to stop.."
tail -f -n 0 logs/stdout.log
