#!/bin/zsh

yarn remove @mdxeditor/editor
rm -rf node_modules
yarn cache clean
yarn add ~/w/editor/mdxeditor-editor-0.0.1-development.tgz
