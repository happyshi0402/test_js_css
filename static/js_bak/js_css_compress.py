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


def walk_dir(js_file_dir, fileinfo, topdown=True):

    # for root, dirs, files in os.walk(js_file_dir, topdown):
    #     for name in files:
        for name in os.listdir(js_file_dir):
            root = js_file_dir
            path = os.path.join(root, name)
            md5v = get_file_md5_value(path)
            if path and(os.path.splitext(path)[1] in Const_Image_Format):
                has_min_flag = name.find('min')
                has_min_flag2 = name.find('jquery')

                pass_flag = False
                if has_min_flag >= 0:
                    pass_flag = True
                if has_min_flag2 >= 0:
                    pass_flag = True
                if pass_flag == True:
                    fileinfo.write('{"file_name":"'+name + '","md5":"' + md5v + '"},')
        # for dir2 in dirs:
        #     walk_dir(dir2, fileinfo)


def compress_file_remove(js_file_dir, topdown=True):
    for file_name in os.listdir(js_file_dir):
        path = os.path.join(js_file_dir, file_name)
        if path and(os.path.splitext(path)[1] in Const_Image_Format):
            has_min_flag = file_name.find('_min')
            if has_min_flag >= 0:
                shutil.move(path, js_file_dir+"//compress")




Const_Image_Format = [".js"]
Const_Image_Format_css = [".css"]


class JsCssFileCompress:
    fileList = [""]
    counter = 0

    def __init__(self):
        pass

    def Find_JS_File_Compress(self, js_file_dir, filtrate=1):
        global Const_Image_Format
        for s in os.listdir(js_file_dir):
            newDir = os.path.join(js_file_dir, s)

            if os.path.isfile(newDir):
                if filtrate:
                    if newDir and(os.path.splitext(newDir)[1] in Const_Image_Format):
                        file_name = os.path.splitext(newDir)[0]
                        has_min_flag = file_name.find('min')
                        has_min_flag2 = file_name.find('jquery')
                        has_min_flag3 = file_name.find('_min')

                        pass_flag = False
                        if has_min_flag >= 0:
                            pass_flag = True
                        if has_min_flag2 >= 0:
                            pass_flag = True
                        if has_min_flag3 >= 0:
                            os.remove(newDir)
                            pass_flag = True

                        #pass_flag = True
                        if pass_flag == False:
                            min_file_name = "%s_min.js" % file_name
                            min_file_dir = os.path.join(js_file_dir, min_file_name)

                            file = open(min_file_dir, 'w')
                            file.close()

                            file_md5_dict = {}
                            file_md5_dict['data'] = get_files_md5_dict(js_file_dir)

                            input_name = os.path.basename(file_name)+".js"
                            output_name = os.path.basename(min_file_name)

                            for file_md5 in file_md5_dict['data']['json']:
                                if file_md5['file_name'] == input_name:
                                    md5v = get_file_md5_value(newDir)
                                    if file_md5['md5'] == md5v:
                                        if os.path.exists(min_file_dir):
                                            if os.path.getsize(min_file_dir) == 0:
                                                js_css_compress(input_name, output_name)
                                                self.fileList.append(newDir)
                                                self.counter += 1
                                        else:
                                            js_css_compress(input_name, output_name)
                                            self.fileList.append(newDir)
                                            self.counter += 1
                                    else:
                                        if os.path.exists(min_file_dir):
                                             os.remove(newDir)
                                        else:
                                            js_css_compress(input_name, output_name)
                                            self.fileList.append(newDir)
                                            self.counter += 1
                else:
                    self.fileList.append(newDir)
                    self.counter += 1
            # else:
            #     self.Find_JS_File_Compress(newDir)



def js_css_compress(input_name, output_name):
    java_cmd = 'java -jar ../../yuicompressor-2.4.8.jar %s -o %s' % (input_name, output_name)
    # print java_cmd
    os.system(java_cmd)


def get_files_md5_dict(js_file_dir):
    file_md5_info = open(js_file_dir+'\\js_file_md5.txt', 'r')
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


if __name__ == "__main__":
        b = JsCssFileCompress()
        dir = cur_file_dir()
        dir = dir

        if os.path.exists(dir+'\\js_file_md5.txt'):
            pass
        else:
            fileinfo = open(dir+'\\js_file_md5.txt','w')
            fileinfo.write("{\"json\":[")
            walk_dir(dir,fileinfo)
            fileinfo.write("]}")
            fileinfo.close()

        print dir
        b.Find_JS_File_Compress(dir)


        compress_file_remove(dir)



