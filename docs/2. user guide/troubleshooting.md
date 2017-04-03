Source link


- What do you when something goes wrong?
  - Failed deployment, manually rollback how does that work?
  - Failed Bake stage?
  - What are the different colors on the servers in the ‘cluster view’ mean?


case:
the "Shrink cluster: Exception: No reason provided." crash was apparently because the deploy cluster's `namespace` and `region` keys didn't have the same value

In general if you have unknown error problems, make sure that you have all of your fields filled out correctly.