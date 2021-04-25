import os
import ctypes

#the max amouht of subfolders indexed
MAX_RECURSION = 3

#a function that takes a folder as a parameter and returns the following:
#{'name', 'size', 'filesSize', 'sub': [...]}
#where 'sub' is an array of dicts of subfolders similar to the one above
def walk(folder):
    #get the subfolders and subfiles from the folder
    for root, subFolders, files in os.walk(folder):
        totalSize = 0
        filesSize = 0
        #for every file...
        for file in files:
            #https://stackoverflow.com/questions/6591931/getting-file-size-in-python
            #get its full path
            rootFile = os.path.join(root, file)
            #ignore it if it is a symlink
            if isLink(rootFile): continue
            #otherwise, append it to the 'filesSize' variable
            filesSize += os.path.getsize(rootFile)
        #add the 'filesSize' to the 'totalSize' of the folder
        totalSize += filesSize
        
        subFolderDict = []
        #for every subfolder...
        for subFolder in subFolders:
            #get its full path
            rootSubFolder = os.path.join(root, subFolder)
            #ignore it if it is a symlink
            if isLink(rootSubFolder): continue
            #otherwise, call 'walk' recursively with the subfolder
            tree = walk(rootSubFolder)
            #add the subfolder's size to the 'totalSize' of the folder
            totalSize += tree['size']
            #append the tree to the array of dictionaries of subfolders
            subFolderDict.append(tree)
        #https://stackoverflow.com/questions/72899/how-do-i-sort-a-list-of-dictionaries-by-a-value-of-the-dictionary
        #https://www.programiz.com/python-programming/methods/built-in/sorted
        #sort the folders by size
        sortedFolderDict = sorted(subFolderDict, key=lambda k: k['size'], reverse=True)
        #return a dictionnary with the right keys
        return {'name': folder, 'size': totalSize, 'filesSize': filesSize, 'sub': sortedFolderDict}

#a function to print the tree constructed by 'walk'
def printTree(lineStart, tree, isLastItem, recursionNum):
    #print the current folder name with its size
    if isLastItem: add = ' \'-'
    else: add = ' |-'
    print(lineStart + add + tree['name'].split('\\')[-1].split('/')[-1] + ' [' + formatSize(tree['size']) + ']')

    #if the current tree is just a file, return
    if tree['sub'] == None: return
    #for each 't' in the subdirectories of 'tree'...
    #(note that we add a '<File>' entry to also print the size of the directory's files)
    for i, t in enumerate([{'name': '<Files>', 'size': tree['filesSize'], 'sub': None}] + tree['sub']):
        if isLastItem: add = '   '
        else: add = ' | '
        #make sure we're not recursing too deeply, otherwise print '...'
        if recursionNum >= MAX_RECURSION:
            print(lineStart + add + ' \'-' + ' ...')
            return
        #if not, call 'printTree' recursively
        printTree(lineStart + add, t, i == len(tree['sub']) - 1 + 1, recursionNum + 1)

#a helper function to format a file size in bytes
def formatSize(size):
    units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB']
    for unit in units:
        if size / 1024 > 1:
            size /= 1024
        else:
            #https://stackoverflow.com/questions/40180131/python-division-precision
            return str(round(size, 2)) + unit

#a helper function to detect if a path is a symlink
#(a bit dirty due to the lack of support of 'os.path.islink' by NTFS)
def isLink(path):
        #Windows
        try:
            #https://stackoverflow.com/questions/15258506/os-path-islink-on-windows-with-python
            FILE_ATTRIBUTE_REPARSE_POINT = 0x0400
            attributes = ctypes.windll.kernel32.GetFileAttributesW(path)
            return (attributes & FILE_ATTRIBUTE_REPARSE_POINT) > 0 #JUNCTION / symlink
        #Linux
        except:
            return os.path.islink(path) #JUNCTION / symlink

#create the folder tree
tree = walk('.')
#print the folder tree
printTree('', tree, True, 0)
