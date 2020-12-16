import numpy as np
import pandas as pd
import shapefile as shp
import matplotlib.pyplot as plt
import seaborn as sns
import geopandas as gpd
import simplejson as json

from django.http import HttpResponse
from django.shortcuts import render

from .forms import *


def main(request):
    """ Show map and shapefiles """
    img = MainImage.objects.all()
    return render(request, 'main/index.html', {'img': img})


def query_properties(request):
    """ Query properties """
    file = pd.read_json('static/files/2020.geojson')
    # res = file['features'][2]['geometry']['coordinates']
    res = file['features'][2]['properties']
    return HttpResponse(json.dumps(res), content_type="application/json")