
# demo-azure-docker : Step by Step init Azure and deploy containers to test and prod


## Prepare

    source scripts/deploy_alias.sh
    ty.login


## Init Azure

    ty.init.createResourceGroup
    ty.init.createContext

## Deploy and test locally

    ty.deploy.local
    ty.test.local


## Build and push

    ty.deploy.build
    ty.deploy.push

## Deploy to test and prod

    ty.deploy.test01
    ty.deploy.prod

