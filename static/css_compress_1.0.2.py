#!/usr/bin/env python
# encoding=utf-8

import os
import sys
import md5
import json
import shutil


__author__ = 'wangshifeng'


def get_file_md5_value(f_path):
    m = md5.new()
    f_obj = open(f_path)
    while True:
        d = f_obj.read(8096)
        if not d:
            break
        m.update(d)
    return m.hexdigest()

Const_Image_Format = [".css"]


class JsCssFileCompress:
    fileList = [""]
    counter = 0

    def __init__(self):
        pass

    def Find_CSS_File_Compress(self, js_file_dir, compress_file_dir, filtrate=1):
        global Const_Image_Format
        update_md5_file = False
        update_bak_md5_file = False
        for root, dirs, files in os.walk(js_file_dir, True):
            for name in files:
                newDir = os.path.join(root, name)
                if os.path.isfile(newDir):
                    if filtrate:
                        if newDir and(os.path.splitext(newDir)[1] in Const_Image_Format):
                            min_file_dir = newDir.replace(js_file_dir, compress_file_dir)
                            file_md5_dict = {}
                            file_md5_dict['data'] = get_files_md5_dict(compress_file_dir)
                            input_name = name
                            for file_md5 in file_md5_dict['data']['json']:
                                if file_md5['file_name'] == input_name:
                                    md5v = get_file_md5_value(newDir)
                                    if file_md5['md5'] == md5v:
                                        print '----1--------'
                                        js_css_compress(newDir, newDir)
                                        update_md5_file = True
                                    else:
                                        file_md5_dict2 = {}
                                        file_md5_dict2['data'] = get_files_md5_dict(js_file_dir)
                                        input_name = name
                                        for file_md52 in file_md5_dict2['data']['json']:
                                            if file_md52['file_name'] == input_name:
                                                if file_md52['md5'] == md5v:
                                                    # 说明文件已经压缩过
                                                    print '-----3------'
                                                    pass
                                                else:
                                                    print '------2------'
                                                    # 说明文件已经更新
                                                    os.remove(min_file_dir)  # 删除备份的
                                                    shutil.copyfile(newDir, min_file_dir)  # 备份最新的
                                                    js_css_compress(newDir, newDir)  # 压缩最新的文件
                                                    update_md5_file = True
                                                    update_bak_md5_file = True
        if update_md5_file == True:
            # 压缩完成后更新 md5 信息
            print compress_file_dir
            write_md5_txt(js_dir, True)
        if update_bak_md5_file == True:
            # 压缩完成后更新 md5 信息
            print compress_file_dir
            write_md5_txt(compress_file_dir, True)


def js_css_compress(input_name, output_name):
    java_cmd = 'java -jar my_js_compress_1.0.2.jar %s -o %s' % (input_name, output_name)
    print java_cmd
    os.system(java_cmd)


def get_files_md5_dict(compress_file_dir):
    file_md5_info = open(compress_file_dir+'\\css_file_md5.txt', 'r')
    try:
         all_the_file_md5_text = file_md5_info.read()
    finally:
         file_md5_info.close()

    if all_the_file_md5_text == '':
        data = ''
    else:
        data = json.loads(all_the_file_md5_text.replace(',]}', ']}'))
    return data


#获取脚本文件的当前路径
def cur_file_dir():
    #获取脚本路径
    path = sys.path[0]
    #判断为脚本文件还是py2exe编译后的文件，如果是脚本文件，则返回的是脚本的目录，如果是py2exe编译后的文件，则返回的是编译后的文件路径
    if os.path.isdir(path):
        return path
    elif os.path.isfile(path):
        return os.path.dirname(path)


def walk_dir(dir, fileinfo, topdown=True):
    for root, dirs, files in os.walk(dir, topdown):
        for name in files:
            path = os.path.join(root, name)
            md5v = get_file_md5_value(path)
            size = os.path.getsize(path)
            if path and(os.path.splitext(path)[1] in Const_Image_Format):
                fileinfo.write('{"file_name":"'+name + '","md5":"' + md5v + '","size":"'+ str(size) + '"},')


def write_md5_txt(compress_file_dir, remove_file_flag = False):
    # md5信息的文件是否存在，不存在创建,存在删除后创建
    file_path = compress_file_dir+'\\css_file_md5.txt'
    if os.path.exists(file_path):
        if remove_file_flag ==  True:
            os.remove(file_path)

            md5_file = open(file_path, 'w')
            md5_file.write("{\"json\":[")
            walk_dir(compress_file_dir, md5_file)
            md5_file.write("]}")
            md5_file.close()
    else:
        md5_file = open(file_path, 'w')
        md5_file.write("{\"json\":[")
        walk_dir(compress_file_dir, md5_file)
        md5_file.write("]}")
        md5_file.close()


if __name__ == "__main__":
        b = JsCssFileCompress()
        start_dir = cur_file_dir()
        js_dir = start_dir + "\\css\\"
        compress_file_dir = start_dir + "\\css_bak\\"

        if os.path.isdir(js_dir):
            if os.path.isdir(compress_file_dir):
                write_md5_txt(js_dir, False)
                write_md5_txt(compress_file_dir, True)
            else:
                write_md5_txt(js_dir, False)
                shutil.copytree(js_dir, compress_file_dir)

            b.Find_CSS_File_Compress(js_dir, compress_file_dir)



