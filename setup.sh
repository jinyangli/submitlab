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

#if [[ ${2} == *"."* ]]
#then
#    echo "No decimal point is allowed in the suffix"
#    echo ""
#    #usage
#    exit 1
#fi

num_labs=${1}
suffix=${2}

suffix=`echo ${suffix} | sed "s/^\.*\([^\.].*\)$/\1/g" | sed "s/^\(.*[^\.]\)\.*$/\1/g"`

sed "s/__num_labs__/${num_labs}/g" -e "s/__suffix__/${suffix}/g" routes/template_index.js >routes/index.js
#sed -e "s/__suffix__/${suffix}/g" -i '' routes/index.js

#handle students' information in studentinfo.txt
python handle_stuinfo.py

for i in $(seq 1 ${num_labs})
do
    mkdir -p "uploads/lab${i}"
    python gen_stufolder.py ${i}
done
