#!/usr/bin/env python3

from urllib import request
from bs4 import BeautifulSoup
import fileinput
import os
import sys


def get_image(url):
    webpage = request.urlopen(url).read()
    soup = BeautifulSoup(webpage, "html.parser")
    return soup.find("meta",  property="og:image")['content']


def replace(filename):
    o = open("%s.new.md" % filename, "a")
    for line in open(filename):
        if "https://cl.ly/" in line:
            split_line = line.split()
            for word in split_line:
                new_split_line = []
                if "https://cl.ly/" in word:
                    image = get_image(word)
                    md = "![](%s)" % image
                    new_split_line.append(md)
                else:
                    new_split_line.append(word)
            new_line = ' '.join(new_split_line)
            o.write(new_line + '\n')
        else:
            o.write(line)
    o.close()
    os.remove(filename)
    os.rename("%s.new.md" % filename, filename)


def walk_and_replace(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            filename = root + "/" + file
            print(filename)
            replace(filename)

if __name__ == "__main__":
    os.chdir(sys.path[0])
    walk_and_replace('../docs')
