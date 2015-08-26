#!/usr/bin/env python
# encoding=utf-8

import os
import sys
import md5
import json


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


def walk_dir(dir, fileinfo, topdown=True):

    for root, dirs, files in os.walk(dir, topdown):
        for name in files:
            path = os.path.join(root, name)
            md5v = get_file_md5_value(path)
            if path and(os.path.splitext(path)[1] in Const_Image_Format):
                has_min_flag = name.find('min')
                has_min_flag2 = name.find('jquery')
                if has_min_flag >= 0:
                    pass
                elif has_min_flag2 >= 0:
                    pass
                else:
                    fileinfo.write('{"file_name":"'+name + '","md5":"' + md5v + '"},')
        # for dir2 in dirs:
        #     walk_dir(dir2, fileinfo)



Const_Image_Format = [".js"]
Const_Image_Format_css = [".css"]


class JsCssFileCompress:
    fileList = [""]
    counter = 0

    def __init__(self):
        pass

    def Find_JS_File_Compress(self, js_file_dir, compress_file_dir, filtrate=1):
        global Const_Image_Format
        file_list = []
        #for s in os.listdir(js_file_dir):
        for root, dirs, files in os.walk(js_file_dir, True):
            for name in files:
                newDir = os.path.join(root, name)
                #newDir = os.path.join(js_file_dir, s)

                if os.path.isfile(newDir):
                    if filtrate:
                        if newDir and(os.path.splitext(newDir)[1] in Const_Image_Format):
                            file_name = os.path.splitext(newDir)[0]
                            has_min_flag = file_name.find('min')
                            has_min_flag2 = file_name.find('jquery')
                            if has_min_flag >= 0:
                                pass
                            elif has_min_flag2 >= 0:
                                pass
                            else:
                                min_file_name = "%s_min.js" % file_name
                                min_file_dir = os.path.join(compress_file_dir, min_file_name)

                                file_dict = {}
                                file_dict['newDir'] = newDir
                                file_dict['min_file_dir'] = min_file_dir
                                file_list.append(file_dict)



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
                                                    js_css_compress(newDir, min_file_dir)
                                                    self.fileList.append(newDir)
                                                    self.counter += 1
                                            else:
                                                js_css_compress(newDir, min_file_dir)
                                                self.fileList.append(newDir)
                                                self.counter += 1
                                        else:
                                            if os.path.exists(min_file_dir):
                                                 os.remove(newDir)
                                            else:
                                                js_css_compress(newDir, min_file_dir)
                                                self.fileList.append(newDir)
                                                self.counter += 1
                    else:
                        self.fileList.append(newDir)
                        self.counter += 1
            # else:
            #     self.Find_JS_File_Compress(newDir)



def js_css_compress(input_name, output_name):
    java_cmd = 'java -jar ../my_js_compress_1.0.1.jar %s -o %s' % (input_name, output_name)
    print java_cmd
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
        dir = dir + "\\js\\"
        compress_file_dir = dir + "\\compress\\"

        if os.path.exists(dir+'\\js_file_md5.txt'):
            pass
        else:
            fileinfo = open(dir+'\\js_file_md5.txt','w')
            fileinfo.write("{\"json\":[")
            walk_dir(dir, fileinfo)
            fileinfo.write("]}")
            fileinfo.close()

        # import time
        # time.sleep(5)

        # fileinfo = open('d://list3.txt','w')
        b.Find_JS_File_Compress(dir, compress_file_dir)
        # print(b.counter)
        # for k in b.fileList:
        #     print k



