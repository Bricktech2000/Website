////////////////////////////////////////////////////////////////////////////////////////////////////
//                                         SERVO LIBRARY                                          //
////////////////////////////////////////////////////////////////////////////////////////////////////


//Servo library: only up to 12 servos
//SoftwareServo library: as many servos as we want, but massive current spikes when updated

//so...

//This is a servo library that can handle up to 20 servos using one 16-bit and one 8-bit hardware timers.
//The pulse width for a servo has a maximum error of 8 microseconds, which is not noticeable.
//It has 15-bit precision and updates each servo at 40Hz, which is not ideal
//(max is 50Hz), but I needed to sacrifice the update frequency for some more servos
//If you want to handle more than 20 servos at once, the update frequency will automatically decrease.
//You can modify this code to use more than one 16-bit timers, but I haven't because most arduino boards only have one.



//for some reason... that works... (https://waterproofman.wordpress.com/2007/02/07/avr-interrupts-in-c/)
//gotta do dis to be able to make interrupt functions friends of the Servo class
extern "C" void TIMER2_COMPB_vect(void) __attribute__ ((signal));
extern "C" void TIMER1_COMPB_vect(void) __attribute__ ((signal));
extern "C" void TIMER1_COMPA_vect(void) __attribute__ ((signal));

class Servo {
public:
  static bool enabled;
  Servo(){}
  //attach a servo to a pin...
  uint8_t attach(int _pin){
    //initialize the hardware timers if not already
    if(!timersInitialized)
      initializeTimers();
    timersInitialized = true;
    //set the pin of the servo as an output
    pin = _pin;
    pinMode(pin, OUTPUT);
    //increase the servoCount
    servoCount++;
    /*//allocate a new array with one more servo in it
    Servo** newServos = (Servo**)new Servo*[servoCount];
    //copy every servo pointer from the old array to the new
    //and reset the old array to 0 (or not)
    for(int s = 0; s < servoCount - 1; s++){
      newServos[s] = servos[s];
      //servos[s] = 0;
    }
    //set the last servo in the new array to be this servo
    newServos[servoCount - 1] = this;
    //if there are more than 0 servos, delete the old array
    //if(servos != nullptr) delete[] servos;
    //set Servo::servos to the newly allocated array
    servos = newServos;*/
    servos[servoCount - 1] = this;
  }
  //write the pulse width of the servo in microseconds
  void writeMicroseconds(int value){
    //make sure the requested microseconds value is in range
    if(value < 600) value = 600;
    if(value > 2400) value = 2400;
    //write the value to this servo's pulseWidth variable
    pulseWidth = value;
  }
  //write the pulse width of the servo in degrees
  void write(int value){
    //map the value (0-180) from 600 to 2400 microseconds
    int microseconds = map(value, 0, 180, 500 + 100, 2500 - 100);
    //send it to the writeMicroseconds function
    writeMicroseconds(microseconds);
  }
  //takes a value in us and a prescaler as an argument.
  //returns the value at which the specified microseconds will have elapsed
  //since the last reset of the timer to 0
  static int usToTimer(float value, int prescaler){
    return (value / 1000000) * (16000000 / prescaler) - 1;
  }
  friend void TIMER2_COMPB_vect(void);
  friend void TIMER1_COMPB_vect(void);
  friend void TIMER1_COMPA_vect(void);
  
private:
  static Servo* servos[20]; //an array of pointers to all active servos
  static int servoCount; //the number of active servos
  static int currentServoA; //the servo we are currently writing to (timer 1 compare a)
  static int currentServoB; //the servo we are currently writing to (timer 1 compare b)
  static bool timersInitialized; //boolean that is true if the hardware timers have been initialized
  static int timerResetCount; //counts the number of time timer 2 has been reset
  int pulseWidth = 1500; //PWM pulse width, in microseconds(us)
  int pin; //the pin the servo is attached to
  static bool waiting40Hz;
  //initialize the hardware timers 1 and 2 for our use
  void initializeTimers(){
    cli(); //disable global interrupts

    //reset a registers to have controll of the timers (analogWrite won't work anymore on some pins)
    TCCR2A = 0;
    TCCR1A = 0;
    
    TCCR1B = 0;
    TCCR1B |= (0 << CS12) | (0 << CS11) | (1 << CS10); //set timer 1 prescaler to 1 (0...65535, 4.096ms)
    TCCR2B = 0;
    TCCR2B |= (1 << CS22) | (1 << CS21)  | (0 << CS20); //set timer 2 to prescaler 256 (0...255, 4.096ms)

    //set timer 2 compare b to 2500 microseconds, for a 400Hz clock.
    //ISR(TIMER2_COMPB_vect) will be called every 2500 microseconds
    //and will reset both timers (1 & 2) to 0
    OCR2B = usToTimer(2500, 256);
    
    TIMSK2 |= (1 << OCIE2B); //enable timer 2 compare b interrupt
    TIMSK1 |= (1 << OCIE1B); //enable timer 1 compare b interrupt
    TIMSK1 |= (1 << OCIE1A); //enable timer 1 compare a interrupt
    
    sei(); //enable global interrupts
    //TCNT1
  }
};
//set some static variables of the Servo class
Servo* Servo::servos[20] = {0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0};
bool Servo::timersInitialized = false;
int Servo::servoCount = 0;
int Servo::currentServoA = 0;
int Servo::currentServoB = 0;
int Servo::timerResetCount = 0;
bool Servo::waiting40Hz = false;
bool Servo::enabled = true;

