#Working with Jenkins


This guide should include:


- how to trigger Spinnaker pipelines from Jenkins
- how to trigger Jenkins' jobs from Spinnaker


##triggers


To add a Jenkins trigger to your pipeline, go to your configurations stage and select "add trigger", select "Jenkins" from the Type dropdown menu. Select a Master from the Master category list and then select a Job to trigger from the pipeline. 


https://cl.ly/022u0k090y2K


Note: Make sure you archive your package files and your properties file in Jenkins. 



###Property File


The property file is a way to transfer information about your build from Jenkins to Spinnaker. The file needs to be archived by the Jenkins job and should contain key value pairs. 


In this example, my Jenkins job archived this file `build.properties` to look like:


```COMMITER_NAME=andrew
BRANCH_NAME=mybranch
CONFIG=config-3059cad.tar.gz```


Then in the property files field in the Spinnaker Jenkins trigger, fill it in with `build.properties`.


Now that those variables are in Spinnaker, we can access them elsewhere in our pipeline by using the built-in Spinnaker expression language. 



In any given stage we can use the expression language `${#trigger.parameters['BRANCH_NAME']}` to access the property value of the varable named `BRANCH_NAME`.


Note: For more elaborate instructions on expression language, please refer to the [Spinnaker Expression Language Guide](link placeholder).



##How to Trigger a Jenkins Job through Spinnaker


Step 1: In pipelines, click on'Add stage'.


Step 2: Select 'Jenkins' from Type. Name the Stage Name and Depends On if you need it. 


Step 3: Configure your Master and Job. IF your Job is parameterized, then Spinnaker will display a Parameters form for your input. 


Step 4: The Property File input works the same way, but you cannot use the same expression above to get it. Instead, you would access it with `${ #stage('Jenkins')['context']['KEY'] }`.


https://cl.ly/0b1J3L3m2R3Z


In the example picture, you can see a very simple Jenkins job that creates a properties file. In the Stage Configuration it should look like this: 

https://cl.ly/2O363s0N2p0T


In a later stage




get the context of this build stage to access these properties.


to run an arbitrary script, run it via jenkins and select script type for stage, fill out the script configuration, (output file is basically properties file produced by the script).

https://cl.ly/0R113U1g0Z3w

