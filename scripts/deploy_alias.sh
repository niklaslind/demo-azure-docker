#!/bin/bash



export DAD_HOME=~/worklocal/tyrens/demo-azure-docker
export DOCKER_USERNAME=niklaslind
export DOCKER_PASSWORD=${DOCKER_PASSWORD}
export RESOURCE_GROUP=ty_ResourceGroup_1

ty.login() {
    echo $DOCKER_PASSWORD | docker login -u $DOCKER_USERNAME --password-stdin #-p $DOCKER_PASSWORD
    docker login azure 
}

ty.init.createResourceGroup() {
    az group create --name ${RESOURCE_GROUP} --location "North Europe"
    az appservice plan create --name ty_servicePlan_1 --resource-group ${RESOURCE_GROUP} --sku S1 --is-linux
}

ty.init.createContext() {
    docker context create aci ty_test01 --resource-group ${RESOURCE_GROUP}
    docker context create aci ty_prod --resource-group ${RESOURCE_GROUP}   
    docker context list
}


ty.deploy.build() {
    docker context use default
    docker context list
    docker-compose build
}

ty.deploy.push() {
    docker context use default    
    docker-compose push
}


ty.deploy.local() {
    docker context use default
    docker context list
    docker-compose up -d
    docker ps
}

ty.deploy.test01() {
    docker context use ty_test01
    docker context list
    docker compose up 
    docker ps
}

ty.deploy.prod() {
    docker context use ty_prod
    docker context list
    docker compose up 
    docker ps
}


ty.test.local() {
    curl localhost/demo01
}