//this function is called at a 400Hz clock, from timer 1.
//it first turns on the pin of two servos in parallel
//and then sets up timer 1 compare a and b to the required
//pulseWidth of both servos
ISR(TIMER2_COMPB_vect){
  //interrupts are disabled by default in an ISR. Here they're re-enabled
  //because this ISR is very long and isn't as important as the interrupt
  //that handles receiver data (receiverPulse), which is very quick to execute.
  //this may crash a program when done carelessly, but in this case it works and
  //the error of the receiver data went from +-100 us to only about +-8 us.
  interrupts();
  
  //reset both timers to 0
  TCNT1 = 0;
  TCNT2 = 0;
  //add 1 to the timer reset count (since it has just reset)
  Servo::timerResetCount++;

  if(Servo::waiting40Hz == true){
    //set timer 1 compare a and b to -1 microseconds, to disable them
    OCR1A = -1;
    OCR1B = -1;
    //make sure that 20ms have ellapsed since the first servo write (max 50Hz)
    //if not, return and don't write to any servos.
    if(Servo::timerResetCount <= 20000 / 2500) return;
    //otherwise, reset timerResetCount and currentServoA & B to -2 and -1.
    Servo::timerResetCount = 0;
    Servo::currentServoA = -2;
    Servo::currentServoB = -1;
    //set the waiting flag to false
    Servo::waiting40Hz = false;
    return;
  }

  //add 2 to curentServoA, to write to the next servo
  Servo::currentServoA += 2;
  //set currentServoB to curentServoA plus 1
  Servo::currentServoB = Servo::currentServoA + 1;
  
  //if we have written to all servos...
  if(Servo::currentServoA >= Servo::servoCount){
    //set timer 1 compare a and b to -1 microseconds, to disable them
    OCR1A = -1;
    OCR1B = -1;
    
    Servo::waiting40Hz = true;
    return;
  }

  //turn on the pin for the current servo (compare a)
  if(Servo::enabled) digitalWrite(Servo::servos[Servo::currentServoA]->pin, HIGH);
  //set timer 1 comapre a to currentServoA pulseWidth(us) plus the value of timer 1 plus 50, to have a perfect pulse
  OCR1A = Servo::usToTimer(Servo::servos[Servo::currentServoA]->pulseWidth + 50 /*???*/, 1) + TCNT1;

  //if we have written to all servos...
  if(Servo::currentServoB >= Servo::servoCount){
    //set timer 1 compare b to -1 microseconds, to disable it
    OCR1B = -1;
    
    Servo::waiting40Hz = true;
    return;
  }
  //turn on the pin for the current servo (compare b)
  if(Servo::enabled) digitalWrite(Servo::servos[Servo::currentServoB]->pin, HIGH);
  //set timer 1 comapre b to currentServoB pulseWidth(us) plus the value of timer 1 plus 50, to have a perfect pulse
  OCR1B = Servo::usToTimer(Servo::servos[Servo::currentServoB]->pulseWidth + 50 /*???*/, 1) + TCNT1;
}

ISR(TIMER1_COMPA_vect){
  //timer 1 compare a has been set to the right pulse width
  //when the pulse started, so now we need to turn the servo pin low
  digitalWrite(Servo::servos[Servo::currentServoA]->pin, LOW);
}

ISR(TIMER1_COMPB_vect){
  //timer 1 compare b has been set to the right pulse width
  //when the pulse started, so now we need to turn the servo pin low
  digitalWrite(Servo::servos[Servo::currentServoB]->pin, LOW);
}
























