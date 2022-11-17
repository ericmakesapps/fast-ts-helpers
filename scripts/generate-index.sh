#!/bin/bash

cd src

if [ -e index.ts ]; then
	rm index.ts
fi

for i in *.ts; do
	name=${i%.*}
	echo "export { $name } from \"./$name\"" >> index.ts
done
