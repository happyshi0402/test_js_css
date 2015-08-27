#!/usr/bin/env python
# encoding=utf-8

__author__ = 'wangshifeng'

import os
import sys

#获取脚本文件的当前路径
def cur_file_dir():
    #获取脚本路径
    path = sys.path[0]
    #判断为脚本文件还是py2exe编译后的文件，如果是脚本文件，则返回的是脚本的目录，如果是py2exe编译后的文件，则返回的是编译后的文件路径
    if os.path.isdir(path):
        return path
    elif os.path.isfile(path):
        return os.path.dirname(path)


start_dir = cur_file_dir()
js_dir = start_dir + "\\css\\"
js_dir2 = start_dir + "\\css_bak2\\"

os.rename(js_dir, js_dir2)