////////////////////////////////////////////////////////////////////////////////////////////////////
//                                       LEG CLASS                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////


const float coxaLength = 32.5; //mm
const float femurLength = 45; //mm
const float tibiaLength = 80; //mm
const float bodyOuterRadius = 50; //mm - the distance from the center of the robot to a servo pivot
const float legZeroDistance = 135; //mm - the default distance from the center of the robot to the end of a leg
const float pi = 3.1415926535897932384626433832795;

float motorsEnabled = true;

//a small Vector3 class to handle 3D points
class Vector3 {
public:
  float x, y, z;
  Vector3(float a, float b, float c){
    x = a;
    y = b;
    z = c;
  }
};

class Leg {
public:
  Vector3 position = Vector3(0, 0, 0); //the position of a leg, relative to 'zero'
  Vector3 zero = Vector3(0, 0, 0); //the zero position of a leg
  Vector3 def = Vector3(0, 0, 0); //the default position of a leg
  Servo servos[3]; //the three servos of the leg
  float servoOffsets[3] = {0, 0, 0}; //servo offsets if needed
  float angle = 0; //the offset angle of the leg from the x axis of the robot
  bool onGround = false; //true if a leg should be on the ground
  bool lifted = false; //true if a leg is currently lifted
  
  int pins[3] = {0, 0, 0}; //servo pins
  Leg(int pin0, int pin1, int pin2){
    pins[0] = pin0;
    pins[1] = pin1;
    pins[2] = pin2;
  }
  //call this funciton from void setup()
  void init(){
    //if the motors are enabled, 
    if(motorsEnabled){
      //attach the servos to the right pins
      servos[0].attach(pins[0]);
      servos[1].attach(pins[1]);
      servos[2].attach(pins[2]);
    }
    //calculate the zero position of the leg from its angle (needs to be set before init() is called)
    zero = Vector3(cos(angle / 180 * pi) * legZeroDistance, sin(angle / 180 * pi) * legZeroDistance, 0);
    //def = Vector3(zero.x, zero.y, zero.z);
    def = Vector3(0, 0, 0);
  }
  //a function to set the position of the leg and update it.
  //you can also do this manually (but don't forget to call update())
  void set(float x, float y, float z){
    position.x = x;
    position.y = y;
    position.z = z;
    
    update();
  }
  //a function to constrain an angle (°) from 0 to 360 degrees
  float constrainAngle(float a){
    a = fmod(a, 360);
    if(a < 0) a += 360;
    return a;
  }
  //updates the angles of the servomotors from the 'position' Vector3
  void update(){
    ///// INVERSE KINNEMATICS /////
    float xo = cos(angle / 180 * pi) * bodyOuterRadius;
    float yo = sin(angle / 180 * pi) * bodyOuterRadius;
    
    float x = position.x + zero.x;
    float y = position.y + zero.y;
    float z = position.z + zero.z;
    
    float d1 = sqrt(pow(x - xo, 2) + pow(y - yo, 2));
    float t1 = atan2(y - yo, x - xo) / pi * 180;
    d1 -= coxaLength;
    
    float d2 = sqrt(pow(d1, 2) + pow(z, 2));
    float t2 = -atan2(z, d1) / pi * 180;
    if(d2 > femurLength + tibiaLength - 5) d2 = femurLength + tibiaLength - 5;
    if(d2 + femurLength < tibiaLength + 5) d2 = tibiaLength + 5 - femurLength;


    float a0 = t1 - angle + 90;
    float a1 = t2 + getAngleOppositeTo2ndArgument(femurLength, tibiaLength, d2) + 90;
    float a2 = 180 + -getAngleOppositeTo2ndArgument(femurLength, d2, tibiaLength);
    
    //if the motors are enabled, write to them
    if(motorsEnabled){
      servos[0].write(constrainAngle(a0 + servoOffsets[0]));
      servos[1].write(constrainAngle(a1 + servoOffsets[1] - 20));
      servos[2].write(constrainAngle(a2 + servoOffsets[2] + 20));
    }
  }
  float getAngleOppositeTo2ndArgument(float a, float b, float c){
    float num = pow(a, 2) - pow(b, 2) + pow(c, 2);
    float denum = 2 * a * c;
    return acos(num / denum) / pi * 180;
  }
};

//a function which returns a boolean representing wether two vectors are similar
bool areSimilar(class Vector3 vec1, class Vector3 vec2, float maxDelta){
  float delta = 0;
  delta += abs(vec2.x - vec1.x);
  delta += abs(vec2.y - vec1.y);
  delta += abs(vec2.z - vec1.z);
  delta /= 3;
  return delta <= maxDelta;
}

