#===== USE PYTHON 3.7 TO MAKE TENSORFLOW (IN KERAS) WORK!!!!!=====#


#===== IMPORT LIBRARIES =====#
#https://stackoverflow.com/questions/35911252/disable-tensorflow-debugging-information
import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'
#https://stackoverflow.com/questions/60130622/warningtensorflow-with-constraint-is-deprecated-and-will-be-removed-in-a-future
import warnings
#warnings.filterwarnings("ignore", category=DeprecationWarning)

import keras.backend as K
from keras.utils.generic_utils import get_custom_objects
import keras
from keras import layers
import tensorflow as tf
from PIL import Image
import io
import numpy as np
from multiprocessing import Process, Value, Pool

import math
import random


def ImageArrToDataArr(array):
    imgWidth  = array.shape[0]
    imgHeight = array.shape[1]
    dataArr = np.zeros([imgWidth // 16 * imgHeight // 16 * 4, 16 * 16], dtype=np.uint8)

    max1 = imgWidth // 16 * 16
    max2 = imgHeight // 16 * 16
    for x in range(0, max1, 16):
        for y in range(0, max2, 16):
            for x2 in range(16):
                for y2 in range(16):
                    pixel = array[x + x2][y + y2]
                    #if len(color) == 1: #grayscale
                    try:
                        if len(pixel) == 3: #no alpha value
                            pixel = np.append(pixel, 255)
                    except TypeError: #grayscale
                        pixel = np.append([pixel] * 3, 255)
                    for p in range(4):
                        color = pixel[p]
                        dataArr[(x // 16 + y // 16 * (imgWidth // 16)) * 4 + p][x2 + y2 * 16] = color
    #print(dataArr.shape) #(w/16, h/16, 16*16*4)
    return dataArr
def DataArrToImageArr(array, imgWidth, imgHeight):
    #https://stackoverflow.com/questions/55319949/pil-typeerror-cannot-handle-this-data-type
    imageArr = np.zeros([imgWidth, imgHeight, 4], dtype=np.uint8)

    max1 = imgWidth // 16 * 16
    max2 = imgHeight // 16 * 16
    for x in range(0, max1, 16):
        for y in range(0, max2, 16):
            for x2 in range(16):
                for y2 in range(16):
                    for p in range(4):
                        color = array[(x // 16 + y // 16 * (imgWidth // 16)) * 4 + p][x2 + y2 * 16]
                        imageArr[x + x2][y + y2][p] = color
    #print(imageArr.shape) #(w, h, 4)
    return imageArr


def createTrainingDataThread(t_nMax, download_folder, i):
    global counter

    #https://stackoverflow.com/questions/33101935/convert-pil-image-to-byte-array/33117447
    imgIn = Image.open(download_folder + '/' + str(i) + '.png', mode='r')

    #https://www.pythoninformer.com/python-libraries/numpy/numpy-and-images/
    ImageArr = np.array(imgIn)

    dataArr = ImageArrToDataArr(ImageArr)

    #https://stackoverflow.com/questions/2080660/python-multiprocessing-and-a-shared-counter
    with counter.get_lock():
        counter.value += 1
    print('\r>>> Modifying dataset structure... ' + str(counter.value) + '/' + str(t_nMax), end='')
    return dataArr

#https://stackoverflow.com/questions/2080660/python-multiprocessing-and-a-shared-counter
counter = None
def init(args):
    global counter
    counter = args

def createTrainingData(settings):
    global counter

    counter = Value('i', 0)
    dataArr = []
    #https://stackoverflow.com/questions/2080660/python-multiprocessing-and-a-shared-counter
    with Pool(processes=4, initializer=init, initargs=(counter,)) as pool:
        responses = []
        for i in settings.imgNameArr:
            res = pool.apply_async(createTrainingDataThread, (len(settings.imgNameArr), settings.download_folder, i))      # runs in *only* one process
            responses.append(res)
        for res in responses:
            ret = res.get(timeout=1000000)
            for val in ret:
                dataArr.append(val)
    print('')

    return dataArr



#https://keras.io/guides/functional_api/ @@ All models are callable, just like layers
#https://keras.io/guides/customizing_what_happens_in_fit/
def tanh_0_256(x):
    return (K.tanh(x / 255 * 2 - 1) + 1) / 2 * 255

def createModel(settings):
    print(">>> Creating AI Model...")

    encoder_input = keras.Input(shape=(16 * 16,), name="encoder_input")
    x = layers.Dense(16 * 16, activation=tanh_0_256)(encoder_input)
    x = layers.Dense(16 * 16, activation=tanh_0_256)(x)
    encoder_output = layers.Dense(16 * 16, activation=tanh_0_256)(x)

    settings.encoder = keras.Model(encoder_input, encoder_output, name="encoder")
    #encoder.summary()

    decoder_input = keras.Input(shape=(16 * 16,), name="decoder_input")
    x = layers.Dense(16 * 16, activation=tanh_0_256)(decoder_input)
    x = layers.Dense(16 * 16, activation=tanh_0_256)(x)
    decoder_output = layers.Dense(16 * 16, activation=tanh_0_256)(x)

    settings.decoder = keras.Model(decoder_input, decoder_output, name="decoder")
    #decoder.summary()

    autoencoder_input = keras.Input(shape=(16 * 16,), name="img")
    encoded_img = settings.encoder(autoencoder_input)
    decoded_img = settings.decoder(encoded_img)
    settings.autoencoder = AICompressionModel(autoencoder_input, decoded_img, name="autoencoder")
    #autoencoder.summary()

def trainModel(settings, dataArr):
    print(">>> Training AI Model...")
    #https://keras.io/api/optimizers/
    optimizer = keras.optimizers.Adam(learning_rate=settings.lr) #0.0001
    settings.autoencoder.compile(loss='mean_squared_error', optimizer=optimizer, metrics=['accuracy'])
    settings.autoencoder.fit(np.array(dataArr), np.array(dataArr), epochs=settings.epochs)#, batch_size=batch_size)

def compressImage(settings, i):
    if settings.compressionPercentage == 0: n = 0
    else: n = int(math.pow(2, math.floor(math.log( settings.compressionPercentage * 256 // 100, 2 ))))
    settings.neuronsPerSquare = n
    print('>>> Neurons used per 16x16 pixels: ' + str(n))

    print(">>> Compressing Image " + str(i) + "...")
    #https://stackoverflow.com/questions/33101935/convert-pil-image-to-byte-array/33117447
    imgIn = Image.open(settings.download_folder + '/' + str(i) + '.png', mode='r')
    #https://www.pythoninformer.com/python-libraries/numpy/numpy-and-images/
    ImageArr = np.array(imgIn)
    size = [ImageArr.shape[0] // 16 * 16, ImageArr.shape[1] // 16 * 16, ImageArr.shape[2]]
    depth = ImageArr.shape[2]
    n = settings.neuronsPerSquare

    dataArr = ImageArrToDataArr(ImageArr)

    dataArrEnc = settings.encoder.predict(dataArr)

    dataArrM = np.zeros([(size[0] // 16) * (size[1] // 16) * depth, n], dtype=np.uint8) #dataArrEnc.shape[0]

    for index in range((size[0] // 16) * (size[1] // 16) * 4):
        if index % 4 >= depth: continue
        item = dataArrEnc[index]
        dataArrM[(index // 4 * depth) + (index % 4)] = item[0:n]
    if depth == 1: depthM = 0x0
    elif depth == 3: depthM = 0x1 | 0x2 | 0x4
    elif depth == 4: depthM = 0x1 | 0x2 | 0x4 | 0x8
    else: print('>>> Error: unsupported depth ' + str(depth))

    dataArrM2 = np.reshape(dataArrM, [size[0] // 16 * size[1] // 16 * depth * n])

    dataArrM3 = dataArrM2#np.array([int(math.pow(dataArrM2[x], 1 / math.pow(2, settings.neuronCompressionFactor))) * 16 + int(math.pow(dataArrM2[x + 1], 1 / math.pow(2, settings.neuronCompressionFactor))) for x in range(0, dataArrM2.shape[0], 2)], dtype=np.uint8)

    outputArr = np.concatenate((np.array([depthM, settings.neuronsPerSquare, 0, size[0] // 256, size[0] % 256, size[1] // 256, size[1] % 256], dtype=np.uint8), dataArrM3))

    #https://stackoverflow.com/questions/18555486/writing-numpy-array-to-file-byte-order-issue
    print(">>> Exporting Image " + str(i) + "...")
    outputArr.tofile(settings.download_folder + '/' + str(i) + '.aic')

def decompressImage(settings, i):
    print(">>> Decompressing Image " + str(i) + "...")

    #https://numpy.org/devdocs/reference/generated/numpy.fromfile.html
    inputArr = np.fromfile(settings.download_folder + '/' + str(i) + '.aic', dtype=np.uint8, count=-1, sep='')
    depthM = inputArr[0]
    settings.neuronsPerSquare = inputArr[1]
    n = settings.neuronsPerSquare
    settings.compressionPercentage = n * 100 / 256
    size = [(inputArr[3] * 256 + inputArr[4]), (inputArr[5] * 256 + inputArr[6]), 0]

    if depthM == 0x0: depth = 1
    elif depthM == 0x1 | 0x2 | 0x4: depth = 3
    elif depthM == 0x1 | 0x2 | 0x4 | 0x8: depth = 4
    else: print('>>> Error: unsupported depth ' + str(depth))
    size[2] = depth

    dataArrM3 = inputArr[7:]

    dataArrM2 = dataArrM3#np.array([[int(math.pow(dataArrM3[x] // 16, math.pow(2, settings.neuronCompressionFactor))), int(math.pow(dataArrM3[x] % 16, math.pow(2, settings.neuronCompressionFactor)))] for x in range(dataArrM3.shape[0])], dtype=np.uint8)

    dataArrM = np.reshape(dataArrM2, [(size[0] // 16) * (size[1] // 16) * depth, n])

    dataArrEnc = np.zeros([(size[0] // 16) * (size[1] // 16) * 4, 256], dtype=np.uint8) #dataArrEnc.shape[0]

    for index in range((size[0] // 16) * (size[1] // 16) * 4):
        if index % 4 < depth:
            item = dataArrM[(index // 4 * depth) + (index % 4)]
            dataArrEnc[index] = np.concatenate((item, np.full([256 - n], 1, dtype=np.uint8))) #np.zeros([256 - n], dtype=np.uint8)
        else:
            for i2 in range(depth, 4):
                dataArrEnc[index // 4 * 4 + i2] = np.full([256], 0, dtype=np.uint8)

    dataArr = settings.decoder.predict(dataArrEnc)

    ImageArr = DataArrToImageArr(dataArr, size[0], size[1])

    print(">>> Exporting Image " + str(i) + "...")

    #https://www.pythoninformer.com/python-libraries/numpy/numpy-and-images/
    imgOut = Image.fromarray(ImageArr)
    #https://pillow.readthedocs.io/en/stable/reference/Image.html
    imgOut.save(settings.download_folder + '/' + str(i) + '.predicted' + '@' + str(settings.compressionPercentage) + '%.png')



def compressDecompressImages(settings):
    for i in settings.imgNameArr:
        compressImage(settings, i)
        decompressImage(settings, i)

def compressImages(settings):
    for i in settings.imgNameArr:
        compressImage(settings, i)

def decompressImages(settings):
    for i in settings.imgNameArr:
        decompressImage(settings, i)



#https://keras.io/guides/writing_a_training_loop_from_scratch/
#https://keras.io/guides/customizing_what_happens_in_fit/
#@tf.function
class AICompressionModel(keras.Model):
    def train_step(self, data):
        x, y = data
        print('>>> Defining custom AI Compression model...')
        #https://keras.io/guides/customizing_what_happens_in_fit/
        batch_size = tf.shape(x)[0]
        global settings
        loss_values = []
        #https://stackoverflow.com/questions/56072634/tf-2-0-runtimeerror-gradienttape-gradient-can-only-be-called-once-on-non-pers
        with tf.GradientTape() as tape: #persistent=True
            g_loss = 0
            enc = settings.encoder(x, training=True)
            for n in [int(math.pow(2, n)) for n in range(int(math.log(256, 2)) + 1)]: #range(1, 16 * 16 + 1, n): #[128]:
                #https://stackoverflow.com/questions/47674588/tensorflow-how-create-an-const-tensor-the-same-shape-as-a-placeholder
                t1 = tf.slice(enc, [0, 0], [batch_size, n])
                #https://keras.io/guides/customizing_what_happens_in_fit/
                t2 = tf.zeros(shape=(batch_size, 256 - n), dtype=tf.float32)
                t3 = tf.concat([t1, t2], axis=-1)

                dec = settings.decoder(t3, training=True)
                loss_value = self.compiled_loss(y, dec, regularization_losses=self.losses)
                g_loss = g_loss + loss_value / 16 / 16 * tf.cast(n, tf.float32)

        grads = tape.gradient(g_loss, self.trainable_weights)
        self.optimizer.apply_gradients(zip(grads, self.trainable_weights))

        del tape

        #https://stackoverflow.com/questions/62003026/attributeerror-float-object-has-no-attribute-pop-in-custom-keras-model-with
        return {'loss': g_loss}

def exportModel(settings):
    print(">>> Exporting AI Model...")
    #https://github.com/tensorflow/tensorflow/issues/31057
    #settings.autoencoder.predict([[0] * 256]) #WTF...
    #https://stackoverflow.com/questions/51806852/cant-save-custom-subclassed-model
    #settings.autoencoder.save(settings.modelExportName, save_format='tf')
    #https://www.tensorflow.org/guide/keras/save_and_serialize
    settings.autoencoder.save_weights('./models/' + settings.modelExportName)
def importModel(settings):
    createModel(settings)
    print(">>> Importing AI Model...")
    #https://keras.io/api/models/model_saving_apis/
    settings.autoencoder.load_weights('./models/' + settings.modelImportName)
    #settings.autoencoder = keras.models.load_model(settings.modelImportName)
    #print('loaded model: ', settings.autoencoder)

def makeSetting(message, default, type):
    ret = input('>>> ' + message + ' (default ' + str(default) + '): ')
    if ret == '': ret = type(default)
    else: ret = type(ret)
    return ret


#https://docs.python.org/3/library/multiprocessing.html
settings = lambda: None
if __name__ == '__main__':
    settings.download_folder = "./dataset1_final" # folder in which the images wil be stored

    choice = input('>>> Operation: (t: train, c: compress): ')
    if choice == 't': settings.train = True; settings.compress = False
    elif choice == 'c': settings.compress = True; settings.train = False
    else: print('>>> Please enter \'t\' or \'c\''); exit(1)
    settings.imgNameArr = makeSetting('Array of images to use', '[1, 4, 5, 7, 11, 44, 81]', eval)

    if settings.train == True:
        settings.modelImportName = makeSetting('Model import name (leave empty to start from scratch)', '', str)
        if settings.modelImportName != '': importModel(settings)
        else: createModel(settings)
        settings.epochs = makeSetting('Epochs', 100, int)
        settings.lr = makeSetting('Learning Rate', .0002, float)
        settings.modelExportName = makeSetting('Model export name (leave empty to skip)', 'model1', str)
        try:
            dataArr = createTrainingData(settings)
        except KeyboardInterrupt:
            print('\n>>> Operation interrupted. Exiting...')
            exit(0)
        try:
            model = trainModel(settings, dataArr)
        except KeyboardInterrupt:
            print('\n>>> Training interrupted.')
            print('>>> Exporting model and exiting...')
        if settings.modelExportName != '': exportModel(settings)
    else:
        settings.modelImportName = makeSetting('Model import name', 'model1', str)
        if settings.modelImportName == '': print('>>> Error: Please enter an import name.'); exit(1)
        importModel(settings)
        choice = input('>>> Operation-2: (c: compress, d: decompress, b: both): ')
        if choice == 'c' or choice == 'b':
            settings.compressionPercentage = makeSetting('Compression Percentage', 50, float)
            #settings.neuronCompressionFactor = makeSetting('Neuron compression factor', 2, int)
        if choice == 'c': compressImages(settings)
        elif choice == 'd': decompressImages(settings)
        elif choice == 'b': compressDecompressImages(settings)
        else: print('>>> Please enter \'c\', \'d\' or \'b\''); exit(1)

    print(">>> Done.")
