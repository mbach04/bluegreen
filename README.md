# Blue Green Deployments

The master is blue, the branch is green.

Deploy from OSEv3.

## new project and blue app from master

    oc new-project bg --display-name="Blue Green" --description='Blue Green Deployments'
    oc new-app https://github.com/mbach04/bluegreen#master --image-stream=s2i-adx-nodejs --name=blue

## expose bluegreen service (using blue)

    oc expose service blue --name=bluegreen

## green app deploy

    oc new-app https://github.com/mbach04/bluegreen#green --image-stream=s2i-adx-nodejs --name=green

## switch services to green
    oc patch route/bluegreen -p '{"spec":{"to":{"name":"green"}}}'

## and back again
    oc patch route/bluegreen -p '{"spec":{"to":{"name":"blue"}}}'