//a function which returns the hypotenuse of a triangle of sides x and y
float getHypot(float x, float y){
  return (float)sqrt(x * x * 1.0 + y * y * 1.0);
}
//a function to move a leg using 3 speeds (x speed, y speed and angular speed)
//returns the new position of the moved leg (using the time elapsed passed as a parameter)
class Vector3 move(float _xSpeed, float _ySpeed, float _zSpeed, unsigned long timeElapsed, Vector3 position){
  //get the position of the leg
  float x = position.x;
  float y = position.y;
  //techno voodoo (aka trigonometry) to get the angle from the current leg's
  //position to the middle of the robot and the distance between them
  float theta = atan2(y, x) /*radian -> degrees*/ * 180 / pi;
  float hypot = getHypot(x, y);
  //subtract the angular speed to the angle (in degrees)
  theta -= _zSpeed * timeElapsed;
  //get back the coordinates using the distance and the calculated angle
  x = cos(theta /*degrees -> radian*/ / 180 * pi) * hypot;
  y = sin(theta /*degrees -> radian*/ / 180 * pi) * hypot;
  //add the x and y speeds from the coordinates
  x += _xSpeed * timeElapsed;
  y += _ySpeed * timeElapsed;
  //return the coordinates from the function
  return Vector3(x, y, position.z);
}
unsigned long currentMicros; //the current microseconds
unsigned long previousMicros; //the previous microseconds
volatile int currentChannel = 0; //the current channel written to
volatile int channelData[20]; //the channel data

//an interrupt function called when a RISING pulse is detected from the receiver pin
//it uses the PPM protocol to work. 
void receiverPulse(){
  //keep track of the elapsed time
  previousMicros = currentMicros;
  currentMicros = micros();
  //calculate the elapsed time from the last pulse to now
  unsigned long difference = currentMicros - previousMicros;
  //if the time elapsed is bigger than 3000, this means that all the channel pulses
  //have been sent, so currentChannel is reset to -1
  if(difference > 3000)
    currentChannel = -1;
  //if the current channel is larger than the length of the channel data array, return to prevent segfault
  else if(currentChannel >= 20)
    return;
  //otherwise, write the time elapsed in the corresponding index in channelData
  else
    channelData[currentChannel] = difference;
  //increment the channel counter
  currentChannel++;
}

















////////////////////////////////////////////////////////////////////////////////////////////////////
//                                       MAIN CODE                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////



struct _robot{
  //initialize the legs in an array. calls the leg constructor with the pins of the motors. 
  //first is the coxa motor, next is the femur motor and finally the tibia motor
  Leg legs[6] = {
    Leg(4, 3, 0),
    Leg(7, 6, 5),
    Leg(A0, A1, A2),
    Leg(A3, A4, A5),
    Leg(13, 12, 11), //pins 12 & 11 replace A6 & A7 (cannot be used as output... a bit strange...)
    Leg(10, 9, 8)
  };
  Vector3 speeds = Vector3(0, 0, 0);
  Vector3 angles = Vector3(0, 0, 0);
  Vector3 offsets = Vector3(0, 0, 0);
  int gateState = 0; //the state of the legs in a gate
  int gateName = 3; //the amount of legs lifted at a time (2 or 3)
} robot;

//set up some stuff
unsigned long previousTime; //previous time
unsigned long currentTime; //current time
unsigned long l_time = 1000 / 3; //the duration (ms) of a step
unsigned long i_time = 0; //initial time of a step
unsigned long f_time = 0; //final time of a step
//int sleep = 10; //
//float zHeight = 60; //the z height when a leg is on the ground, mm
//max speed: 0.15 m / s and 0.03 ° / s


const bool a90 = false; //set true for 90° servo horn placement

