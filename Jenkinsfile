#!/usr/bin/env groovy

node {
    dir("new master") {
        checkout scm

        stage("Build") {
            sh("""#!/bin/bash -x
            bin/build
            """)
        }
        if (env.BRANCH_NAME == "master") {
            stage("Publish Site") {
                sh('''#!/bin/bash -x
                bin/publish
                ''')
            }
        } else {
            print("Not on master. not publishing prod")
        }

        if (env.BRANCH_NAME == "staging") {
            stage("Publish Staging") {
                sh('''#!/bin/bash -x
                bin/publish_stage
                ''')
            }
        } else {
            print("Not on staging. Not publishing staging")
        }

        archiveArtifacts artifacts: '_site/**',
            fingerprint: true

    }
}
