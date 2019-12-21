#!/bin/bash
set -e

print() {
    echo
    echo "---------------------------------------------"
    echo $1
    echo "---------------------------------------------"
}

print "Building the test image"
./build_test_image.sh

print "Running the test image"
set +e  # allow exit codes other than 0
./run_test_image.sh
tests_succeeded=$?
set -e

print "Tests exited with code $tests_succeeded"

exit $tests_succeeded