void setup() {
  // put your setup code here, to run once:
  //Serial.begin(115200);


  robot.legs[0].servoOffsets[1] = -10;
  robot.legs[1].servoOffsets[0] = -10;
  robot.legs[1].servoOffsets[1] = -5;
  robot.legs[3].servoOffsets[1] = -5;
  robot.legs[2].servoOffsets[2] = -5;
  robot.legs[3].servoOffsets[1] = -10;
  robot.legs[3].servoOffsets[2] = -10;
  robot.legs[3].servoOffsets[2] = 0;
  robot.legs[5].servoOffsets[0] = 10;
  robot.legs[5].servoOffsets[1] = -5;
  robot.legs[5].servoOffsets[2] = -10;
  
  //set up the receiver stuff...
  currentMicros = micros();
  previousMicros = currentMicros;
  pinMode(2, INPUT);
  attachInterrupt(digitalPinToInterrupt(2), receiverPulse, RISING);

  //for each leg...
  bool onGround = false;
  for(int l = 0; l < 6; l++){
    //set its angle from the x axis of the robot
    robot.legs[l].angle = l * 60;
    //initialize the leg
    robot.legs[l].init();
    //if a90 is false,
    if(!a90){
      //set the leg's onGround flag, alternating
      robot.legs[l].onGround = onGround;
      //move the leg to 0, 0, 10
      robot.legs[l].set(0, 0, 10);
      //change the onGround flag
      onGround = !onGround;
    //if a90 is true, set all the motors to the mathematical 90° position
    }else{
      robot.legs[l].servos[0].write(90 + robot.legs[l].servoOffsets[0]);
      robot.legs[l].servos[1].write(90 + robot.legs[l].servoOffsets[1] - 20);
      robot.legs[l].servos[2].write(90 + robot.legs[l].servoOffsets[2] + 20);
    }
    delay(100);
  }
  
  
  currentTime = millis();
  i_time = currentTime;
  f_time = i_time + l_time;
  delay(10);
}

