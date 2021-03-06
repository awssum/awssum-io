## ----------------------------------------------------------------------------
#
# Bookmarks
#
# http://kvz.io/blog/2009/12/15/run-nodejs-as-a-service-on-ubuntu-karmic/
#
## ----------------------------------------------------------------------------

# info
description "awssum-io - Node.js libraries to talk to lots of Web APIs."
author      "Andrew Chilton"

# respawn this task
start on runlevel [2345]
respawn
respawn limit 20 5
stop on shutdown

# allow opening of more than 1024 files
limit nofile 4096 4096

# set some environment variables
env NODE_ENV=production

# the script itself
script

    # quit the script if something goes wrong
    set -e

    # run the webserver as the user
    exec \
        sudo -E -u __USER__ \
        __NODE__ \
        __PWD__/app.js >> /var/log/awssum-io/awssum.log

end script

## ----------------------------------------------------------------------------
