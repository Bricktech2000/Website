#include<Servo.h>

class ServoActuator{
private:
  Servo servo;
  float angle_c;   //deg
  float angle_f;   //deg
  float speed;     //deg / s
  unsigned long previousMillis; //ms
  _write(int angle){
    angle = max(angle_min, min(angle_max, angle));
    servo.write((int)angle);
  }

 public:
  float angle_min; //deg
  float angle_max; //deg

  ServoActuator(){}
  ServoActuator(int pin, float min, float max){
    angle_min = min;
    angle_max = max;
    servo.attach(pin);
    previousMillis = millis();
  }
  void write(float angle){
    _write(angle);
    angle_c = angle;
    speed = 0;
    previousMillis = millis();
  }
  void move(float angle_f, float speed){
    if(angle_c <= angle_f)
      this->speed = abs(speed);
    if(angle_c >= angle_f)
      this->speed = -abs(speed);
    this->angle_f = angle_f;
    previousMillis = millis();
  }
  void update(){
    unsigned long currentMillis = millis();
    unsigned long dt = currentMillis - previousMillis;
    previousMillis = currentMillis;
    angle_c += speed * dt / 1000;
    if((angle_c >= angle_f && speed > 0)
    || (angle_c <= angle_f && speed < 0)){
      angle_c = angle_f;
      speed = 0;
    }
    _write(angle_c);
  }
  bool wait(){
    update();
    delay(1);
    return angle_c != angle_f;
  }
};

class Box{
private:
  ServoActuator arm;
  ServoActuator lid;
  float maxSpeed = 500; //deg / s

public:
  Box(){}
  Box(int armPin, int lidPin){
    arm = ServoActuator(armPin, 70, 138);
    lid = ServoActuator(lidPin, 60, 110);
    arm.write(arm.angle_min);
    lid.write(lid.angle_min);
    delay(3000);
  }
  void test(){
    arm.move(arm.angle_max, 25);
    lid.move(lid.angle_max, 25);
    while(arm.wait() | lid.wait());
    arm.move(arm.angle_min, 25);
    lid.move(lid.angle_min, 25 * 2 / 3);
    while(arm.wait() | lid.wait());
  }
  void flip(){
    beforeFlip();
    actualFlip();
    afterFlip();
  }
private:
  void beforeFlip(){
    int choice = random(12);
    switch(choice){
    case 0:
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
    case 8:
      break;
    case 9:
      lid.move(lid.angle_max, maxSpeed);
      while(lid.wait());
      delay(500);
      lid.move(lid.angle_min, maxSpeed);
      while(lid.wait());
      delay(500);
      break;
    case 10:
      lid.move(lid.angle_max, maxSpeed);
      while(lid.wait());
      delay(500);
      lid.move(lid.angle_min, maxSpeed / 10);
      while(lid.wait());
      delay(500);
      break;
    case 11:
      lid.move((lid.angle_max * 2/3 + lid.angle_min * 1/3), maxSpeed);
      while(lid.wait());
      delay(500);
      lid.move(lid.angle_min, maxSpeed / 10);
      while(lid.wait());
      /*delay(500);
      lid.move((lid.angle_max * 2/3 + lid.angle_min * 1/3), maxSpeed);
      while(lid.wait());
      delay(500);
      lid.move(lid.angle_min, maxSpeed / 10);
      while(lid.wait());*/
      delay(1000);
      break;
    }
  }
  void actualFlip(){
    int choice = random(7);
    switch(choice){
    case 0:
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
      arm.move(arm.angle_max, maxSpeed);
      lid.move(lid.angle_max, maxSpeed);
      while(arm.wait() | lid.wait());
      break;
    case 6:
      lid.move((lid.angle_max * 1/2 + lid.angle_min * 1/2), maxSpeed / 10);
      arm.move((arm.angle_max * 2/3 + arm.angle_min * 1/3), maxSpeed / 10);
      while(arm.wait() | lid.wait());
      delay(500);
      arm.move(arm.angle_max, maxSpeed);
      while(arm.wait());
      delay(100);
      break;
    }
  }
  void afterFlip(){
    int choice = random(12);
    switch(choice){
    case 0:
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
    case 8:
      arm.move(arm.angle_min, maxSpeed);
      lid.move(lid.angle_min, maxSpeed * 2 / 3);
      while(arm.wait() | lid.wait());
      break;
    case 9:
      for(int i = 0; i < 3; i++){
        lid.move((lid.angle_max * 1/3 + lid.angle_min * 2/3), maxSpeed);
        while(lid.wait());
        lid.move(lid.angle_max, maxSpeed / 2);
        while(lid.wait());
      }
      arm.move(arm.angle_min, maxSpeed);
      lid.move(lid.angle_min, maxSpeed * 2 / 3);
      while(arm.wait() | lid.wait());
      break;
    case 10:
      arm.move(arm.angle_min, maxSpeed / 5);
      while(arm.wait());
      delay(500);
      lid.move(lid.angle_min, maxSpeed * 3 / 2);
      while(lid.wait());
      break;
    case 11:
      delay(1000);
      arm.move(arm.angle_min, maxSpeed);
      lid.move(lid.angle_min, maxSpeed * 2 / 3);
      while(arm.wait() | lid.wait());
      break;
    }
  }
};

Box box;
void setup(){
  randomSeed(analogRead(A0));
  box = Box(4, 5);
  
  pinMode(2, INPUT_PULLUP);
  pinMode(3, OUTPUT);
  digitalWrite(3, LOW);
}

void loop(){
  if(digitalRead(2) == LOW) box.flip();
  //delay(1000);
}
