#!/bin/zsh

cd ~/w/editor/
rm mdxeditor-editor-0.0.*.tgz
npm run build
npm pack
cd -
yarn remove @mdxeditor/editor
rm -rf node_modules
yarn cache clean
yarn add ~/w/editor/mdxeditor-editor-0.0.*-development.tgz
