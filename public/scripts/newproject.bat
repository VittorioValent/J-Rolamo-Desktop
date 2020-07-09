
cd %1

call mvn archetype:generate -B -DarchetypeGroupId=it.contrader -DarchetypeArtifactId=j-rolamo -DarchetypeVersion=1.8-SNAPSHOT -DgroupId=%2 -Dpackage=%2.%3 -DartifactId=%3 -Dversion=0.1-SNAPSHOT -Dname=%3

cd %3

call mvn clean install

IF "%4"=="-r" call mvn spring-boot:run