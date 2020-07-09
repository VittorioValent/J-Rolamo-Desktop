#!bin/sh
cd $1

mvn archetype:generate -B -DarchetypeGroupId=it.contrader -DarchetypeArtifactId=j-rolamo -DarchetypeVersion=1.7 -DgroupId=$2 -Dpackage=$2.$3 -DartifactId=$3 -Dversion=0.1-SNAPSHOT -Dname=$3

cd $3

mvn clean install

if [ $4 == "-r" ]
    then mvn spring-boot:run
fi