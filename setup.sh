#!/bin/bash

usage()
{
    echo "Usage: $0 number_of_labs handin_suffix [options]"
    echo "Options:"
    echo "    -h,"
    echo "            help"
    echo ""
    echo "  Example: $0 7 tgz"
    echo ""
}

while getopts "h" OPTION
do
    case ${OPTION} in
        h)
            usage
            exit 0
            ;;
    esac
done

if [ $# -ne 2 ]
then
    usage
    exit 1
fi

if [ ${1} -lt 1 ]
then
    usage
    exit 1
fi

if [[ ${2} == *"."* ]]
then
    echo "No decimal point is allowed in the suffix"
    echo ""
    #usage
    exit 1
fi

num_labs=${1}
suffix=${2}

sed "s/__num_labs__/${num_labs}/g" routes/template_index.js >routes/index.js
sed -i "s/__suffix__/${suffix}/g" routes/index.js

for i in $(seq 1 ${num_labs})
do
    mkdir -p "uploads/lab${i}"
done
