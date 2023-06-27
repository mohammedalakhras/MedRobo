import platform
import pathlib
plt = platform.system()
pathlib.WindowsPath = pathlib.PosixPath

# AUTOGENERATED! DO NOT EDIT! File to edit: app.ipynb.

# %% auto 0
__all__ = ['learn', 'categories', 'image', 'label', 'examples', 'interface', 'classify_image']

# %% app.ipynb 1
from fastai.vision.all import *
import PIL.Image
PIL.Image.MAX_IMAGE_PIXELS = None
from PIL import Image

import gradio as gr

# %% app.ipynb 2
learn = load_learner('tumorClassifier.pkl')

# %% app.ipynb 3
categories=('COVID19','Normal','Pneumonia','Turberculosis')

def classify_image(img):
    pred,indx,probs=learn.predict(img)
    return dict(zip(categories,map(float,probs)))


# %% app.ipynb 4
image=gr.inputs.Image(shape=(512,512))
label=gr.outputs.Label()
examples=['1.jpeg', '2.jpg', '3.png','a.jpg','b.jpg','c.jpg','d.jpg','e.jpg','f.jpg']


interface=gr.Interface(fn=classify_image, inputs=image ,outputs=label,examples=examples)
interface.launch(inline=False)