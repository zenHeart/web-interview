#!/bin/bash

grep -h "^## " "$1" | sed 's/^## //' | sed 's/{[^}]*}$//' | pbcopy