/*unsigned long ti = millis();
void timeLog(){
  unsigned long tf = millis();
  Serial.print(tf - ti);
  Serial.print(", ");
  ti = tf;
}*/
void loop(){
  //Serial.println();
  //timeLog();
  // put your main code here, to run repeatedly:
  if(a90){
    delay(100);
    return;
  }
  previousTime = currentTime;
  currentTime = millis();
  //Serial.println(currentTime - previousTime);

  //make sure there was no weird spike in the receiver data
  for(int c = 0; c < 6; c++)
    if(channelData[c] > 2100 || channelData[c] < 400)
      if(c == 2) channelData[c] = 1000;
      else channelData[c] = 1500;

  
  //if the 2-position gate swith is in its upper position, enable the tripod gate
  if(channelData[7] < 1500) robot.gateName = 3;
  //else, enable the tetrapod gate
  else if(channelData[7] > 1500) robot.gateName = 2;

  //if the throttle is at the bottom, disable all the servos
  if(channelData[2] < 1050) Servo::enabled = false;
  //otherwise, enable them
  else Servo::enabled = true;

  
  //limit the x, y & a channel data to a sphere instead of a cube
  //this means that even if both x and y speeds are at their maximum,
  //the speed vector is going to be the same length.
  float x = channelData[0] - 1500;
  float y = channelData[1] - 1500;
  float a = channelData[3] - 1500;
  float theta1 = atan2(y, x);
  float hypot1 = getHypot(y, x);
  //if(hypot1 > 500) hypot1 = 500;
  //if(hypot1 <-500) hypot1 =-500;
  float theta2 = atan2(a, hypot1);
  float hypot2 = getHypot(a, hypot1);
  if(hypot2 > 500) hypot2 = 500;
  if(hypot2 <-500) hypot2 =-500;
  
  hypot1 = cos(theta2) * hypot2;
  a = sin(theta2) * hypot2 + 1500;
  x = cos(theta1) * hypot1 + 1500;
  y = sin(theta1) * hypot1 + 1500;

  
  /*Serial.print(x);
  Serial.print(", ");
  Serial.print(y);
  Serial.print(", ");
  Serial.print(a);
  Serial.println();*/

  //float zHeight= map(channelData[2], 1100, 2000, 10, 82.5) * 1.0;

  //timeLog();
  _robot temp_robot = robot;
  //if the 3-position mode switch is in the middle, enable rotate mode...
  if(channelData[6] > 1500 - 100 && channelData[6] < 1500 + 100){
    //map the channel data to angular positions
    temp_robot.angles.x = map(x, 1000, 2000, -30.0 * 1000, 30.0 * 1000) * 1.0 / 1000;
    temp_robot.angles.y = map(y, 1000, 2000, -30.0 * 1000, 30.0 * 1000) * 1.0 / 1000;
    temp_robot.angles.z = map(a, 1000, 2000, -40.0 * 1000, 40.0 * 1000) * 1.0 / 1000;
    temp_robot.offsets.z = map(channelData[2], 1100, 2000, 10, 82.5) * 1.0;
  }
  
  //if the 3-position mode switch is on the bottom, enable translate mode...
  if(channelData[6] > 2000 - 100 && channelData[6] < 2000 + 100){
    //map the channel data to positions
    temp_robot.offsets.x = map(x, 1000, 2000, -40.0 * 1000, 40.0 * 1000) * 1.0 / 1000;
    temp_robot.offsets.y = map(y, 1000, 2000, -40.0 * 1000, 40.0 * 1000) * 1.0 / 1000;
    temp_robot.angles.z = map(a, 1000, 2000, -40.0 * 1000, 40.0 * 1000) * 1.0 / 1000;
    temp_robot.offsets.z = map(channelData[2], 1100, 2000, 10, 82.5) * 1.0;
  }
  //if the 3-position mode switch is on the top, enable walk mode...
  if(channelData[6] > 1000 - 100 && channelData[6] < 1000 + 100){
    //map the channel data to speeds
    temp_robot.speeds.x = map(x, 1000, 2000, -0.20 * 1000000, 0.20 * 1000000) * 1.0 / 1000000;
    temp_robot.speeds.y = map(y, 1000, 2000, -0.20 * 1000000, 0.20 * 1000000) * 1.0 / 1000000;
    temp_robot.speeds.z = map(a, 1000, 2000, -0.09 * 1000000, 0.09 * 1000000) * 1.0 / 1000000;
    temp_robot.offsets.z = map(channelData[2], 1100, 2000, 10, 82.5) * 1.0;
    if(robot.gateName == 2){
      temp_robot.speeds.x *= 2.0/3;
      temp_robot.speeds.y *= 2.0/3;
      temp_robot.speeds.z *= 2.0/3;
    }
  }
  //timeLog();
  
  //calculate the delta position of each leg (so that the legs do not move abruptly when changing the mode switch)
  //if they are similar enough, allow the robot's speeds, angles and offsets to change
  if(areSimilar(robot.speeds,  temp_robot.speeds,  .05)
  && areSimilar(robot.angles,  temp_robot.angles,  4)
  && areSimilar(robot.offsets, temp_robot.offsets, 7.5)){
    robot = temp_robot;
  }
  
  //for each leg...
  for(int i = 0; i < 6; i++){
    //set the leg's height
    float theta;
    float hypot;
    float xPos = -robot.offsets.x + robot.speeds.x / 0.20 * 20;
    float yPos = -robot.offsets.y + robot.speeds.y / 0.20 * 20;
    float zPos = robot.offsets.z;
    float legZeroX = robot.legs[i].zero.x + xPos;
    float legZeroY = robot.legs[i].zero.y + yPos;
    float legZeroZ = robot.legs[i].zero.z + zPos;
    
    //get the angle and the distance from the leg to the center of the robot
    theta = atan2(legZeroY, legZeroX) /*radian -> degrees*/ * 180 / pi;
    hypot = getHypot(legZeroY, legZeroX);
    //modify the angle
    theta += robot.angles.z;
    //get back the coordinates from the leg's zero position
    xPos += cos(theta /*degrees -> radian*/ / 180 * pi) * hypot - legZeroX;
    yPos += sin(theta /*degrees -> radian*/ / 180 * pi) * hypot - legZeroY;
    
    //get the angle and the distance from the leg to the center of the robot
    theta = atan2(legZeroZ, legZeroY) /*radian -> degrees*/ * 180 / pi;
    hypot = getHypot(legZeroZ, legZeroY);
    //modify the angle
    theta += -robot.angles.y;
    //get back the coordinates from the leg's zero position
    yPos += cos(theta /*degrees -> radian*/ / 180 * pi) * hypot - legZeroY;
    zPos += sin(theta /*degrees -> radian*/ / 180 * pi) * hypot - legZeroZ;
    
    //get the angle and the distance from the leg to the center of the robot
    theta = atan2(legZeroX, legZeroZ) /*radian -> degrees*/ * 180 / pi;
    hypot = getHypot(legZeroX, legZeroZ);
    //modify the angle
    theta += robot.angles.x;
    //get back the coordinates from the leg's zero position
    zPos += cos(theta /*degrees -> radian*/ / 180 * pi) * hypot - legZeroZ;
    xPos += sin(theta /*degrees -> radian*/ / 180 * pi) * hypot - legZeroX;
    
    //write the coordinates to the leg's position
    robot.legs[i].position.x += xPos - robot.legs[i].def.x;
    robot.legs[i].position.y += yPos - robot.legs[i].def.y;
    robot.legs[i].position.z += zPos - robot.legs[i].def.z;
    robot.legs[i].def.x = xPos;
    robot.legs[i].def.y = yPos;
    robot.legs[i].def.z = zPos;
  }
  //timeLog();
  //if the 3-position mode switch is in the middle or on the bottom, move the legs
  /*if(channelData[6] > 1500 - 100 && channelData[6] < 2000 + 100){
    //for each leg...
    for(int i = 0; i < 6; i++){
      robot.legs[i].position.x = robot.legs[i].def.x;
      robot.legs[i].position.y = robot.legs[i].def.y;
      robot.legs[i].position.z = robot.legs[i].def.z;
    }
    return;
  }*/
  /*if(channelData[6] > 1500 - 100 && channelData[6] < 2000 + 100){
    //calculate the delta position of each leg (so that the legs do not move abruptly when changing the mode switch)
    float delta = 0;
    for(int i = 0; i < 6; i++){
      delta += robot.legs[i].position.x - robot.legs[i].def.x;
      delta += robot.legs[i].position.y - robot.legs[i].def.y;
      delta += robot.legs[i].position.z - robot.legs[i].def.z;
      delta /= 3;
    }
    delta /= 6;
    //if the requested position is close enough to the legs' current position, move the legs
    if(delta < 3){ //3mm per axis per leg
      //for each leg...
      for(int i = 0; i < 6; i++){
        robot.legs[i].position.x = robot.legs[i].def.x;
        robot.legs[i].position.y = robot.legs[i].def.y;
        robot.legs[i].position.z = robot.legs[i].def.z;
      }
    }
  }*/




  //calculate the ideal step duration...
  
  //get the greatest and lowest values from the robot's speeds
  float _max = max(max(robot.speeds.x, robot.speeds.y), robot.speeds.z / 0.09 * 0.20);
  float _min = min(min(robot.speeds.z, robot.speeds.y), robot.speeds.z / 0.09 * 0.20);
  //if min is further away from speed 0, then set max to min
  if(abs(_min) > abs(_max))
    _max = _min;
  //map the duration of a step(l_time) from 750 to 250, from
  //the maximum speed established above
  if(_max <= 0)
    l_time = map(_max * 1000000, -0.20 * 1000000, 0, 1000 / 3, 750);
  else if(_max >= 0)
    l_time = map(_max * 1000000, 0, 0.20 * 1000000, 750, 1000 / 3);
  if(robot.gateName != 3)
    l_time *= 2.0 / 3;
  f_time = i_time + l_time;



  //if l_time milliseconds have passed
  //(if the current time is bigger than the final time)
  if(currentTime >= f_time){
    //initial time = current time
    i_time = f_time;
    //final time = initial time + duration of a step
    f_time = i_time + l_time;


    //put each leg on the ground (temporarely)
    for(int i = 0; i < 6; i++){
      robot.legs[i].onGround = true;
      robot.legs[i].lifted = false;
    }

    //if the tripod gate is selected...
    if(robot.gateName == 3){
      //make sure the gate state is from 0 to 1
      if(robot.gateState >= 2) robot.gateState = 0;
      //lift some legs depending on the gate state
      for(int i = 0; i < 6; i += 2)
        robot.legs[i + robot.gateState].onGround = false;
    }else
    
    //if the tetrapod gate is selected...
    if(robot.gateName == 2){
      //make sure the gate state is from 0 to 2
      if(robot.gateState >= 3) robot.gateState = 0;
      //lift some legs depending on the gate state
      for(int i = 0; i < 6; i += 3)
        robot.legs[i + robot.gateState].onGround = false;
    }
    //increment the gate state
    robot.gateState++;
    
    ////lift some legs and lower others
    //for(int i = 0; i < 6; i++){
    //  legs[i].onGround = !legs[i].onGround;
    //  legs[i].lifted = false;
    //}
  }
  //timeLog();
  //for each leg...
  for(int i = 0; i < 6; i++){
    float fraction = 1.0/10.0;
    robot.legs[i].position.z = robot.legs[i].def.z;
    
    //if the leg is lifted,
    if(robot.legs[i].onGround == false){
      //if the remaining time for the step is smaller than 1/5 of the step
      //(if we're on the last 1/5 of the step) and if the leg is lifted
      //if(f_time - currentTime < l_time * fraction && legs[i].lifted == true){
      //  //lower the leg from zHeight * (4/5) to zHeight
      //  legs[i].position.z = map(f_time - currentTime, l_time * fraction, 0, zHeight * (1.0 - fraction * 2), zHeight);
      //}else{ //if we're on the first 4/5 of the step,
        //then move the leg towards the ideal position...
    
        //get the leg's position
        float pos_x = robot.legs[i].position.x;
        float pos_y = robot.legs[i].position.y;
    
        //f_pos is the final position a lifted leg needs to get to
        //(or half the total travel of the leg)
        float f_pos_x;
        float f_pos_y;
  
        //create a Vector3 holding the leg's default position
        //(the position where the leg can easily move in every direction)
        Vector3 newPosition = Vector3(
          robot.legs[i].def.x + robot.legs[i].zero.x,
          robot.legs[i].def.y + robot.legs[i].zero.y,
          robot.legs[i].def.z + robot.legs[i].zero.z
        );
        //find the ideal position for the leg if the speeds would not change
        //('currentTime - previousTime' ms increments of time)
        for(unsigned long ms = 0; ms < l_time / 2 * (1 + fraction * 1.0) * (6 / robot.gateName - 1); ms += 100)
          newPosition = move(robot.speeds.x, robot.speeds.y, robot.speeds.z, 100, newPosition);
        f_pos_x = newPosition.x - robot.legs[i].zero.x;
        f_pos_y = newPosition.y - robot.legs[i].zero.y;
  
        //if the leg travells more than x mm and if we're at the beginning of the step,
        if(getHypot(f_pos_x - pos_x, f_pos_y - pos_y) > 10 && currentTime - i_time < l_time * 2.0 / 3)
          //then lift the leg
          robot.legs[i].lifted = true;
  
        //if the leg is lifted and if we're on the first 4/5 of the step, then move the leg...
        if(robot.legs[i].lifted == true && f_time - currentTime > l_time * fraction){
          //l_speed is the speed a lifted leg needs to travel to get to f_pos in time
          //leg speed = (distance remaining) / (time remaining * (4/5))
          float l_speed_x = (f_pos_x - pos_x) / ((f_time - currentTime) * (1.0 - fraction));
          float l_speed_y = (f_pos_y - pos_y) / ((f_time - currentTime) * (1.0 - fraction));
      
          //limit the speed of a leg in x and y to 50 cm / s
          float max_speed = 0.50;
          if(l_speed_x > max_speed) l_speed_x = max_speed;
          if(l_speed_y > max_speed) l_speed_y = max_speed;
          if(l_speed_x < -max_speed) l_speed_x = -max_speed;
          if(l_speed_y < -max_speed) l_speed_y = -max_speed;
        
          //then move it towards f_pos with a speed of l_speed
          robot.legs[i].position.x += l_speed_x * (currentTime - previousTime);
          robot.legs[i].position.y += l_speed_y * (currentTime - previousTime);
        }
         
        //if the leg is lifted, then modify its height
        if(robot.legs[i].lifted == true){
          //if we're on the first half of the step,
          if(currentTime - i_time < l_time / 2)
            //raise the leg from zHeight to 0 mm
            robot.legs[i].position.z = map(currentTime - i_time, 0, l_time / 2, robot.legs[i].def.z /*+ robot.offsets.z*/, 0);
          //else if we're on the second half of the step,
          else
            //lower the leg from 0 to zHeight * (4/5) mm
            robot.legs[i].position.z = map(currentTime - i_time, l_time / 2, l_time, 0, robot.legs[i].def.z /*+ robot.offsets.z*/);
        }
    }
    
    //if the leg is on the ground or if we're on the last 1/5 of the step,
    //then move it reverse the direction of the speed
    if(robot.legs[i].onGround == true || robot.legs[i].lifted == false || f_time - currentTime < l_time * fraction){
      //legs[i].lifted = false;
      //legs[i].position.z = zHeight;
      Vector3 newPosition = move(-robot.speeds.x, -robot.speeds.y, -robot.speeds.z, currentTime - previousTime, Vector3(
        robot.legs[i].position.x + robot.legs[i].zero.x,
        robot.legs[i].position.y + robot.legs[i].zero.y,
        robot.legs[i].position.z + robot.legs[i].zero.z
      ));
      //update the position of the leg
      robot.legs[i].position.x = newPosition.x - robot.legs[i].zero.x;
      robot.legs[i].position.y = newPosition.y - robot.legs[i].zero.y;
      robot.legs[i].position.z = newPosition.z - robot.legs[i].zero.z;
    }
    
    //Serial.print(legs[0].position.x);
    //Serial.print(", ");
    //Serial.print(legs[0].position.y);
    //Serial.print(", ");
    //Serial.print(legs[0].position.z);
    //Serial.println();
    
    //update the leg
    robot.legs[i].update();
  } //next leg
  //timeLog();

  //wait a bit to slow down the update frequency
  //(actually... no. the update frequency is too slow)
  //delay(sleep);
}
